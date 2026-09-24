"""Deterministic rule checks. Every check is isolated: one failing check never blocks the others."""
import re, logging, traceback
from .util import dist, fnum, load_json, new_id, PLM_FILE, SPEC_LIBRARY
from . import patterns as P

log = logging.getLogger("printverity.rules")

def _library():
    lib = load_json(SPEC_LIBRARY, {"specs": [], "customer_rules": []})
    idx = {}
    for s in lib.get("specs", []):
        idx[re.sub(r"\s+", " ", s["ref"].upper())] = s
    return idx, lib.get("customer_rules", [])

def _plm_lookup(part_no):
    """Released revision record for a part from Epicor when configured, else the local PLM file."""
    try:
        from .integrations.epicor import get_plm
        return get_plm().part_revision(part_no)
    except Exception as e:
        log.warning("PLM lookup failed: %s", e)
        return load_json(PLM_FILE, {"parts": {}}).get("parts", {}).get(part_no), "local"

RULES = [
    ("TB-00", "Title block", "high", "No title block labels or attributes detected"), ("TB-01", "Title block", "varies", "Required title block field missing"),
    ("TB-02", "Title block", "varies", "Title block field present but blank"), ("TB-03", "Title block", "low", "Revision value has an unusual form"),
    ("UN-01", "Units", "high", "Sheet references both millimeters and inches"), ("UN-02", "Units", "high", "File units disagree with the units note"), ("UN-03", "Units", "low", "No unit declaration"),
    ("GD-01", "GD&T", "critical", "Feature control frame references a datum that is not defined"), ("GD-02", "GD&T", "high", "Orientation/location tolerance without a datum reference"), ("GD-03", "GD&T", "low", "Datum defined but never referenced"),
    ("TH-01", "Thread / hole", "high", "Thread callout on a hole drawn at the major diameter"), ("TH-02", "Thread / hole", "medium", "Thread callout does not match the associated hole size"), ("TH-03", "Thread / hole", "high", "Thread callout on a hole larger than the thread major diameter"),
    ("DM-01", "Dimensioning", "medium", "Same feature points dimensioned twice"), ("DM-02", "Dimensioning", "low", "Same toleranced value appears more than once (PDF)"), ("DM-03", "Dimensioning", "high", "Dimension text override disagrees with the geometry"), ("DM-04", "Dimensioning", "low", "Reference dimension carries a tolerance"),
    ("TS-01", "Tolerance stack", "high", "Chain of dimensions does not close against the overall"), ("TS-02", "Tolerance stack", "high", "Sum of chained tolerances exceeds the overall tolerance"), ("TS-03", "Tolerance stack", "medium", "Fully toleranced chain plus toleranced overall (over-constrained)"),
    ("SP-01", "Spec reference", "low", "Referenced spec not in the spec library"), ("SP-02", "Spec reference", "medium", "Referenced spec revision is superseded"), ("SP-03", "Spec reference", "low", "Referenced spec revision unknown"),
    ("CR-01", "Customer rule", "high", "Keyway callout without a fit class"), ("CR-02", "Customer rule", "medium", "Chamfer note uses a C-code instead of size x angle"),
    ("RF-01", "Notes", "medium", "Reference to a DETAIL/SECTION/VIEW that does not exist on the sheet"), ("RF-02", "Parts list", "medium", "Note references an ITEM not in the parts list"), ("RF-03", "Parts list", "critical", "Balloon without a parts list entry"), ("RF-04", "Parts list", "high", "Parts list item never ballooned"),
    ("PL-01", "PLM", "low", "Part not found in PLM"), ("PL-02", "PLM", "high", "Drawing revision superseded in PLM"), ("PL-03", "PLM", "medium", "Drawing revision not released in PLM"), ("PL-04", "PLM", "high", "ECO on drawing differs from PLM"), ("PL-05", "PLM", "low", "No ECO in the title block"),
    ("MC-01", "Consistency", "medium", "Material note disagrees with the title block"), ("MC-02", "Consistency", "low", "Finish note may disagree with the title block"),
    ("HC-01", "Dimensioning", "medium", "Hole callout quantity differs from drawn circles"), ("HC-02", "Dimensioning", "low", "No circle matches the callout diameter"),
    ("SM-01", "Sheet metal", "critical", "Bend radius differs between formed view, notes and bend table"), ("SM-02", "Sheet metal", "high", "Material thickness stated inconsistently"),
    ("SM-03", "Sheet metal", "high", "Hole closer to a bend line than 2.5 × thickness + radius"), ("SM-04", "Sheet metal", "medium", "Flat-pattern length does not recompute from flanges and bend allowance"),
]

