"""Revision comparison: structured diff of two extractions (dimensions, notes, callouts, title block, GD&T) with impact classification."""
import difflib, re
from .util import dist, load_json, PLM_FILE
from . import patterns as P

def _impact(kind, a, b, text=""):
    U = (text or "").upper()
    if kind == "dimension":
        if a and b and a.get("tol") != b.get("tol") and a.get("value") == b.get("value"):
            ta = a.get("tol") or {}; tb = b.get("tol") or {}
            tighter = (tb.get("plus", 9e9) + tb.get("minus", 9e9)) < (ta.get("plus", 9e9) + ta.get("minus", 9e9))
            return ("Inspection", "Tolerance tightened, inspection method may change" if tighter else "Tolerance loosened")
        if "Ø" in U or "SLOT" in U or "THREAD" in U or re.search(r"\bM\d", U):
            return ("Fit", "Hole, slot or thread size changed: check mating parts")
        return ("Fit", "Feature size or location changed")
    if kind == "note":
        if any(w in U for w in P.PROCESS_WORDS): return ("Process", "Manufacturing process note changed: router may need updating")
        if "MATERIAL" in U: return ("Purchasing", "Material note changed")
        if "FINISH" in U or "SPEC" in U: return ("Process", "Finish or spec note changed")
        return ("Cosmetic", "Wording or reference change")
    if kind == "title":
        f = text.lower()
        if f == "material": return ("Purchasing", "Material changed: PO and certs affected")
        if f == "finish": return ("Process", "Finish changed")
        if f in ("rev", "eco", "drawn", "checked", "approved", "date"): return ("Cosmetic", "Title block administrative field")
        return ("Cosmetic", "Title block change")
    if kind == "callout":
        return ("Fit", "Feature callout changed")
    if kind == "gdt":
        return ("Inspection", "Geometric tolerance changed")
    return ("Cosmetic", "")

def _match_dims(A, B):
    """Pair dimensions between revisions by type and position (feature points), then by value."""
    pairs = []; usedB = set()
    for a in A:
        best = None
        for j, b in enumerate(B):
            if j in usedB or a.get("type") != b.get("type"): continue
            score = None
            if a.get("p1") and b.get("p1"):
                d1 = dist(a["p1"], b["p1"]) + dist(a["p2"], b["p2"]); d2 = dist(a["p1"], b["p2"]) + dist(a["p2"], b["p1"])
                score = min(d1, d2)
            elif a.get("loc") and b.get("loc"):
                score = dist(a["loc"], b["loc"]) * 0.5
            if score is None: continue
            if best is None or score < best[0]: best = (score, j)
        if best and best[0] < 30:
            pairs.append((a, B[best[1]])); usedB.add(best[1])
        else:
            pairs.append((a, None))
    for j, b in enumerate(B):
        if j not in usedB: pairs.append((None, b))
    return pairs

