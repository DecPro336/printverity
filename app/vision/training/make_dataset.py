"""Synthesize a labelled layout dataset from the reference DXF drawings (testdata/reference): plotted sheet images with YOLO boxes for title blocks, dimensions,
FCFs, notes, callouts, parts lists, balloons and datums. Augmented with scale, rotation, noise and blur so the model sees scan-like input."""
from __future__ import annotations
import io, random, sys, math
from pathlib import Path
import pymupdf, yaml
from PIL import Image, ImageFilter, ImageDraw
ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT))
from app import dxf_extract
from app.vision.layout import CLASSES
from app.vision.training.plot_sheet import plot

OUT = ROOT / "data" / "models" / "layout_dataset"
PT = 72 / 25.4

def labels_for(dxf_path, sheet=(420, 297)):
    ex = dxf_extract.extract(str(dxf_path)); W, H = sheet[0] * PT, sheet[1] * PT
    boxes = []
    def box(cls, x0, y0, x1, y1):
        boxes.append((CLASSES.index(cls), x0 * PT, H - y1 * PT, x1 * PT, H - y0 * PT))
    tb = ex["title_block"]["fields"]
    locs = [v["loc"] for v in tb.values() if v.get("loc")]
    if locs:
        xs = [l[0] for l in locs]; ys = [l[1] for l in locs]
        box("title_block", min(xs) - 3, min(ys) - 3, max(xs) + 60, max(ys) + 8)
    for n in ex["notes"]:
        if n.get("loc"): box("note", n["loc"][0] - 1, n["loc"][1] - 1, n["loc"][0] + len(n["full"]) * 1.4, n["loc"][1] + 3)
    for d in ex["dimensions"]:
        if d.get("loc"): box("dimension", d["loc"][0] - len(d["text"]) * 0.9, d["loc"][1] - 2, d["loc"][0] + len(d["text"]) * 0.9, d["loc"][1] + 2)
    for f in ex["fcfs"]:
        if f.get("loc"): box("fcf", f["loc"][0] - 1, f["loc"][1] - 1, f["loc"][0] + 34, f["loc"][1] + 6)
    for c in ex["callouts"]:
        if c.get("loc") and not c["text"][0].isdigit(): box("callout", c["loc"][0] - 1, c["loc"][1] - 1, c["loc"][0] + len(c["text"]) * 1.5, c["loc"][1] + 3.5)
    if ex.get("parts_list"):
        rows = ex["parts_list"]["rows"]; l0 = ex["parts_list"]["loc"]; ymin = min(r["loc"][1] for r in rows) - 3
        box("parts_list", l0[0] - 2, ymin, l0[0] + 172, l0[1] + 5)
    for b in ex.get("balloons", []):
        box("balloon", b["loc"][0] - b["r"] - 1, b["loc"][1] - b["r"] - 1, b["loc"][0] + b["r"] + 1, b["loc"][1] + b["r"] + 1)
    for d in ex.get("datums", []):
        if d.get("loc"): box("datum", d["loc"][0] - 3, d["loc"][1] - 2, d["loc"][0] + 4, d["loc"][1] + 5)
    return boxes, W, H

def render(pdf_path, dpi):
    page = pymupdf.open(pdf_path)[0]; pix = page.get_pixmap(dpi=dpi, alpha=False)
    return Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")

def augment(img, boxes, rng):
    W, H = img.size
    # rotation (small), scale jitter, noise, blur, contrast, gray
    ang = rng.uniform(-1.5, 1.5)
    img = img.rotate(ang, resample=Image.BICUBIC, fillcolor="white")
    a = math.radians(ang); cx, cy = W / 2, H / 2
    def rot(x, y):
        dx, dy = x - cx, y - cy
        return cx + dx * math.cos(a) + dy * math.sin(a), cy - dx * math.sin(a) + dy * math.cos(a)   # PIL rotates counter-clockwise
    nb = []
    for c, x0, y0, x1, y1 in boxes:
        pts = [rot(x0, y0), rot(x1, y0), rot(x0, y1), rot(x1, y1)]
        nb.append((c, min(p[0] for p in pts), min(p[1] for p in pts), max(p[0] for p in pts), max(p[1] for p in pts)))
    if rng.random() < 0.5: img = img.filter(ImageFilter.GaussianBlur(rng.uniform(0.3, 1.1)))
    if rng.random() < 0.6:
        px = img.load()
        for _ in range(int(W * H * 0.002)):
            x, y = rng.randrange(W), rng.randrange(H); v = rng.randrange(60, 200); px[x, y] = (v, v, v)
    if rng.random() < 0.5: img = img.convert("L").convert("RGB")
    if rng.random() < 0.4:
        d = ImageDraw.Draw(img); d.rectangle([0, 0, W, H], outline=(rng.randrange(150, 230),) * 3, width=rng.randrange(2, 12))
    return img, nb

def main(n_per_sheet=40, seed=7):
    rng = random.Random(seed)
    for split in ("train", "val"):
        (OUT / "images" / split).mkdir(parents=True, exist_ok=True); (OUT / "labels" / split).mkdir(parents=True, exist_ok=True)
    sheets = sorted((ROOT / "testdata" / "reference" / "drawings").glob("*.dxf"))
    count = 0
    for dxf in sheets:
        pdf = OUT / f"{dxf.stem}.pdf"; plot(dxf, pdf)
        boxes_pt, W, H = labels_for(dxf)
        for i in range(n_per_sheet):
            dpi = rng.choice([72, 96, 110, 130])
            img = render(pdf, dpi); k = dpi / 72
            boxes = [(c, x0 * k, y0 * k, x1 * k, y1 * k) for c, x0, y0, x1, y1 in boxes_pt]
            img, boxes = augment(img, boxes, rng)
            split = "val" if i % 5 == 0 else "train"; name = f"{dxf.stem}_{i:03d}"
            img.save(OUT / "images" / split / f"{name}.jpg", quality=rng.randrange(60, 95))
            with open(OUT / "labels" / split / f"{name}.txt", "w") as f:
                for c, x0, y0, x1, y1 in boxes:
                    x0, y0, x1, y1 = max(0, x0), max(0, y0), min(img.width, x1), min(img.height, y1)
                    if x1 - x0 < 2 or y1 - y0 < 2: continue
                    f.write(f"{c} {(x0 + x1) / 2 / img.width:.6f} {(y0 + y1) / 2 / img.height:.6f} {(x1 - x0) / img.width:.6f} {(y1 - y0) / img.height:.6f}\n")
            count += 1
    (OUT / "layout.yaml").write_text(yaml.safe_dump({"path": str(OUT), "train": "images/train", "val": "images/val", "names": {i: c for i, c in enumerate(CLASSES)}}))
    print(f"dataset: {count} images, {len(CLASSES)} classes -> {OUT}")

if __name__ == "__main__":
    main()
