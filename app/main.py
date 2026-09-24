"""PrintVerity API. Thin HTTP layer: validation, storage and routing; the work lives in the orchestration, retrieval, vision, geometry, docs and integration packages."""
from __future__ import annotations
import os, io, csv, time, hashlib, collections, re, logging, threading, traceback
from pathlib import Path
from typing import List, Optional
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Request, Query
from fastapi.responses import JSONResponse, Response, FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from . import __version__, store, render, compare, consistency, customers, docs, qa, config, rules, exports
from . import patterns as P
from .reports import run_reports
from .tasks import submit_review, worker_status
from .orchestration import run_review
from .orchestration.agent import get_agent
from .geometry import engine_name, parse_step
from .geometry.mesh import tessellate
from .geometry import preview as model_preview
from .integrations import epicor, storage as storage_mod, voice_notes, illustrations, lex
from .util import ROOT, OUT, PROFILES_DIR, now

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(name)s %(levelname)s %(message)s")
for noisy in ("ezdxf", "httpx", "httpx2", "urllib3", "sentence_transformers", "ultralytics"):
    logging.getLogger(noisy).setLevel(logging.ERROR)
log = logging.getLogger("printverity")
app = FastAPI(title="PrintVerity", version=__version__, description="Drawing review and technical documentation agent")
STATIC = ROOT / "static"; DIST = STATIC / "dist"

# ------------------------------------------------------------------ middleware and errors
@app.exception_handler(Exception)
async def _any_error(request: Request, exc: Exception):
    log.error("unhandled: %s\n%s", exc, traceback.format_exc())
    return JSONResponse(status_code=500, content={"error": str(exc)})

OPEN_PATHS = ("/api/login", "/favicon.ico", "/static/", "/assets/", "/api/status")

@app.middleware("http")
async def _access(request: Request, call_next):
    """Optional gate for remote access: a shared token presented once (?token=…) becomes a cookie; API clients may send X-Access-Token."""
    if config.ACCESS_TOKEN and not request.url.path.startswith(OPEN_PATHS):
        given = request.cookies.get("pv_token") or request.headers.get("x-access-token") or request.query_params.get("token")
        if given != config.ACCESS_TOKEN:
            if request.url.path.startswith("/api/"):
                return JSONResponse(status_code=401, content={"error": "access token required"})
            return HTMLResponse(LOGIN_PAGE, status_code=401)
        if request.query_params.get("token") == config.ACCESS_TOKEN and not request.cookies.get("pv_token"):
            resp = await call_next(request); resp.set_cookie("pv_token", config.ACCESS_TOKEN, httponly=True, samesite="lax", max_age=60 * 60 * 24 * 14); return resp
    return await call_next(request)

LOGIN_PAGE = """<!doctype html><html><head><meta charset="utf-8"><title>PrintVerity</title><link rel="icon" href="/static/favicon.svg"><style>
body{margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#13294b;font-family:Inter,'Liberation Sans',Arial,sans-serif}
form{background:#fff;border-radius:12px;padding:28px 32px;width:340px;box-shadow:0 12px 40px rgba(0,0,0,.35)} h1{font-size:18px;margin:0 0 4px;color:#13294b;letter-spacing:.5px} p{margin:0 0 14px;color:#5b6673;font-size:13px}
input{width:100%;box-sizing:border-box;padding:9px 10px;border:1px solid #cfd6df;border-radius:6px;font-size:14px;margin-bottom:12px} button{width:100%;padding:9px;border:none;border-radius:6px;background:#1f5fa8;color:#fff;font-size:14px;cursor:pointer}</style></head>
<body><form method="post" action="/api/login"><h1>PRINTVERITY</h1><p>This instance is shared over the network. Enter the access token.</p><input name="token" type="password" placeholder="Access token" autofocus><button>Open</button></form></body></html>"""

@app.post("/api/login")
async def login(request: Request):
    form = await request.form(); token = (form.get("token") or "").strip()
    if not config.ACCESS_TOKEN or token != config.ACCESS_TOKEN:
        return HTMLResponse(LOGIN_PAGE.replace("Enter the access token.", "Wrong token, try again."), status_code=401)
    resp = Response(status_code=303, headers={"Location": "/"}); resp.set_cookie("pv_token", token, httponly=True, samesite="lax", max_age=60 * 60 * 24 * 14); return resp

@app.middleware("http")
async def _timing(request: Request, call_next):
    t0 = time.perf_counter()
    response = await call_next(request)
    ms = (time.perf_counter() - t0) * 1000
    response.headers["X-Response-Time"] = f"{ms:.1f}ms"
    if config.LOG_REQUESTS and request.url.path.startswith("/api"):
        log.info("%s %s -> %s in %.1f ms", request.method, request.url.path, response.status_code, ms)
    return response