class F:
    """Finding builder."""
    def __init__(self):
        self.items = []
    def add(self, severity, category, title, detail, conf, loc=None, rule=None, evidence=None):
        self.items.append({"id": new_id("f_"), "severity": severity, "category": category, "title": title, "detail": detail,
                           "confidence": round(float(conf), 2), "loc": loc, "rule": rule, "evidence": evidence or {}, "status": "open", "note": ""})

def _tb(ex, field):
    f = ex.get("title_block", {}).get("fields", {}).get(field)
    return (f.get("value") or "").strip() if f else None

def run_all(ex):
    """ex: extraction dict. Returns list of findings sorted by severity."""
    fb = F()
    from . import sheetmetal
    checks = [check_title_block, check_units, check_datums, check_threads, check_duplicate_dims, check_overrides, check_chains,
              check_specs, check_customer_rules, check_references, check_eco, check_material_consistency, check_hole_counts, check_keyway_and_fits, sheetmetal.run]
    for c in checks:
        try:
            c(ex, fb)
        except Exception as e:
            log.error("check %s failed: %s\n%s", c.__name__, e, traceback.format_exc())
    order = {"critical": 0, "high": 1, "medium": 2, "low": 3}
    items = sorted(fb.items, key=lambda f: (order.get(f["severity"], 9), -f["confidence"]))
    for i, f in enumerate(items, 1):
        f["n"] = i
    return items

# ---------------------------------------------------------------- checks
def check_title_block(ex, fb):
    fields = ex.get("title_block", {}).get("fields", {})
    if not fields:
        fb.add("high", "Title block", "No title block detected", "No recognizable title block labels or attributes were found on the sheet. Part number, revision and material cannot be verified.", 0.85, None, "TB-00")
        return
    for f in P.REQUIRED_FIELDS:
        v = fields.get(f)
        if v is None:
            fb.add(P.FIELD_SEVERITY.get(f, "low"), "Title block", f"Title block field missing: {f.replace('_', ' ').upper()}",
                   f"No label or attribute for {f.replace('_', ' ')} was found in the title block.", 0.8, None, "TB-01", {"field": f})
        elif not (v.get("value") or "").strip():
            sev = P.FIELD_SEVERITY.get(f, "low")
            fb.add(sev, "Title block", f"Title block: {f.replace('_', ' ').upper()} field is blank",
                   f"The {f.replace('_', ' ')} cell exists but has no value." + (" Drawn and Approved are filled, Checked is not." if f == "checked" and _tb(ex, "drawn") and _tb(ex, "approved") else ""),
                   0.99 if v.get("source", "").startswith("attrib") else 0.9, v.get("loc"), "TB-02", {"field": f})
    rev = _tb(ex, "rev")
    if rev and not re.fullmatch(r"[A-Z]{1,2}|\d{1,2}|[A-Z]\d|-", rev):
        fb.add("low", "Title block", f"Revision value looks unusual: '{rev}'", "Expected a single letter or number revision.", 0.7, fields["rev"].get("loc"), "TB-03")

