"""Plot a DXF sheet to a vector PDF with a real text layer, the way a CAD plot does. Used to synthesize the layout-model
training set: each plotted sheet is rasterised and augmented, and the extraction of the same DXF provides the labels."""
import math
from pathlib import Path
import ezdxf, pymupdf
from app.util import clean_text

GDT_FONT = Path(__file__).resolve().parents[3] / "data" / "fonts" / "gdt.ttf"
PT = 72 / 25.4   # points per mm at 1:1

def plot(dxf_path, pdf_path, sheet=(420, 297)):
    doc = ezdxf.readfile(dxf_path); msp = doc.modelspace()
    W, H = sheet[0] * PT, sheet[1] * PT
    pdf = pymupdf.open(); page = pdf.new_page(width=W, height=H)
    def P(x, y): return pymupdf.Point(x * PT, H - y * PT)
    shape = page.new_shape()
    def draw(e, color=(0, 0, 0), width=0.5):
        t = e.dxftype()
        if t == "LINE":
            shape.draw_line(P(e.dxf.start.x, e.dxf.start.y), P(e.dxf.end.x, e.dxf.end.y))
        elif t == "LWPOLYLINE":
            pts = [P(p[0], p[1]) for p in e.get_points("xy")]
            if len(pts) > 1:
                shape.draw_polyline(pts + ([pts[0]] if e.closed else []))
        elif t == "CIRCLE":
            shape.draw_circle(P(e.dxf.center.x, e.dxf.center.y), e.dxf.radius * PT)
        elif t == "ARC":
            c = e.dxf.center; r = e.dxf.radius; a0, a1 = e.dxf.start_angle, e.dxf.end_angle
            if a1 < a0: a1 += 360
            pts = [P(c.x + r * math.cos(math.radians(a)), c.y + r * math.sin(math.radians(a))) for a in [a0 + (a1 - a0) * i / 24 for i in range(25)]]
            shape.draw_polyline(pts)
        elif t == "SOLID":
            pts = [P(v.x, v.y) for v in (e.dxf.vtx0, e.dxf.vtx1, e.dxf.vtx2)]
            shape.draw_polyline(pts + [pts[0]]); shape.finish(color=color, fill=color, width=0); return
        elif t == "TEXT":
            s = clean_text(e.dxf.text); h = e.dxf.height * PT * 1.35
            rot = e.dxf.rotation or 0
            page.insert_text(P(e.dxf.insert.x, e.dxf.insert.y), s, fontsize=h, fontname="helv", rotate=int(round(rot / 90.0)) * 90 % 360, color=(0, 0, 0)); return
        elif t == "MTEXT":
            s = clean_text(e.plain_text()); h = e.dxf.char_height * PT * 1.35
            x, y = e.dxf.insert.x, e.dxf.insert.y
            for i, line in enumerate(s.split("\n")):
                page.insert_text(P(x, y - i * e.dxf.char_height * 1.6 - e.dxf.char_height), line, fontsize=h, fontname="helv", color=(0, 0, 0))
            return
        elif t == "TOLERANCE":
            from app.dxf_extract import parse_tolerance_content
            p = parse_tolerance_content(e.dxf.content); x, y = e.dxf.insert.x, e.dxf.insert.y; hg = 5.0
            sym = {"position": "j", "perpendicularity": "b", "parallelism": "f", "circular runout": "h", "total runout": "t", "flatness": "c"}.get(p.get("symbol"), "j")
            tol = ("Ø" if p.get("diameter") else "") + f"{p['tolerance']:g}"
            cells = [(sym, True), (tol, False)] + [(d, False) for d in p.get("datums", [])] + ([("m", True)] if "M" in p.get("modifiers", []) else [])
            cx = x
            for c, gdt in cells:
                w = hg if gdt else max(hg, hg * 0.6 * len(c) + hg * 0.5)
                shape.draw_rect(pymupdf.Rect(P(cx, y + hg), P(cx + w, y)))
                # gdt-font glyph: emulate an AutoCAD plot by tagging the span with a 'gdt' font name
                if gdt:
                    # like a CAD plot: the glyph is carried in the gdt font (kept invisible here) and the symbol is drawn
                    page.insert_text(P(cx + w * 0.3, y + hg * 0.28), c, fontsize=hg * PT * 0.6, fontname="gdt", fontfile=str(GDT_FONT), color=(0, 0, 0), render_mode=3)
                    ccx, ccy = cx + w / 2, y + hg / 2; a = hg * 0.3
                    sym_shape = page.new_shape()
                    if c == "j":
                        sym_shape.draw_circle(P(ccx, ccy), a * 0.7 * PT); sym_shape.draw_line(P(ccx - a, ccy), P(ccx + a, ccy)); sym_shape.draw_line(P(ccx, ccy - a), P(ccx, ccy + a))
                    elif c == "h":
                        sym_shape.draw_line(P(ccx - a, ccy - a), P(ccx + a, ccy + a)); sym_shape.draw_line(P(ccx + a, ccy + a), P(ccx + a * 0.2, ccy + a)); sym_shape.draw_line(P(ccx + a, ccy + a), P(ccx + a, ccy + a * 0.2))
                    elif c == "m":
                        sym_shape.draw_circle(P(ccx, ccy), a * PT)
                        m = a * 0.55
                        sym_shape.draw_polyline([P(ccx - m, ccy - m), P(ccx - m, ccy + m), P(ccx, ccy), P(ccx + m, ccy + m), P(ccx + m, ccy - m)])
                    sym_shape.finish(color=(0, 0, 0), width=0.6, closePath=False); sym_shape.commit()
                else:
                    page.insert_text(P(cx + hg * 0.25, y + hg * 0.28), c, fontsize=hg * PT * 0.6, fontname="helv", color=(0, 0, 0))
                cx += w
            return
        elif t == "INSERT":
            for v in e.virtual_entities(): draw(v)
            for a in e.attribs:
                s = clean_text(a.dxf.text)
                if s: page.insert_text(P(a.dxf.insert.x, a.dxf.insert.y), s, fontsize=a.dxf.height * PT * 1.35, fontname="helv", color=(0, 0, 0))
            return
        elif t == "DIMENSION":
            for v in e.virtual_entities(): draw(v)
            return
        elif t == "LEADER":
            pts = [P(v[0], v[1]) for v in e.vertices]
            if len(pts) > 1: shape.draw_polyline(pts)
        elif t == "HATCH":
            return
        shape.finish(color=color, width=width, closePath=False)
    for e in msp: draw(e)
    shape.commit()
    pdf.save(pdf_path, garbage=3, deflate=True); pdf.close()
