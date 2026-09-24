"""Native DXF extraction with ezdxf: entity-level data, no pixel guessing."""
import math, re, logging
import ezdxf
from ezdxf import recover, bbox as ezbbox
from .util import clean_text, fnum, dist, new_id
from . import patterns as P

log = logging.getLogger("printverity.dxf")

UNIT_NAMES = {0: "unknown", 1: "in", 2: "ft", 4: "mm", 5: "cm", 6: "m"}

def load_doc(path):
    try:
        return ezdxf.readfile(path)
    except Exception as e:
        log.warning("readfile failed (%s), trying recover", e)
        doc, auditor = recover.readfile(path)
        return doc

def _pt(v):
    try:
        return [round(float(v[0]), 4), round(float(v[1]), 4)]
    except Exception:
        return [0.0, 0.0]

def _fmt(value, dec):
    s = f"{value:.{dec}f}"
    if "." in s:
        s = s.rstrip("0").rstrip(".") if dec > 0 else s
        if s in ("", "-"): s = "0"
    return s

def parse_tolerance_content(content):
    """Parse an AutoCAD TOLERANCE (feature control frame) content string."""
    raw = content or ""
    first = raw.split("^J")[0]
    segs = first.split("%%v")
    out = {"symbol": None, "tolerance": None, "diameter": False, "modifiers": [], "datums": [], "raw": raw, "datum_id": None}
    def strip_codes(s):
        return re.sub(r"\{\\F[^;]*;([^}]*)\}", lambda m: "", s)
    def codes(s):
        return [c for c in re.findall(r"\{\\Fgdt;([a-z])\}", s, re.I)]
    if not segs:
        return out
    # segment 0: symbol
    c0 = codes(segs[0])
    if c0 and c0[0].lower() in P.GDT_SYMBOLS:
        out["symbol"] = P.GDT_SYMBOLS[c0[0].lower()]
        rest = segs[1:]
    else:
        rest = segs
    if rest:
        tol_seg = rest[0]
        tc = [c.lower() for c in codes(tol_seg)]
        if "n" in tc or "%%c" in tol_seg.lower(): out["diameter"] = True
        out["modifiers"] = [P.GDT_MODIFIERS[c] for c in tc if c in ("m", "l", "p", "f", "t") and c in P.GDT_MODIFIERS]
        plain = clean_text(strip_codes(tol_seg))
        out["tolerance"] = fnum(plain)
        for d in rest[1:]:
            dp = clean_text(strip_codes(d)).replace("-", " ")
            for tok in dp.split():
                if re.fullmatch(r"[A-Z]{1,2}", tok):
                    out["datums"].append(tok)
    plain_all = clean_text(strip_codes(first)).replace("%%v", " ").strip()
    if out["symbol"] is None and out["tolerance"] is None and re.fullmatch(r"[A-Z]", plain_all or ""):
        out["datum_id"] = plain_all
    return out

def parse_thread(text, units="mm"):
    """Return thread spec dict or None."""
    t = text.upper()
    m = P.THREAD_METRIC.search(text)
    if m and ("M" + m.group(1)) in t.replace(" ", ""):
        major = float(m.group(1)); pitch = float(m.group(2)) if m.group(2) else P.COARSE_PITCH.get(major)
        if major < 1.5 or major > 64: return None
        if pitch is None: return None
        if pitch > major * 0.5 or pitch < 0.2:
            # "M6X16" is a screw length, not a pitch: fall back to the coarse pitch
            pitch = P.COARSE_PITCH.get(major)
            if pitch is None: return None
        return {"spec": f"M{m.group(1)}x{pitch}", "system": "metric", "major": major, "pitch": pitch, "tap_drill": round(major - pitch, 2), "units": "mm", "fit": m.group(3)}
    m = P.THREAD_UNIFIED.search(text)
    if m:
        key = f"{m.group(1)}-{m.group(2)}"
        td = P.UNIFIED_TAP.get(key); maj = P.UNIFIED_MAJOR.get(m.group(1))
        if maj is None:
            maj = fnum(m.group(1))
        return {"spec": key + (" " + m.group(3).upper() if m.group(3) else ""), "system": "unified", "major": maj, "pitch": 1/float(m.group(2)),
                "tap_drill": td, "units": "in", "fit": None}
    return None

