"""Q&A support: builds the cited context lines and the deterministic title-block answers the agent and the local planner share; `answer` is the public entry point."""
import re, logging

log = logging.getLogger("printverity.qa")
MODEL = "claude-opus-5"

def _tb(ex, f):
    return ((ex.get("title_block", {}).get("fields", {}).get(f) or {}).get("value") or "").strip()

def build_context(job):
    """Flatten the job's extracted data into cited lines: [file · where] text."""
    lines = []
    for d in job.get("drawings", []):
        ex = d.get("extraction") or {}
        name = f"{_tb(ex, 'part_no') or d['file']} Rev {_tb(ex, 'rev') or '-'}"
        tb = ex.get("title_block", {}).get("fields", {})
        if tb:
            lines.append({"src": f"{name} · title block", "text": "; ".join(f"{k.replace('_', ' ')}: {v.get('value')}" for k, v in tb.items() if v.get("value"))})
        for n in ex.get("notes", []):
            lines.append({"src": f"{name} · note {n['n']}", "text": n["text"]})
        for c in ex.get("callouts", []):
            if not re.match(r"^\s*\d+[.)]", c["text"]):
                lines.append({"src": f"{name} · callout", "text": c["text"]})
        for dm in ex.get("dimensions", []):
            lines.append({"src": f"{name} · dimension", "text": f"{dm.get('type')} {dm.get('text')}" + (f" tol ±{dm['tol']['plus']}" if dm.get("tol") else "")})
        for f in ex.get("fcfs", []):
            lines.append({"src": f"{name} · GD&T", "text": f"{f.get('symbol')} {'Ø' if f.get('diameter') else ''}{f.get('tolerance')} {' '.join(f.get('modifiers', []))} datums {'-'.join(f.get('datums', [])) or 'none'}"})
        for dt in ex.get("datums", []):
            lines.append({"src": f"{name} · datum", "text": f"Datum {dt['id']} defined"})
        for th in ex.get("threads", []):
            lines.append({"src": f"{name} · thread", "text": f"{th['spec']} tap drill Ø{th.get('tap_drill')}" + (f" on hole Ø{th['circle']['r']*2:g}" if th.get("circle") else "")})
        pl = ex.get("parts_list")
        if pl:
            for r in pl["rows"]:
                lines.append({"src": f"{name} · parts list item {r.get('item')}", "text": f"qty {r.get('qty')} {r.get('part_no')} {r.get('description', '')} {r.get('material', '')} rev {r.get('rev', '')}"})
        for f in d.get("findings", []):
            lines.append({"src": f"{name} · finding {f.get('n')}", "text": f"[{f['severity']}] {f['title']}. {f['detail']} (status {f['status']})"})
        # any other text on the sheet
        seen = {l["text"] for l in lines}
        for t in ex.get("texts", []):
            if t["text"] not in seen and len(t["text"]) > 3:
                lines.append({"src": f"{name} · text", "text": t["text"]})
    for k in ("consistency", "model_check"):
        rep = job.get(k)
        if rep:
            for r in rep.get("rows", []):
                lines.append({"src": f"{k.replace('_', ' ')} report", "text": " | ".join(f"{a}: {b}" for a, b in r.items() if a in ("field", "feature", "drawing", "bom", "po", "model", "status", "label", "detail") and b)})
    return lines

def _retrieve(lines, question, k=8):
    q = re.findall(r"[a-z0-9.\-]+", question.lower())
    stop = {"the", "what", "is", "on", "of", "a", "an", "which", "does", "do", "in", "this", "for", "to", "and", "are", "how", "many", "any", "with", "that", "s", "it"}
    q = [w for w in q if w not in stop and len(w) > 1]
    syn = {"finish": ["finish", "anodize", "plate", "coat", "oxide", "ra"], "material": ["material", "matl", "6061", "4140", "al", "aisi"], "hole": ["hole", "ø", "thru", "circle", "tap"],
           "thread": ["thread", "tap", "m6", "m20", "unc"], "tolerance": ["tolerance", "±", "tol"], "datum": ["datum", "gd&t"], "revision": ["rev", "revision", "eco"], "spec": ["spec", "qs-", "asme", "ams", "mil-"],
           "surface": ["surface", "ra", "finish"], "bore": ["bore", "ø", "h7", "h8"], "quantity": ["qty", "quantity"], "weight": ["weight", "mass"]}
    words = set(q)
    for w in list(q):
        for key, vals in syn.items():
            if w.startswith(key[:4]): words.update(vals)
    scored = []
    for l in lines:
        t = (l["src"] + " " + l["text"]).lower()
        s = sum(2 if w in t else 0 for w in words) + sum(1 for w in q if w in t)
        if s: scored.append((s, l))
    scored.sort(key=lambda x: -x[0])
    return [l for _, l in scored[:k]]

