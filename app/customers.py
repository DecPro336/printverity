"""Customer setup, done from the Setup screen: title-block wording per customer, and the reference data every check reads
(spec library, released revisions). A new customer is set up once, in the browser; no server command is involved.

Title-block wording is a profile (PROFILES_DIR/<customer-slug>.json) layered on the standard vocabulary. To make setup quick,
the title blocks of the customer's uploaded drawings are scanned for labels and block attributes the vocabulary does not
recognise yet, each with an example value and a suggested field."""
from __future__ import annotations
import csv, io, re, statistics
from pathlib import Path
from . import config, patterns as P, store
from .util import PROFILES_DIR, PLM_FILE, SPEC_LIBRARY, load_json, save_json, now

FIELDS = [("part_no", "Part number"), ("rev", "Revision"), ("title", "Title"), ("material", "Material"), ("finish", "Finish"),
          ("eco", "Change order (ECO)"), ("drawn", "Drawn by"), ("checked", "Checked by"), ("approved", "Approved by"),
          ("sheet", "Sheet"), ("scale", "Scale"), ("date", "Date"), ("size", "Sheet size"), ("units", "Units")]
FIELD_KEYS = [k for k, _ in FIELDS]
SEVERITIES = ("critical", "high", "medium", "low")
_GENERIC = {"NO", "BY", "OF", "THE", "NUMBER", "NR", "D", "S"}


class SetupError(ValueError):
    """A setup request that cannot be applied; the message is shown to the user."""


# ------------------------------------------------------------------ customers and profiles
def _profile_path(slug: str) -> Path:
    if not re.fullmatch(r"[a-z0-9][a-z0-9-]{0,63}", slug or "") or slug == "default":
        raise SetupError("Unknown customer.")
    return PROFILES_DIR / f"{slug}.json"

def _jobs_by_customer() -> dict[str, list[dict]]:
    out: dict[str, list[dict]] = {}
    for s in store.list_jobs():
        slug = P.profile_slug(s.get("customer"))
        if slug and slug != "default": out.setdefault(slug, []).append(s)
    return out

def _missing_fields(job_ids: list[str]) -> dict[str, int]:
    """Title-block fields reported missing (TB-01) on the customer's drawings, with the number of drawings."""
    counts: dict[str, int] = {}
    for jid in job_ids:
        j = store.get_job(jid) or {}
        for d in j.get("drawings", []):
            for f in d.get("findings", []):
                if f.get("rule") == "TB-01" and f.get("status") != "rejected":
                    k = (f.get("evidence") or {}).get("field")
                    if k: counts[k] = counts.get(k, 0) + 1
    return counts

def list_customers() -> list[dict]:
    """Every customer that has uploaded drawings or a saved setup."""
    jobs = _jobs_by_customer(); out = {}
    for slug, js in jobs.items():
        out[slug] = {"slug": slug, "name": js[0]["customer"].strip(), "has_setup": False, "jobs": len(js),
                     "drawings": sum(len(j["drawings"]) for j in js), "missing": _missing_fields([j["id"] for j in js]), "updated": None}
    for f in sorted(PROFILES_DIR.glob("*.json")):
        if f.stem == "default": continue
        d = load_json(f, {})
        rec = out.setdefault(f.stem, {"slug": f.stem, "name": d.get("name") or f.stem, "jobs": 0, "drawings": 0, "missing": {}})
        rec.update(has_setup=True, name=d.get("name") or rec["name"], updated=d.get("updated"))
    return sorted(out.values(), key=lambda c: c["name"].lower())