@app.on_event("startup")
def _startup():
    """Warm the retrieval index in the background so start-up is not delayed by model loading; searches that arrive
    meanwhile wait for it (retrieval.WARMED) instead of reading an index that is still empty."""
    from .retrieval import WARMED
    WARMED.clear()
    def warm():
        try:
            from .retrieval import get_retriever
            get_retriever().refresh([store.get_job(j["id"]) for j in store.list_jobs()])
        except Exception as e:
            log.warning("retrieval warm-up skipped: %s", str(e)[:120])
        finally:
            WARMED.set()
    threading.Thread(target=warm, daemon=True).start()

# ------------------------------------------------------------------ helpers
def _claude_available():
    return get_agent().available

def _safe_name(filename):
    name = Path(filename or "").name
    name = re.sub(r"[^A-Za-z0-9._ ()\-]+", "_", name).strip() or "upload"
    return name[:120]

async def _save_upload(up, folder, allowed):
    name = _safe_name(up.filename); ext = Path(name).suffix.lower()
    if ext not in allowed:
        raise HTTPException(400, f"'{name}': unsupported file type {ext or '(none)'}. Allowed: {', '.join(sorted(allowed))}")
    data = await up.read()
    if len(data) > config.MAX_UPLOAD_MB * 1024 * 1024:
        raise HTTPException(413, f"'{name}' is larger than the {config.MAX_UPLOAD_MB} MB upload limit")
    if not data:
        raise HTTPException(400, f"'{name}' is empty")
    p = folder / name; i = 1
    while p.exists():
        p = folder / f"{Path(name).stem}_{i}{Path(name).suffix}"; i += 1
    with open(p, "wb") as f: f.write(data)
    return p

def _pending(path):
    """Placeholder drawing record until the pipeline has run (async mode shows it in the queue)."""
    from .util import new_id
    return {"id": new_id("dwg_"), "file": Path(path).name, "path": str(path), "kind": Path(path).suffix.lstrip(".").lower(), "part_no": None, "rev": None, "title": None,
            "extraction": None, "findings": [], "checked_at": None, "duration": None, "error": None, "pages": 1, "status": "pending"}

def _drawing(j, did):
    d = next((d for d in j["drawings"] if d["id"] == did), None)
    if not d: raise HTTPException(404, "drawing not found")
    return d

def _job(jid):
    j = store.get_job(jid)
    if not j: raise HTTPException(404, "job not found")
    return j

def _wait_for(jid, timeout):
    t0 = time.time()
    while time.time() - t0 < timeout:
        j = store.get_job(jid)
        if j and j.get("status") in ("done", "error"): return j
        time.sleep(0.4)
    return store.get_job(jid)

def _refresh_index_async():
    def go():
        try:
            from .retrieval import get_retriever
            get_retriever().refresh([store.get_job(j["id"]) for j in store.list_jobs()])
        except Exception as e:
            log.info("index refresh skipped: %s", str(e)[:100])
    threading.Thread(target=go, daemon=True).start()

_render_cache = collections.OrderedDict()
def _cache_get(key):
    v = _render_cache.get(key)
    if v is not None: _render_cache.move_to_end(key)
    return v
def _cache_put(key, value):
    _render_cache[key] = value; _render_cache.move_to_end(key)
    while len(_render_cache) > config.RENDER_CACHE_SIZE: _render_cache.popitem(last=False)
def _findings_sig(findings):
    return hashlib.sha1("|".join(f"{f['id']}:{f['status']}" for f in findings).encode()).hexdigest()[:12]

# ------------------------------------------------------------------ status, catalogues
@app.get("/api/status")
def status():
    ws = worker_status()
    try:
        from .retrieval import get_retriever
        rinfo = get_retriever().info
    except Exception as e:
        rinfo = {"error": str(e)[:100]}
    from .vision.layout import get_layout_model
    from .vision.ocr import get_ocr
    try: ocr = get_ocr().name
    except Exception: ocr = None
    return {"version": __version__, "claude": _claude_available(), "model": config.CLAUDE_MODEL, "jobs": len(store.list_jobs()), "templates": len(docs.list_templates()), "time": now(),
            "profiles": [p["slug"] for p in P.list_profiles()], "max_upload_mb": config.MAX_UPLOAD_MB, "protected": bool(config.ACCESS_TOKEN),
            "engines": {"orchestration": "langgraph", "retrieval": rinfo, "queue": ws, "step": engine_name(), "ocr": ocr, "layout_model": get_layout_model().name,
                        "plm": epicor.get_plm().source, "storage": storage_mod.get_storage().name, "voice_notes": bool(config.ASSEMBLYAI_API_KEY), "illustrations": "ai+crop" if config.IMAGE_API_KEY else "crop"}}

@app.get("/api/rules")
def rule_catalogue():
    return [{"id": i, "category": c, "severity": sev, "description": d} for i, c, sev, d in rules.RULES]

