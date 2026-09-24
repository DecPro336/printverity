"""Shared regexes, tables and label vocabularies used by extraction and rules."""
import re

TITLE_LABELS = {
    "part_no":  ["PART NO", "PART NO.", "PART NUMBER", "DWG NO", "DWG NO.", "DRAWING NO", "DRAWING NO.", "DRAWING NUMBER", "P/N", "PN", "DWG. NO.", "PART#", "DWG #"],
    "rev":      ["REV", "REV.", "REVISION", "REV:", "ISSUE"],
    "title":    ["TITLE", "DESCRIPTION", "PART NAME", "NAME"],
    "material": ["MATERIAL", "MATL", "MAT'L", "MATL.", "MAT"],
    "finish":   ["FINISH", "SURFACE FINISH", "COATING", "TREATMENT"],
    "eco":      ["ECO", "ECN", "ECO NO", "ECN NO", "CHANGE NO", "ECO #"],
    "drawn":    ["DRAWN", "DRN", "DRAWN BY", "DRAWN:", "AUTHOR", "DESIGNED"],
    "checked":  ["CHECKED", "CHK", "CHK'D", "CHECKED BY", "CHKD", "CHECK"],
    "approved": ["APPROVED", "APPD", "APPR", "APPROVED BY", "APVD", "APP'D"],
    "sheet":    ["SHEET", "SHT", "SHEET NO"],
    "scale":    ["SCALE"],
    "date":     ["DATE"],
    "size":     ["SIZE"],
    "units":    ["UNITS", "UNIT"],
}
ATTRIB_TAGS = {
    "part_no":  ["PARTNO", "PART_NO", "PART-NO", "DWGNO", "DWG_NO", "DRAWINGNO", "PN", "PARTNUMBER", "NUMBER", "DWG"],
    "rev":      ["REV", "REVISION", "REV_NO"],
    "title":    ["TITLE", "TITLE1", "DESCRIPTION", "DESC", "PARTNAME", "NAME"],
    "material": ["MATERIAL", "MATL", "MAT"],
    "finish":   ["FINISH", "SURFACE", "COATING"],
    "eco":      ["ECO", "ECN", "CHANGE"],
    "drawn":    ["DRAWN", "DRAWNBY", "DRN", "AUTHOR"],
    "checked":  ["CHECKED", "CHK", "CHKD", "CHECKEDBY"],
    "approved": ["APPROVED", "APPD", "APPR", "APPROVEDBY"],
    "sheet":    ["SHEET", "SHT", "SHEETNO"],
    "scale":    ["SCALE"],
    "date":     ["DATE"],
    "size":     ["SIZE"],
}
REQUIRED_FIELDS = ["part_no", "rev", "title", "material", "finish", "drawn", "checked", "approved", "sheet"]
FIELD_SEVERITY = {"part_no": "high", "rev": "high", "title": "medium", "material": "high", "finish": "medium",
                  "drawn": "low", "checked": "low", "approved": "medium", "sheet": "low"}

NOTE_LINE = re.compile(r"^\s*(\d{1,2})\s*[.):-]\s*(.+)$")
SPEC_PATTERNS = [
    re.compile(r"\b(ASME\s*Y14\.5)(?:[- ](\d{4}))?", re.I),
    re.compile(r"\b(ASME\s*B\d+(?:\.\d+)*)(?:[- ](\d{4}))?", re.I),
    re.compile(r"\b(ASTM\s*[A-Z]\s?\d+[A-Z]?)(?:[- ](\d{2,4}))?", re.I),
    re.compile(r"\b(AMS\s*\d{4}[A-Z]?)", re.I),
    re.compile(r"\b(MIL-[A-Z]{1,4}-\d+[A-Z]?)", re.I),
    re.compile(r"\b(ISO\s*\d{3,5}(?:-\d+)?)(?::(\d{4}))?", re.I),
    re.compile(r"\b(SAE\s*(?:J|AS)\d+)", re.I),
    re.compile(r"\b(NAS\s?\d{3,5})", re.I),
    re.compile(r"\b([A-Z]{2,4}-\d{3})\b(?:\s*REV(?:ISION)?\.?\s*([A-Z]|\d+))?", 0),   # customer specs like QS-114 REV B
]
THREAD_METRIC = re.compile(r"(?<![A-Za-z0-9-])M\s?(\d+(?:\.\d+)?)\s*(?:[xX×]\s*(\d+(?:\.\d+)?))?\s*(?:-\s*([4-8][gGhH]))?")
THREAD_UNIFIED = re.compile(r"(#\d+|\d+/\d+|0?\.\d{3,4})\s*-\s*(\d{2})\s*(UNC|UNF|UNEF|UN)?\b", re.I)
COARSE_PITCH = {1.6: 0.35, 2: 0.4, 2.5: 0.45, 3: 0.5, 4: 0.7, 5: 0.8, 6: 1.0, 8: 1.25, 10: 1.5, 12: 1.75, 14: 2.0, 16: 2.0, 18: 2.5, 20: 2.5, 24: 3.0, 30: 3.5}
UNIFIED_TAP = {"#4-40": 0.0890, "#6-32": 0.1065, "#8-32": 0.1360, "#10-24": 0.1495, "#10-32": 0.1590, "1/4-20": 0.2010, "1/4-28": 0.2130,
               "5/16-18": 0.2570, "5/16-24": 0.2720, "3/8-16": 0.3125, "3/8-24": 0.3320, "7/16-14": 0.3680, "7/16-20": 0.3906,
               "1/2-13": 0.4219, "1/2-20": 0.4531, "5/8-11": 0.5312, "5/8-18": 0.5625, "3/4-10": 0.6562, "3/4-16": 0.6875}
