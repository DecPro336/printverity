"""Work-instruction callout images: a crop of the marked-up sheet around a finding, annotated. Optionally an AI image provider renders a stylized illustration from the same description."""
from __future__ import annotations
import io, logging, base64, json, urllib.request
from PIL import Image, ImageDraw, ImageFont
from .. import config, render

log = logging.getLogger("printverity.illustrations")
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

def _font(size):
    try: return ImageFont.truetype(FONT, size)
    except Exception: return ImageFont.load_default()

def callout_png(drawing: dict, finding: dict, size: int = 640) -> bytes:
    """Deterministic: render the sheet, crop a window around the finding, draw the caption."""
    ex = drawing["extraction"]
    if drawing["kind"] == "dxf":
        pdf = render.dxf_to_pdf_bytes(drawing["path"], [finding], ex["bbox"], ex.get("space", "model"), ex.get("viewports"))
        import pymupdf
        doc = pymupdf.open("pdf", pdf); page = doc[0]; pix = page.get_pixmap(dpi=200); img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
        # marker position in the rendered page: locate the red marker by color
        cx, cy = _find_marker(img)
    else:
        png, W, H = render.pdf_page_png(drawing["path"], finding.get("page", 0), [finding], dpi=200); img = Image.open(io.BytesIO(png)).convert("RGB")
        cx, cy = _find_marker(img)
    if cx is None: cx, cy = img.width // 2, img.height // 2
    half = min(img.width, img.height) // 5
    box = (max(0, cx - half), max(0, cy - half), min(img.width, cx + half), min(img.height, cy + half))
    crop = img.crop(box).resize((size, size), Image.LANCZOS)
    canvas = Image.new("RGB", (size, size + 90), "white"); canvas.paste(crop, (0, 0))
    d = ImageDraw.Draw(canvas); d.rectangle([0, size, size, size + 90], fill=(19, 41, 75))
    d.text((12, size + 10), f"{finding.get('n', '')}. {finding['title'][:60]}", fill="white", font=_font(18))
    d.text((12, size + 40), _wrap(finding["detail"], 78), fill=(200, 214, 234), font=_font(13))
    out = io.BytesIO(); canvas.save(out, "PNG"); return out.getvalue()

def _find_marker(img: Image.Image):
    small = img.resize((img.width // 4, img.height // 4)); px = small.load(); xs = []; ys = []
    for y in range(small.height):
        for x in range(small.width):
            r, g, b = px[x, y]
            if r > 150 and g < 90 and b < 80: xs.append(x); ys.append(y)
    if not xs: return None, None
    return int(sum(xs) / len(xs)) * 4, int(sum(ys) / len(ys)) * 4

def _wrap(text, n):
    words = text.split(); lines = []; cur = ""
    for w in words:
        if len(cur) + len(w) + 1 > n: lines.append(cur); cur = w
        else: cur = (cur + " " + w).strip()
        if len(lines) == 2: break
    if cur and len(lines) < 3: lines.append(cur)
    return "\n".join(lines)

def ai_illustration(prompt: str) -> bytes | None:
    """Optional stylized illustration from an image generation API (OpenAI Images). Returns PNG bytes or None when not configured."""
    if not config.IMAGE_API_KEY: return None
    body = json.dumps({"model": config.IMAGE_MODEL, "prompt": prompt, "size": "1024x1024", "n": 1}).encode()
    req = urllib.request.Request("https://api.openai.com/v1/images/generations", data=body, headers={"Authorization": f"Bearer {config.IMAGE_API_KEY}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=120) as r:
        data = json.loads(r.read().decode())
    b64 = data["data"][0].get("b64_json")
    return base64.b64decode(b64) if b64 else None