@app.get("/api/profiles")
def profiles():
    return P.list_profiles()

# ------------------------------------------------------------------ setup: customers (title-block wording) and reference data
def _setup(fn, *a):
    try: return fn(*a)
    except customers.SetupError as e: raise HTTPException(400, str(e))

class CustomerReq(BaseModel):
    name: str
    fields: list[dict] = []

class NewCustomerReq(BaseModel):
    name: str

@app.get("/api/customers")
def customer_list():
    return customers.list_customers()

@app.post("/api/customers")
def customer_add(req: NewCustomerReq):
    c = _setup(customers.add_customer, req.name); store.audit("customer.added", customer=c["name"])
    return c

@app.get("/api/customers/{slug}")
def customer_get(slug: str):
    try: return customers.get_customer(slug)
    except customers.SetupError as e: raise HTTPException(404, str(e))

@app.put("/api/customers/{slug}")
def customer_save(slug: str, req: CustomerReq):
    c = _setup(customers.save_customer, slug, req.model_dump())
    store.audit("customer.setup_saved", customer=c["name"], labels={f["field"]: f["labels"] for f in c["fields"] if f["labels"]}, tags={f["field"]: f["tags"] for f in c["fields"] if f["tags"]})
    return c

@app.delete("/api/customers/{slug}")
def customer_delete(slug: str):
    _setup(customers.delete_customer, slug); store.audit("customer.setup_removed", customer=slug)
    return {"ok": True}

@app.post("/api/customers/{slug}/recheck")
def customer_recheck(slug: str, wait: int = Query(0)):
    """Re-check every drawing of the customer with its current setup. Accept / reject decisions and notes are kept."""
    ids = customers.customer_job_ids(slug)
    if not ids: raise HTTPException(404, "No drawings have been uploaded for this customer yet.")
    mode = "inline"; n = 0
    for jid in ids:
        j = store.get_job(jid); n += len(j["drawings"]); j["status"] = "pending"; store.save_job(j)
        if submit_review(j, recheck=True)["async"]: mode = "async"
    if wait:
        for jid in ids: _wait_for(jid, 300)
    store.audit("customer.rechecked", customer=slug, jobs=len(ids), drawings=n, mode=mode)
    _refresh_index_async()
    return {"jobs": ids, "drawings": n, "mode": mode}

async def _register_rows(up: UploadFile):
    data = await up.read()
    if len(data) > config.MAX_UPLOAD_MB * 1024 * 1024: raise HTTPException(413, f"The file is larger than the {config.MAX_UPLOAD_MB} MB upload limit")
    return _setup(customers.read_rows, data, up.filename or "register.csv")

@app.get("/api/reference/specs")
def spec_list():
    return customers.list_specs()

@app.post("/api/reference/specs")
async def spec_import(file: UploadFile = File(...)):
    r = customers.import_specs(await _register_rows(file))
    store.audit("specs.imported", file=file.filename, specs=r["specs"], errors=len(r["errors"])); _refresh_index_async()
    return r

@app.delete("/api/reference/specs/{ref}")
def spec_delete(ref: str):
    if not customers.delete_spec(ref): raise HTTPException(404, "Spec not in the library")
    store.audit("specs.removed", spec=ref); _refresh_index_async()
    return {"ok": True}

@app.get("/api/reference/revisions")
def revision_list():
    return {"source": epicor.get_plm().source, "parts": customers.list_revisions()}

@app.post("/api/reference/revisions")
async def revision_import(file: UploadFile = File(...)):
    r = customers.import_revisions(await _register_rows(file))
    store.audit("revisions.imported", file=file.filename, parts=r["parts"], errors=len(r["errors"]))
    return r

@app.delete("/api/reference/revisions/{part_no}")
def revision_delete(part_no: str):
    if not customers.delete_revision_record(part_no): raise HTTPException(404, "Part not in the register")
    store.audit("revisions.removed", part=part_no)
    return {"ok": True}

@app.get("/api/knowledge/search")
def knowledge_search(q: str, k: int = 6, kinds: Optional[str] = None):
    from .retrieval import get_retriever
    hits = get_retriever().search(q, k=k, kinds=kinds.split(",") if kinds else None)
    return [{"title": h.title, "kind": h.kind, "score": round(h.score, 3), "text": h.text, "metadata": h.metadata} for h in hits]

# ------------------------------------------------------------------ jobs
@app.get("/api/jobs")
def jobs():
    return store.list_jobs()