def check_units(ex, fb):
    units = ex.get("source", {}).get("units", "unknown")
    texts = " ".join(t["text"].upper() for t in ex.get("texts", []))
    says_mm = bool(re.search(r"\b(MILLIMETERS?|MM)\b", texts)); says_in = bool(re.search(r"\b(INCHES|INCH|IN\.)\b", texts))
    if says_mm and says_in:
        fb.add("high", "Units", "Sheet references both millimeters and inches", "Notes or callouts mention both unit systems. Confirm which applies to the dimensions.", 0.85, None, "UN-01")
    if units == "in" and says_mm and not says_in:
        fb.add("high", "Units", "File units are inches but the notes say millimeters", "The DXF header $INSUNITS is inches while a note declares millimeters. Dimension values may be misread by a factor of 25.4.", 0.9, None, "UN-02")
    if units == "mm" and says_in and not says_mm:
        fb.add("high", "Units", "File units are millimeters but the notes say inches", "The DXF header $INSUNITS is millimeters while a note declares inches.", 0.9, None, "UN-02")
    if units == "unknown" and not says_mm and not says_in and ex["source"]["kind"] == "dxf":
        fb.add("low", "Units", "No unit declaration found", "The DXF header has no unit setting and no note states the units. Add a units note.", 0.75, None, "UN-03")

def check_datums(ex, fb):
    defined = {d["id"] for d in ex.get("datums", [])}
    for fcf in ex.get("fcfs", []):
        refs = []
        for d in fcf.get("datums", []):
            refs.extend(re.findall(r"[A-Z]", d))
        missing = [d for d in refs if d not in defined]
        if missing:
            sym = fcf.get("symbol") or "feature control frame"
            tol = fcf.get("tolerance")
            fb.add("critical", "GD&T", f"Datum {', '.join(sorted(set(missing)))} referenced but not defined on the sheet",
                   f"The {sym} frame ({'Ø' if fcf.get('diameter') else ''}{tol} to {'-'.join(fcf.get('datums', []))}) references datum{'s' if len(missing) > 1 else ''} {', '.join(sorted(set(missing)))}. "
                   f"Defined datum feature symbols: {', '.join(sorted(defined)) or 'none'}.", 0.96, fcf.get("loc"), "GD-01", {"missing": missing, "defined": sorted(defined)})
        if fcf.get("symbol") in ("position", "perpendicularity", "parallelism", "angularity", "circular runout", "total runout", "concentricity", "symmetry") and not refs:
            fb.add("high", "GD&T", f"{(fcf.get('symbol') or 'Frame').capitalize()} tolerance has no datum reference",
                   "This characteristic requires at least one datum reference.", 0.92, fcf.get("loc"), "GD-02")
    used = set()
    for fcf in ex.get("fcfs", []):
        for d in fcf.get("datums", []): used.update(re.findall(r"[A-Z]", d))
    for d in ex.get("datums", []):
        if d["id"] not in used and ex.get("fcfs"):
            fb.add("low", "GD&T", f"Datum {d['id']} is defined but never referenced", "A datum feature symbol exists that no feature control frame uses.", 0.8, d.get("loc"), "GD-03")

def check_threads(ex, fb):
    units = ex.get("source", {}).get("units", "mm")
    for th in ex.get("threads", []):
        c = th.get("circle")
        if not c or th.get("tap_drill") is None or c.get("unscaled"): continue
        dia = round(c["r"] * 2, 3)
        td = th["tap_drill"]; major = th["major"]
        if th.get("units") == "in" and units == "mm":
            td *= 25.4; major *= 25.4
        if th.get("units") == "mm" and units == "in":
            td /= 25.4; major /= 25.4
        inch = units == "in"
        if abs(dia - td) <= max(0.0025 if inch else 0.06, td * 0.02):
            continue
        if dia > major + (0.002 if inch else 0.05):
            fb.add("high", "Thread / hole", f"Thread callout {th['spec']} on a Ø{dia:g} hole, larger than the thread major diameter",
                   f"The hole is drawn at Ø{dia:g}, a clearance size for {th['spec']} (major Ø{major:g}, tap drill Ø{td:.2f}). The thread callout is obsolete or the hole size is wrong.",
                   0.94, th.get("loc"), "TH-03", {"hole": dia, "tap_drill": round(td, 3), "spec": th["spec"], "via": c.get("via")})
        elif abs(dia - major) <= max(0.003 if inch else 0.08, major * 0.06):
            fb.add("high", "Thread / hole", f"Thread callout {th['spec']} on a Ø{dia:g} hole (major diameter, will not tap)",
                   f"The hole is drawn at Ø{dia:g}, which is the thread major diameter or a clearance size. Tap drill for {th['spec']} is Ø{td:.2f}. Either the hole should be Ø{td:.2f} or the thread callout is obsolete.",
                   0.93, th.get("loc"), "TH-01", {"hole": dia, "tap_drill": round(td, 3), "spec": th["spec"], "via": c.get("via")})
        else:
            fb.add("medium", "Thread / hole", f"Thread callout {th['spec']} does not match hole Ø{dia:g}",
                   f"Tap drill for {th['spec']} is Ø{td:.2f}. The associated hole is Ø{dia:g} (associated via {c.get('via')}).",
                   0.8 if c.get("via") == "proximity" else 0.9, th.get("loc"), "TH-02", {"hole": dia, "tap_drill": round(td, 3)})

