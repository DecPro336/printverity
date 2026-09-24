"""Sheet-metal checks: bend table vs notes vs formed-view callouts, thickness consistency, hole-to-bend distance, flat-pattern recompute.
They run only when the sheet carries bend information (a bend table, a BEND note or a flat-pattern dimension)."""
from __future__ import annotations
import math, re
from .util import fnum
from . import patterns as P

BEND_HDR = {"BEND": "bend", "ANGLE": "angle", "RADIUS": "radius", "DIR": "dir", "DIRECTION": "dir", "THK": "thk", "K": "k"}

def bend_table(ex: dict):
    """A bend table is a text grid with a BEND / ANGLE / RADIUS header row; rows B1.. and a THK row are read below it."""
    texts = ex.get("texts", []); heads = [(BEND_HDR[P.norm_label(t["text"])], t) for t in texts if P.norm_label(t["text"]) in BEND_HDR]
    row = None
    for f, t in heads:
        same = [(ff, tt) for ff, tt in heads if abs(tt["loc"][1] - t["loc"][1]) <= t["h"] * 0.8]
        if {"bend", "angle", "radius"} <= {ff for ff, _ in same}: row = sorted(same, key=lambda r: r[1]["loc"][0]); break
    if not row: return None
    cols = [(f, t["loc"][0]) for f, t in row]; hy = row[0][1]["loc"][1]; h = row[0][1]["h"]
    cells = [t for t in texts if t["loc"][1] < hy - h * 0.5 and cols[0][1] - h * 2 <= t["loc"][0] <= cols[-1][1] + h * 20]
    rows = {}
    for t in cells: rows.setdefault(round(t["loc"][1] / (h * 1.2)), []).append(t)
    out = {"bends": [], "thk": None, "k": None, "loc": row[0][1]["loc"]}
    for ykey in sorted(rows, reverse=True):
        rec = {}
        for t in rows[ykey]:
            col = None
            for f, x in cols:
                if t["loc"][0] >= x - h * 0.6: col = f
            if col: rec[col] = (rec.get(col, "") + " " + t["text"]).strip()
        key = (rec.get("bend") or "").upper()
        if key.startswith("B") and fnum(rec.get("angle")) is not None:
            out["bends"].append({"id": key, "angle": fnum(rec.get("angle")), "radius": fnum(rec.get("radius")), "dir": rec.get("dir"), "loc": rows[ykey][0]["loc"]})
        elif key == "THK":
            out["thk"] = fnum(rec.get("angle")) if fnum(rec.get("angle")) is not None else fnum(rec.get("radius"))
            m = re.search(r"K\s*(0?\.\d+)", " ".join(rec.values())); out["k"] = float(m.group(1)) if m else None
        elif key == "QTY": continue
        elif out["bends"] and not key: break
    return out if out["bends"] else None

def _note_values(ex):
    """Thickness, bend radius and K-factor as stated in notes and the title block."""
    v = {"thk_note": None, "radius_note": None, "k_note": None, "thk_title": None}
    for n in ex.get("notes", []):
        U = n["text"].upper()
        m = re.search(r"(\d+(?:\.\d+)?)\s*(?:MM\s*)?THK", U)
        if m: v["thk_note"] = (float(m.group(1)), n)
        m = re.search(r"BEND\s+RADIUS\s+(?:R\s*)?(\d+(?:\.\d+)?)", U)
        if m: v["radius_note"] = (float(m.group(1)), n)
        m = re.search(r"K[- ]?FACTOR\s+(0?\.\d+)", U)
        if m: v["k_note"] = (float(m.group(1)), n)
    mat = ((ex.get("title_block", {}).get("fields", {}).get("material") or {}).get("value") or "")
    m = re.search(r"(\d+(?:\.\d+)?)\s*(?:MM\s*)?THK", mat.upper())
    if m: v["thk_title"] = float(m.group(1))
    return v

def _bend_line_for(label, lines):
    """The construction line (CENTER / DASHED) nearest to a BEND label; None when the sheet has no line geometry (PDF path)."""
    best = None
    for l in lines:
        mx, my = (l["a"][0] + l["b"][0]) / 2, (l["a"][1] + l["b"][1]) / 2
        d = math.hypot(mx - label["loc"][0], my - label["loc"][1])
        if best is None or d < best[0]: best = (d, l)
    return best[1] if best and best[0] < 120 else None

def _point_line_distance(p, l):
    (x1, y1), (x2, y2) = l["a"], l["b"]; px, py = p
    dx, dy = x2 - x1, y2 - y1; L2 = dx * dx + dy * dy
    if L2 == 0: return math.hypot(px - x1, py - y1)
    t = max(0.0, min(1.0, ((px - x1) * dx + (py - y1) * dy) / L2))
    return math.hypot(px - (x1 + t * dx), py - (y1 + t * dy))

def is_sheet_metal(ex: dict) -> bool:
    U = " ".join(t["text"].upper() for t in ex.get("texts", []))
    return bool(re.search(r"\bBEND\b|FLAT PATTERN|K-FACTOR|\bTHK\b", U))

