"""OCR engines behind one interface: words with boxes and confidence, grouped into lines."""
from __future__ import annotations
import logging, shutil
from dataclasses import dataclass
from PIL import Image
from .. import config

log = logging.getLogger("printverity.ocr")

@dataclass
class Word:
    text: str
    x0: float; y0: float; x1: float; y1: float     # image pixels, y down
    conf: float

@dataclass
class Line:
    text: str
    x0: float; y0: float; x1: float; y1: float
    conf: float
    words: list[Word]

class TesseractOCR:
    name = "tesseract"
    def __init__(self, lang: str = config.OCR_LANG):
        import pytesseract
        self.pt = pytesseract; self.lang = lang
        if not shutil.which("tesseract"): raise RuntimeError("tesseract binary not found")
    def lines(self, img: Image.Image, psm: int = 11) -> list[Line]:
        """psm 11 = sparse text, the right mode for drawings where text is scattered."""
        data = self.pt.image_to_data(img, lang=self.lang, config=f"--psm {psm}", output_type=self.pt.Output.DICT)
        groups: dict[tuple, list[Word]] = {}
        for i, txt in enumerate(data["text"]):
            t = (txt or "").strip()
            if not t: continue
            try: conf = float(data["conf"][i])
            except (TypeError, ValueError): conf = -1
            if conf < 0: continue
            w = Word(t, data["left"][i], data["top"][i], data["left"][i] + data["width"][i], data["top"][i] + data["height"][i], conf / 100.0)
            groups.setdefault((data["block_num"][i], data["par_num"][i], data["line_num"][i]), []).append(w)
        out = []
        for ws in groups.values():
            ws.sort(key=lambda w: w.x0)
            out.append(Line(" ".join(w.text for w in ws), min(w.x0 for w in ws), min(w.y0 for w in ws), max(w.x1 for w in ws), max(w.y1 for w in ws), sum(w.conf for w in ws) / len(ws), ws))
        return out

class PaddleOCREngine:
    name = "paddle"
    def __init__(self, lang: str = "en"):
        from paddleocr import PaddleOCR
        self.ocr = PaddleOCR(lang=lang, use_textline_orientation=True)
    def lines(self, img: Image.Image, psm: int = 0) -> list[Line]:
        import numpy as np
        res = self.ocr.predict(np.array(img.convert("RGB")))
        out = []
        for page in res:
            for poly, txt, score in zip(page.get("dt_polys", []), page.get("rec_texts", []), page.get("rec_scores", [])):
                xs = [p[0] for p in poly]; ys = [p[1] for p in poly]
                out.append(Line(txt, min(xs), min(ys), max(xs), max(ys), float(score), []))
        return out

_engine = None
def get_ocr():
    global _engine
    if _engine: return _engine
    order = {"tesseract": ["tesseract"], "paddle": ["paddle"]}.get(config.OCR_ENGINE, ["paddle", "tesseract"])
    for name in order:
        try:
            _engine = PaddleOCREngine() if name == "paddle" else TesseractOCR(); break
        except Exception as e:
            log.info("OCR engine %s unavailable: %s", name, str(e)[:100])
    if _engine is None: raise RuntimeError("No OCR engine available (install tesseract-ocr or paddlepaddle)")
    log.info("OCR engine: %s", _engine.name)
    return _engine