@app.post("/api/jobs")
async def create_job(name: str = Form(...), customer: str = Form(""), drawings: List[UploadFile] = File(default=[]), step: Optional[UploadFile] = File(None),
                     bom: Optional[UploadFile] = File(None), po: Optional[UploadFile] = File(None), wait: int = Query(0)):
    j = store.create_job(name.strip() or "Untitled job", customer.strip())
    tmp = store.job_dir(j["id"]) / "files"
    j["profile"] = P.profile_slug(customer) if (PROFILES_DIR / f"{P.profile_slug(customer)}.json").exists() else "default"
    try:
        for up in drawings:
            if not up.filename: continue
            p = await _save_upload(up, tmp, config.DRAWING_EXT); store.add_file(j, "drawing", p); j["drawings"].append(_pending(p))
        for kind, up, allowed in (("step", step, config.STEP_EXT), ("bom", bom, config.TABLE_EXT), ("po", po, config.TABLE_EXT)):
            if up and up.filename:
                p = await _save_upload(up, tmp, allowed); store.add_file(j, kind, p)
    except HTTPException:
        store.delete_job(j["id"]); raise
    j["status"] = "pending"; store.save_job(j)
    result = submit_review(j)
    store.audit("job.created", job=j["id"], name=j["name"], drawings=[d["file"] for d in j["drawings"]], mode="async" if result["async"] else "inline")
    j = _wait_for(j["id"], 180) if (wait or not result["async"]) else store.get_job(j["id"])
    _refresh_index_async()
    return store.summarize(j)

@app.get("/api/jobs/{jid}")
def get_job(jid: str):
    return _job(jid)

@app.get("/api/jobs/{jid}/status")
def job_status(jid: str):
    j = _job(jid)
    return {"id": jid, "status": j.get("status", "done"), "drawings": [{"id": d["id"], "file": d["file"], "status": d.get("status", "done" if d.get("checked_at") else "pending"), "findings": len(d.get("findings", [])), "error": d.get("error")} for d in j["drawings"]]}

@app.delete("/api/jobs/{jid}")
def delete_job(jid: str):
    store.delete_job(jid); store.audit("job.deleted", job=jid)
    return {"ok": True}

@app.post("/api/jobs/{jid}/files")
async def add_files(jid: str, drawings: List[UploadFile] = File(default=[]), step: Optional[UploadFile] = File(None), bom: Optional[UploadFile] = File(None), po: Optional[UploadFile] = File(None), wait: int = Query(1)):
    j = _job(jid); tmp = store.job_dir(jid) / "files"
    for up in drawings:
        if not up.filename: continue
        p = await _save_upload(up, tmp, config.DRAWING_EXT); store.add_file(j, "drawing", p); j["drawings"].append(_pending(p))
    for kind, up, allowed in (("step", step, config.STEP_EXT), ("bom", bom, config.TABLE_EXT), ("po", po, config.TABLE_EXT)):
        if up and up.filename:
            p = await _save_upload(up, tmp, allowed); store.add_file(j, kind, p)
    j["status"] = "pending"; store.save_job(j)
    result = submit_review(j); store.audit("job.files_added", job=jid)
    return _wait_for(jid, 180) if (wait or not result["async"]) else store.get_job(jid)

@app.post("/api/jobs/{jid}/drawings/{did}/recheck")
def recheck(jid: str, did: str):
    j = _job(jid); d = _drawing(j, did)
    decisions = {f["title"]: (f["status"], f["note"]) for f in d["findings"]}
    P.load_profile(j.get("customer"))
    try: nd = run_review(d["path"], profile=P.ACTIVE_PROFILE)
    finally: P.load_profile(config.DEFAULT_PROFILE)
    nd["id"] = d["id"]
    for f in nd["findings"]:
        if f["title"] in decisions: f["status"], f["note"] = decisions[f["title"]]
    j["drawings"] = [nd if x["id"] == did else x for x in j["drawings"]]
    run_reports(j); store.save_job(j); store.audit("drawing.rechecked", job=jid, drawing=nd["file"], findings=len(nd["findings"]))
    return nd

# ------------------------------------------------------------------ rendering and export
@app.get("/api/jobs/{jid}/drawings/{did}/render")
def render_drawing(jid: str, did: str, page: int = 0, markers: int = 1):
    j = _job(jid); d = _drawing(j, did)
    fs = d["findings"] if markers else []
    src_path = (d.get("extraction") or {}).get("source", {}).get("pdf_path") or d["path"]
    key = (jid, did, page, bool(markers), _findings_sig(fs), os.path.getmtime(src_path) if os.path.exists(src_path) else 0)
    hit = _cache_get(key)
    if hit: return Response(content=hit[0], media_type=hit[1], headers={"Cache-Control": "no-store", "X-Render-Cache": "hit"})
    if d["kind"] == "dxf" and d.get("extraction"):
        svg = render.dxf_to_svg(d["path"], fs, d["extraction"]["bbox"], d["extraction"].get("space", "model"), d["extraction"].get("viewports"))
        _cache_put(key, (svg, "image/svg+xml"))
        return Response(content=svg, media_type="image/svg+xml", headers={"Cache-Control": "no-store", "X-Render-Cache": "miss"})
    if d["kind"] in ("pdf", "image") or Path(src_path).suffix.lower() == ".pdf":
        png, w, h = render.pdf_page_png(src_path, page, fs, dpi=config.PDF_RENDER_DPI)
        _cache_put(key, (png, "image/png"))
        return Response(content=png, media_type="image/png", headers={"Cache-Control": "no-store", "X-Page-Width": str(w), "X-Page-Height": str(h), "X-Render-Cache": "miss"})
    raise HTTPException(400, d.get("error") or "nothing to render")