def run(ex: dict, fb) -> None:
    if not is_sheet_metal(ex): return
    table = bend_table(ex); notes = _note_values(ex)
    thk = notes["thk_note"][0] if notes["thk_note"] else notes["thk_title"]
    # 1. bend radius: formed-view callout ("R1.5 INSIDE") vs note vs table
    callout_r = None
    for c in ex.get("callouts", []) + [{"text": t["text"], "loc": t["loc"]} for t in ex.get("texts", [])]:
        m = re.search(r"\bR\s*(\d+(?:\.\d+)?)\s*(?:INSIDE|IN\b|I\.?R\.?)", c["text"].upper())
        if m: callout_r = (float(m.group(1)), c); break
    radii = {}
    if callout_r: radii["formed view"] = callout_r[0]
    if notes["radius_note"]: radii["note"] = notes["radius_note"][0]
    if table and table["bends"] and table["bends"][0].get("radius") is not None: radii["bend table"] = table["bends"][0]["radius"]
    if len({round(r, 2) for r in radii.values()}) > 1:
        loc = callout_r[1]["loc"] if callout_r else (table["loc"] if table else None)
        fb.add("critical", "Sheet metal", "Bend radius conflicts: " + " vs ".join(f"R{r:g} ({src})" for src, r in radii.items()),
               "The formed view, the notes and the bend table do not state the same inside bend radius. The flat pattern and the tooling depend on it.", 0.95, loc, "SM-01", radii)
    # 2. thickness: note vs title block vs bend table
    thks = {}
    if notes["thk_note"]: thks["note"] = notes["thk_note"][0]
    if notes["thk_title"] is not None: thks["title block"] = notes["thk_title"]
    if table and table.get("thk") is not None: thks["bend table"] = table["thk"]
    if len({round(t, 2) for t in thks.values()}) > 1:
        fb.add("high", "Sheet metal", "Material thickness differs: " + " vs ".join(f"{t:g} ({src})" for src, t in thks.items()),
               "Thickness is stated more than once on the sheet and the values disagree. Purchasing, bend allowance and the flat pattern all use it.", 0.97, table["loc"] if table else None, "SM-02", thks)
    # 3. hole too close to a bend line: circles near a BEND callout's line
    bend_labels = [t for t in ex.get("texts", []) if re.search(r"\bBEND\s+(UP|DOWN)\b", t["text"].upper())]
    radius = radii.get("bend table") or radii.get("note") or radii.get("formed view")
    if thk and radius is not None and bend_labels and ex.get("circles"):
        min_d = 2.5 * thk + radius
        for bl in bend_labels:
            line = _bend_line_for(bl, ex.get("construction_lines", []))
            if not line: continue
            for ci in ex["circles"]:
                if ci.get("unscaled"): continue
                edge = _point_line_distance(ci["c"], line) - ci["r"]
                if 0 <= edge < min_d:
                    fb.add("high", "Sheet metal", f"Hole Ø{ci['r'] * 2:g} sits {edge:.1f} from the bend line (minimum {min_d:.1f})",
                           f"Rule: 2.5 × thickness + inside radius = 2.5 × {thk:g} + {radius:g} = {min_d:.1f}. Holes closer than that distort during forming; move the hole or add a relief.", 0.9, ci["c"], "SM-03", {"edge": round(edge, 2), "min": round(min_d, 2)})
                    break
    # 4. flat-pattern length recompute: flange lengths + bend allowance vs the FLAT dimension
    flat = next((d for d in ex.get("dimensions", []) if re.search(r"FLAT", d.get("text", "").upper())), None)
    k = (table or {}).get("k") or (notes["k_note"][0] if notes["k_note"] else None)
    angle = table["bends"][0]["angle"] if table and table["bends"] else 90.0
    if flat and thk and radius is not None and k is not None and flat.get("value"):
        flanges = [d for d in ex.get("dimensions", []) if d.get("type") in ("linear", "aligned") and d.get("value") and d is not flat and abs(d["value"] - flat["value"]) > 1
                   and d.get("loc") and flat.get("loc") and abs(d["loc"][1] - flat["loc"][1]) < 25 and 5 < d["value"] < flat["value"]]
        if len(flanges) >= 2:
            fl = sorted(flanges, key=lambda d: -d["value"])[:2]
            ba = math.radians(angle) * (radius + k * thk)
            expected = sum(d["value"] for d in fl) - 2 * (radius + thk) + ba
            if abs(expected - flat["value"]) > 0.3:
                fb.add("medium", "Sheet metal", f"Flat pattern {flat['value']:g} does not recompute ({expected:.1f} expected)",
                       f"Flanges {' + '.join(f'{d['value']:g}' for d in fl)} with R{radius:g}, THK {thk:g}, K {k:g}, {angle:g}°: bend allowance {ba:.2f}, expected flat {expected:.1f}. The drawing shows {flat['value']:g}.",
                       0.86, flat.get("loc"), "SM-04", {"expected": round(expected, 2), "shown": flat["value"]})
