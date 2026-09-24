import math, re, uuid, json, os, time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
JOBS = Path(os.environ.get("PV_JOBS_DIR", DATA / "jobs"))        # the system check points this at a scratch folder so it never touches live jobs
OUT = Path(os.environ.get("PV_OUT_DIR", DATA / "out"))           # generated documents, exports, inbox drops, releases (the system check isolates it too)
AUDIT_FILE = Path(os.environ.get("PV_AUDIT_FILE", DATA / "audit.jsonl"))
# reference data edited from Setup: customer title-block profiles, the offline PLM register, the spec library
PROFILES_DIR = Path(os.environ.get("PV_PROFILES_DIR", DATA / "profiles"))
PLM_FILE = Path(os.environ.get("PV_PLM_FILE", DATA / "plm.json"))
SPEC_LIBRARY = Path(os.environ.get("PV_SPEC_LIBRARY", DATA / "specs" / "library.json"))
for p in (DATA, JOBS, OUT):
    p.mkdir(parents=True, exist_ok=True)

def new_id(prefix=""):
    return prefix + uuid.uuid4().hex[:10]

def now():
    return time.strftime("%Y-%m-%d %H:%M:%S")

def dist(a, b):
    return math.hypot(a[0]-b[0], a[1]-b[1])

def near(a, b, tol):
    return dist(a, b) <= tol

def fnum(s):
    """Parse a number out of a dimension-like string, tolerant of Ø, ±, X and text."""
    if s is None:
        return None
    m = re.search(r"[-+]?\d+(?:[.,]\d+)?", str(s))
    if not m:
        return None
    try:
        return float(m.group(0).replace(",", "."))
    except ValueError:
        return None

def load_json(path, default=None):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return default

def save_json(path, obj):
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    tmp = str(path) + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(obj, f, indent=2, ensure_ascii=False)
    os.replace(tmp, path)

def clean_text(s):
    if s is None:
        return ""
    s = str(s)
    # AutoCAD control codes
    s = s.replace("%%c", "Ø").replace("%%C", "Ø").replace("%%d", "°").replace("%%D", "°").replace("%%p", "±").replace("%%P", "±")
    s = re.sub(r"\\[A-Za-z][^;]*;", "", s)   # MTEXT formatting codes like \fArial|b0;
    s = s.replace("\\P", "\n").replace("{", "").replace("}", "")
    s = re.sub(r"[ \t]+", " ", s)
    return s.strip()