FIELD_WORDS = {"finish": "finish", "coating": "finish", "material": "material", "alloy": "material", "revision": "rev", "rev": "rev", "part number": "part_no", "eco": "eco",
               "title": "title", "drawn": "drawn", "checked": "checked", "approved": "approved", "sheet": "sheet", "scale": "scale"}

def _field_answer(job, question):
    """Direct answer for title-block questions ('what is the finish on the bracket?') without a model call."""
    q = question.lower()
    if re.search(r"\b(po|purchase|bom|order|consisten|model|step|compare|differ)\w*", q): return None   # document-level questions go to retrieval
    field = next((f for w, f in FIELD_WORDS.items() if w in q), None)
    if not field: return None
    cands = []
    for d in job.get("drawings", []):
        ex = d.get("extraction") or {}
        tb = ex.get("title_block", {}).get("fields", {})
        if not tb: continue
        pn = (tb.get("part_no") or {}).get("value", "") or ""; title = ((tb.get("title") or {}).get("value", "") or "").lower()
        score = 0
        if pn and pn.lower() in q: score += 3
        for w in re.findall(r"[a-z]{4,}", title):
            if w in q: score += 2
        if d["file"].lower().split(".")[0] in q: score += 3
        cands.append((score, d, tb))
    if not cands: return None
    cands.sort(key=lambda c: -c[0])
    best = cands[0]
    if best[0] == 0 and len(cands) > 1:
        # ambiguous: list every drawing's value
        parts = []
        for _, d, tb in cands:
            v = (tb.get(field) or {}).get("value") or "(blank)"
            parts.append(f"{(tb.get('part_no') or {}).get('value') or d['file']} Rev {(tb.get('rev') or {}).get('value') or '-'}: {field.replace('_', ' ')} = {v}  [{(tb.get('part_no') or {}).get('value') or d['file']} · title block]")
        return {"answer": "\n".join(parts), "citations": [p.split("[")[-1].rstrip("]") for p in parts]}
    _, d, tb = best
    v = (tb.get(field) or {}).get("value") or ""
    pn = (tb.get("part_no") or {}).get("value") or d["file"]; rev = (tb.get("rev") or {}).get("value") or "-"
    src = f"{pn} Rev {rev} · title block"
    extra = ""
    ex = d.get("extraction") or {}
    if field == "finish":
        notes = [n for n in ex.get("notes", []) if re.match(r"^\s*FINISH", n["text"].upper())]
        if notes: extra = f" Note {notes[0]['n']} adds: {notes[0]['text']}  [{pn} Rev {rev} · note {notes[0]['n']}]"
    if field == "material":
        notes = [n for n in ex.get("notes", []) if "MATERIAL" in n["text"].upper()]
        if notes: extra = f" Note {notes[0]['n']} says: {notes[0]['text']}  [{pn} Rev {rev} · note {notes[0]['n']}]"
    if not v:
        return {"answer": f"The {field.replace('_', ' ')} field in the title block of {pn} Rev {rev} is blank.  [{src}]", "citations": [src]}
    return {"answer": f"{field.replace('_', ' ').capitalize()} on {pn} Rev {rev} ({(tb.get('title') or {}).get('value') or ''}): {v}.  [{src}]{extra}", "citations": [src]}

def answer(job, question, history=None):
    """Facade kept for callers and tests: the LangGraph agent (Claude tools) when credentials exist, the local planner otherwise."""
    from .orchestration.agent import get_agent
    return get_agent().ask(job, question, history)
