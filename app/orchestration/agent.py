"""Q&A agent: a LangGraph loop (llm -> tools -> llm ...) over Claude tool calls, grounded in the job's extracted data and the retrieval index.
Without Anthropic credentials the same tools are driven by a local planner so the feature keeps answering."""
from __future__ import annotations
import json, logging, os, re
from typing import TypedDict
from langgraph.graph import StateGraph, START, END
from .. import config
from ..qa import build_context, _retrieve, _field_answer

log = logging.getLogger("printverity.agent")

class AgentState(TypedDict, total=False):
    job: dict
    question: str
    messages: list[dict]
    steps: int
    answer: str
    citations: list[str]
    tool_log: list[dict]

# ------------------------------------------------------------------ tools (plain functions; the schema below is what Claude sees)
def _tools(job):
    lines = build_context(job)
    def search_package(query: str, k: int = 8):
        hits = _retrieve(lines, query, k=k)
        return [{"source": h["src"], "text": h["text"]} for h in hits]
    def search_knowledge(query: str, k: int = 5):
        try:
            from ..retrieval import get_retriever
            return [{"title": h.title, "kind": h.kind, "score": round(h.score, 2), "text": h.text} for h in get_retriever().search(query, k=k)]
        except Exception as e:
            return [{"error": f"retrieval unavailable: {e}"}]
    def list_drawings():
        return [{"drawing": d["id"], "file": d["file"], "part_no": d.get("part_no"), "rev": d.get("rev"), "title": d.get("title"), "findings": len(d.get("findings", [])), "error": d.get("error")} for d in job.get("drawings", [])]
    def get_findings(drawing: str = ""):
        out = []
        for d in job.get("drawings", []):
            if drawing and drawing not in (d["id"], d["file"], d.get("part_no") or ""): continue
            for f in d.get("findings", []):
                out.append({"drawing": d["file"], "n": f.get("n"), "severity": f["severity"], "rule": f.get("rule"), "title": f["title"], "detail": f["detail"], "status": f["status"], "confidence": f["confidence"]})
        return out
    def get_title_block(drawing: str = ""):
        out = {}
        for d in job.get("drawings", []):
            if drawing and drawing not in (d["id"], d["file"], d.get("part_no") or ""): continue
            tb = (d.get("extraction") or {}).get("title_block", {}).get("fields", {})
            out[d["file"]] = {k: v.get("value") for k, v in tb.items()}
        return out
    def get_reports():
        return {"consistency": job.get("consistency"), "model_check": job.get("model_check")}
    return {"search_package": search_package, "search_knowledge": search_knowledge, "list_drawings": list_drawings, "get_findings": get_findings, "get_title_block": get_title_block, "get_reports": get_reports}

TOOL_SCHEMAS = [
    {"name": "search_package", "description": "Full-text search over everything extracted from this job's drawings: title blocks, notes, dimensions, GD&T, threads, parts lists, findings, reports. Returns cited lines.", "input_schema": {"type": "object", "properties": {"query": {"type": "string"}, "k": {"type": "integer"}}, "required": ["query"]}},
    {"name": "search_knowledge", "description": "Semantic search over the spec library, customer rules, ASME Y14.5 excerpts, past accepted findings and templates.", "input_schema": {"type": "object", "properties": {"query": {"type": "string"}, "k": {"type": "integer"}}, "required": ["query"]}},
    {"name": "list_drawings", "description": "List the drawings in the job with part number, revision and finding counts.", "input_schema": {"type": "object", "properties": {}}},
    {"name": "get_findings", "description": "Findings for one drawing (by id, file name or part number) or all drawings.", "input_schema": {"type": "object", "properties": {"drawing": {"type": "string"}}}},
    {"name": "get_title_block", "description": "Title block fields for one drawing or all drawings.", "input_schema": {"type": "object", "properties": {"drawing": {"type": "string"}}}},
    {"name": "get_reports", "description": "The cross-document consistency report (drawing vs BOM vs PO) and the drawing vs STEP model check, if they were run.", "input_schema": {"type": "object", "properties": {}}},
]
SYSTEM = ("You are PrintVerity, an assistant for a machine shop's engineering drawing packages. Answer only from tool results. "
          "Cite sources by repeating the bracketed source label or the drawing file after the sentence it supports. If the data does not contain the answer, say so and name what would be needed. "
          "Be short and concrete, in the voice of a senior manufacturing engineer. Plain text, no markdown.")