def get_customer(slug: str) -> dict:
    path = _profile_path(slug); prof = load_json(path, {}) if path.exists() else {}
    jobs = _jobs_by_customer().get(slug, [])
    if not prof and not jobs: raise SetupError("Unknown customer. Upload a drawing package for it, or add it by name.")
    required = prof.get("required_fields") or P._BASE_REQUIRED
    severity = {**P._BASE_SEVERITY, **(prof.get("field_severity") or {})}
    fields = [{"field": k, "label": lab, "standard_labels": P._BASE_LABELS.get(k, []), "standard_tags": P._BASE_TAGS.get(k, []),
               "labels": list((prof.get("extra_labels") or {}).get(k, [])), "tags": list((prof.get("extra_attrib_tags") or {}).get(k, [])),
               "required": k in required, "severity": severity.get(k, "low")} for k, lab in FIELDS]
    name = prof.get("name") or (jobs[0]["customer"].strip() if jobs else slug)
    return {"slug": slug, "name": name, "has_setup": bool(prof), "updated": prof.get("updated"), "fields": fields,
            "jobs": [{"id": j["id"], "name": j["name"], "drawings": len(j["drawings"])} for j in jobs],
            "missing": _missing_fields([j["id"] for j in jobs]), "suggestions": suggestions(slug, name, jobs)}

def _clean_list(values, limit=20, maxlen=48) -> list[str]:
    out = []
    for v in values or []:
        v = re.sub(r"\s+", " ", str(v)).strip()
        if v and len(v) <= maxlen and v.upper() not in (x.upper() for x in out): out.append(v)
    if len(out) > limit: raise SetupError(f"At most {limit} entries per field.")
    return out

def save_customer(slug: str, body: dict) -> dict:
    """Write the customer's profile. body: {name, fields: [{field, labels, tags, required, severity}]}."""
    path = _profile_path(slug)
    name = re.sub(r"\s+", " ", str(body.get("name") or "")).strip()
    if not name: raise SetupError("Customer name is required.")
    if P.profile_slug(name) != slug: raise SetupError("The customer name does not match this customer.")
    labels, tags, required, severity = {}, {}, [], {}
    for row in body.get("fields") or []:
        k = row.get("field")
        if k not in FIELD_KEYS: raise SetupError(f"Unknown title-block field '{k}'.")
        if (ls := _clean_list(row.get("labels"))): labels[k] = ls
        if (ts := _clean_list(row.get("tags"))): tags[k] = ts
        if row.get("required"): required.append(k)
        sev = row.get("severity") or "low"
        if sev not in SEVERITIES: raise SetupError(f"Unknown severity '{sev}'.")
        severity[k] = sev
    prof = {"name": name, "description": f"Title-block wording for {name}", "updated": now(),
            "required_fields": required, "field_severity": severity, "extra_labels": labels, "extra_attrib_tags": tags}
    PROFILES_DIR.mkdir(parents=True, exist_ok=True); save_json(path, prof)
    return get_customer(slug)

def add_customer(name: str) -> dict:
    """Set up a customer before any of its drawings are uploaded."""
    name = re.sub(r"\s+", " ", str(name or "")).strip(); slug = P.profile_slug(name)
    if not slug or slug == "default": raise SetupError("Enter a customer name.")
    path = _profile_path(slug)
    if not path.exists():
        save_json(path, {"name": name, "description": f"Title-block wording for {name}", "updated": now(), "required_fields": list(P._BASE_REQUIRED),
                         "field_severity": dict(P._BASE_SEVERITY), "extra_labels": {}, "extra_attrib_tags": {}})
    return get_customer(slug)

def delete_customer(slug: str) -> None:
    path = _profile_path(slug)
    if path.exists(): path.unlink()

def customer_job_ids(slug: str) -> list[str]:
    return [j["id"] for j in _jobs_by_customer().get(slug, [])]


# ------------------------------------------------------------------ suggestions from the customer's own title blocks
def _tokens(s: str) -> set[str]:
    return {t for t in re.split(r"[^A-Z0-9]+", str(s).upper()) if t and t not in _GENERIC}

def guess_field(text: str) -> str | None:
    """The standard field whose wording shares the most words with `text` (SURFACE TREATMENT -> finish). The last word
    counts extra: in a label it is usually the noun that names the field (DWG SIZE is a size, not a drawing number)."""
    words = [t for t in re.split(r"[^A-Z0-9]+", str(text).upper()) if t and t not in _GENERIC]
    if not words: return None
    best, score = None, 0.0
    for k in FIELD_KEYS:
        vocab = set()
        for x in P._BASE_LABELS.get(k, []) + P._BASE_TAGS.get(k, []): vocab |= _tokens(x)
        sc = len(set(words) & vocab) + (0.5 if words[-1] in vocab else 0.0)
        if sc > score: best, score = k, sc
    return best

