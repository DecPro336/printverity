"""Job processing entry points. `process_job` does the work (used inline and by the Celery task); `submit_review` decides where it runs."""
from __future__ import annotations
import logging
from .. import config, store
from .. import patterns as P
from ..orchestration import run_review

log = logging.getLogger("printverity.tasks")

def process_job(job_id: str, recheck: bool = False) -> dict:
    """Review every pending drawing of a job (every drawing when `recheck`), then refresh the package-level reports.
    A re-check keeps the engineer's accept / reject decisions and notes on findings that are still reported."""
    from ..reports import run_reports
    j = store.get_job(job_id)
    if not j: return {"error": "job not found"}
    j["status"] = "processing"; store.save_job(j)
    P.load_profile(j.get("customer"))
    try:
        for d in j["drawings"]:
            if recheck or d.get("status") == "pending" or d.get("extraction") is None and not d.get("error"):
                decisions = {f["title"]: (f["status"], f.get("note", "")) for f in d.get("findings", [])}
                rec = run_review(d["path"], profile=P.ACTIVE_PROFILE); rec["id"] = d["id"]
                for f in rec["findings"]:
                    if f["title"] in decisions: f["status"], f["note"] = decisions[f["title"]]
                j["drawings"] = [rec if x["id"] == d["id"] else x for x in j["drawings"]]
                store.save_job(j)
        run_reports(j)
        j["status"] = "done"
    except Exception as e:
        log.error("process_job %s: %s", job_id, e); j["status"] = "error"; j["error"] = str(e)
    finally:
        P.load_profile(config.DEFAULT_PROFILE)
    store.save_job(j)
    store.audit("job.processed", job=job_id, findings=sum(len(d.get("findings", [])) for d in j["drawings"]))
    return {"job": job_id, "status": j["status"]}

def _broker_up() -> bool:
    try:
        import redis
        return bool(redis.Redis.from_url(config.REDIS_URL, socket_connect_timeout=0.5).ping())
    except Exception:
        return False

def _worker_up() -> bool:
    try:
        from .celery_app import celery
        return bool(celery.control.ping(timeout=0.5))
    except Exception:
        return False

def worker_status() -> dict:
    mode = config.CELERY_MODE
    broker = _broker_up() if mode != "off" else False
    workers = _worker_up() if broker else False
    return {"mode": mode, "broker": broker, "workers": workers, "async": bool(broker and workers and mode != "off")}

def submit_review(job: dict, recheck: bool = False) -> dict:
    """Queue the job on Celery when a broker and a worker answer; otherwise process it now."""
    st = worker_status()
    if st["async"]:
        from .celery_app import review_job
        job["status"] = "queued"; store.save_job(job)
        review_job.delay(job["id"], recheck)
        return {"async": True, "status": "queued"}
    process_job(job["id"], recheck)
    return {"async": False, "status": "done"}
