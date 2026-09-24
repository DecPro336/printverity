"""Software-rendered preview of the tessellated model (no GPU, no WebGL): isometric projection, painter's-algorithm depth sort,
flat shading, face colours by status. Serves browsers that cannot create a WebGL context."""
from __future__ import annotations
import io, math
from PIL import Image, ImageDraw, ImageFont

STATUS_RGB = {"match": (107, 127, 153), "conflict": (200, 50, 30), "info": (217, 154, 43), "neutral": (201, 210, 220)}
VIEWS = {"iso": (-1.1, -1.4, 1.0), "top": (0.0, -0.001, 1.0), "front": (0.0, -1.0, 0.0), "side": (1.0, 0.0, 0.0)}
EDGE = (60, 70, 85)
# background, caption bar, caption text
PALETTE = {False: ((250, 251, 252), (244, 246, 249), (91, 102, 115)), True: ((26, 36, 48), (19, 28, 39), (152, 164, 179))}

def _basis(direction):
    """Right / up / forward unit vectors for a camera placed along `direction` looking at the origin, Z up."""
    dx, dy, dz = direction; n = math.sqrt(dx * dx + dy * dy + dz * dz); f = (dx / n, dy / n, dz / n)
    up = (0.0, 0.0, 1.0)
    r = (f[1] * up[2] - f[2] * up[1], f[2] * up[0] - f[0] * up[2], f[0] * up[1] - f[1] * up[0])
    rn = math.sqrt(sum(c * c for c in r)) or 1.0; r = tuple(c / rn for c in r)
    u = (r[1] * f[2] - r[2] * f[1], r[2] * f[0] - r[0] * f[2], r[0] * f[1] - r[1] * f[0])
    return r, u, f

def render(mesh: dict, faces_status: list[dict], view: str = "iso", width: int = 900, height: int = 560, caption: str = "", dark: bool = False) -> bytes:
    bg, bar, fg = PALETTE[bool(dark)]
    verts = mesh["vertices"]; right, up, fwd = _basis(VIEWS.get(view, VIEWS["iso"]))
    proj = [(v[0] * right[0] + v[1] * right[1] + v[2] * right[2], v[0] * up[0] + v[1] * up[1] + v[2] * up[2], v[0] * fwd[0] + v[1] * fwd[1] + v[2] * fwd[2]) for v in verts]
    if not proj: return _blank(width, height, "empty model", dark)
    xs = [p[0] for p in proj]; ys = [p[1] for p in proj]
    pad = 40; s = min((width - 2 * pad) / max(1e-6, max(xs) - min(xs)), (height - 2 * pad - 30) / max(1e-6, max(ys) - min(ys)))
    ox = (width - (max(xs) + min(xs)) * s) / 2; oy = (height - 30 + (max(ys) + min(ys)) * s) / 2
    def P(i): return (proj[i][0] * s + ox, oy - proj[i][1] * s)
    light = (0.35, -0.5, 0.8); ln = math.sqrt(sum(c * c for c in light)); light = tuple(c / ln for c in light)
    # feature edges: an edge used by exactly one triangle lies on a B-rep face boundary (vertices are not shared across faces)
    edge_count: dict[tuple[int, int], int] = {}
    for f in faces_status:
        for a, b, c in f["tris"]:
            for e in ((a, b), (b, c), (c, a)):
                k = (min(e), max(e)); edge_count[k] = edge_count.get(k, 0) + 1
    tris = []
    for f in faces_status:
        base = STATUS_RGB.get(f["status"], STATUS_RGB["neutral"])
        for a, b, c in f["tris"]:
            va, vb, vc = verts[a], verts[b], verts[c]
            e1 = (vb[0] - va[0], vb[1] - va[1], vb[2] - va[2]); e2 = (vc[0] - va[0], vc[1] - va[1], vc[2] - va[2])
            nx, ny, nz = e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]
            nn = math.sqrt(nx * nx + ny * ny + nz * nz) or 1.0; nx, ny, nz = nx / nn, ny / nn, nz / nn
            if nx * fwd[0] + ny * fwd[1] + nz * fwd[2] < 0: continue                     # back face
            shade = 0.55 + 0.45 * max(0.0, nx * light[0] + ny * light[1] + nz * light[2])
            depth = (proj[a][2] + proj[b][2] + proj[c][2]) / 3
            tris.append((depth, (a, b, c), tuple(int(min(255, ch * shade)) for ch in base)))
    tris.sort(key=lambda t: t[0])
    img = Image.new("RGB", (width, height), bg); d = ImageDraw.Draw(img)
    # painter's order: fill each triangle, then draw its feature edges, so nearer faces cover edges that lie behind them
    for _, (a, b, c), col in tris:
        d.polygon([P(a), P(b), P(c)], fill=col)
        for e in ((a, b), (b, c), (c, a)):
            if edge_count.get((min(e), max(e))) == 1: d.line([P(e[0]), P(e[1])], fill=EDGE, width=1)
    try: font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 12)
    except Exception: font = ImageFont.load_default()
    d.rectangle([0, height - 28, width, height], fill=bar)
    d.text((10, height - 21), caption or f"software preview · {view} view · {len(tris)} faces", fill=fg, font=font)
    out = io.BytesIO(); img.save(out, "PNG"); return out.getvalue()

def _blank(w, h, text, dark=False):
    bg, _, fg = PALETTE[bool(dark)]
    img = Image.new("RGB", (w, h), bg); ImageDraw.Draw(img).text((20, 20), text, fill=fg)
    out = io.BytesIO(); img.save(out, "PNG"); return out.getvalue()