def _region(ex: dict):
    """Title-block area: the recognised field positions, widened by a margin scaled to the sheet's text height."""
    locs = [v["loc"] for v in ex.get("title_block", {}).get("fields", {}).values() if v.get("loc")]
    if len(locs) < 2: return None
    key = lambda l: l[2] if len(l) > 2 else None
    space = statistics.mode([key(l) for l in locs])
    locs = [l for l in locs if key(l) == space]
    xs, ys = [l[0] for l in locs], [l[1] for l in locs]
    hs = [t.get("h") or 0 for t in ex.get("texts", []) if t.get("h") and min(xs) <= t["loc"][0] <= max(xs) and min(ys) <= t["loc"][1] <= max(ys)]
    hm = statistics.median(hs) if hs else 2.5
    w, h = max(xs) - min(xs), max(ys) - min(ys)
    mx, my = 0.2 * w + 10 * hm, 0.35 * h + 6 * hm
    return (min(xs) - mx, min(ys) - my, max(xs) + mx, max(ys) + my, space)

def _in_region(t, r) -> bool:
    x0, y0, x1, y1, space = r; l = t.get("loc") or [None, None]
    if l[0] is None or not (x0 <= l[0] <= x1 and y0 <= l[1] <= y1): return False
    return (l[2] if len(l) > 2 else None) == space

def _looks_like_label(s: str) -> bool:
    letters = sum(c.isalpha() for c in s)
    return 2 <= len(s) <= 32 and len(s.split()) <= 4 and letters >= 0.7 * len(s.replace(" ", ""))

def _value_near(label, texts, known_labels):
    """The value printed with a label: the nearest text below it or to its right, as title blocks lay them out."""
    lx, ly = label["loc"][:2]; h = max(label.get("h") or 1.0, 0.5); best, bd = None, None
    for t in texts:
        if t is label or t["text"] in known_labels: continue
        dx, dy = t["loc"][0] - lx, ly - t["loc"][1]
        below = 0 < dy <= 5 * h and abs(dx) <= 6 * h
        right = 0 < dx <= 20 * h and abs(dy) <= 1.0 * h
        if below or right:
            d = dx * dx + dy * dy
            if bd is None or d < bd: best, bd = t, d
    return best

def _trivial(v) -> bool:
    return not v or len(re.sub(r"[^A-Za-z0-9]", "", str(v))) < 2

def suggestions(slug: str, name: str, jobs: list[dict]) -> list[dict]:
    """Labels and block attributes in this customer's title blocks that the current wording does not map to a field."""
    found: dict[tuple, dict] = {}
    P.load_profile(name)
    try:
        for js in jobs:
            j = store.get_job(js["id"]) or {}
            for d in j.get("drawings", []):
                ex = d.get("extraction")
                if not ex: continue
                r = _region(ex)
                if not r: continue
                read = {k: re.sub(r"\s+", " ", (v.get("value") or "")).strip().upper() for k, v in ex["title_block"]["fields"].items()}
                values = set(read.values()) - {""}
                in_value = lambda txt: any(re.search(r"(?<![A-Z0-9])" + re.escape(txt.upper()) + r"(?![A-Z0-9])", v) for v in values)
                inside = [t for t in ex.get("texts", []) if _in_region(t, r)]
                cands, labels_here = [], set()
                for t in inside:
                    txt = re.sub(r"\s+", " ", t["text"]).strip()
                    if t.get("kind") == "attrib" and t.get("tag"):
                        if P.field_for_tag(t["tag"]) or txt.upper() in values: continue
                        cands.append(("tag", t["tag"].upper(), txt, t))
                    elif _looks_like_label(txt) and not P.field_for_label(txt)[0] and not in_value(txt):
                        cands.append(("label", txt.upper().rstrip(":"), None, t)); labels_here.add(t["text"])
                known = {t["text"] for t in inside if P.field_for_label(t["text"])[0]}
                examples = {}
                for kind, key, example, t in cands:
                    if kind == "label":
                        v = _value_near(t, inside, known | labels_here) or _value_near(t, inside, known)
                        examples[key] = v["text"].strip() if v else None
                value_texts = {v.upper() for v in examples.values() if v}
                for kind, key, example, t in cands:
                    if kind == "label" and key in value_texts: continue          # this text is another label's value
                    g = guess_field(key); shown = (example if kind == "tag" else examples.get(key)) or ""
                    if g and shown and read.get(g) == re.sub(r"\s+", " ", shown).strip().upper(): continue   # that field is already read on this sheet
                    rec = found.setdefault((kind, key), {"kind": kind, "text": key, "example": example if kind == "tag" else examples.get(key),
                                                         "field": guess_field(key), "drawings": 0, "files": []})
                    ex_val = example if kind == "tag" else examples.get(key)
                    if _trivial(rec["example"]) and not _trivial(ex_val): rec["example"] = ex_val      # prefer a real value to "-" or blank
                    rec["drawings"] += 1
                    if len(rec["files"]) < 3: rec["files"].append(d["file"])
    finally:
        P.load_profile(config.DEFAULT_PROFILE)
    return sorted(found.values(), key=lambda s: (s["field"] is None, -s["drawings"], s["text"]))[:24]


