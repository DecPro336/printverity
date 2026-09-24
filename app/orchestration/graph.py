"""The drawing review pipeline as a LangGraph StateGraph.

    ingest -> extract -> rule_check -> enrich -> finalize

Each node is a small pure function over ReviewState; failures are captured in the trace and the drawing record instead of aborting the run.
`run_review(path)` is the single entry point used by the API, the Celery worker and the tests."""
from __future__ import annotations
import time, logging, traceback
from pathlib import Path
from langgraph.graph import StateGraph, START, END
from .state import ReviewState
from .. import dxf_extract, pdf_extract, rules
from ..util import new_id, now

log = logging.getLogger("printverity.graph")

def _tb(ex, f):
    return ((ex.get("title_block", {}).get("fields", {}).get(f) or {}).get("value") or "").strip()

def _timed(name):
    """Decorator: run the node, append a trace entry, never raise."""
    def wrap(fn):
        def inner(state: ReviewState) -> dict:
            t0 = time.perf_counter()
            try:
                out = fn(state) or {}
                status, detail = out.pop("_status", "ok"), out.pop("_detail", "")
            except Exception as e:
                log.error("node %s failed: %s\n%s", name, e, traceback.format_exc())
                out, status, detail = {"error": f"{name}: {e}"}, "error", str(e)
            trace = list(state.get("trace", [])) + [{"node": name, "status": status, "ms": round((time.perf_counter() - t0) * 1000, 1), "detail": detail}]
            out["trace"] = trace
            return out
        inner.__name__ = name
        return inner
    return wrap

@_timed("ingest")
def ingest(state: ReviewState) -> dict:
    path = Path(state["path"]); ext = path.suffix.lower()
    kind = {".dxf": "dxf", ".pdf": "pdf", ".dwg": "dwg", ".png": "raster", ".jpg": "raster", ".jpeg": "raster", ".tif": "raster", ".tiff": "raster"}.get(ext, "unsupported")
    rec = {"id": new_id("dwg_"), "file": path.name, "path": str(path), "kind": kind if kind != "raster" else "image", "part_no": None, "rev": None, "title": None,
           "extraction": None, "findings": [], "checked_at": None, "duration": None, "error": None, "pages": 1, "profile": state.get("profile", "default")}
    if kind == "dwg":
        return {"kind": kind, "drawing": rec, "error": "DWG is a closed binary format. Export the drawing as DXF (File > Save As > DXF) or plot to PDF and upload that.", "_status": "error", "_detail": "dwg"}
    if kind == "unsupported":
        return {"kind": kind, "drawing": rec, "error": f"Unsupported drawing format '{ext}'. Upload DXF, PDF or a scanned image.", "_status": "error", "_detail": ext}
    return {"kind": kind, "drawing": rec, "_detail": kind}

@_timed("extract")
def extract(state: ReviewState) -> dict:
    if state.get("error"): return {"_status": "skipped"}
    kind = state["kind"]; path = state["path"]
    if kind == "dxf":
        ex = dxf_extract.extract(path)
    elif kind == "pdf":
        ex = pdf_extract.extract(path)
        if ex["source"].get("raster"):
            from ..vision.raster import extract_raster_pdf
            ex = extract_raster_pdf(path)
    else:
        from ..vision.raster import extract_image
        ex = extract_image(path)
    return {"extraction": ex, "_detail": f"{ex['counts']['texts']} texts, {ex['counts']['dimensions']} dims, {ex['counts']['fcfs']} fcf"}

@_timed("rule_check")
def rule_check(state: ReviewState) -> dict:
    if state.get("error") or not state.get("extraction"): return {"_status": "skipped"}
    fs = rules.run_all(state["extraction"])
    return {"findings": fs, "_detail": f"{len(fs)} findings"}

@_timed("enrich")
def enrich(state: ReviewState) -> dict:
    """Attach retrieved knowledge (standard clauses, spec records, precedent decisions) to each finding."""
    if state.get("error") or not state.get("findings"): return {"_status": "skipped"}
    try:
        from ..retrieval import get_retriever
        r = get_retriever()
    except Exception as e:
        return {"_status": "skipped", "_detail": f"retrieval unavailable: {str(e)[:60]}"}
    ctx = []
    findings = state["findings"]
    try:
        results = r.search_many([f"{f['category']}: {f['title']}. {f['detail'][:160]}" for f in findings], k=2, kinds=["standard", "spec", "finding", "rule"])
    except Exception:
        results = [[] for _ in findings]
    for f, hits in zip(findings, results):
        refs, seen = [], set()
        for h in hits:
            if h.score <= 0.38 or h.title in seen: continue
            if h.kind == "finding" and f["title"] in h.title: continue      # a precedent is only useful when it is a different finding
            seen.add(h.title); refs.append({"title": h.title, "kind": h.kind, "score": round(h.score, 2), "text": h.text[:240]})
        f["references"] = refs; ctx.extend(refs)
    return {"context": ctx, "findings": findings, "_detail": f"{len(ctx)} references"}

@_timed("finalize")
def finalize(state: ReviewState) -> dict:
    rec = dict(state["drawing"]); ex = state.get("extraction")
    if ex:
        rec["extraction"] = ex
        rec["part_no"] = _tb(ex, "part_no") or None; rec["rev"] = _tb(ex, "rev") or None; rec["title"] = _tb(ex, "title") or None
        rec["pages"] = ex["source"].get("pages", 1)
        for f in state.get("findings", []):
            if f.get("loc") and ex["source"]["kind"] in ("pdf", "raster"): f.setdefault("page", 0)
        rec["findings"] = state.get("findings", [])
    if state.get("error"): rec["error"] = state["error"]
    rec["checked_at"] = now()
    return {"drawing": rec}

def build_review_graph():
    g = StateGraph(ReviewState)
    g.add_node("ingest", ingest); g.add_node("extract", extract); g.add_node("rule_check", rule_check); g.add_node("enrich", enrich); g.add_node("finalize", finalize)
    g.add_edge(START, "ingest"); g.add_edge("ingest", "extract"); g.add_edge("extract", "rule_check"); g.add_edge("rule_check", "enrich"); g.add_edge("enrich", "finalize"); g.add_edge("finalize", END)
    return g.compile()

_graph = None
def run_review(path: str, profile: str = "default") -> dict:
    """Run the pipeline on one file and return the drawing record (never raises)."""
    global _graph
    if _graph is None: _graph = build_review_graph()
    t0 = time.perf_counter()
    try:
        out = _graph.invoke({"path": str(path), "profile": profile, "trace": []})
        rec = out["drawing"]; rec["trace"] = out.get("trace", [])
    except Exception as e:
        log.error("graph failed for %s: %s\n%s", path, e, traceback.format_exc())
        rec = {"id": new_id("dwg_"), "file": Path(path).name, "path": str(path), "kind": Path(path).suffix.lstrip(".").lower(), "part_no": None, "rev": None, "title": None,
               "extraction": None, "findings": [], "checked_at": now(), "error": str(e), "pages": 1, "trace": []}
    rec["duration"] = round(time.perf_counter() - t0, 2)
    return rec
