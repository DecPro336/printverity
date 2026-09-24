"""Vector PDF extraction with PyMuPDF. Coordinates are flipped to y-up so the DXF interpretation logic applies unchanged."""
import re, logging
import pymupdf
from .dxf_extract import DxfExtractor
from .util import clean_text, fnum, dist, new_id
from . import patterns as P

log = logging.getLogger("printverity.pdf")
UNICODE_GDT = {"⌖": "position", "⊥": "perpendicularity", "∥": "parallelism", "⏥": "flatness", "○": "circularity", "⌭": "cylindricity", "⌒": "profile of a line",
               "⌓": "profile of a surface", "∠": "angularity", "◎": "concentricity", "⌯": "symmetry", "↗": "circular runout", "⌰": "total runout"}
DIM_TEXT = re.compile(r"^(?:(\d+)\s*[xX]\s*)?([ØR]?)\s*(\d+(?:[.,]\d+)?)\s*(?:(±)\s*(\d+(?:[.,]\d+)?)|\+\s*(\d+(?:[.,]\d+)?)\s*/\s*-\s*(\d+(?:[.,]\d+)?))?\s*(?:[A-Za-z]\d{1,2})?\s*(THRU|TYP|REF|MIN|MAX)?\.?$")

class PdfExtractor(DxfExtractor):
    LABEL_WIN_MIN = 7.0          # page points (about 2.5 mm)

    def __init__(self, path):
        self.path = path
        self.doc = pymupdf.open(path)
        self.units = "unknown"
        self.texts, self.dims, self.circles, self.arcs, self.fcfs, self.datums = [], [], [], [], [], []
        self.leaders, self.rects, self.attribs, self.lines = [], [], [], []
        self.warnings = []
        self.pages = []
        self.scale = None
        self.raster = False

    def source(self):
        return {"file": self.path, "kind": "pdf", "units": self.units, "pages": len(self.pages), "page_sizes": self.pages, "raster": self.raster, "scale": self.scale}

    def collect(self):
        for pno, page in enumerate(self.doc):
            W, H = page.rect.width, page.rect.height
            self.pages.append([W, H])
            try:
                self._page_text(page, pno, H)
                self._page_drawings(page, pno, H)
            except Exception as e:
                self.warnings.append(f"page {pno+1}: {e}")
        self._merge_fcf_cells()
        fcf_tols = {f.get("tolerance") for f in self.fcfs}
        self.dims = [d for d in self.dims if not (d["type"] == "diameter" and d.get("value") in fcf_tols and d.get("value", 1) < 2)]
        if not any(t["kind"] != "attrib" for t in self.texts):
            self.raster = True
            self.warnings.append("No text layer found: this PDF is a scanned/raster sheet. OCR is not enabled in this build, only the image is shown.")
        self._infer_units_and_scale()
        return self

    def _page_text(self, page, pno, H):
        d = page.get_text("dict")
        for block in d.get("blocks", []):
            if block.get("type") != 0: continue
            for line in block.get("lines", []):
                spans = [s for s in line.get("spans", []) if s.get("text", "").strip()]
                if not spans: continue
                gdt = [s for s in spans if "gdt" in (s.get("font", "") or "").lower()]
                x0 = min(s["bbox"][0] for s in spans); y1 = max(s["bbox"][3] for s in spans); y0 = min(s["bbox"][1] for s in spans); x1 = max(s["bbox"][2] for s in spans)
                size = max(s.get("size", 8) for s in spans)
                if gdt:
                    self._fcf_from_spans(spans, pno, H, x0, y1, size); continue
                text = clean_text(" ".join(s["text"] for s in spans))
                if not text: continue
                rec = {"text": text, "loc": [round(x0, 2), round(H - y1, 2)], "h": round(size * 0.72, 2), "kind": "text", "rot": 0.0, "page": pno,
                       "bbox": [round(x0, 2), round(H - y1, 2), round(x1, 2), round(H - y0, 2)]}
                self.texts.append(rec)
                self._maybe_dim(rec)
                for ch, sym in UNICODE_GDT.items():
                    if ch in text:
                        self._fcf_from_text(text, sym, rec)
                        break

    def _fcf_from_spans(self, spans, pno, H, x0, y1, size):
        spans = sorted(spans, key=lambda s: s["bbox"][0])
        out = {"symbol": None, "tolerance": None, "diameter": False, "modifiers": [], "datums": [], "raw": " ".join(s["text"] for s in spans), "datum_id": None,
               "loc": [round(x0, 2), round(H - y1, 2)], "page": pno}
        for s in spans:
            t = s["text"].strip()
            if "gdt" in (s.get("font", "") or "").lower():
                for ch in t:
                    c = ch.lower()
                    if out["symbol"] is None and c in P.GDT_SYMBOLS: out["symbol"] = P.GDT_SYMBOLS[c]
                    elif c == "n": out["diameter"] = True
                    elif c in ("m", "l", "p", "f", "t"): out["modifiers"].append(P.GDT_MODIFIERS.get(c, c.upper()))
            else:
                if out["tolerance"] is None and re.search(r"\d", t):
                    if "Ø" in t: out["diameter"] = True
                    out["tolerance"] = fnum(t)
                else:
                    for tok in re.split(r"[\s|\-]+", t):
                        if re.fullmatch(r"[A-Z]{1,2}", tok): out["datums"].append(tok)
        if out["symbol"] or out["tolerance"] is not None:
            self.fcfs.append(out)
        elif out["modifiers"]:
            # a modifier glyph plotted as its own text run: keep it as a text cell so the frame merge can pick it up
            self.texts.append({"text": "(" + out["modifiers"][0] + ")", "loc": out["loc"], "h": round(size * 0.72, 2), "kind": "gdt-mod", "rot": 0.0, "page": pno,
                               "bbox": [round(x0, 2), round(H - y1, 2), round(x0 + size, 2), round(H - y1 + size, 2)]})
        elif re.fullmatch(r"[A-Z]", clean_text(out["raw"]).strip() or ""):
            self.datums.append({"id": clean_text(out["raw"]).strip(), "loc": out["loc"], "source": "gdt font", "page": pno})

    def _merge_fcf_cells(self):
        """A plotted FCF is usually several text runs in a row: [symbol][Ø0.25 (M)][A][B]. Pull the runs to the right of the symbol into the frame."""
        consumed = []
        for f in self.fcfs:
            if f.get("tolerance") is not None and f.get("datums"): continue
            y = f["loc"][1]; x = f["loc"][0]
            cands = sorted([t for t in self.texts if t.get("page", 0) == f.get("page", 0) and abs(t["loc"][1] - y) <= max(4.0, t["h"] * 0.8) and t["loc"][0] > x and t["loc"][0] - x < 260],
                           key=lambda t: t["loc"][0])
            lastx = x
            for t in cands:
                if t["loc"][0] - lastx > 60: break
                s = t["text"].strip()
                if f.get("tolerance") is None and re.search(r"\d", s) and len(s) <= 14:
                    f["tolerance"] = fnum(s); f["diameter"] = f["diameter"] or ("Ø" in s)
                    if re.search(r"\(M\)|Ⓜ", s): f["modifiers"].append("M")
                    consumed.append(t); lastx = t["bbox"][2] if t.get("bbox") else t["loc"][0]; continue
                if f.get("tolerance") is not None and re.fullmatch(r"[A-Z]{1,2}(?:-[A-Z])?", s):
                    f["datums"].append(s); consumed.append(t); lastx = t["bbox"][2] if t.get("bbox") else t["loc"][0]; continue
                if s in ("(M)", "(L)", "(P)") and f.get("tolerance") is not None:
                    if s.strip("()") not in f["modifiers"]: f["modifiers"].append(s.strip("()"))
                    consumed.append(t); lastx = t["bbox"][2] if t.get("bbox") else t["loc"][0]; continue
                break
            f["raw"] = (f.get("raw") or "") + " " + " ".join(t["text"] for t in consumed if t in cands)
        if consumed:
            ids = {id(t) for t in consumed}
            self.texts = [t for t in self.texts if id(t) not in ids]
            self.dims = [d for d in self.dims if not any(d.get("loc") == t["loc"] for t in consumed)]

    def _fcf_from_text(self, text, sym, rec):
        rest = text
        for ch in UNICODE_GDT: rest = rest.replace(ch, " ")
        toks = rest.replace("|", " ").split()
        tol = None; datums = []; dia = False; mods = []
        for tok in toks:
            if tol is None and re.search(r"\d", tok):
                tol = fnum(tok); dia = "Ø" in tok
                if re.search(r"[Ⓜ]|\(M\)", tok): mods.append("M")
            elif re.fullmatch(r"[A-Z]{1,2}(?:-[A-Z])?", tok):
                datums.append(tok)
            elif tok in ("Ⓜ", "(M)"): mods.append("M")
        self.fcfs.append({"symbol": sym, "tolerance": tol, "diameter": dia, "modifiers": mods, "datums": datums, "raw": text, "datum_id": None, "loc": rec["loc"], "page": rec["page"]})

    def _maybe_dim(self, rec):
        t = rec["text"].replace("Ø ", "Ø")
        m = DIM_TEXT.match(t)
        if not m: return
        qty, sym, val, pm, tolv, tp, tm, suffix = m.groups()
        value = float(val.replace(",", "."))
        if value == 0: return
        kind = "diameter" if sym == "Ø" else ("radius" if sym == "R" else "linear")
        tol = None
        if pm: tol = {"plus": float(tolv.replace(",", ".")), "minus": float(tolv.replace(",", "."))}
        if tp and tm: tol = {"plus": float(tp.replace(",", ".")), "minus": float(tm.replace(",", "."))}
        # a bare integer like a balloon number or note number is not a dimension
        if kind == "linear" and tol is None and re.fullmatch(r"\d{1,2}", t): return
        self.dims.append({"id": new_id("dim_"), "type": kind, "value": value, "measured": None, "text": rec["text"], "tol": tol, "p1": None, "p2": None,
                          "loc": rec["loc"], "angle": None, "override": False, "page": rec["page"], "qty": int(qty) if qty else None})

    def _page_drawings(self, page, pno, H):
        """Walk every path item. Consecutive connected items form chains; chains are classified as circles, small boxes or leader lines."""
        try:
            paths = page.get_drawings()
        except Exception as e:
            self.warnings.append(f"drawings page {pno+1}: {e}"); return
        def P(q): return (round(q.x, 2), round(H - q.y, 2))
        for pth in paths:
            chains = []; cur = None
            for it in pth.get("items", []):
                k = it[0]
                if k in ("re", "qu"):
                    r = it[1].rect if k == "qu" else it[1]
                    if 2 < r.width < 40 and 2 < r.height < 40:
                        self.rects.append({"bbox": [round(r.x0, 2), round(H - r.y1, 2), round(r.x1, 2), round(H - r.y0, 2)], "page": pno})
                    cur = None; continue
                if k not in ("l", "c"): cur = None; continue
                p1 = P(it[1]); p2 = P(it[-1])
                if cur and cur["kind"] == k and cur["pts"][-1] == p1:
                    cur["pts"].append(p2); cur["n"] += 1
                else:
                    cur = {"kind": k, "pts": [p1, p2], "n": 1}; chains.append(cur)
            for ch in chains:
                pts = ch["pts"]
                # remove a there-and-back closing segment
                if len(pts) > 2 and pts[-1] == pts[0]: pts = pts[:-1]
                xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
                w = max(xs) - min(xs); h = max(ys) - min(ys)
                if ch["kind"] == "c":
                    if 2 <= ch["n"] <= 4 and w > 0.5 and abs(w - h) <= max(0.6, 0.03 * w):
                        self.circles.append({"c": [round(min(xs) + w / 2, 2), round(min(ys) + h / 2, 2)], "r": round(w / 2, 3), "page": pno})
                else:
                    if len(pts) == 4 and 2 < w < 40 and 2 < h < 40:
                        self.rects.append({"bbox": [min(xs), min(ys), max(xs), max(ys)], "page": pno})
                    elif 2 <= len(pts) <= 4:
                        self.leaders.append({"start": list(pts[0]), "end": list(pts[-1])})

    def _infer_units_and_scale(self):
        alltext = " ".join(t["text"].upper() for t in self.texts)
        if re.search(r"\b(MILLIMETERS?|MM)\b", alltext) and not re.search(r"\b(INCHES|INCH)\b", alltext): self.units = "mm"
        elif re.search(r"\b(INCHES|INCH)\b", alltext): self.units = "in"
        # candidate plot scales: title block SCALE plus common ratios; keep the one where hole callouts match drawn circles
        cands = [1.0, 0.5, 2.0, 0.25, 0.2, 0.1, 4.0, 5.0, 10.0]
        for t in self.texts:
            m = re.search(r"SCALE\s*(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)", t["text"].upper())
            if m:
                try: cands.insert(0, float(m.group(1)) / float(m.group(2)))
                except ZeroDivisionError: pass
        pt_to_unit = (25.4 / 72.0) if self.units != "in" else (1.0 / 72.0)
        callout_dias = []
        for t in self.texts:
            for m in P.HOLE_CALLOUT.finditer(t["text"]): callout_dias.append(float(m.group(2)))
            m2 = P.DIA_TEXT.search(t["text"])
            if m2 and not P.HOLE_CALLOUT.search(t["text"]): callout_dias.append(float(m2.group(1)))
        best = None
        for sc in cands:
            hits = 0
            for ci in self.circles:
                d_units = ci["r"] * 2 * pt_to_unit / sc
                if any(abs(d_units - cd) <= max(0.05, cd * 0.02) for cd in callout_dias): hits += 1
            if hits and (best is None or hits > best[0]): best = (hits, sc)
        if best:
            self.scale = best[1]
            f = pt_to_unit / self.scale
            for ci in self.circles:
                ci["r"] = round(ci["r"] * f, 3); ci["c"] = [round(ci["c"][0] * f, 3), round(ci["c"][1] * f, 3)]; ci["scaled"] = True
            # keep text/leader locations in page points; circle association compares locations, so convert circle centers back for matching
            for ci in self.circles:
                ci["c_pt"] = [round(ci["c"][0] / f, 2), round(ci["c"][1] / f, 2)]
        else:
            # geometry cannot be converted to drawing units: keep circles in page points for balloon detection only
            for ci in self.circles:
                ci["unscaled"] = True; ci["c_pt"] = list(ci["c"])

    def _circle_for(self, c):
        # match in page points, report in drawing units; symbol-sized circles (GD&T glyphs, center marks) are never holes
        loc = c["loc"]; h = c.get("h", 6)
        best = None
        min_d = 0.06 if self.units == "in" else 1.6
        for ci in self.circles:
            if not ci.get("unscaled") and ci["r"] * 2 < min_d: continue
            if ci.get("unscaled") and ci["r"] * 2 < 4: continue
            cp = ci.get("c_pt", ci["c"]); dd = dist(loc, cp)
            for L in self.leaders:
                if dist(L["start"], L["end"]) < 10: continue          # symbol strokes and center marks are not leaders
                if dist(L["end"], loc) < h * 6 or dist(L["start"], loc) < h * 6:
                    tip = L["start"] if dist(L["end"], loc) < dist(L["start"], loc) else L["end"]
                    rr = ci["r"] if ci.get("unscaled") else ci["r"] / (25.4/72) * (self.scale or 1)
                    if dist(tip, cp) <= rr * 1.25 + 1.5:                 # tip on the edge or inside the hole
                        return {"c": ci["c"], "r": ci["r"], "via": "leader", "unscaled": bool(ci.get("unscaled"))}
            if dd < h * 14 and (best is None or dd < best[0]): best = (dd, ci)
        if best: return {"c": best[1]["c"], "r": best[1]["r"], "via": "proximity", "unscaled": bool(best[1].get("unscaled"))}
        return None

    def _bbox(self):
        if self.pages:
            W = max(p[0] for p in self.pages); H = max(p[1] for p in self.pages)
            return [0, 0, round(W, 2), round(H, 2)]
        return [0, 0, 0, 0]

def extract(path):
    ex = PdfExtractor(path).collect()
    return ex.interpret()
