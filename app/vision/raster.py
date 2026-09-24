"""Raster path: page image -> layout regions + OCR lines -> the same text-based interpretation the vector paths use.
Coordinates are converted to PDF points with y up so findings, markers and the PDF renderer agree."""
from __future__ import annotations
import io, logging, re
import pymupdf
from PIL import Image
from ..pdf_extract import PdfExtractor, UNICODE_GDT
from ..util import clean_text, JOBS, OUT
from pathlib import Path

def normalize_ocr(text: str) -> str:
    """Repair the OCR confusions that matter on drawings: diameter and tolerance symbols, letter/digit swaps inside numbers."""
    t = text.replace("+/-", "±").replace("+-", "±").replace("¢", "Ø").replace("φ", "Ø").replace("ø", "Ø")
    t = re.sub(r"^([O0o])(?=\s?\d)", "Ø", t)
    t = re.sub(r"\b(\d+X)\s*[O0o](?=\d)", r"\1 Ø", t)
    t = re.sub(r"\b(\d)\s*OF\s*(\d)\b", r"\1 OF \2", t.replace("0F", "OF"))
    t = re.sub(r"(?<=\d)[,](?=\d{1,2}\b)", ".", t)
    t = re.sub(r"\bl(?=\d)", "1", t)
    return t.strip()
from .. import config
from .ocr import get_ocr
from .layout import get_layout_model, HeuristicLayout

log = logging.getLogger("printverity.raster")

