"""Rendering: DXF -> SVG (ezdxf drawing add-on) and PDF -> PNG (PyMuPDF), with numbered finding markers drawn in place."""
import logging
from ezdxf.addons.drawing import Frontend, RenderContext, layout, svg
from ezdxf.addons.drawing import pymupdf as ezpm
from ezdxf.addons.drawing.config import Configuration, BackgroundPolicy, ColorPolicy, LineweightPolicy
from ezdxf.enums import TextEntityAlignment
import pymupdf
from .dxf_extract import load_doc

log = logging.getLogger("printverity.render")
RED = (0.78, 0.2, 0.12)

def _config():
    return Configuration(background_policy=BackgroundPolicy.WHITE, color_policy=ColorPolicy.COLOR, lineweight_policy=LineweightPolicy.RELATIVE, min_lineweight=0.12)

def _layout(doc, space):
    if space and space.startswith("paper:"):
        try: return doc.layouts.get(space.split(":", 1)[1])
        except Exception: pass
    return doc.modelspace()

def _to_paper(loc, viewports):
    """Map a model-space point into paper space through the layout's (largest) viewport."""
    if not viewports: return None
    vp = max(viewports, key=lambda v: v["width"] * v["height"])
    if not vp.get("view_height"): return None
    k = vp["height"] / vp["view_height"]
    return [vp["center"][0] + (loc[0] - vp["view_center"][0]) * k, vp["center"][1] + (loc[1] - vp["view_center"][1]) * k]

def _inject_markers(doc, findings, bbox, space="model", viewports=None):
    msp = _layout(doc, space)
    if "PV_MARKERS" not in doc.layers:
        doc.layers.add("PV_MARKERS", color=1)
    w = max(bbox[2] - bbox[0], 1); h = max(bbox[3] - bbox[1], 1)
    r = max(w, h) * 0.011
    for f in findings:
        if not f.get("loc") or f.get("status") == "rejected": continue
        loc = list(f["loc"]); sp = loc[2] if len(loc) > 2 else "model"
        if space != "model" and sp == "model":
            loc = _to_paper(loc, viewports or [])
            if not loc: continue
        elif space == "model" and sp != "model":
            continue
        x, y = loc[0], loc[1]; cx, cy = x - r * 1.4, y + r * 0.9
        cx = min(max(cx, bbox[0] + r * 1.1), bbox[2] - r * 1.1); cy = min(max(cy, bbox[1] + r * 1.1), bbox[3] - r * 1.1)
        hatch = msp.add_hatch(color=1, dxfattribs={"layer": "PV_MARKERS"})
        hatch.rgb = (200, 50, 30)
        hatch.paths.add_edge_path().add_arc((cx, cy), r, 0, 360)
        c = msp.add_circle((cx, cy), r, dxfattribs={"layer": "PV_MARKERS"}); c.rgb = (200, 50, 30)
        t = msp.add_text(str(f.get("n", "")), dxfattribs={"height": r * 1.15, "layer": "PV_MARKERS"})
        t.rgb = (255, 255, 255)
        t.set_placement((cx, cy), align=TextEntityAlignment.MIDDLE_CENTER)
        # dashed ring around the item itself
        ring = msp.add_circle((x + r * 1.2, y + r * 0.5), r * 1.9, dxfattribs={"layer": "PV_MARKERS", "linetype": "DASHED" if "DASHED" in doc.linetypes else "BYLAYER"})
        ring.rgb = (200, 50, 30)
    return doc

def _draw_fcfs(doc, space="model"):
    """ezdxf does not draw TOLERANCE entities; draw an equivalent boxed frame so the feature control frame is visible."""
    from .dxf_extract import parse_tolerance_content
    msp = _layout(doc, space)
    for e in list(msp.query("TOLERANCE")):
        try:
            p = parse_tolerance_content(e.dxf.content)
            x, y = e.dxf.insert.x, e.dxf.insert.y
            hgt = 5.0
            try:
                st = doc.dimstyles.get(e.dxf.dimstyle); hgt = float(st.dxf.dimtxt) * 2 if st and st.dxf.dimtxt else 5.0
            except Exception: pass
            cells = []
            if p.get("datum_id"):
                cells = [p["datum_id"]]
            else:
                sym = {"position": "⌖", "perpendicularity": "⟂", "parallelism": "∥", "flatness": "⏥", "circular runout": "↗", "total runout": "⌰",
                       "concentricity": "◎", "symmetry": "⌯", "profile of a surface": "⌓", "profile of a line": "⌒", "circularity": "○", "cylindricity": "⌭",
                       "angularity": "∠", "straightness": "⏤"}.get(p.get("symbol"), "?")
                tol = ("Ø" if p.get("diameter") else "") + (f"{p['tolerance']:g}" if p.get("tolerance") is not None else "") + ("".join(f" ({m})" for m in p.get("modifiers", [])))
                cells = [sym, tol] + p.get("datums", [])
            cx = x
            for i, c in enumerate(cells):
                w = max(hgt, hgt * 0.62 * len(c) + hgt * 0.6)
                if i == 0 and not p.get("datum_id"):
                    w = hgt
                msp.add_lwpolyline([(cx, y), (cx + w, y), (cx + w, y + hgt), (cx, y + hgt)], close=True, dxfattribs={"layer": e.dxf.layer, "color": 256})
                if i == 0 and not p.get("datum_id"):
                    _draw_symbol(msp, p.get("symbol"), cx + w / 2, y + hgt / 2, hgt, e.dxf.layer)
                else:
                    t = msp.add_text(c, dxfattribs={"height": hgt * 0.55, "layer": e.dxf.layer, "color": 256})
                    t.set_placement((cx + w / 2, y + hgt / 2), align=TextEntityAlignment.MIDDLE_CENTER)
                cx += w
            if not p.get("datum_id"):
                msp.add_lwpolyline([(x, y), (cx, y), (cx, y + hgt), (x, y + hgt)], close=True, dxfattribs={"layer": e.dxf.layer, "color": 256, "lineweight": 35})
        except Exception as ex:
            log.warning("fcf draw: %s", ex)

