"""Layout detection on a drawing image. YOLOv8 model trained on annotated sheets (data/models/layout.pt); a geometric heuristic stands in when no weights exist."""
from __future__ import annotations
import logging
from dataclasses import dataclass
from pathlib import Path
from PIL import Image
from .. import config

log = logging.getLogger("printverity.layout")
CLASSES = ["title_block", "dimension", "fcf", "note", "callout", "parts_list", "balloon", "datum"]

@dataclass
class Region:
    cls: str
    x0: float; y0: float; x1: float; y1: float
    conf: float

class YoloLayoutModel:
    name = "yolov8"
    def __init__(self, weights: Path = config.LAYOUT_MODEL_PATH):
        from ultralytics import YOLO
        if not Path(weights).exists(): raise FileNotFoundError(weights)
        self.model = YOLO(str(weights)); self.weights = str(weights)
        self.names = self.model.names
    def predict(self, img: Image.Image, conf: float = 0.25) -> list[Region]:
        res = self.model.predict(img, imgsz=1024, conf=conf, device="cpu", verbose=False)[0]
        out = []
        for b in res.boxes:
            x0, y0, x1, y1 = b.xyxy[0].tolist()
            out.append(Region(self.names[int(b.cls[0])], x0, y0, x1, y1, float(b.conf[0])))
        return out

class HeuristicLayout:
    """Position-based fallback using OCR lines: title block bottom-right, notes top-left numbered lines, dimension-like strings anywhere."""
    name = "heuristic"
    def predict_from_lines(self, lines, W, H) -> list[Region]:
        import re
        out = []
        tb = [l for l in lines if l.x0 > W * 0.62 and l.y0 > H * 0.72]
        if tb: out.append(Region("title_block", min(l.x0 for l in tb), min(l.y0 for l in tb), max(l.x1 for l in tb), max(l.y1 for l in tb), 0.6))
        for l in lines:
            t = l.text.strip()
            if re.match(r"^\d{1,2}[.)]\s", t) and l.x0 < W * 0.5 and l.y0 < H * 0.45: out.append(Region("note", l.x0, l.y0, l.x1, l.y1, 0.6))
            elif re.match(r"^[ØR]?\s*\d+(\.\d+)?(\s*[±+/-].*)?$", t.replace("O", "Ø") if len(t) < 4 else t): out.append(Region("dimension", l.x0, l.y0, l.x1, l.y1, 0.5))
            elif re.search(r"\d+\s*[xX]\s*Ø|THRU|TAP|SLOT|C'BORE|CSK", t.upper()): out.append(Region("callout", l.x0, l.y0, l.x1, l.y1, 0.55))
        return out

_model = None
def get_layout_model():
    global _model
    if _model is not None: return _model
    try:
        _model = YoloLayoutModel(); log.info("layout model: YOLOv8 (%s)", _model.weights)
    except Exception as e:
        log.info("YOLO layout model unavailable (%s); using heuristic layout", str(e)[:100]); _model = HeuristicLayout()
    return _model