# ------------------------------------------------------------------ reference data: spec library and released revisions
def _norm_header(h) -> str:
    return re.sub(r"[^a-z0-9]+", "_", str(h or "").strip().lower()).strip("_")

def read_rows(data: bytes, filename: str) -> list[dict]:
    """Rows of a csv / tsv / xlsx register as dicts keyed by normalised header."""
    ext = Path(filename).suffix.lower()
    if ext in (".xlsx", ".xlsm"):
        import openpyxl
        ws = openpyxl.load_workbook(io.BytesIO(data), read_only=True, data_only=True).active
        rows = [[("" if c is None else str(c).strip()) for c in r] for r in ws.iter_rows(values_only=True)]
    elif ext in (".csv", ".tsv", ".txt"):
        text = data.decode("utf-8-sig", errors="replace")
        try: dialect = csv.Sniffer().sniff(text[:4096], delimiters=",;\t")
        except csv.Error: dialect = csv.excel
        rows = [[c.strip() for c in r] for r in csv.reader(io.StringIO(text), dialect)]
    else:
        raise SetupError("Upload the register as .csv or .xlsx.")
    rows = [r for r in rows if any(r)]
    if len(rows) < 2: raise SetupError("The file has no data rows under a header row.")
    head = [_norm_header(h) for h in rows[0]]
    return [dict(zip(head, r)) for r in rows[1:]]

def _pick(row: dict, *names) -> str:
    for n in names:
        if row.get(n, "").strip(): return row[n].strip()
    return ""

def _rev_key(rev: str):
    r = re.sub(r"[^A-Z0-9]", "", str(rev).upper())
    return (0, 0, "") if not r else (1, int(r), "") if r.isdigit() else (2, len(r), r)

_CURRENT = {"current", "active", "released", "valid", "in force"}
_SUPERSEDED = {"superseded", "obsolete", "withdrawn", "replaced", "inactive", "cancelled", "canceled"}

def list_specs() -> list[dict]:
    return sorted(load_json(SPEC_LIBRARY, {"specs": []}).get("specs", []), key=lambda s: s["ref"])

