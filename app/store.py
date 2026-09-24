import shutil, json
from pathlib import Path
from .util import JOBS, AUDIT_FILE, new_id, now, load_json, save_json

def job_dir(jid): return JOBS / jid

def list_jobs():
    out = []
    for d in sorted(JOBS.iterdir(), key=lambda p: p.stat().st_mtime, reverse=True):
        j = load_json(d / "job.json")
        if j: out.append(summarize(j))
    return out

def summarize(j):
    ds = []
    for d in j.get("drawings", []):
        f = d.get("findings", [])
        ds.append({"id": d["id"], "file": d["file"], "kind": d["kind"], "part_no": d.get("part_no"), "rev": d.get("rev"),
                   "title": d.get("title"), "findings": len(f), "open": len([x for x in f if x["status"] == "open"]),
                   "worst": worst(f), "checked_at": d.get("checked_at"), "duration": d.get("duration"), "error": d.get("error")})
    return {"id": j["id"], "name": j["name"], "created": j["created"], "customer": j.get("customer", ""),
            "drawings": ds, "has_step": bool(j["files"].get("step")), "has_bom": bool(j["files"].get("bom")), "has_po": bool(j["files"].get("po"))}

ORDER = {"critical": 0, "high": 1, "medium": 2, "low": 3}
def worst(findings):
    opens = [f for f in findings if f["status"] != "rejected"]
    if not opens: return None
    return sorted(opens, key=lambda f: ORDER.get(f["severity"], 9))[0]["severity"]

def get_job(jid):
    return load_json(job_dir(jid) / "job.json")

def save_job(j):
    save_json(job_dir(j["id"]) / "job.json", j)

def create_job(name, customer=""):
    jid = new_id("job_")
    (job_dir(jid) / "files").mkdir(parents=True, exist_ok=True)
    j = {"id": jid, "name": name, "customer": customer, "created": now(), "files": {"drawings": [], "step": None, "bom": None, "po": None}, "drawings": []}
    save_job(j)
    return j

def add_file(j, kind, src_path, filename=None):
    filename = filename or Path(src_path).name
    dst = job_dir(j["id"]) / "files" / filename
    if Path(src_path).resolve() != dst.resolve():
        shutil.copyfile(src_path, dst)
    if kind == "drawing":
        j["files"]["drawings"].append(str(dst))
    else:
        j["files"][kind] = str(dst)
    save_job(j)
    return str(dst)

def delete_job(jid):
    d = job_dir(jid)
    if d.exists(): shutil.rmtree(d)

def audit(event, **kw):
    rec = {"time": now(), "event": event, **kw}
    with open(AUDIT_FILE, "a", encoding="utf-8") as f:
        f.write(json.dumps(rec, ensure_ascii=False) + "\n")
    return rec

def read_audit(limit=300):
    p = AUDIT_FILE
    if not p.exists(): return []
    lines = p.read_text(encoding="utf-8").strip().splitlines()
    return [json.loads(l) for l in lines[-limit:]][::-1]