def compare(exA, exB, labelA="Rev A", labelB="Rev B"):
    changes = []
    # dimensions
    for a, b in _match_dims(exA.get("dimensions", []), exB.get("dimensions", [])):
        if a and b:
            if a.get("value") != b.get("value") or (a.get("tol") or None) != (b.get("tol") or None) or a.get("text") != b.get("text"):
                imp, why = _impact("dimension", a, b, b.get("text"))
                delta = ""
                if a.get("value") is not None and b.get("value") is not None and a["value"] != b["value"]:
                    delta = f"{b['value'] - a['value']:+g}"
                elif (a.get("tol") or None) != (b.get("tol") or None):
                    delta = "tolerance"
                changes.append({"kind": "Dimension", "item": f"{b.get('type', 'linear').capitalize()} dimension", "a": a.get("text"), "b": b.get("text"), "change": delta or "text", "impact": imp, "why": why, "loc": b.get("loc")})
        elif a and not b:
            changes.append({"kind": "Dimension", "item": f"{a.get('type', 'linear').capitalize()} dimension", "a": a.get("text"), "b": "—", "change": "Removed", "impact": "Inspection", "why": "A dimension was removed; the feature may be undimensioned now", "loc": a.get("loc")})
        elif b and not a:
            changes.append({"kind": "Dimension", "item": f"{b.get('type', 'linear').capitalize()} dimension", "a": "—", "b": b.get("text"), "change": "Added", "impact": _impact("dimension", None, b, b.get("text"))[0], "why": "New dimension", "loc": b.get("loc")})
    # notes (by number, then fuzzy text)
    nA = {n["n"]: n for n in exA.get("notes", [])}; nB = {n["n"]: n for n in exB.get("notes", [])}
    textsA = [n["text"] for n in exA.get("notes", [])]; textsB = [n["text"] for n in exB.get("notes", [])]
    for n in sorted(set(nA) | set(nB)):
        a = nA.get(n); b = nB.get(n)
        if a and b:
            if a["text"].strip().upper() != b["text"].strip().upper():
                ratio = difflib.SequenceMatcher(None, a["text"].upper(), b["text"].upper()).ratio()
                if ratio > 0.6:
                    imp, why = _impact("note", a, b, b["text"])
                    changes.append({"kind": "Note", "item": f"Note {n}", "a": a["text"], "b": b["text"], "change": "Edited", "impact": imp, "why": why, "loc": b.get("loc")})
                else:
                    # renumbered: report as removed/added unless the text exists elsewhere
                    if a["text"].upper() not in [t.upper() for t in textsB]:
                        imp, why = _impact("note", a, None, a["text"])
                        changes.append({"kind": "Note", "item": f"Note {n}", "a": a["text"], "b": "—", "change": "Removed", "impact": imp, "why": why, "loc": a.get("loc")})
                    if b["text"].upper() not in [t.upper() for t in textsA]:
                        imp, why = _impact("note", None, b, b["text"])
                        changes.append({"kind": "Note", "item": f"Note {n}", "a": "—", "b": b["text"], "change": "Added", "impact": imp, "why": why, "loc": b.get("loc")})
        elif a and a["text"].upper() not in [t.upper() for t in textsB]:
            imp, why = _impact("note", a, None, a["text"])
            changes.append({"kind": "Note", "item": f"Note {n}", "a": a["text"], "b": "—", "change": "Removed", "impact": imp, "why": why, "loc": a.get("loc")})
        elif b and b["text"].upper() not in [t.upper() for t in textsA]:
            imp, why = _impact("note", None, b, b["text"])
            changes.append({"kind": "Note", "item": f"Note {n}", "a": "—", "b": b["text"], "change": "Added", "impact": imp, "why": why, "loc": b.get("loc")})
    # callouts (non-note texts with feature words)
    cA = {c["text"].upper() for c in exA.get("callouts", []) if not P.NOTE_LINE.match(c["text"])}
    cB = {c["text"].upper() for c in exB.get("callouts", []) if not P.NOTE_LINE.match(c["text"])}
    for t in sorted(cA - cB):
        close = difflib.get_close_matches(t, list(cB - cA), n=1, cutoff=0.55)
        if close:
            imp, why = _impact("callout", None, None, close[0])
            changes.append({"kind": "Callout", "item": "Callout", "a": t, "b": close[0], "change": "Edited", "impact": imp, "why": why}); cB.discard(close[0])
        else:
            changes.append({"kind": "Callout", "item": "Callout", "a": t, "b": "—", "change": "Removed", "impact": "Fit", "why": "Feature callout removed"})
    for t in sorted(cB - cA):
        if any(ch.get("b") == t for ch in changes): continue
        changes.append({"kind": "Callout", "item": "Callout", "a": "—", "b": t, "change": "Added", "impact": "Fit", "why": "New feature callout"})
    # GD&T
    fA = [(f.get("symbol"), f.get("tolerance"), tuple(f.get("datums", []))) for f in exA.get("fcfs", [])]
    fB = [(f.get("symbol"), f.get("tolerance"), tuple(f.get("datums", []))) for f in exB.get("fcfs", [])]
    for f in fA:
        if f not in fB: changes.append({"kind": "GD&T", "item": f[0] or "frame", "a": f"{f[1]} to {'-'.join(f[2]) or '-'}", "b": "—", "change": "Removed or edited", "impact": "Inspection", "why": "Geometric tolerance changed"})
    for f in fB:
        if f not in fA: changes.append({"kind": "GD&T", "item": f[0] or "frame", "a": "—", "b": f"{f[1]} to {'-'.join(f[2]) or '-'}", "change": "Added or edited", "impact": "Inspection", "why": "Geometric tolerance changed"})
    # title block
    tA = exA.get("title_block", {}).get("fields", {}); tB = exB.get("title_block", {}).get("fields", {})
    for f in sorted(set(tA) | set(tB)):
        va = (tA.get(f) or {}).get("value", ""); vb = (tB.get(f) or {}).get("value", "")
        if (va or "").strip().upper() != (vb or "").strip().upper():
            imp, why = _impact("title", None, None, f)
            changes.append({"kind": "Title block", "item": f.replace("_", " ").upper(), "a": va or "—", "b": vb or "—", "change": "Changed", "impact": imp, "why": why, "loc": (tB.get(f) or {}).get("loc")})
    # ECO cross-check against PLM for the new revision
    pn = (tB.get("part_no") or {}).get("value", "") or (tA.get("part_no") or {}).get("value", "")
    revB = (tB.get("rev") or {}).get("value", ""); ecoB = (tB.get("eco") or {}).get("value", "")
    rec = None; plm_source = "local"
    if pn:
        try:
            from .integrations.epicor import get_plm
            rec, plm_source = get_plm().part_revision(pn.strip())
        except Exception:
            rec = load_json(PLM_FILE, {"parts": {}}).get("parts", {}).get(pn.strip())
    eco = {"part_no": pn, "rev": revB, "drawing_eco": ecoB or None, "plm_eco": rec.get("eco") if rec else None, "plm_rev": rec.get("rev") if rec else None,
           "released": rec.get("released") if rec else None, "status": "unknown", "source": plm_source}
    if rec:
        if rec.get("rev") == revB and ecoB and rec.get("eco", "").upper().replace(" ", "") == ecoB.upper().replace(" ", ""): eco["status"] = "match"
        elif rec.get("rev") == revB and not ecoB: eco["status"] = "missing on drawing"
        elif rec.get("rev") != revB: eco["status"] = "revision not released"
        else: eco["status"] = "mismatch"
    order = {"Fit": 0, "Process": 1, "Inspection": 2, "Purchasing": 3, "Cosmetic": 4}
    changes.sort(key=lambda c: (order.get(c["impact"], 9), c["kind"]))
    summary = {"total": len(changes), "dimensions": len([c for c in changes if c["kind"] == "Dimension"]), "notes": len([c for c in changes if c["kind"] == "Note"]),
               "callouts": len([c for c in changes if c["kind"] == "Callout"]), "title_block": len([c for c in changes if c["kind"] == "Title block"]), "gdt": len([c for c in changes if c["kind"] == "GD&T"]),
               "affects_fit": len([c for c in changes if c["impact"] == "Fit"]), "process": len([c for c in changes if c["impact"] == "Process"])}
    downstream = []
    if summary["affects_fit"]: downstream.append("Check mating parts and fixtures for the changed features")
    if any(c["kind"] == "Dimension" and c["change"] == "tolerance" for c in changes): downstream.append("Update the inspection plan characteristics whose tolerance changed")
    if any(c["impact"] == "Process" for c in changes): downstream.append("Review the router: process notes were added or removed")
    if any(c["impact"] == "Purchasing" for c in changes): downstream.append("Check open purchase orders against the new material or finish")
    return {"labelA": labelA, "labelB": labelB, "summary": summary, "changes": changes, "eco": eco, "downstream": downstream}