def check_duplicate_dims(ex, fb):
    dims = [d for d in ex.get("dimensions", []) if d.get("type") in ("linear", "aligned") and d.get("p1") and d.get("p2")]
    for i, a in enumerate(dims):
        for b in dims[i+1:]:
            same = (dist(a["p1"], b["p1"]) < 0.05 and dist(a["p2"], b["p2"]) < 0.05) or (dist(a["p1"], b["p2"]) < 0.05 and dist(a["p2"], b["p1"]) < 0.05)
            if same and a.get("value") == b.get("value"):
                fb.add("medium", "Dimensioning", f"Duplicated dimension {a['text']}",
                       f"Two dimensions measure the same feature points ({a['p1']} to {a['p2']}) with the same value. Double dimensioning is not allowed under ASME Y14.5 and can conflict after a change.",
                       0.95, b.get("loc"), "DM-01", {"a": a["id"], "b": b["id"]})
    # PDF-style: same displayed text repeated with a tolerance and no geometry is only a hint
    if not dims and ex["source"]["kind"] == "pdf":
        texts = [d["text"] for d in ex.get("dimensions", [])]
        for t in set(texts):
            if texts.count(t) > 1 and ("±" in t or "Ø" in t):
                fb.add("low", "Dimensioning", f"Dimension '{t}' appears {texts.count(t)} times", "The same toleranced value appears more than once. Check whether the same feature is dimensioned twice.", 0.55, None, "DM-02")

def check_overrides(ex, fb):
    for d in ex.get("dimensions", []):
        if d.get("override") and d.get("type") in ("linear", "aligned", "diameter", "radius"):
            shown = fnum(d["text"])
            # measured geometry value is not stored when override replaced value; recover from evidence
            geo = d.get("measured")
            if geo is None: continue
            if shown is not None and abs(shown - geo) > max(0.01, geo * 0.001):
                fb.add("high", "Dimensioning", f"Dimension text '{d['text']}' does not match the geometry ({geo:g})",
                       f"The dimension text was overridden. The drawn feature measures {geo:g}. Either the geometry or the text is wrong.", 0.97, d.get("loc"), "DM-03", {"shown": shown, "measured": geo})

