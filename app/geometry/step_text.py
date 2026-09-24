"""Dependency-free STEP (ISO 10303-21) feature reader, the fallback when OpenCascade is not importable: cylindrical surfaces (holes, bores, bosses), part name, units and extents.
No CAD kernel required. Good enough to cross-check hole sizes and counts against the drawing."""
import re
from collections import Counter, defaultdict

CYL = re.compile(r"#(\d+)\s*=\s*CYLINDRICAL_SURFACE\s*\(\s*'[^']*'\s*,\s*#(\d+)\s*,\s*([-+0-9.Ee]+)\s*\)", re.I)
FACE = re.compile(r"#(\d+)\s*=\s*ADVANCED_FACE\s*\(\s*'[^']*'\s*,\s*\(([^)]*)\)\s*,\s*#(\d+)\s*,\s*\.(T|F)\.\s*\)", re.I)
PT = re.compile(r"#(\d+)\s*=\s*CARTESIAN_POINT\s*\(\s*'[^']*'\s*,\s*\(\s*([-+0-9.Ee]+)\s*,\s*([-+0-9.Ee]+)(?:\s*,\s*([-+0-9.Ee]+))?\s*\)\s*\)", re.I)
PRODUCT = re.compile(r"PRODUCT\s*\(\s*'([^']*)'\s*,\s*'([^']*)'", re.I)
UNIT = re.compile(r"SI_UNIT\s*\(\s*(\.MILLI\.|\$)?\s*,\s*\.METRE\.\s*\)|CONVERSION_BASED_UNIT\s*\(\s*'([^']*)'", re.I)
TORUS = re.compile(r"TOROIDAL_SURFACE\s*\(\s*'[^']*'\s*,\s*#\d+\s*,\s*([-+0-9.Ee]+)\s*,\s*([-+0-9.Ee]+)", re.I)

def parse(path):
    with open(path, "r", encoding="utf-8", errors="ignore") as fh:
        txt = fh.read()
    if "ISO-10303-21" not in txt[:200].upper():
        raise ValueError("Not a STEP (ISO-10303-21) file")
    unit = "mm"; factor = 1.0
    m = UNIT.search(txt)
    if m:
        if m.group(2) and "INCH" in m.group(2).upper(): unit = "in"; factor = 25.4
        elif m.group(1) is None and m.group(2) is None: unit = "m"; factor = 1000.0
    cyl = {}
    for m in CYL.finditer(txt):
        cyl[m.group(1)] = float(m.group(3)) * factor
    face_of_surface = Counter()
    for m in FACE.finditer(txt):
        sid = m.group(3)
        if sid in cyl: face_of_surface[sid] += 1
    groups = defaultdict(lambda: {"faces": 0, "surfaces": 0})
    for sid, r in cyl.items():
        d = round(r * 2, 2)
        groups[d]["surfaces"] += 1
        groups[d]["faces"] += face_of_surface.get(sid, 1) if face_of_surface else 1
    cylinders = [{"diameter": d, "radius": round(d / 2, 3), "surfaces": g["surfaces"], "faces": g["faces"]} for d, g in sorted(groups.items())]
    xs, ys, zs = [], [], []
    for m in PT.finditer(txt):
        xs.append(float(m.group(2)) * factor); ys.append(float(m.group(3)) * factor)
        if m.group(4) is not None: zs.append(float(m.group(4)) * factor)
    extents = None
    if xs and ys:
        extents = {"x": round(max(xs) - min(xs), 3), "y": round(max(ys) - min(ys), 3), "z": round(max(zs) - min(zs), 3) if zs else None}
    pm = PRODUCT.search(txt)
    tori = [round(float(m.group(1)) * factor, 2) for m in TORUS.finditer(txt)]
    return {"file": path, "product": pm.group(1) if pm else None, "units": unit, "cylinders": cylinders, "cylinder_count": len(cyl), "extents": extents,
            "points": len(xs), "tori": len(tori), "schema": (re.search(r"FILE_SCHEMA\s*\(\s*\(\s*'([^']*)'", txt) or [None, None])[1] if re.search(r"FILE_SCHEMA", txt) else None}