@app.get("/api/jobs/{jid}/drawings/{did}/markup.pdf")
def markup(jid: str, did: str):
    j = _job(jid); d = _drawing(j, did)
    dd = dict(d)
    if d["kind"] == "image": dd["kind"] = "pdf"; dd["path"] = d["extraction"]["source"]["pdf_path"]
    data = render.markup_pdf(dd, d["findings"])
    store.audit("markup.exported", job=jid, drawing=d["file"])
    name = f"{(d.get('part_no') or Path(d['file']).stem)}_{d.get('rev') or 'x'}_markup.pdf"
    return Response(content=data, media_type="application/pdf", headers={"Content-Disposition": f'inline; filename="{name}"'})

@app.get("/api/jobs/{jid}/drawings/{did}/findings.{fmt}")
def export_findings(jid: str, did: str, fmt: str):
    j = _job(jid); d = _drawing(j, did)
    base = f"{(d.get('part_no') or Path(d['file']).stem)}_{d.get('rev') or 'x'}_findings"
    if fmt == "json":
        return JSONResponse({"job": j["name"], "drawing": d["file"], "part_no": d.get("part_no"), "rev": d.get("rev"), "checked_at": d.get("checked_at"), "findings": d["findings"]},
                            headers={"Content-Disposition": f'attachment; filename="{base}.json"'})
    if fmt == "csv":
        buf = io.StringIO(); w = csv.writer(buf)
        w.writerow(["n", "severity", "category", "rule", "title", "detail", "confidence", "status", "note", "x", "y"])
        for f in d["findings"]:
            loc = f.get("loc") or ["", ""]
            w.writerow([f.get("n"), f["severity"], f["category"], f.get("rule", ""), f["title"], f["detail"], f["confidence"], f["status"], f.get("note", ""), loc[0], loc[1]])
        return Response(content=buf.getvalue(), media_type="text/csv", headers={"Content-Disposition": f'attachment; filename="{base}.csv"'})
    raise HTTPException(400, "format must be json or csv")

@app.get("/api/jobs/{jid}/drawings/{did}/findings/{fid}/callout.png")
def callout_image(jid: str, did: str, fid: str, ai: int = 0):
    """Work-instruction callout: crop of the marked sheet around the finding (deterministic), or an AI illustration when a provider key is set."""
    j = _job(jid); d = _drawing(j, did)
    f = next((f for f in d["findings"] if f["id"] == fid), None)
    if not f: raise HTTPException(404, "finding not found")
    dd = dict(d)
    if d["kind"] == "image": dd["kind"] = "pdf"; dd["path"] = d["extraction"]["source"]["pdf_path"]
    png = None
    if ai:
        try: png = illustrations.ai_illustration(f"Technical illustration for a machine shop work instruction: {f['title']}. {f['detail']}")
        except Exception as e: log.warning("ai illustration failed: %s", e)
    png = png or illustrations.callout_png(dd, f)
    return Response(content=png, media_type="image/png")

# ------------------------------------------------------------------ findings: decisions and voice notes
class Decision(BaseModel):
    status: Optional[str] = None
    note: Optional[str] = None

@app.post("/api/jobs/{jid}/drawings/{did}/findings/{fid}")
def decide(jid: str, did: str, fid: str, body: Decision):
    j = _job(jid); d = _drawing(j, did)
    f = next((f for f in d["findings"] if f["id"] == fid), None)
    if not f: raise HTTPException(404, "finding not found")
    if body.status in ("open", "accepted", "rejected"): f["status"] = body.status
    if body.note is not None: f["note"] = body.note
    store.save_job(j); store.audit("finding." + (body.status or "noted"), job=jid, drawing=d["file"], finding=f["title"], note=f.get("note", ""))
    if body.status in ("accepted", "rejected"): _refresh_index_async()      # decisions become retrievable precedent
    return f