def _draw_symbol(msp, sym, cx, cy, hgt, layer):
    """Draw the geometric characteristic symbol with plain geometry (fonts rarely carry these glyphs)."""
    a = hgt * 0.32; d = {"layer": layer, "color": 256}
    L = lambda p, q: msp.add_line(p, q, dxfattribs=d)
    if sym == "position":
        msp.add_circle((cx, cy), a * 0.7, dxfattribs=d); L((cx - a, cy), (cx + a, cy)); L((cx, cy - a), (cx, cy + a))
    elif sym == "perpendicularity":
        L((cx - a, cy - a), (cx + a, cy - a)); L((cx, cy - a), (cx, cy + a))
    elif sym == "parallelism":
        L((cx - a * 0.5, cy - a), (cx + a * 0.1, cy + a)); L((cx + a * 0.2, cy - a), (cx + a * 0.8, cy + a))
    elif sym == "flatness":
        msp.add_lwpolyline([(cx - a, cy - a * 0.5), (cx + a * 0.4, cy - a * 0.5), (cx + a, cy + a * 0.5), (cx - a * 0.4, cy + a * 0.5)], close=True, dxfattribs=d)
    elif sym in ("circular runout", "total runout"):
        L((cx - a, cy - a), (cx + a, cy + a)); L((cx + a, cy + a), (cx + a * 0.2, cy + a)); L((cx + a, cy + a), (cx + a, cy + a * 0.2))
        if sym == "total runout": L((cx - a, cy - a), (cx - a, cy + a)); L((cx + a, cy - a), (cx + a, cy + a))
    elif sym == "circularity":
        msp.add_circle((cx, cy), a * 0.8, dxfattribs=d)
    elif sym == "concentricity":
        msp.add_circle((cx, cy), a * 0.8, dxfattribs=d); msp.add_circle((cx, cy), a * 0.4, dxfattribs=d)
    elif sym == "cylindricity":
        msp.add_circle((cx, cy), a * 0.7, dxfattribs=d); L((cx - a, cy - a), (cx - a * 0.6, cy + a)); L((cx + a * 0.6, cy - a), (cx + a, cy + a))
    elif sym == "profile of a surface":
        msp.add_arc((cx, cy - a * 0.3), a * 0.9, 0, 180, dxfattribs=d); L((cx - a * 0.9, cy - a * 0.3), (cx + a * 0.9, cy - a * 0.3))
    elif sym == "profile of a line":
        msp.add_arc((cx, cy - a * 0.3), a * 0.9, 0, 180, dxfattribs=d)
    elif sym == "angularity":
        L((cx - a, cy - a), (cx + a, cy - a)); L((cx - a, cy - a), (cx + a * 0.6, cy + a))
    elif sym == "symmetry":
        L((cx - a, cy), (cx + a, cy)); L((cx - a * 0.6, cy + a * 0.6), (cx + a * 0.6, cy + a * 0.6)); L((cx - a * 0.6, cy - a * 0.6), (cx + a * 0.6, cy - a * 0.6))
    elif sym == "straightness":
        L((cx - a, cy), (cx + a, cy))
    else:
        t = msp.add_text("?", dxfattribs={"height": hgt * 0.5, "layer": layer, "color": 256}); t.set_placement((cx, cy), align=TextEntityAlignment.MIDDLE_CENTER)

