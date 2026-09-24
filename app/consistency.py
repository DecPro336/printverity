"""Cross-document consistency: drawing set vs BOM vs purchase order."""
import re
from .tables import read_table

def _n(s): return re.sub(r"[^A-Z0-9]", "", str(s or "").upper())
def _same_pn(a, b):
    a, b = _n(a), _n(b)
    return bool(a) and (a == b or a.startswith(b) or b.startswith(a))

def _rev_key(rev):
    """Order revisions: numeric (1, 2, 10) and alphabetic (A, B, AA) each in their natural order; blank lowest."""
    r = _n(rev)
    if not r: return (0, 0, "")
    if r.isdigit(): return (1, int(r), "")
    return (2, len(r), r)

_KIND_PREF = {"dxf": 3, "pdf": 2, "image": 1}

def _one_per_part(dr):
    """A package often holds the same part several times (old and new revision, a PDF plot, a scan). The documents are
    checked against one copy per part: the highest revision, native DXF before PDF before scan. Others are reported as skipped."""
    keep, skipped = [], []
    for d in dr:
        if not d["part_no"]: keep.append(d); continue
        i = next((k for k, x in enumerate(keep) if x["part_no"] and _n(x["part_no"]) == _n(d["part_no"])), None)
        if i is None: keep.append(d); continue
        cur = keep[i]
        if (_rev_key(d["rev"]), _KIND_PREF.get(d["kind"], 0)) > (_rev_key(cur["rev"]), _KIND_PREF.get(cur["kind"], 0)):
            keep[i] = d; skipped.append(cur)
        else: skipped.append(d)
    return keep, skipped