def find_specs(text):
    found = []
    for rx in P.SPEC_PATTERNS:
        for m in rx.finditer(text):
            ref = re.sub(r"\s+", " ", m.group(1).upper()).strip()
            rev = None
            if m.lastindex and m.lastindex >= 2 and m.group(2):
                rev = m.group(2).upper()
            if rx.pattern.startswith(r"\b([A-Z]{2,4}-\d{3})"):
                # customer spec: require an explicit REV token to avoid part-number false positives
                if not rev and not re.search(r"\bSPEC", text.upper()):
                    continue
            found.append({"ref": ref, "rev": rev, "text": text.strip()})
    seen = {f["ref"].replace(" ", "") for f in found}
    for ref, rx in P.library_spec_patterns():
        if ref.replace(" ", "") in seen: continue
        m = rx.search(text)
        if m:
            found.append({"ref": ref, "rev": m.group(2).upper() if m.group(2) else None, "text": text.strip()}); seen.add(ref.replace(" ", ""))
    return found

class DxfExtractor:
    LABEL_WIN_MIN = 2.5          # drawing units (mm) - the smallest label height the proximity window is based on

    def __init__(self, path):
        self.path = path
        self.doc = load_doc(path)
        self.msp = self.doc.modelspace()
        try:
            self.units = UNIT_NAMES.get(int(self.doc.header.get("$INSUNITS", 0)), "unknown")
        except Exception:
            self.units = "unknown"
        self.texts, self.dims, self.circles, self.arcs, self.fcfs, self.datums = [], [], [], [], [], []
        self.leaders, self.rects, self.attribs, self.lines = [], [], [], []
        self.warnings = []

    # ---------- collection ----------
    def collect(self):
        self.space = "model"; self.space_stats = {}
        self._collect_space(self.msp, "model")
        try:
            for layout in self.doc.layouts:
                if layout.is_modelspace: continue
                self._collect_space(layout, "paper:" + layout.name)
        except Exception as ex:
            self.warnings.append(f"layouts: {ex}")
        # main space = the plotted sheet: a paper layout with a viewport and title/notes text, otherwise model space
        self.main_space = "model"; self.viewports = []
        best = None
        for name, n in self.space_stats.items():
            if name.startswith("paper:") and n >= 3 and self.viewports_of(name):
                if best is None or n > best[1]: best = (name, n)
        if best:
            self.main_space = best[0]; self.viewports = self.viewports_of(best[0])
        for lst in (self.texts, self.dims, self.circles, self.arcs, self.fcfs, self.datums, self.leaders, self.rects, self.attribs):
            for rec in lst:
                rec.setdefault("space", "model")
        return self

    def viewports_of(self, name):
        try:
            layout = self.doc.layouts.get(name.split(":", 1)[1])
        except Exception:
            return []
        out = []
        for vp in layout.query("VIEWPORT"):
            try:
                if vp.dxf.id == 1 or vp.dxf.status < 0 or vp.dxf.width <= 0: continue   # the paper-space "overall" viewport
                out.append({"center": [float(vp.dxf.center.x), float(vp.dxf.center.y)], "width": float(vp.dxf.width), "height": float(vp.dxf.height),
                            "view_center": [float(vp.dxf.view_center_point.x), float(vp.dxf.view_center_point.y)], "view_height": float(vp.dxf.view_height)})
            except Exception:
                continue
        return out

    def _collect_space(self, layout, name):
        self.space = name; n = 0
        for e in layout:
            if e.dxftype() == "VIEWPORT": continue
            try:
                before = len(self.texts) + len(self.dims)
                self._entity(e, depth=0)
                n += (len(self.texts) + len(self.dims)) - before
            except Exception as ex:
                self.warnings.append(f"{e.dxftype()}: {ex}")
        self.space_stats[name] = n

    def _entity(self, e, depth):
        t = e.dxftype()
        if t == "TEXT":
            s = clean_text(e.plain_text() if hasattr(e, "plain_text") else e.dxf.text)
            if s: self.texts.append({"text": s, "loc": _pt(e.dxf.insert), "h": float(e.dxf.height or 2.5), "kind": "text", "rot": float(e.dxf.rotation or 0), "space": self.space})
        elif t == "MTEXT":
            s = clean_text(e.plain_text())
            h = float(e.dxf.char_height or 2.5)
            loc = _pt(e.dxf.insert)
            for i, line in enumerate([l for l in s.split("\n") if l.strip()]):
                self.texts.append({"text": line.strip(), "loc": [loc[0], round(loc[1] - i * h * 1.6, 4)], "h": h, "kind": "mtext", "rot": float(e.dxf.rotation or 0), "space": self.space})
        elif t == "ATTRIB":
            s = clean_text(e.dxf.text)
            self.attribs.append({"tag": e.dxf.tag, "text": s, "loc": _pt(e.dxf.insert), "h": float(e.dxf.height or 2.5), "space": self.space})
            if s: self.texts.append({"text": s, "loc": _pt(e.dxf.insert), "h": float(e.dxf.height or 2.5), "kind": "attrib", "rot": 0.0, "tag": e.dxf.tag, "space": self.space})
        elif t == "CIRCLE":
            self.circles.append({"c": _pt(e.dxf.center), "r": round(float(e.dxf.radius), 4), "space": self.space})
        elif t == "ARC":
            self.arcs.append({"c": _pt(e.dxf.center), "r": round(float(e.dxf.radius), 4)})
        elif t == "LINE":
            lt = (e.dxf.linetype or "").upper()
            self.lines.append({"a": _pt(e.dxf.start), "b": _pt(e.dxf.end), "linetype": lt, "space": self.space})
        elif t == "LWPOLYLINE":
            pts = [_pt(p) for p in e.get_points("xy")]
            if e.closed and len(pts) in (4, 5):
                xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
                self.rects.append({"bbox": [min(xs), min(ys), max(xs), max(ys)]})
        elif t == "TOLERANCE":
            parsed = parse_tolerance_content(e.dxf.content)
            parsed["loc"] = _pt(e.dxf.insert); parsed["space"] = self.space
            if parsed["datum_id"]:
                self.datums.append({"id": parsed["datum_id"], "loc": parsed["loc"], "source": "tolerance"})
            elif parsed["symbol"] or parsed["tolerance"] is not None:
                self.fcfs.append(parsed)
        elif t == "DIMENSION":
            self._dimension(e)
        elif t == "LEADER":
            try:
                vs = [_pt(v) for v in e.vertices]
                if len(vs) >= 2: self.leaders.append({"start": vs[0], "end": vs[-1]})
            except Exception: pass
        elif t == "MULTILEADER" or t == "MLEADER":
            self._mleader(e)
        elif t == "INSERT":
            if depth < 3:
                try:
                    for a in e.attribs:
                        self._entity(a, depth + 1)
                except Exception: pass
                try:
                    for v in e.virtual_entities():
                        if v.dxftype() == "ATTDEF": continue
                        self._entity(v, depth + 1)
                except Exception as ex:
                    self.warnings.append(f"INSERT {e.dxf.name}: {ex}")
                if "DATUM" in (e.dxf.name or "").upper():
                    for a in e.attribs:
                        s = clean_text(a.dxf.text)
                        if re.fullmatch(r"[A-Z]", s): self.datums.append({"id": s, "loc": _pt(e.dxf.insert), "source": "block"})

    def _mleader(self, e):
        try:
            ctx = e.context
            txt = ""
            if ctx.mtext is not None:
                txt = clean_text(ctx.mtext.default_content)
            start = None; end = None
            for ld in ctx.leaders:
                for ln in ld.lines:
                    vs = [_pt(v) for v in ln.vertices]
                    if vs:
                        start = vs[0]; end = vs[-1]
            if txt:
                loc = _pt(ctx.mtext.insert) if ctx.mtext is not None else (end or [0, 0])
                h = float(ctx.char_height or 2.5)
                for i, line in enumerate([l for l in txt.split("\n") if l.strip()]):
                    self.texts.append({"text": line.strip(), "loc": [loc[0], round(loc[1] - i * h * 1.6, 4)], "h": h, "kind": "mleader", "rot": 0.0})
            if start and end:
                self.leaders.append({"start": start, "end": end})
        except Exception as ex:
            self.warnings.append(f"MLEADER: {ex}")

    def _dimension(self, e):
        d = e.dxf
        dimtype = int(d.dimtype) & 7
        kind = {0: "linear", 1: "aligned", 2: "angular", 3: "diameter", 4: "radius", 5: "angular", 6: "ordinate"}.get(dimtype, "linear")
        try:
            meas = float(e.get_measurement())
        except Exception:
            meas = None
        ov = e.override()
        def g(name, default=None):
            try:
                v = ov.get(name)
                return default if v is None else v
            except Exception:
                return default
        lfac = float(g("dimlfac", 1.0) or 1.0)
        dec = int(g("dimdec", 2))
        value = None if meas is None else round(meas * lfac, 4)
        override = clean_text(d.text or "")
        tol = None
        if int(g("dimtol", 0) or 0) == 1:
            tp = float(g("dimtp", 0) or 0); tm = float(g("dimtm", 0) or 0)
            tol = {"plus": tp, "minus": tm}
        if kind == "angular":
            shown = _fmt(math.degrees(meas), dec) + "°" if meas is not None else override
        else:
            shown = _fmt(value, dec) if value is not None else ""
        if kind == "diameter": shown = "Ø" + shown
        if kind == "radius": shown = "R" + shown
        text = override.replace("<>", shown) if override and override.strip() != "" else shown
        if override and override.strip() and "<>" not in override:
            text = override
            v2 = fnum(override)
            if v2 is not None and kind not in ("angular",):
                value = v2
        m = re.search(r"±\s*(\d+(?:\.\d+)?)", text)
        if m: tol = {"plus": float(m.group(1)), "minus": float(m.group(1))}
        m = re.search(r"\+\s*(\d+(?:\.\d+)?)\s*/\s*-\s*(\d+(?:\.\d+)?)", text)
        if m: tol = {"plus": float(m.group(1)), "minus": float(m.group(2))}
        p1 = _pt(d.defpoint2) if kind in ("linear", "aligned") else _pt(d.defpoint)
        p2 = _pt(d.defpoint3) if kind in ("linear", "aligned") else _pt(d.get("defpoint4", d.defpoint))
        loc = _pt(d.text_midpoint) if d.hasattr("text_midpoint") else _pt(d.defpoint)
        measured = None if meas is None else (round(meas * lfac, 4) if kind != "angular" else round(math.degrees(meas), 3))
        self.dims.append({"id": new_id("dim_"), "type": kind, "value": value, "measured": measured, "text": text, "tol": tol, "p1": p1, "p2": p2,
                          "loc": loc, "angle": float(d.get("angle", 0) or 0) if kind == "linear" else None, "override": bool(override and "<>" not in override), "space": self.space})

    # ---------- interpretation ----------
    def interpret(self):
        T = self.texts
        notes, callouts, specs, threads = [], [], [], []
        for t in T:
            s = t["text"]
            m = P.NOTE_LINE.match(s)
            sp_ = t.get("space", "model")
            if m and len(s) > 6:
                notes.append({"n": int(m.group(1)), "text": m.group(2).strip(), "loc": t["loc"], "full": s, "space": sp_})
            U = s.upper()
            if any(w in U for w in P.CALLOUT_WORDS) or P.DIA_TEXT.search(s):
                callouts.append({"text": s, "loc": t["loc"], "h": t["h"], "space": sp_})
            for sp in find_specs(s):
                sp["loc"] = t["loc"]; sp["space"] = sp_; specs.append(sp)
            th = parse_thread(s, self.units)
            if th:
                th.update({"text": s, "loc": t["loc"], "h": t["h"], "space": sp_}); threads.append(th)
        # datum feature symbols drawn as a boxed single letter
        for t in T:
            if re.fullmatch(r"[A-Z]", t["text"]) and t["kind"] in ("text", "mtext"):
                for r in self.rects:
                    b = r["bbox"]; w = b[2]-b[0]; hgt = b[3]-b[1]
                    if w <= t["h"]*4 and hgt <= t["h"]*4 and b[0]-t["h"] <= t["loc"][0] <= b[2] and b[1]-t["h"] <= t["loc"][1] <= b[3]:
                        if not any(dd["id"] == t["text"] and dist(dd["loc"], t["loc"]) < t["h"]*6 for dd in self.datums):
                            self.datums.append({"id": t["text"], "loc": t["loc"], "source": "boxed text"})
                        break
        # associate threads/callouts with a circle via leaders or proximity
        for c in threads + callouts:
            c["circle"] = self._circle_for(c)
        title = self._title_block()
        parts_list = self._parts_list()
        balloons = self._balloons()
        main = getattr(self, "main_space", "model")
        if len([k for k, v in getattr(self, "space_stats", {}).items() if v]) > 1:
            # locations carry their space as a third element so the renderer can map model-space items through the viewport
            for lst in (T, self.dims, self.fcfs, self.datums, notes, callouts, specs, threads):
                for rec in lst:
                    if rec.get("loc") and len(rec["loc"]) == 2: rec["loc"] = [rec["loc"][0], rec["loc"][1], rec.get("space", "model")]
            for f in title["fields"].values():
                if f.get("loc") and len(f["loc"]) == 2: f["loc"] = [f["loc"][0], f["loc"][1], f.get("space", "model")]
        bbox = self._bbox()
        return {
            "source": self.source(),
            "bbox": bbox, "texts": T, "notes": sorted(notes, key=lambda n: n["n"]), "callouts": callouts, "specs": specs, "threads": threads,
            "dimensions": self.dims, "circles": self.circles, "fcfs": self.fcfs, "datums": self.datums, "title_block": title,
            "parts_list": parts_list, "balloons": balloons,
            "construction_lines": [l for l in self.lines if any(k in l.get("linetype", "") for k in ("CENTER", "DASH", "PHANTOM", "HIDDEN"))][:400],
            "counts": {"texts": len(T), "dimensions": len(self.dims), "circles": len(self.circles), "fcfs": len(self.fcfs), "notes": len(notes)},
            "space": main, "spaces": getattr(self, "space_stats", {}), "viewports": getattr(self, "viewports", []),
            "warnings": self.warnings[:20],
        }

    def source(self):
        return {"file": self.path, "kind": "dxf", "units": self.units, "dxfversion": getattr(self.doc, "dxfversion", ""), "pages": 1}

    def _circle_for(self, c):
        loc = c["loc"]; h = c.get("h", 2.5)
        best = None
        min_d = 0.06 if self.units == "in" else 1.6
        circles = [ci for ci in self.circles if ci["r"] * 2 >= min_d]
        for L in self.leaders:
            if dist(L["start"], L["end"]) < h * 1.5: continue
            if dist(L["end"], loc) < h * 8 or dist(L["start"], loc) < h * 8:
                tip = L["start"] if dist(L["end"], loc) < dist(L["start"], loc) else L["end"]
                for ci in circles:
                    d_c = dist(tip, ci["c"])
                    if d_c <= ci["r"] * 1.25 + max(0.5, h * 0.3):
                        dd = abs(d_c - ci["r"])
                        if best is None or dd < best[0]: best = (dd, ci)
        if best: return {"c": best[1]["c"], "r": best[1]["r"], "via": "leader"}
        near = None
        for ci in circles:
            dd = dist(loc, ci["c"])
            if dd < h * 14 and (near is None or dd < near[0]): near = (dd, ci)
        if near: return {"c": near[1]["c"], "r": near[1]["r"], "via": "proximity"}
        return None

    def _title_block(self):
        fields = {}
        # 1) block attributes
        for a in self.attribs:
            f = P.field_for_tag(a["tag"])
            if f and f not in fields:
                fields[f] = {"value": a["text"], "conf": 0.98, "loc": a["loc"], "source": f"attrib {a['tag']}", "space": a.get("space", "model")}
        # 2) label / value proximity
        labels = []
        for t in self.texts:
            f, inline = P.field_for_label(t["text"])
            if f: labels.append((f, inline, t))
        # the title block is the densest cluster of distinct labels; labels far from it (parts-list headers, notes) are ignored
        if len(labels) > 1:
            best = None
            for f, inline, t in labels:
                R = max(t["h"], 2.5) * 45
                near = {ff for ff, _, tt in labels if dist(tt["loc"], t["loc"]) <= R}
                if best is None or len(near) > best[0]: best = (len(near), t)
            if best:
                R = max(best[1]["h"], 2.5) * 45
                kept = [(f, i, t) for f, i, t in labels if dist(t["loc"], best[1]["loc"]) <= R]
                # keep one occurrence per field: the one closest to the cluster centre
                byf = {}
                for f, i, t in kept:
                    if f not in byf or dist(t["loc"], best[1]["loc"]) < dist(byf[f][2]["loc"], best[1]["loc"]): byf[f] = (f, i, t)
                labels = list(byf.values())
        label_locs = [t["loc"] for _, _, t in labels]
        for f, inline, t in labels:
            if f in fields: continue
            if inline:
                fields[f] = {"value": inline, "conf": 0.95, "loc": t["loc"], "source": "inline label", "space": t.get("space", "model")}; continue
            h = t["h"]; lx, ly = t["loc"]
            win = max(h, self.LABEL_WIN_MIN)
            # a value belongs to this cell: it must lie left of the next label on the same row (the neighbouring cell)
            right_edge = min([L[0] for L in label_locs if L[0] > lx + win * 0.5 and abs(L[1] - ly) <= win * 1.2] or [lx + win * 14])
            cands = []
            for u in self.texts:
                if u is t or any(u["loc"] == L for L in label_locs): continue
                if u.get("space", "model") != t.get("space", "model"): continue
                if P.field_for_label(u["text"])[0]: continue
                ux, uy = u["loc"]
                dx, dy = ux - lx, ly - uy
                # value sits below the label (same cell) or to the right on the same line, never past the next cell's label
                if -win * 1.5 <= dx <= min(win * 14, right_edge - lx - win * 0.3) and -win * 0.4 <= dy <= win * 4.2:
                    score = abs(dx) * 0.4 + abs(dy - win * 2.0)
                    cands.append((score, u))
            if cands:
                cands.sort(key=lambda c: c[0]); u = cands[0][1]
                fields[f] = {"value": u["text"], "conf": round(max(0.6, 0.93 - cands[0][0] / (h * 40)), 2), "loc": u["loc"], "source": "label proximity", "space": t.get("space", "model")}
            else:
                fields[f] = {"value": "", "conf": 0.9, "loc": t["loc"], "source": "label found, cell empty", "space": t.get("space", "model")}
        return {"fields": fields, "found_labels": [f for f, _, _ in labels]}

    def _parts_list(self):
        """Detect a parts list drawn as a text grid: a header row with ITEM/QTY/PART NO, rows below aligned by column x."""
        HDR = {"ITEM": "item", "NO": "item", "QTY": "qty", "QTY.": "qty", "QUANTITY": "qty", "PARTNO": "part_no", "PARTNUMBER": "part_no", "PART": "part_no", "P/N": "part_no",
               "DESCRIPTION": "description", "DESC": "description", "TITLE": "description", "MATL": "material", "MATERIAL": "material", "MAT": "material", "REV": "rev", "REVISION": "rev"}
        heads = []
        for t in self.texts:
            key = P.norm_label(t["text"])
            if key in HDR: heads.append((HDR[key], t))
        if not heads: return None
        # group header cells by y
        best = None
        for f, t in heads:
            row = [(ff, tt) for ff, tt in heads if abs(tt["loc"][1] - t["loc"][1]) <= t["h"] * 0.8]
            names = {ff for ff, _ in row}
            if "item" in names and "part_no" in names and (best is None or len(row) > len(best)):
                best = row
        if not best: return None
        best = sorted(best, key=lambda r: r[1]["loc"][0])
        cols = [(f, t["loc"][0]) for f, t in best]
        hy = best[0][1]["loc"][1]; h = best[0][1]["h"]
        # candidate rows: texts below header within the table's x range
        x0 = cols[0][1] - h * 2; x1 = max(x for _, x in cols) + h * 40
        cells = [t for t in self.texts if t["loc"][1] < hy - h * 0.5 and x0 <= t["loc"][0] <= x1 and t not in [tt for _, tt in best]]
        rows = {}
        for t in cells:
            ykey = round(t["loc"][1] / (h * 1.2))
            rows.setdefault(ykey, []).append(t)
        out = []
        for ykey in sorted(rows.keys(), reverse=True):
            rec = {}
            for t in rows[ykey]:
                # assign to nearest column on the left
                col = None
                for f, x in cols:
                    if t["loc"][0] >= x - h * 0.6: col = f
                if col: rec[col] = (rec.get(col, "") + " " + t["text"]).strip()
            if rec.get("item") and re.fullmatch(r"\d{1,3}", rec["item"]):
                rec["loc"] = rows[ykey][0]["loc"]; out.append(rec)
            elif out:
                break
        if not out: return None
        return {"columns": [f for f, _ in cols], "rows": out, "loc": best[0][1]["loc"]}

    def _balloons(self):
        out = []
        for ci in self.circles:
            r_ok = (4 <= ci["r"] <= 26) if ci.get("unscaled") else (1.5 <= ci["r"] <= 8) if not ci.get("scaled") else (1.5 <= ci["r"] <= 8)
            if not r_ok: continue
            centre = ci.get("c_pt", ci["c"])
            for t in self.texts:
                if re.fullmatch(r"\d{1,2}", t["text"]):
                    cx = t["loc"][0] + t["h"] * 0.5 * len(t["text"]); cy = t["loc"][1] + t["h"] * 0.5
                    rr = ci["r"] if not ci.get("scaled") else ci["r"] / ((25.4 / 72) / (getattr(self, "scale", None) or 1))
                    if dist((cx, cy), centre) <= rr * 0.9:
                        out.append({"n": int(t["text"]), "loc": centre, "r": ci["r"]}); break
        return out

    def _bbox(self):
        try:
            main = getattr(self, "main_space", "model")
            layout = self.msp if main == "model" else self.doc.layouts.get(main.split(":", 1)[1])
            ents = [e for e in layout if e.dxftype() != "VIEWPORT"] if main != "model" else layout
            b = ezbbox.extents(ents, fast=True)
            return [round(b.extmin.x, 3), round(b.extmin.y, 3), round(b.extmax.x, 3), round(b.extmax.y, 3)]
        except Exception:
            xs = [t["loc"][0] for t in self.texts] or [0]; ys = [t["loc"][1] for t in self.texts] or [0]
            return [min(xs), min(ys), max(xs), max(ys)]

def extract(path):
    ex = DxfExtractor(path).collect()
    return ex.interpret()