@app.post("/api/jobs/{jid}/drawings/{did}/findings/{fid}/voice-note")
async def voice_note(jid: str, did: str, fid: str, audio: UploadFile = File(...)):
    j = _job(jid); d = _drawing(j, did)
    f = next((f for f in d["findings"] if f["id"] == fid), None)
    if not f: raise HTTPException(404, "finding not found")
    folder = store.job_dir(jid) / "voice"; folder.mkdir(exist_ok=True)
    p = await _save_upload(audio, folder, config.AUDIO_EXT)
    f.setdefault("voice_notes", []).append({"file": p.name, "time": now()})
    try:
        t = voice_notes.transcribe(str(p))
        f["note"] = ((f.get("note") or "") + "\n" if f.get("note") else "") + f"[voice] {t['text']}"
        f["voice_notes"][-1].update({"transcript": t["text"], "provider": t["provider"]})
        store.save_job(j); store.audit("finding.voice_note", job=jid, drawing=d["file"], finding=f["title"], transcribed=True)
        return {"finding": f, "transcript": t}
    except voice_notes.NotConfigured as e:
        store.save_job(j); store.audit("finding.voice_note", job=jid, drawing=d["file"], finding=f["title"], transcribed=False)
        return JSONResponse(status_code=202, content={"finding": f, "message": str(e)})
    except Exception as e:
        # unreadable or unsupported audio: keep the file with the finding, report the provider's reason, no server error
        msg = f"Audio kept with the finding but not transcribed: {str(e)[:160]}"
        log.warning("voice note transcription failed: %s", str(e)[:200])
        f["voice_notes"][-1]["error"] = str(e)[:200]
        store.save_job(j); store.audit("finding.voice_note", job=jid, drawing=d["file"], finding=f["title"], transcribed=False, error=str(e)[:120])
        return JSONResponse(status_code=202, content={"finding": f, "message": msg})

# ------------------------------------------------------------------ reports
class CompareReq(BaseModel):
    a_job: str; a_drawing: str; b_job: str; b_drawing: str

@app.post("/api/compare")
def do_compare(req: CompareReq):
    ja = _job(req.a_job); jb = _job(req.b_job)
    a = _drawing(ja, req.a_drawing); b = _drawing(jb, req.b_drawing)
    if not a.get("extraction") or not b.get("extraction"): raise HTTPException(400, "one of the drawings has no extraction")
    la = f"{a.get('part_no') or a['file']} Rev {a.get('rev') or '?'}"; lb = f"{b.get('part_no') or b['file']} Rev {b.get('rev') or '?'}"
    rep = compare.compare(a["extraction"], b["extraction"], la, lb)
    rep["a"] = {"job": ja["id"], "drawing": a["id"], "file": a["file"]}; rep["b"] = {"job": jb["id"], "drawing": b["id"], "file": b["file"]}
    store.audit("compare.run", a=a["file"], b=b["file"], changes=rep["summary"]["total"])
    return rep

_mesh_cache = {}

@app.get("/api/jobs/{jid}/model/mesh")
def model_mesh(jid: str, drawing: Optional[str] = None):
    """Tessellated STEP body with a status per face (match / conflict / info) against the chosen drawing's callouts."""
    j = _job(jid)
    if not j["files"].get("step"): raise HTTPException(404, "no STEP model on this job")
    path = j["files"]["step"]; key = (path, os.path.getmtime(path))
    mesh = _mesh_cache.get(key)
    if mesh is None:
        try: mesh = tessellate(path)
        except RuntimeError as e: raise HTTPException(409, str(e))
        _mesh_cache.clear(); _mesh_cache[key] = mesh
    st = parse_step(path)
    prod = (st.get("product") or "").strip().upper().replace(" ", "")
    cands = [d for d in j["drawings"] if d.get("extraction")]
    def same_part(x):
        pn = (x.get("part_no") or "").upper().replace(" ", "")
        return bool(prod and pn) and (pn == prod or prod.startswith(pn) or pn.startswith(prod))
    d = next((x for x in cands if x["id"] == drawing), None) or next((x for x in cands if same_part(x)), None) or (cands[0] if cands else None)
    drawn = {}
    if d:
        from . import patterns as P_
        ex = d["extraction"]
        for c in ex.get("callouts", []):
            m = P_.HOLE_CALLOUT.search(c["text"])
            if m: drawn[float(m.group(2))] = drawn.get(float(m.group(2)), 0) + int(m.group(1))
        for dm in ex.get("dimensions", []):
            if dm.get("type") == "diameter" and dm.get("value"): drawn.setdefault(dm["value"], 1)
    counts = {}
    for c in st.get("cylinders", []): counts[c["diameter"]] = c["surfaces"]
    def status_for(dia):
        """match: the drawing calls this diameter and the model has it; conflict: a model diameter close to a called-out size (a wrong-size feature); info: not on this sheet."""
        if dia is None: return "neutral"
        if any(abs(dd - dia) <= max(0.03, dd * 0.004) for dd in drawn): return "match"
        return "conflict" if any(abs(dd - dia) <= 1.0 for dd in drawn) else "info"
    faces = [{"kind": f["kind"], "diameter": f["diameter"], "status": status_for(f["diameter"]), "tris": f["tris"]} for f in mesh["faces"]]
    legend = sorted({(f["diameter"], f["status"]) for f in faces if f["diameter"] is not None})
    return {"vertices": mesh["vertices"], "faces": faces, "bbox": mesh["bbox"], "triangles": mesh["triangles"], "drawing": d["file"] if d else None,
            "product": st.get("product"), "legend": [{"diameter": a, "status": b} for a, b in legend], "engine": st.get("engine")}