def check_chains(ex, fb):
    dims = [d for d in ex.get("dimensions", []) if d.get("type") in ("linear",) and d.get("p1") and d.get("p2") and d.get("value") is not None]
    def axis(d):
        dx = abs(d["p2"][0] - d["p1"][0]); dy = abs(d["p2"][1] - d["p1"][1])
        return "x" if dx >= dy else "y"
    for ax in ("x", "y"):
        group = [d for d in dims if axis(d) == ax]
        k = 0 if ax == "x" else 1
        for overall in group:
            if overall.get("override") and overall.get("measured") is not None and fnum(overall["text"]) is not None and abs(fnum(overall["text"]) - overall["measured"]) > 0.01:
                continue   # already reported as an override mismatch (DM-03)
            lo, hi = sorted([overall["p1"][k], overall["p2"][k]])
            inner = [d for d in group if d is not overall and min(d["p1"][k], d["p2"][k]) >= lo - 0.05 and max(d["p1"][k], d["p2"][k]) <= hi + 0.05]
            if len(inner) < 2: continue
            # try to build a contiguous chain from lo to hi
            segs = sorted([(min(d["p1"][k], d["p2"][k]), max(d["p1"][k], d["p2"][k]), d) for d in inner], key=lambda s: (s[0], s[1]))
            chain = []; cur = lo
            for s, e, d in segs:
                if abs(s - cur) < 0.05 and e > cur:
                    chain.append(d); cur = e
            if len(chain) >= 2 and abs(cur - hi) < 0.05:
                total = sum(d["value"] for d in chain)
                ov = overall["value"]
                if abs(total - ov) > max(0.01, ov * 0.0005):
                    fb.add("high", "Tolerance stack", f"Chain of dimensions ({' + '.join(f'{d['value']:g}' for d in chain)} = {total:g}) does not close against overall {overall['text']}",
                           "The chained dimensions and the overall dimension disagree. One of them is wrong, or the overall was edited after a change.", 0.96, overall.get("loc"), "TS-01",
                           {"chain": [d["id"] for d in chain], "sum": total, "overall": ov})
                else:
                    tp = sum((d.get("tol") or {}).get("plus", 0) for d in chain); tm = sum((d.get("tol") or {}).get("minus", 0) for d in chain)
                    ot = overall.get("tol")
                    if ot and (tp > ot["plus"] + 1e-9 or tm > ot["minus"] + 1e-9):
                        fb.add("high", "Tolerance stack", f"Tolerance stack-up exceeds overall tolerance {overall['text']}",
                               f"Sum of chained tolerances is +{tp:g}/-{tm:g}, overall allows +{ot['plus']:g}/-{ot['minus']:g}.", 0.95, overall.get("loc"), "TS-02")
                    if ot and all(d.get("tol") for d in chain):
                        fb.add("medium", "Tolerance stack", "Overall and every link of the chain are toleranced", "A fully toleranced chain plus a toleranced overall over-constrains the part. One dimension should be a reference (REF) or basic.", 0.85, overall.get("loc"), "TS-03")

def check_specs(ex, fb):
    idx, _ = _library()
    for sp in ex.get("specs", []):
        key = re.sub(r"\s+", " ", sp["ref"].upper())
        rec = idx.get(key)
        if rec is None:
            # try loose match (ASTM A 105 vs ASTM A105)
            rec = idx.get(key.replace(" ", "")) or next((v for k, v in idx.items() if k.replace(" ", "") == key.replace(" ", "")), None)
        if rec is None:
            hint = ""
            try:
                from .retrieval import get_retriever
                near = get_retriever().nearest_spec(sp["ref"])
                if near: hint = f" Closest spec on file: {near.title} (similarity {near.score:.2f})."
            except Exception: pass
            fb.add("low", "Spec reference", f"Referenced spec {sp['ref']} is not in the spec library", f"'{sp['text'][:90]}' references {sp['ref']}, which is not on file. Confirm the shop has a controlled copy.{hint}", 0.8, sp.get("loc"), "SP-01", {"ref": sp["ref"]})
            continue
        rev = sp.get("rev")
        if rev and rev != rec.get("current") and rev in rec.get("superseded", {}):
            fb.add("medium", "Spec reference", f"{sp['ref']} Rev {rev} is superseded (current: Rev {rec['current']})",
                   f"'{sp['text'][:90]}'. Library shows Rev {rev} superseded on {rec['superseded'][rev]}. Current revision is {rec['current']}.", 0.92, sp.get("loc"), "SP-02", {"ref": sp["ref"], "rev": rev, "current": rec["current"]})
        elif rev and rev not in rec.get("revisions", []):
            fb.add("low", "Spec reference", f"{sp['ref']} Rev {rev} is not a known revision", f"Known revisions: {', '.join(rec.get('revisions', []))}.", 0.7, sp.get("loc"), "SP-03")