UNIFIED_MAJOR = {"#4": 0.112, "#6": 0.138, "#8": 0.164, "#10": 0.190, "1/4": 0.25, "5/16": 0.3125, "3/8": 0.375, "7/16": 0.4375, "1/2": 0.5, "5/8": 0.625, "3/4": 0.75}
HOLE_CALLOUT = re.compile(r"(\d+)\s*[xX×]\s*Ø\s*(\d+(?:\.\d+)?)")
DIA_TEXT = re.compile(r"Ø\s*(\d+(?:\.\d+)?)")
CALLOUT_WORDS = ("Ø", "THRU", "TAP ", "DEEP", "C'BORE", "CBORE", "CSK", "CSINK", "SLOT", "REAM", "DRILL", "SPOTFACE", "KEYWAY", "CHAMFER", "TYP", "PLACES", "PLCS")
PROCESS_WORDS = ("TAP", "DEBURR", "HEAT TREAT", "HARDEN", "ANODIZE", "PLATE", "PAINT", "POWDER", "GRIND", "POLISH", "WELD", "BEND", "FINISH", "MASK", "PASSIVATE", "BLACK OXIDE", "TORQUE", "PRESS")
DETAIL_REF = re.compile(r"\b(DETAIL|SECTION|VIEW)\s+([A-Z](?:-[A-Z])?)\b")
ITEM_REF = re.compile(r"\bITEM\s+(\d+)\b", re.I)

GDT_SYMBOLS = {"j": "position", "b": "perpendicularity", "f": "parallelism", "c": "flatness", "h": "circular runout", "t": "total runout",
               "r": "concentricity", "i": "symmetry", "d": "profile of a surface", "k": "profile of a line", "e": "circularity",
               "g": "cylindricity", "u": "straightness", "a": "angularity"}
GDT_MODIFIERS = {"m": "M", "l": "L", "n": "Ø", "p": "P", "s": "S", "t": "T", "f": "F"}
FIT_CLASS = re.compile(r"\b\d+(?:\.\d+)?\s*[A-Za-z]{1,2}\d{1,2}\b")   # 8 N9, 25 h6

def norm_label(s):
    return re.sub(r"[^A-Z0-9/#'.]", "", s.upper().replace(" ", ""))

LABEL_INDEX = {}
for field, labels in TITLE_LABELS.items():
    for l in labels:
        LABEL_INDEX[norm_label(l)] = field
TAG_INDEX = {}
for field, tags in ATTRIB_TAGS.items():
    for t in tags:
        TAG_INDEX[norm_label(t)] = field

def field_for_label(text):
    """Return (field, inline_value) if text is a title-block label (optionally with an inline value)."""
    t = text.strip()
    if not t or len(t) > 24:
        return None, None
    if ":" in t:
        lab, val = t.split(":", 1)
        f = LABEL_INDEX.get(norm_label(lab))
        if f: return f, val.strip() or None
    f = LABEL_INDEX.get(norm_label(t))
    if f: return f, None
    # "REV D", "SHEET 1 OF 2", "SCALE 1:2"
    parts = t.split(None, 1)
    if len(parts) == 2:
        f = LABEL_INDEX.get(norm_label(parts[0]))
        if f and f in ("rev", "sheet", "scale", "size", "date"):
            return f, parts[1].strip()
    return None, None