class RasterExtractor(PdfExtractor):
    """Subclass of the PDF extractor: it fills texts/circles from OCR and layout instead of the text layer, then reuses every interpretation step."""
    def __init__(self, path, images, page_sizes_pt, dpi):
        self.path = path; self.doc = None; self.units = "unknown"
        self.texts, self.dims, self.circles, self.arcs, self.fcfs, self.datums = [], [], [], [], [], []
        self.leaders, self.rects, self.attribs, self.lines = [], [], [], []
        self.warnings = []; self.pages = page_sizes_pt; self.scale = None; self.raster = True
        self.images = images; self.dpi = dpi; self.regions = []; self.engines = {}

    def collect(self):
        ocr = get_ocr(); layout = get_layout_model()
        self.engines = {"ocr": ocr.name, "layout": layout.name}
        k = 72.0 / self.dpi
        for pno, img in enumerate(self.images):
            W, H = self.pages[pno]
            img = self._prepare(img)
            lines = ocr.lines(img)
            regions = layout.predict_from_lines(lines, img.width, img.height) if isinstance(layout, HeuristicLayout) else layout.predict(img)
            lines = self._merge(lines, self._region_passes(ocr, img, regions))
            self.regions.append([{"cls": r.cls, "bbox": [round(r.x0 * k, 1), round(H - r.y1 * k, 1), round(r.x1 * k, 1), round(H - r.y0 * k, 1)], "conf": round(r.conf, 2)} for r in regions])
            for l in lines:
                text = normalize_ocr(clean_text(l.text))
                if not text or l.conf < 0.3: continue
                x0, y0, x1, y1 = l.x0 * k, l.y0 * k, l.x1 * k, l.y1 * k
                cls = self._region_for(l, regions)
                # OCR boxes cover the glyphs only; the font size the layout logic expects is about the box height itself
                rec = {"text": text, "loc": [round(x0, 2), round(H - y1, 2)], "h": round((y1 - y0) * 1.05, 2), "kind": "ocr", "rot": 0.0, "page": pno,
                       "bbox": [round(x0, 2), round(H - y1, 2), round(x1, 2), round(H - y0, 2)], "conf": round(l.conf, 2), "region": cls}
                self.texts.append(rec)
                self._maybe_dim(rec)
                for ch, sym in UNICODE_GDT.items():
                    if ch in text: self._fcf_from_text(text, sym, rec); break
            # circles from the image (holes, balloons) via Hough transform
            self.circles.extend(self._circles(img, pno, H, k))
            # datum boxes: single letters inside a 'datum' region, or boxed letters found by the layout model
            for r in regions:
                if r.cls == "datum":
                    inside = [t for t in self.texts if t["page"] == pno and re.fullmatch(r"[A-Z]", t["text"]) and r.x0 * k <= t["loc"][0] <= r.x1 * k]
                    for t in inside: self.datums.append({"id": t["text"], "loc": t["loc"], "source": "layout model", "page": pno})
        self._merge_fcf_cells()
        self._infer_units_and_scale()
        self.warnings.append(f"Raster sheet read with {self.engines['ocr']} OCR and the {self.engines['layout']} layout model; text confidence is per line.")
        return self

    @staticmethod
    def _prepare(img):
        """Scan clean-up before OCR: grayscale, mild denoise, Otsu threshold. Falls back to the original when OpenCV is missing."""
        try:
            import cv2, numpy as np
            g = cv2.cvtColor(np.array(img.convert("RGB")), cv2.COLOR_RGB2GRAY)
            g = cv2.fastNlMeansDenoising(g, None, 7, 7, 21)
            _, th = cv2.threshold(g, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
            return Image.fromarray(th).convert("RGB")
        except Exception:
            return img

    @staticmethod
    def _region_passes(ocr, img, regions):
        """Second OCR pass at 2x on the small-text regions (title block, notes, parts list, dimensions): block-mode OCR on a zoomed crop reads the 1.5 mm labels that a sparse full-page pass misses."""
        from .ocr import Line
        W, H = img.size; out = []
        targets = [r for r in regions if r.cls in ("title_block", "parts_list", "note", "dimension", "callout", "fcf")]
        if not any(r.cls == "title_block" for r in targets):
            from .layout import Region
            targets.append(Region("title_block", W * 0.6, H * 0.7, W, H, 0.3))
        for r in targets:
            pad = 6 if r.cls in ("title_block", "parts_list") else 10
            x0, y0, x1, y1 = max(0, int(r.x0) - pad), max(0, int(r.y0) - pad), min(W, int(r.x1) + pad), min(H, int(r.y1) + pad)
            if x1 - x0 < 8 or y1 - y0 < 8: continue
            crop = img.crop((x0, y0, x1, y1))
            tabular = r.cls in ("title_block", "parts_list")
            if tabular: crop = RasterExtractor._strip_table_rules(crop)
            scale = 2.0 if max(crop.size) < 1600 else 1.0
            if scale != 1.0: crop = crop.resize((int(crop.width * scale), int(crop.height * scale)), Image.LANCZOS)
            modes = (11, 4) if tabular else ((11,) if r.cls == "note" else (7,))
            for psm in modes:
                try:
                    for l in ocr.lines(crop, psm=psm):
                        out.append(Line(l.text, x0 + l.x0 / scale, y0 + l.y0 / scale, x0 + l.x1 / scale, y0 + l.y1 / scale, l.conf, []))
                except Exception:
                    continue
        return out

    @staticmethod
    def _strip_table_rules(crop):
        """Remove long horizontal and vertical rules (cell borders) so the OCR engine sees text, not a table image."""
        try:
            import cv2, numpy as np
            g = cv2.cvtColor(np.array(crop.convert("RGB")), cv2.COLOR_RGB2GRAY)
            inv = 255 - g
            hk = cv2.getStructuringElement(cv2.MORPH_RECT, (max(25, g.shape[1] // 12), 1)); vk = cv2.getStructuringElement(cv2.MORPH_RECT, (1, max(25, g.shape[0] // 12)))
            lines = cv2.morphologyEx(inv, cv2.MORPH_OPEN, hk) | cv2.morphologyEx(inv, cv2.MORPH_OPEN, vk)
            lines = cv2.dilate(lines, cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3)))
            cleaned = cv2.bitwise_or(g, lines)
            return Image.fromarray(cleaned).convert("RGB")
        except Exception:
            return crop

    @staticmethod
    def _merge(base, extra):
        """The full-page sparse pass is the reference; the zoomed pass only adds lines it found in gaps, or replaces a low-confidence line with a clearly better read of the same box."""
        def overlap(a, b):
            ix = max(0, min(a.x1, b.x1) - max(a.x0, b.x0)); iy = max(0, min(a.y1, b.y1) - max(a.y0, b.y0))
            inter = ix * iy; area = min((a.x1 - a.x0) * (a.y1 - a.y0), (b.x1 - b.x0) * (b.y1 - b.y0)) or 1
            return inter / area
        merged = list(base)
        for e in extra:
            hits = [b for b in merged if overlap(e, b) > 0.3]
            if not hits:
                merged.append(e); continue
            if len(hits) == 1 and hits[0].conf < 0.6 and e.conf > hits[0].conf + 0.15 and abs(len(e.text) - len(hits[0].text)) <= 3:
                merged.remove(hits[0]); merged.append(e)
        return merged

    @staticmethod
    def _region_for(line, regions):
        cx, cy = (line.x0 + line.x1) / 2, (line.y0 + line.y1) / 2
        best = None
        for r in regions:
            if r.x0 <= cx <= r.x1 and r.y0 <= cy <= r.y1 and (best is None or r.conf > best.conf): best = r
        return best.cls if best else None

    @staticmethod
    def _circles(img, pno, H, k):
        try:
            import cv2, numpy as np
            g = cv2.cvtColor(np.array(img.convert("RGB")), cv2.COLOR_RGB2GRAY); g = cv2.medianBlur(g, 3)
            found = cv2.HoughCircles(g, cv2.HOUGH_GRADIENT, dp=1.2, minDist=18, param1=140, param2=42, minRadius=6, maxRadius=90)
            if found is None: return []
            circles = [{"c": [round(float(x) * k, 2), round(H - float(y) * k, 2)], "r": round(float(r) * k, 3), "page": pno, "unscaled": True} for x, y, r in found[0]]
            return circles[:200]
        except Exception as e:
            log.info("circle detection skipped: %s", str(e)[:80]); return []

    def source(self):
        s = super().source(); s.update({"kind": "pdf", "raster": True, "ocr": self.engines.get("ocr"), "layout_model": self.engines.get("layout"), "dpi": self.dpi, "regions": self.regions})
        return s

def _pdf_images(path, dpi):
    doc = pymupdf.open(path); imgs = []; sizes = []
    for page in doc:
        pix = page.get_pixmap(dpi=dpi, alpha=False); imgs.append(Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")); sizes.append([page.rect.width, page.rect.height])
    return imgs, sizes

def extract_raster_pdf(path, dpi=config.RASTER_DPI):
    imgs, sizes = _pdf_images(path, dpi)
    return RasterExtractor(path, imgs, sizes, dpi).collect().interpret()

def _sidecar_path(path):
    """Where the one-page PDF wrapper of a scan goes: next to the scan inside a job folder, otherwise under data/out so a
    user's source folder is never written to (a scan run straight from a kit or a test must not leave files behind)."""
    p = Path(path).resolve()
    if JOBS.resolve() in p.parents: return str(p) + ".pdf"
    d = OUT / "scans"; d.mkdir(parents=True, exist_ok=True)
    return str(d / (p.name + ".pdf"))

def extract_image(path, dpi=config.RASTER_DPI):
    """A scanned PNG/JPG/TIFF: wrapped as a one-page PDF so rendering and markup use the same code path."""
    img = Image.open(path).convert("RGB")
    pdf_path = _sidecar_path(path)
    doc = pymupdf.open(); rect = pymupdf.Rect(0, 0, img.width * 72 / dpi, img.height * 72 / dpi); page = doc.new_page(width=rect.width, height=rect.height)
    buf = io.BytesIO(); img.save(buf, "PNG"); page.insert_image(rect, stream=buf.getvalue())
    doc.save(pdf_path, deflate=True, deflate_images=True, garbage=3); doc.close()
    ex = RasterExtractor(path, [img], [[rect.width, rect.height]], dpi).collect().interpret()
    ex["source"]["pdf_path"] = pdf_path
    return ex