@app.get("/api/jobs/{jid}/model/preview.png")
def model_preview_png(jid: str, drawing: Optional[str] = None, view: str = "iso", theme: str = "light"):
    """Server-rendered shaded view of the model with the same status colours, for browsers without WebGL."""
    m = model_mesh(jid, drawing)
    png = model_preview.render(m, m["faces"], view=view, dark=theme == "dark", caption=f"software preview · {view} view · {m['triangles']} triangles · {m.get('engine')} · checked against {m.get('drawing')}")
    return Response(content=png, media_type="image/png", headers={"Cache-Control": "no-store"})

def _compare_pair(a_job, a_drawing, b_job, b_drawing):
    ja = _job(a_job); jb = _job(b_job); a = _drawing(ja, a_drawing); b = _drawing(jb, b_drawing)
    if not a.get("extraction") or not b.get("extraction"): raise HTTPException(400, "one of the drawings has no extraction")
    la = f"{a.get('part_no') or a['file']} Rev {a.get('rev') or '?'}"; lb = f"{b.get('part_no') or b['file']} Rev {b.get('rev') or '?'}"
    return a, b, compare.compare(a["extraction"], b["extraction"], la, lb)

@app.get("/api/compare/report.xlsx")
def compare_xlsx(a_job: str, a_drawing: str, b_job: str, b_drawing: str):
    a, b, rep = _compare_pair(a_job, a_drawing, b_job, b_drawing)
    p = exports.change_report_xlsx(rep); store.audit("compare.exported", a=a["file"], b=b["file"], doc=p.name)
    return FileResponse(p, filename=p.name)

@app.get("/api/compare/side-by-side.pdf")
def compare_pdf(a_job: str, a_drawing: str, b_job: str, b_drawing: str):
    a, b, rep = _compare_pair(a_job, a_drawing, b_job, b_drawing)
    for d in (a, b):
        if d["kind"] == "image": d["kind"] = "pdf"
    data = exports.side_by_side_pdf(a, b, rep); store.audit("compare.side_by_side", a=a["file"], b=b["file"])
    return Response(content=data, media_type="application/pdf", headers={"Content-Disposition": f'inline; filename="{rep["labelA"].replace(" ", "_")}_vs_{rep["labelB"].replace(" ", "_")}.pdf"'})

@app.post("/api/compare/inbox")
def compare_inbox(req: CompareReq):
    a, b, rep = _compare_pair(req.a_job, req.a_drawing, req.b_job, req.b_drawing)
    x = exports.change_report_xlsx(rep)
    pdf_path = OUT / (x.stem + "_side_by_side.pdf"); pdf_path.write_bytes(exports.side_by_side_pdf(a, b, rep))
    r = exports.send_to_quality_inbox(rep, [x, pdf_path]); store.audit("compare.sent", a=a["file"], b=b["file"], channel=r["channel"])
    return r

@app.get("/api/jobs/{jid}/consistency")
def get_consistency(jid: str):
    j = _job(jid)
    if not (j["files"].get("bom") or j["files"].get("po")):
        return {"rows": [], "conflicts": 0, "sources": [], "errors": ["Add a BOM and/or a purchase order to this job to run the consistency check."]}
    rep = consistency.check(j, j["drawings"], j["files"].get("bom"), j["files"].get("po"))
    j["consistency"] = rep; store.save_job(j)
    return rep

@app.get("/api/jobs/{jid}/model-check")
def get_model_check(jid: str):
    j = _job(jid)
    if not j["files"].get("step"):
        return {"error": "Add a STEP model to this job to run the drawing vs model check.", "drawings": []}
    run_reports(j); store.save_job(j)
    return j["model_check"]

# ------------------------------------------------------------------ documents
class DocReq(BaseModel):
    drawing: str
    qty: Optional[str] = None
    po: Optional[str] = None

def _out_url(path): return f"/api/out/{Path(path).relative_to(OUT).as_posix()}"

@app.post("/api/jobs/{jid}/docs/inspection-plan")
def doc_ip(jid: str, req: DocReq):
    j = _job(jid); d = _drawing(j, req.drawing)
    if not d.get("extraction"): raise HTTPException(400, "drawing has no extraction")
    r = docs.fill_inspection_plan(d, j); r["url"] = _out_url(r["path"])
    store.audit("doc.generated", job=jid, doc=r["name"]); return r