def check_customer_rules(ex, fb):
    _, rules = _library()
    texts = ex.get("texts", [])
    for r in rules:
        pat = r.get("pattern", "").upper()
        for t in texts:
            U = t["text"].upper()
            if pat and pat in U:
                if r.get("requires") == "fit_class" and not P.FIT_CLASS.search(t["text"]):
                    fb.add("high", "Customer rule", f"'{t['text']}' has no fit class", r["text"], 0.9, t["loc"], r["id"])
                if r.get("forbid") and re.search(r["forbid"], t["text"]):
                    fb.add("medium", "Customer rule", f"Note uses a C-code chamfer: '{t['text'][:60]}'", r["text"], 0.85, t["loc"], r["id"])

def check_references(ex, fb):
    texts = ex.get("texts", [])
    alltext = [t["text"].upper() for t in texts]
    # DETAIL B / SECTION C-C references must exist as a view title somewhere
    for t in texts:
        for m in P.DETAIL_REF.finditer(t["text"].upper()):
            kind, name = m.group(1), m.group(2)
            ref = f"{kind} {name}"
            is_title = re.fullmatch(rf"\s*{kind}\s+{re.escape(name)}\s*(\(.*\))?", t["text"].upper())
            if is_title: continue
            if not any(re.fullmatch(rf"\s*{kind}\s+{re.escape(name)}\s*(\(.*\))?", u) for u in alltext):
                # section arrows ("A") are drawn as letters; accept a single-letter label for SECTION X-X
                if kind == "SECTION" and name.split("-")[0] in [u.strip() for u in alltext]:
                    continue
                fb.add("medium", "Notes", f"Reference to {ref} but no {ref} exists on the sheet", f"'{t['text'][:80]}' refers to {ref}. No view with that title was found on this sheet. Check the other sheets or remove the reference.", 0.85, t["loc"], "RF-01", {"ref": ref})
    # ITEM n references vs parts list
    items = set()
    pl = ex.get("parts_list")
    if pl:
        items = {str(r.get("item")) for r in pl.get("rows", [])}
    if items:
        for t in texts:
            for m in P.ITEM_REF.finditer(t["text"]):
                if m.group(1) not in items:
                    fb.add("medium", "Parts list", f"Note references ITEM {m.group(1)}, which is not in the parts list", f"'{t['text'][:80]}'. Parts list items: {', '.join(sorted(items, key=lambda x: int(x) if x.isdigit() else 0))}.", 0.9, t["loc"], "RF-02")
    # balloons vs parts list
    if pl and ex.get("balloons"):
        for b in ex["balloons"]:
            if str(b["n"]) not in items:
                fb.add("critical", "Parts list", f"Balloon {b['n']} has no parts list entry", f"A balloon numbered {b['n']} is on the drawing but the parts list has items {', '.join(sorted(items, key=lambda x: int(x) if x.isdigit() else 0))} only.", 0.96, b["loc"], "RF-03")
        ballooned = {str(b["n"]) for b in ex["balloons"]}
        for r in pl.get("rows", []):
            if str(r.get("item")) not in ballooned:
                fb.add("high", "Parts list", f"Item {r.get('item')} ({r.get('part_no')}) is in the parts list but not ballooned in any view", f"Qty {r.get('qty')} {r.get('description', '')}. Confirm it is shown on another sheet.", 0.88, None, "RF-04")