def cross_check(step, ex):
    """Compare drawing hole callouts / diameter dimensions with cylinders in the model."""
    from .. import patterns as P
    rows = []; conflicts = 0; matches = 0
    cyls = step.get("cylinders", [])
    def count_for(d):
        return sum(c["surfaces"] for c in cyls if abs(c["diameter"] - d) <= max(0.03, d * 0.004))
    def nearest(d):
        best = None
        for c in cyls:
            dd = abs(c["diameter"] - d)
            if best is None or dd < best[0]: best = (dd, c)
        return best[1] if best else None
    seen = set()
    for c in ex.get("callouts", []):
        m = P.HOLE_CALLOUT.search(c["text"])
        if not m: continue
        n = int(m.group(1)); d = float(m.group(2)); key = (n, d)
        if key in seen: continue
        seen.add(key)
        found = count_for(d)
        if found >= n:
            rows.append({"feature": c["text"], "drawing": f"{n}X Ø{d:g}", "model": f"{found} cylindrical face{'s' if found != 1 else ''} Ø{d:g}", "status": "match"}); matches += 1
        elif found > 0:
            near = nearest(d)
            others = [x for x in cyls if abs(x["diameter"] - d) > 0.03 and abs(x["diameter"] - d) < 1.0]
            desc = f"{found} at Ø{d:g}" + (", " + ", ".join(f"{o['surfaces']} at Ø{o['diameter']:g}" for o in others) if others else "")
            rows.append({"feature": c["text"], "drawing": f"{n}X Ø{d:g}", "model": desc, "status": "size", "detail": f"Drawing calls {n} holes at Ø{d:g}; the model has {found}. Nearby sizes: {', '.join(f'Ø{o['diameter']:g}' for o in others) or 'none'}."}); conflicts += 1
        else:
            near = nearest(d)
            rows.append({"feature": c["text"], "drawing": f"{n}X Ø{d:g}", "model": "not in model" if not near else f"nearest Ø{near['diameter']:g}", "status": "missing",
                         "detail": f"No cylindrical face of Ø{d:g} in the STEP model."}); conflicts += 1
    for dm in ex.get("dimensions", []):
        if dm.get("type") == "diameter" and dm.get("value"):
            d = dm["value"]
            if any(abs(d - k[1]) < 0.03 for k in seen): continue
            found = count_for(d)
            if found:
                rows.append({"feature": dm["text"], "drawing": f"Ø{d:g}", "model": f"{found} face{'s' if found != 1 else ''} Ø{d:g}", "status": "match"}); matches += 1
            else:
                near = nearest(d)
                rows.append({"feature": dm["text"], "drawing": f"Ø{d:g}", "model": "not in model" if not near else f"nearest Ø{near['diameter']:g}", "status": "missing", "detail": f"No Ø{d:g} cylinder in the model."}); conflicts += 1
    # model features not on the drawing
    drawn = [k[1] for k in seen] + [dm["value"] for dm in ex.get("dimensions", []) if dm.get("type") == "diameter" and dm.get("value")]
    for c in cyls:
        if not any(abs(c["diameter"] - d) <= max(0.03, d * 0.004) for d in drawn):
            rows.append({"feature": f"Ø{c['diameter']:g} cylinder ({c['surfaces']}x)", "drawing": "not called out", "model": f"{c['surfaces']} face{'s' if c['surfaces'] != 1 else ''}", "status": "info",
                         "detail": "Cylindrical feature in the model with no matching callout or diameter dimension on this sheet (may be a slot end, fillet or on another sheet)."})
    ext = step.get("extents")
    if ext:
        rows.append({"feature": "Overall extents", "drawing": "see dims", "model": f"{ext['x']:g} x {ext['y']:g}" + (f" x {ext['z']:g}" if ext.get("z") is not None else ""), "status": "info"})
    return {"rows": rows, "matches": matches, "conflicts": conflicts, "model": {"product": step.get("product"), "units": step.get("units"), "cylinders": cyls, "extents": ext}}