class PrintVerityAgent:
    def __init__(self, model: str = config.CLAUDE_MODEL, max_steps: int = config.AGENT_MAX_STEPS):
        self.model, self.max_steps = model, max_steps
        self.client = None
        try:
            import anthropic
            if os.environ.get("ANTHROPIC_API_KEY") or os.environ.get("ANTHROPIC_AUTH_TOKEN") or (os.path.expanduser("~/.config/anthropic") and os.path.isdir(os.path.expanduser("~/.config/anthropic"))):
                self.client = anthropic.Anthropic()
        except Exception as e:
            log.info("anthropic client unavailable: %s", e)
        self.graph = self._build()

    # ---- graph nodes
    def _llm(self, state: AgentState) -> dict:
        resp = self.client.messages.create(model=self.model, max_tokens=1500, system=SYSTEM, tools=TOOL_SCHEMAS, messages=state["messages"], output_config={"effort": "low"})
        content = [b.model_dump() if hasattr(b, "model_dump") else b for b in resp.content]
        msgs = state["messages"] + [{"role": "assistant", "content": content}]
        if resp.stop_reason == "tool_use" and state.get("steps", 0) < self.max_steps:
            return {"messages": msgs, "steps": state.get("steps", 0) + 1}
        text = "".join(b.get("text", "") for b in content if b.get("type") == "text").strip()
        if resp.stop_reason == "refusal" or not text:
            text = text or "I can't answer that from the drawing data."
        return {"messages": msgs, "answer": text, "citations": sorted(set(re.findall(r"\[([^\]]+)\]", text)))}
    def _tools_node(self, state: AgentState) -> dict:
        tools = _tools(state["job"]); last = state["messages"][-1]["content"]; results = []; log_ = list(state.get("tool_log", []))
        for b in last:
            if b.get("type") != "tool_use": continue
            fn = tools.get(b["name"]); args = b.get("input") or {}
            try:
                out = fn(**args) if fn else {"error": f"unknown tool {b['name']}"}
                res = json.dumps(out, ensure_ascii=False)[:12000]; ok = True
            except Exception as e:
                res, ok = json.dumps({"error": str(e)}), False
            results.append({"type": "tool_result", "tool_use_id": b["id"], "content": res, "is_error": not ok})
            log_.append({"tool": b["name"], "args": args, "ok": ok})
        return {"messages": state["messages"] + [{"role": "user", "content": results}], "tool_log": log_}
    def _route(self, state: AgentState) -> str:
        return END if state.get("answer") else "tools"
    def _build(self):
        g = StateGraph(AgentState)
        g.add_node("llm", self._llm); g.add_node("tools", self._tools_node)
        g.add_edge(START, "llm"); g.add_conditional_edges("llm", self._route, {"tools": "tools", END: END}); g.add_edge("tools", "llm")
        return g.compile()

    # ---- entry points
    @property
    def available(self) -> bool:
        return self.client is not None
    def ask(self, job: dict, question: str, history: list[dict] | None = None) -> dict:
        if self.client is None:
            return self.ask_local(job, question)
        msgs = [{"role": h["role"], "content": h["content"]} for h in (history or [])[-6:] if h.get("role") in ("user", "assistant") and isinstance(h.get("content"), str)]
        msgs.append({"role": "user", "content": question})
        try:
            out = self.graph.invoke({"job": job, "question": question, "messages": msgs, "steps": 0, "tool_log": []})
            return {"answer": out.get("answer", ""), "citations": out.get("citations", []), "mode": "agent", "model": self.model, "tools_used": [t["tool"] for t in out.get("tool_log", [])]}
        except Exception as e:
            log.warning("agent failed (%s); local answer", str(e)[:120])
            r = self.ask_local(job, question); r["fallback_reason"] = str(e)[:120]; return r
    def ask_local(self, job: dict, question: str) -> dict:
        """Deterministic planner over the same tools: field lookup, then package search, then knowledge search."""
        fa = _field_answer(job, question)
        if fa: fa["mode"] = "local"; fa["tools_used"] = ["get_title_block"]; return fa
        tools = _tools(job)
        if re.search(r"\b(y14|asme|iso|ams|mil-|astm|standard|spec\b|clause|rule|tap drill|precedent)", question.lower()):
            kn = tools["search_knowledge"](question, 3)
            if kn and "error" not in kn[0]:
                return {"answer": "\n".join(f"{h['text']}  [{h['title']}]" for h in kn), "citations": [h["title"] for h in kn], "mode": "local", "tools_used": ["search_knowledge"]}
        hits = tools["search_package"](question)
        if hits:
            body = [f"{hits[0]['text']}  [{hits[0]['source']}]"] + [f"Related: {h['text']}  [{h['source']}]" for h in hits[1:4]]
            return {"answer": "\n".join(body), "citations": [h["source"] for h in hits[:4]], "mode": "local", "tools_used": ["search_package"]}
        kn = tools["search_knowledge"](question, 3)
        if kn and "error" not in kn[0]:
            return {"answer": "\n".join(f"{h['text']}  [{h['title']}]" for h in kn), "citations": [h["title"] for h in kn], "mode": "local", "tools_used": ["search_knowledge"]}
        return {"answer": "I could not find anything in the extracted drawing data that answers that. Try naming the feature, note number or part number.", "citations": [], "mode": "local", "tools_used": []}

_agent: PrintVerityAgent | None = None
def get_agent() -> PrintVerityAgent:
    global _agent
    if _agent is None: _agent = PrintVerityAgent()
    return _agent