def check_eco(ex, fb):
    pn = _tb(ex, "part_no"); rev = _tb(ex, "rev"); eco = _tb(ex, "eco")
    if not pn: return
    rec, source = _plm_lookup(pn)
    loc = (ex.get("title_block", {}).get("fields", {}).get("eco") or {}).get("loc")
    if rec is None:
        fb.add("low", "PLM", f"Part {pn} not found in PLM ({source})", "No released record for this part number. New part, or the number is mistyped.", 0.7, loc, "PL-01")
        return
    if rev and rec.get("rev") and rev != rec["rev"]:
        hist = {h["rev"]: h for h in rec.get("history", [])}
        if rev in hist:
            fb.add("high", "PLM", f"Drawing is Rev {rev} but PLM has Rev {rec['rev']} released", f"Rev {rev} was superseded by {rec['rev']} ({rec.get('eco')}, released {rec.get('released')}). This drawing is out of date.", 0.95, loc, "PL-02")
        else:
            fb.add("medium", "PLM", f"Drawing Rev {rev} is not released in PLM (latest: Rev {rec['rev']})", "Either the release is pending or the revision letter is wrong.", 0.85, loc, "PL-03")
    if eco and rec.get("eco") and rev == rec.get("rev") and eco.upper().replace(" ", "") != rec["eco"].upper().replace(" ", ""):
        fb.add("high", "PLM", f"ECO on drawing ({eco}) does not match PLM ({rec['eco']}) for Rev {rev}", "The change order recorded in the title block is not the one that released this revision.", 0.94, loc, "PL-04", {"drawing": eco, "plm": rec["eco"]})
    if not eco and rev and rev not in ("-", "A", "1"):
        fb.add("low", "PLM", "No ECO number in the title block", f"PLM released Rev {rec.get('rev')} under {rec.get('eco')}.", 0.7, loc, "PL-05")

def check_material_consistency(ex, fb):
    mat = _tb(ex, "material")
    if not mat: return
    for n in ex.get("notes", []):
        m = re.search(r"MATERIAL\s*:\s*([A-Z0-9 \-]+?)(?:,|\.|$)", n["text"].upper())
        if m:
            note_mat = m.group(1).strip()
            a = re.sub(r"[^A-Z0-9]", "", note_mat); b = re.sub(r"[^A-Z0-9]", "", mat.upper())
            if a and b and a not in b and b not in a:
                fb.add("medium", "Consistency", f"Material differs: note says '{note_mat}', title block says '{mat}'",
                       "The material note and the title block disagree. Temper or alloy mismatch changes purchasing and certs.", 0.88, n.get("loc"), "MC-01", {"note": note_mat, "title": mat})
    fin = _tb(ex, "finish")
    if fin and fin not in ("-", "NONE", "N/A"):
        fin_notes = [n for n in ex.get("notes", []) if re.match(r"^\s*FINISH\s*:", n["text"].upper())]
        for n in fin_notes:
            U = n["text"].upper()
            key = re.sub(r"[^A-Z]", "", fin.upper())[:6]
            if key and key not in re.sub(r"[^A-Z]", "", U):
                fb.add("low", "Consistency", f"Finish note may disagree with title block finish '{fin}'", f"Note: '{n['text'][:80]}'.", 0.6, n.get("loc"), "MC-02")

def check_hole_counts(ex, fb):
    circles = [c for c in ex.get("circles", []) if not c.get("unscaled")]
    if not circles: return
    for c in ex.get("callouts", []):
        m = P.HOLE_CALLOUT.search(c["text"])
        if not m: continue
        n = int(m.group(1)); dia = float(m.group(2))
        actual = len([ci for ci in circles if abs(ci["r"] * 2 - dia) <= max(0.03, dia * 0.005)])
        if actual and actual != n:
            fb.add("medium", "Dimensioning", f"Callout says {n}X Ø{dia:g} but {actual} circle{'s' if actual != 1 else ''} of that size {'are' if actual != 1 else 'is'} drawn",
                   "The quantity in the hole callout does not match the geometry in this view. Holes on other views or sheets may account for it.", 0.8, c.get("loc"), "HC-01", {"callout": n, "drawn": actual})
        elif actual == 0:
            fb.add("low", "Dimensioning", f"No Ø{dia:g} circle found for callout '{c['text']}'", "The callout diameter does not match any drawn circle (within 0.5%). The hole may be drawn at a different size.", 0.7, c.get("loc"), "HC-02")

def check_keyway_and_fits(ex, fb):
    # diameters with a fit class should have a matching h/k/H tolerance text, informational only
    for d in ex.get("dimensions", []):
        t = d.get("text", "")
        if re.search(r"\bREF\b", t.upper()) and d.get("tol"):
            fb.add("low", "Dimensioning", f"Reference dimension '{t}' carries a tolerance", "Reference dimensions are untoleranced by definition.", 0.9, d.get("loc"), "DM-04")