def dxf_to_svg(path, findings, bbox, space="model", viewports=None):
    doc = load_doc(path)
    _draw_fcfs(doc, "model"); 
    if space != "model": _draw_fcfs(doc, space)
    _inject_markers(doc, findings, bbox, space, viewports)
    ctx = RenderContext(doc)
    backend = svg.SVGBackend()
    Frontend(ctx, backend, config=_config()).draw_layout(_layout(doc, space))
    page = layout.Page(0, 0, layout.Units.mm, margins=layout.Margins.all(4))
    return backend.get_string(page, settings=layout.Settings(fit_page=True))

def dxf_to_pdf_bytes(path, findings, bbox, space="model", viewports=None):
    doc = load_doc(path)
    _draw_fcfs(doc, "model")
    if space != "model": _draw_fcfs(doc, space)
    _inject_markers(doc, findings, bbox, space, viewports)
    ctx = RenderContext(doc)
    backend = ezpm.PyMuPdfBackend()
    Frontend(ctx, backend, config=_config()).draw_layout(_layout(doc, space))
    page = layout.Page(420, 297, layout.Units.mm, margins=layout.Margins.all(6))
    return backend.get_pdf_bytes(page, settings=layout.Settings(fit_page=True))

def _pdf_marker(page, x, y_up, n, H, r):
    y = H - y_up
    cx, cy = x - r * 1.4, y - r * 0.9
    sh = page.new_shape()
    sh.draw_circle((cx, cy), r); sh.finish(color=RED, fill=RED, width=0)
    sh.draw_circle((x + r * 1.2, y - r * 0.5), r * 1.9); sh.finish(color=RED, width=0.9, dashes="[2 1.5] 0")
    sh.commit()
    fs = r * 1.3
    tw = pymupdf.get_text_length(str(n), fontname="helv", fontsize=fs)
    page.insert_text((cx - tw / 2, cy + fs * 0.36), str(n), fontsize=fs, fontname="helv", color=(1, 1, 1))

def pdf_page_png(path, page_index, findings, dpi=150):
    doc = pymupdf.open(path)
    page = doc[page_index]
    H = page.rect.height; r = max(page.rect.width, H) * 0.011
    for f in findings:
        if not f.get("loc") or f.get("status") == "rejected" or f.get("page", 0) != page_index: continue
        _pdf_marker(page, f["loc"][0], f["loc"][1], f.get("n", ""), H, r)
    pix = page.get_pixmap(dpi=dpi, alpha=False)
    return pix.tobytes("png"), page.rect.width, H

def findings_summary_page(doc, title, findings):
    page = doc.new_page(width=595, height=842)
    y = 50
    page.insert_text((40, y), "PrintVerity review findings", fontsize=16, fontname="hebo"); y += 22
    page.insert_text((40, y), title, fontsize=10, fontname="helv", color=(0.35, 0.4, 0.45)); y += 26
    for f in findings:
        if f.get("status") == "rejected": continue
        line = f"{f.get('n', '')}. [{f['severity'].upper()}] {f['title']}  (conf {f['confidence']:.2f})"
        page.insert_text((40, y), line[:110], fontsize=9.5, fontname="hebo"); y += 13
        words = f.get("detail", "").split(); line = ""
        for w in words:
            if len(line) + len(w) + 1 > 105:
                page.insert_text((52, y), line, fontsize=8.5, fontname="helv", color=(0.2, 0.2, 0.2)); y += 11; line = ""
            line = (line + " " + w).strip()
        if line:
            page.insert_text((52, y), line, fontsize=8.5, fontname="helv", color=(0.2, 0.2, 0.2)); y += 11
        status = f.get("status", "open")
        page.insert_text((52, y), f"status: {status}" + (f"  note: {f['note']}" if f.get("note") else ""), fontsize=8, fontname="helv", color=(0.35, 0.4, 0.45)); y += 16
        if y > 790:
            page = doc.new_page(width=595, height=842); y = 50
    return doc

def markup_pdf(drawing, findings):
    """Return bytes of a marked-up PDF: the sheet with markers plus a findings summary page."""
    kind = drawing["kind"]; path = drawing["path"]
    if kind == "dxf":
        data = dxf_to_pdf_bytes(path, findings, drawing["extraction"]["bbox"], drawing["extraction"].get("space", "model"), drawing["extraction"].get("viewports"))
        doc = pymupdf.open("pdf", data)
    else:
        doc = pymupdf.open(path)
        for pi, page in enumerate(doc):
            H = page.rect.height; r = max(page.rect.width, H) * 0.011
            for f in findings:
                if not f.get("loc") or f.get("status") == "rejected" or f.get("page", 0) != pi: continue
                _pdf_marker(page, f["loc"][0], f["loc"][1], f.get("n", ""), H, r)
    title = f"{drawing.get('part_no') or drawing['file']} Rev {drawing.get('rev') or '-'}  ·  {drawing['file']}"
    findings_summary_page(doc, title, findings)
    out = doc.tobytes(garbage=3, deflate=True)
    doc.close()
    return out