def field_for_tag(tag):
    n = norm_label(tag)
    if n in TAG_INDEX: return TAG_INDEX[n]
    for k, f in TAG_INDEX.items():
        if k and (n.startswith(k) or n.endswith(k)):
            return f
    return None


# ---------------------------------------------------------------- customer profiles
import json as _json
from .util import PROFILES_DIR as _PROFILE_DIR, SPEC_LIBRARY as _SPEC_LIBRARY

# ---------------------------------------------------------------- specs on file are recognised by their exact reference
_LIB_RX = {"mtime": None, "rx": []}

def library_spec_patterns():
    """One pattern per spec in the library (reloaded when the library file changes), so a customer's own spec numbering,
    e.g. NB-QS-27, is recognised once its register is imported. Returns [(canonical ref, compiled pattern)]."""
    try: mt = _SPEC_LIBRARY.stat().st_mtime
    except OSError: return []
    if _LIB_RX["mtime"] != mt:
        try: refs = [s["ref"] for s in _json.loads(_SPEC_LIBRARY.read_text(encoding="utf-8")).get("specs", []) if s.get("ref")]
        except Exception: refs = []
        rx = []
        for ref in sorted({re.sub(r"\s+", " ", r.upper()).strip() for r in refs}, key=len, reverse=True):
            body = r"\s*".join(re.escape(p) for p in ref.split())
            rx.append((ref, re.compile(r"(?<![A-Z0-9])(" + body + r")(?![A-Z0-9])(?:\s*,?\s*REV(?:ISION)?\.?\s*([A-Z]{1,2}\b|\d+))?", re.I)))
        _LIB_RX.update(mtime=mt, rx=rx)
    return _LIB_RX["rx"]
_BASE_LABELS = {k: list(v) for k, v in TITLE_LABELS.items()}
_BASE_TAGS = {k: list(v) for k, v in ATTRIB_TAGS.items()}
_BASE_REQUIRED = list(REQUIRED_FIELDS); _BASE_SEVERITY = dict(FIELD_SEVERITY)
ACTIVE_PROFILE = "default"

def _rebuild_indexes():
    LABEL_INDEX.clear(); TAG_INDEX.clear()
    for field, labels in TITLE_LABELS.items():
        for l in labels: LABEL_INDEX[norm_label(l)] = field
    for field, tags in ATTRIB_TAGS.items():
        for t in tags: TAG_INDEX[norm_label(t)] = field

def profile_slug(name):
    return re.sub(r"[^a-z0-9]+", "-", (name or "").strip().lower()).strip("-")

def list_profiles():
    out = []
    for f in sorted(_PROFILE_DIR.glob("*.json")):
        try:
            d = _json.loads(f.read_text(encoding="utf-8")); out.append({"slug": f.stem, "name": d.get("name", f.stem), "description": d.get("description", "")})
        except Exception: continue
    return out

def load_profile(name="default"):
    """Activate a title-block profile: base vocabulary plus the profile's extras. Unknown profile -> default."""
    global ACTIVE_PROFILE
    slug = profile_slug(name) or "default"
    path = _PROFILE_DIR / f"{slug}.json"
    if not path.exists(): slug = "default"; path = _PROFILE_DIR / "default.json"
    data = {}
    if path.exists():
        try: data = _json.loads(path.read_text(encoding="utf-8"))
        except Exception: data = {}
    TITLE_LABELS.clear(); TITLE_LABELS.update({k: list(v) for k, v in _BASE_LABELS.items()})
    ATTRIB_TAGS.clear(); ATTRIB_TAGS.update({k: list(v) for k, v in _BASE_TAGS.items()})
    for k, v in (data.get("extra_labels") or {}).items(): TITLE_LABELS.setdefault(k, []).extend(v)
    for k, v in (data.get("extra_attrib_tags") or {}).items(): ATTRIB_TAGS.setdefault(k, []).extend(v)
    REQUIRED_FIELDS[:] = list(data.get("required_fields") or _BASE_REQUIRED)
    FIELD_SEVERITY.clear(); FIELD_SEVERITY.update(_BASE_SEVERITY); FIELD_SEVERITY.update(data.get("field_severity") or {})
    _rebuild_indexes(); ACTIVE_PROFILE = slug
    return slug