@app.post("/api/jobs/{jid}/docs/coc")
def doc_coc(jid: str, req: DocReq):
    j = _job(jid); d = _drawing(j, req.drawing)
    if not d.get("extraction"): raise HTTPException(400, "drawing has no extraction")
    r = docs.fill_coc(d, j, {"qty": req.qty or "____", "po": req.po or "____"}); r["url"] = _out_url(r["path"])
    store.audit("doc.generated", job=jid, doc=r["name"]); return r

@app.post("/api/jobs/{jid}/docs/work-instruction")
def doc_wi(jid: str, req: DocReq):
    j = _job(jid); d = _drawing(j, req.drawing)
    if not d.get("extraction"): raise HTTPException(400, "drawing has no extraction")
    dd = dict(d)
    if d["kind"] == "image": dd["kind"] = "pdf"; dd["path"] = d["extraction"]["source"]["pdf_path"]
    images = {}
    for f in d["findings"]:
        if f.get("status") == "rejected" or not f.get("loc"): continue
        try: images[f["id"]] = illustrations.callout_png(dd, f)
        except Exception as e: log.warning("callout image failed: %s", e)
    r = docs.fill_work_instruction(d, j, images); r["url"] = _out_url(r["path"]); r["images"] = len(images)
    store.audit("doc.generated", job=jid, doc=r["name"]); return r

class ReleaseReq(BaseModel):
    name: str

@app.post("/api/docs/release")
def release_doc(req: ReleaseReq):
    """Approval step: copy a generated document to the shared drive (S3 in the AWS deployment, out/released locally)."""
    p = (OUT / Path(req.name).name)
    if not p.exists(): raise HTTPException(404, "document not found")
    st = storage_mod.get_storage(); loc = st.put(str(p), p.name)
    store.audit("doc.released", doc=p.name, storage=st.name, location=loc)
    return {"name": p.name, "storage": st.name, "location": loc}

@app.get("/api/templates")
def templates():
    return docs.list_templates()

class BulkReq(BaseModel):
    find: str; replace: str; preview: bool = True

@app.post("/api/templates/bulk-edit")
def bulk(req: BulkReq):
    if not req.find.strip(): raise HTTPException(400, "find text is empty")
    r = docs.bulk_edit(req.find, req.replace, preview_only=req.preview)
    for f in r["files"]: f["url"] = _out_url(f["path"])
    if not req.preview: store.audit("templates.bulk_edit", find=req.find, replace=req.replace, files=[f["name"] for f in r["files"]], total=r["total"])
    return r

@app.get("/api/templates/{name}")
def template_file(name: str):
    p = (docs.TEMPLATES / Path(name).name)
    if not p.exists(): raise HTTPException(404)
    return FileResponse(p, filename=p.name)

@app.get("/api/out/{path:path}")
def out_file(path: str):
    root = OUT.resolve(); p = (root / path).resolve()
    if root not in p.parents or not p.is_file(): raise HTTPException(404)       # only files inside the output folder
    return FileResponse(p, filename=p.name)

# ------------------------------------------------------------------ Q&A, channels, audit
class AskReq(BaseModel):
    question: str
    history: Optional[list] = None

@app.post("/api/jobs/{jid}/ask")
def ask(jid: str, req: AskReq):
    j = _job(jid)
    r = qa.answer(j, req.question, req.history)
    store.audit("qa.asked", job=jid, question=req.question, mode=r["mode"], tools=r.get("tools_used", []))
    return r

@app.post("/api/channels/lex")
def lex_channel(event: dict):
    """Amazon Lex V2 fulfillment event in, Lex response out (same handler the Lambda uses)."""
    def ask_fn(job_id, question):
        return qa.answer(_job(job_id), question)
    r = lex.handle_event(event, ask_fn)
    store.audit("channel.lex", intent=(event.get("sessionState") or {}).get("intent", {}).get("name"))
    return r

@app.get("/api/audit")
def audit():
    return store.read_audit()

# ------------------------------------------------------------------ static front end (built React app when present, the plain build otherwise)
app.mount("/static", StaticFiles(directory=str(STATIC)), name="static")
if DIST.exists():
    app.mount("/assets", StaticFiles(directory=str(DIST / "assets")), name="assets")

@app.get("/favicon.ico", include_in_schema=False)
def favicon():
    return FileResponse(STATIC / "favicon.svg", media_type="image/svg+xml")

@app.get("/", response_class=HTMLResponse)
def index():
    p = DIST / "index.html"
    if not p.exists():
        return HTMLResponse("<h3>Front end not built.</h3><p>Run <code>make frontend</code> (or <code>cd frontend && npm install && npm run build</code>) and reload.</p>", status_code=503)
    return p.read_text(encoding="utf-8")
