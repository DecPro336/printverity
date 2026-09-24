"""Train the YOLOv8 layout model on the synthesized dataset (CPU is enough for this size).  .venv/bin/python -m app.vision.training.train --epochs 25"""
from __future__ import annotations
import argparse, shutil, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[3]

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--epochs", type=int, default=25); ap.add_argument("--imgsz", type=int, default=1024); ap.add_argument("--model", default="yolov8n.pt")
    a = ap.parse_args()
    from ultralytics import YOLO
    data = ROOT / "data" / "models" / "layout_dataset" / "layout.yaml"
    if not data.exists():
        print("dataset missing; run app.vision.training.make_dataset first"); sys.exit(1)
    model = YOLO(a.model)
    res = model.train(data=str(data), epochs=a.epochs, imgsz=a.imgsz, batch=8, device="cpu", workers=2, project=str(ROOT / "data" / "models" / "runs"), name="layout", exist_ok=True, verbose=False, plots=False)
    best = Path(res.save_dir) / "weights" / "best.pt"
    dst = ROOT / "data" / "models" / "layout.pt"; shutil.copyfile(best, dst)
    print("layout model saved to", dst)

if __name__ == "__main__":
    main()