def check(job, drawings, bom_path=None, po_path=None):
    rows = []; sources = []
    bom = read_table(bom_path) if bom_path else None
    po = read_table(po_path) if po_path else None
    if bom: sources.append(f"BOM: {bom.get('source')} ({len(bom['rows'])} lines)")
    if po: sources.append(f"PO: {po.get('source')} ({len(po['rows'])} lines)" + (f", PO {po['meta'].get('po number') or po['meta'].get('po no') or ''}" if po.get("meta") else ""))
    dr = []
    for d in drawings:
        ex = d.get("extraction") or {}
        tb = ex.get("title_block", {}).get("fields", {})
        dr.append({"file": d["file"], "kind": d.get("kind", ""), "part_no": (tb.get("part_no") or {}).get("value", ""), "rev": (tb.get("rev") or {}).get("value", ""), "material": (tb.get("material") or {}).get("value", ""),
                   "finish": (tb.get("finish") or {}).get("value", ""), "parts_list": ex.get("parts_list"), "notes": ex.get("notes", []), "texts": ex.get("texts", [])})
    dr, skipped = _one_per_part(dr)
    for d in dr: sources.append(f"Drawing: {d['file']} ({d['part_no'] or '?'} Rev {d['rev'] or '?'})")
    for d in skipped: sources.append(f"Skipped: {d['file']} ({d['part_no']} Rev {d['rev'] or '?'}, superseded by the copy checked above)")
    def add(field, drawing, bomv, pov, status, label, detail="", part=""):
        rows.append({"field": field, "part": part, "drawing": drawing or "—", "bom": bomv or "—", "po": pov or "—", "status": status, "label": label, "detail": detail})
    bom_rows = bom["rows"] if bom else []; po_rows = po["rows"] if po else []
    # 1) each drawing's part: rev / material / finish across the three documents
    for d in dr:
        if not d["part_no"]: continue
        b = next((r for r in bom_rows if _same_pn(r.get("part_no"), d["part_no"])), None)
        p = next((r for r in po_rows if _same_pn(r.get("part_no"), d["part_no"])), None)
        if b is None and p is None and (bom or po):
            if d.get("parts_list"): continue      # the assembly itself is the BOM's parent, not one of its lines
            add("Part present", d["part_no"], None, None, "medium", "Not in BOM/PO", f"Drawing {d['file']} is for {d['part_no']}, which appears in neither the BOM nor the PO.", d["part_no"]); continue
        vals = {"rev": (d["rev"], b.get("rev") if b else None, p.get("rev") if p else None), "material": (d["material"], b.get("material") if b else None, p.get("material") if p else None),
                "finish": (d["finish"], b.get("finish") if b else None, p.get("finish") if p else None)}
        for f, (dv, bv, pv) in vals.items():
            present = [v for v in (dv, bv, pv) if v not in (None, "", "-", "—")]
            if len(present) < 2: continue
            keys = {_n(v)[:12] for v in present}
            if f == "material":
                keys = {re.sub(r"(AL|ALUMINUM|ALUMINIUM|AISI|SAE|STEEL|CRS|PLATE|BAR|SHEET)", "", _n(v)) for v in present}
            if len(keys) > 1:
                which = []
                if pv not in (None, "", "-") and _n(pv) != _n(dv): which.append("PO")
                if bv not in (None, "", "-") and _n(bv) != _n(dv): which.append("BOM")
                sev = "critical" if f == "rev" else ("high" if f == "finish" else "medium")
                add(f.capitalize(), dv, bv, pv, sev, f"{f.capitalize()} conflict", f"{' and '.join(which) or 'Documents'} disagree with the drawing for {d['part_no']}.", d["part_no"])
            else:
                add(f.capitalize(), dv, bv, pv, "ok", "Match", "", d["part_no"])
    # 2) assembly parts list vs BOM quantities and revs
    for d in dr:
        pl = d.get("parts_list")
        if not pl: continue
        for r in pl["rows"]:
            b = next((x for x in bom_rows if _same_pn(x.get("part_no"), r.get("part_no"))), None)
            p = next((x for x in po_rows if _same_pn(x.get("part_no"), r.get("part_no"))), None)
            if b is None and bom:
                add("Parts list item", f"{r.get('qty')}X {r.get('part_no')}", None, p.get("qty") if p else None, "high", "Not in BOM", f"Item {r.get('item')} {r.get('description', '')} is on the drawing parts list but not in the BOM.", r.get("part_no")); continue
            if b:
                try: q_d = float(r.get("qty", "0")); q_b = b.get("qty_n")
                except ValueError: q_d, q_b = None, None
                if q_d is not None and q_b is not None and q_d != q_b:
                    add(f"Qty, {r.get('part_no')}", f"{q_d:g}X (item {r.get('item')})", f"{q_b:g}", p.get("qty") if p else None, "critical", "Qty mismatch", f"Drawing parts list shows {q_d:g}, BOM shows {q_b:g}.", r.get("part_no"))
                elif q_d is not None:
                    add(f"Qty, {r.get('part_no')}", f"{q_d:g}X", f"{q_b:g}" if q_b is not None else None, p.get("qty") if p else None, "ok", "Match", "", r.get("part_no"))
                rd, rb = r.get("rev", ""), b.get("rev", "")
                if rd and rb and rd not in ("-", "—") and _n(rd) != _n(rb):
                    add(f"Rev, {r.get('part_no')}", rd, rb, p.get("rev") if p else None, "high", "Rev mismatch", f"Parts list rev {rd}, BOM rev {rb}.", r.get("part_no"))
        # BOM lines not on the drawing parts list
        for b in bom_rows:
            if not any(_same_pn(b.get("part_no"), r.get("part_no")) for r in pl["rows"]):
                if _same_pn(b.get("part_no"), d["part_no"]): continue
                add("BOM line", None, f"{b.get('qty')}X {b.get('part_no')}", None, "high", "Missing on print", f"{b.get('description', b.get('part_no'))} is in the BOM but not in the drawing parts list.", b.get("part_no"))
    # 3) hardware referenced in notes/callouts vs BOM
    if bom_rows:
        hw = set()
        for d in dr:
            for t in d["texts"]:
                for m in re.finditer(r"\b(CLS-M\d-\d|PEM\s+[A-Z0-9-]+|NAS\d{3,5}[A-Z0-9]*|MS\d{5}[-A-Z0-9]*|AN\d{3}[-A-Z0-9]*|M\d{1,2}X\d{1,3}\s*SHCS)\b", t["text"].upper()):
                    hw.add(m.group(1).replace("  ", " "))
        for h in sorted(hw):
            if not any(_same_pn(b.get("part_no"), h) or _n(h) in _n(b.get("description")) for b in bom_rows):
                add("Hardware", h, None, None, "medium", "Not in BOM", f"Hardware {h} is called out on a drawing but has no BOM line.", h)
    # 4) PO vs BOM lines
    if bom_rows and po_rows:
        for p in po_rows:
            b = next((x for x in bom_rows if _same_pn(x.get("part_no"), p.get("part_no"))), None)
            if b is None:
                add("PO line", None, None, f"{p.get('qty')}X {p.get('part_no')}", "medium", "Not in BOM", f"PO line for {p.get('part_no')} has no BOM counterpart.", p.get("part_no"))
            elif p.get("rev") and b.get("rev") and _n(p["rev"]) != _n(b["rev"]) and not any(r["part"] == p.get("part_no") and r["field"].startswith("Rev") for r in rows):
                add(f"Rev, {p.get('part_no')}", None, b.get("rev"), p.get("rev"), "high", "PO outdated", f"PO is at rev {p.get('rev')}, BOM at rev {b.get('rev')}.", p.get("part_no"))
    order = {"critical": 0, "high": 1, "medium": 2, "low": 3, "ok": 4}
    rows.sort(key=lambda r: order.get(r["status"], 9))
    return {"rows": rows, "conflicts": len([r for r in rows if r["status"] != "ok"]), "sources": sources,
            "bom_meta": (bom or {}).get("meta", {}), "po_meta": (po or {}).get("meta", {}), "errors": [x for x in [(bom or {}).get("error"), (po or {}).get("error")] if x]}