def import_specs(rows: list[dict]) -> dict:
    """Spec register rows: ref, revision, status (current / superseded), superseded_on, title, on_file."""
    lib = load_json(SPEC_LIBRARY, {"specs": [], "customer_rules": []}); idx = {s["ref"].upper(): s for s in lib.get("specs", [])}
    touched, errors = {}, []
    for i, r in enumerate(rows, start=2):
        ref = _pick(r, "ref", "spec", "specification", "spec_no", "document", "document_no", "number")
        rev = _pick(r, "revision", "rev")
        status = _pick(r, "status", "state").lower()
        if not ref or not rev: errors.append(f"Row {i}: spec reference and revision are required."); continue
        if status and status not in _CURRENT | _SUPERSEDED: errors.append(f"Row {i}: status '{status}' is neither current nor superseded."); continue
        ref = re.sub(r"\s+", " ", ref.upper()); rev = rev.upper()
        s = idx.get(ref) or {"ref": ref, "title": "", "revisions": [], "current": None, "superseded": {}, "on_file": True}
        idx[ref] = s; touched[ref] = True
        if rev not in s["revisions"]: s["revisions"].append(rev)
        if title := _pick(r, "title", "description", "name"): s["title"] = title
        on_file = _pick(r, "on_file", "controlled_copy", "held").lower()
        if on_file: s["on_file"] = on_file in ("yes", "y", "true", "1", "x")
        if status in _SUPERSEDED:
            s["superseded"][rev] = _pick(r, "superseded_on", "superseded", "withdrawn_on", "date") or "unknown date"
            if s.get("current") == rev: s["current"] = None
        else:
            s["superseded"].pop(rev, None)
            if not s.get("current") or _rev_key(rev) >= _rev_key(s["current"]): s["current"] = rev
    for ref in touched:
        s = idx[ref]; s["revisions"] = sorted(set(s["revisions"]), key=_rev_key)
        if not s.get("current"):
            live = [r for r in s["revisions"] if r not in s["superseded"]]
            s["current"] = live[-1] if live else s["revisions"][-1]
    if touched:
        lib["specs"] = sorted(idx.values(), key=lambda s: s["ref"]); save_json(SPEC_LIBRARY, lib)
    return {"imported": len(touched), "specs": sorted(touched), "errors": errors, "total": len(idx)}

def delete_spec(ref: str) -> bool:
    lib = load_json(SPEC_LIBRARY, {"specs": [], "customer_rules": []}); n = len(lib.get("specs", []))
    lib["specs"] = [s for s in lib.get("specs", []) if s["ref"].upper() != ref.strip().upper()]
    if len(lib["specs"]) == n: return False
    save_json(SPEC_LIBRARY, lib); return True

def list_revisions() -> list[dict]:
    parts = load_json(PLM_FILE, {"parts": {}}).get("parts", {})
    return [{"part_no": k, **v} for k, v in sorted(parts.items())]

def import_revisions(rows: list[dict]) -> dict:
    """Released-revision register rows: part_no, revision, eco, released, title. The latest release of a part becomes its
    current revision, earlier ones its history (what the PLM checks and the revision comparison read)."""
    plm = load_json(PLM_FILE, {"parts": {}}); parts = plm.setdefault("parts", {})
    touched, errors = {}, []
    for i, r in enumerate(rows, start=2):
        pn = _pick(r, "part_no", "part", "part_number", "pn", "item", "drawing_no", "dwg_no")
        rev = _pick(r, "revision", "rev")
        if not pn or not rev: errors.append(f"Row {i}: part number and revision are required."); continue
        pn = pn.strip().upper(); rev = rev.strip().upper()
        revs = touched.setdefault(pn, None)
        if revs is None:
            rec = parts.get(pn) or {}
            revs = {h["rev"]: dict(h) for h in rec.get("history", [])}
            if rec.get("rev"): revs[rec["rev"]] = {k: rec.get(k) for k in ("rev", "eco", "released") if rec.get(k)}
            touched[pn] = revs; revs["_title"] = rec.get("title", "")
        revs[rev] = {"rev": rev, "eco": _pick(r, "eco", "ecn", "change_order", "co", "change"), "released": _pick(r, "released", "release_date", "date")}
        if title := _pick(r, "title", "description", "name"): revs["_title"] = title
    for pn, revs in touched.items():
        title = revs.pop("_title", "")
        ordered = sorted(revs.values(), key=lambda h: (h.get("released") or "", _rev_key(h["rev"])))
        cur = ordered[-1]
        rec = {"rev": cur["rev"], "eco": cur.get("eco") or "", "released": cur.get("released") or "", "title": title}
        hist = [{k: v for k, v in h.items() if v} for h in ordered[:-1]]
        if hist: rec["history"] = hist
        parts[pn] = rec
    if touched: save_json(PLM_FILE, plm)
    return {"imported": len(touched), "parts": sorted(touched), "errors": errors, "total": len(parts)}

def delete_revision_record(part_no: str) -> bool:
    plm = load_json(PLM_FILE, {"parts": {}})
    if plm.get("parts", {}).pop(part_no.strip().upper(), None) is None: return False
    save_json(PLM_FILE, plm); return True
