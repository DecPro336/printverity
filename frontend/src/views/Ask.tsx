import { useEffect, useRef, useState } from "react";
import { api } from "../api";
import type { JobSummary } from "../types";
import { toast } from "../components/ui";
import type { ViewProps } from "../App";

interface Msg { role: "user" | "assistant"; content: string; citations?: string[]; mode?: string; model?: string; tools?: string[]; pending?: boolean }
const SUGGESTED = ["What finish is called out on each drawing?", "Which datums are defined and which are referenced?", "Which thread callouts do not match their hole size?", "Which drawings reference a superseded spec?", "Is the PO at the right revision?", "What does Y14.5 say about datum references?"];

export function AskView({ setCrumb, status }: ViewProps) {
  const [jobs, setJobs] = useState<JobSummary[]>([]); const [jid, setJid] = useState(""); const [chat, setChat] = useState<Msg[]>([]); const [q, setQ] = useState(""); const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { setCrumb(["Ask the package", ""]); api.jobs().then(js => { setJobs(js); setJid(js[0]?.id || ""); }).catch(e => toast(e.message, true)); }, [setCrumb]);
  useEffect(() => { endRef.current?.scrollIntoView({ block: "nearest" }); }, [chat]);
  const ask = async (question: string) => {
    if (!question.trim() || !jid) return; setQ("");
    const history = chat.filter(c => !c.pending).map(c => ({ role: c.role, content: c.content }));
    setChat(c => [...c, { role: "user", content: question }, { role: "assistant", content: "…", pending: true }]);
    try { const r = await api.ask(jid, question, history); setChat(c => [...c.filter(m => !m.pending), { role: "assistant", content: r.answer, citations: r.citations, mode: r.mode, model: r.model, tools: r.tools_used }]); }
    catch (e) { setChat(c => c.filter(m => !m.pending)); toast((e as Error).message, true); }
  };
  return <div className="page"><h2>Ask the drawing package</h2><p className="sub">Plain-language questions over everything extracted from the job: title blocks, notes, dimensions, GD&amp;T, parts lists, findings and reports, plus the spec library and standard excerpts. Every answer cites its source. {status?.claude ? "Answered by the Claude agent with tools." : "Running in local planner mode (no Anthropic credentials found)."}</p>
    <div className="row" style={{ marginBottom: 10 }}><label className="field">Job<select value={jid} onChange={e => { setJid(e.target.value); setChat([]); }}>{jobs.map(j => <option key={j.id} value={j.id}>{j.name}</option>)}</select></label>
      <div className="row" style={{ marginTop: 14 }}>{SUGGESTED.map(s => <button key={s} className="btn sm" onClick={() => ask(s)}>{s}</button>)}</div></div>
    <div className="chat">{chat.map((m, i) => m.role === "user" ? <div key={i} className="msg q">{m.content}</div> : <div key={i} className="msg a">{m.content}{!!m.citations?.length && <div>{m.citations.map((c, k) => <span key={k} className="cite">{c}</span>)}</div>}{!m.pending && <div className="small" style={{ marginTop: 4 }}>{m.mode === "agent" ? `Claude agent · ${m.model || ""}` : "local planner"}{m.tools?.length ? ` · tools: ${m.tools.join(", ")}` : ""}</div>}</div>)}<div ref={endRef} /></div>
    <form className="row" style={{ marginTop: 12, maxWidth: 900 }} onSubmit={e => { e.preventDefault(); ask(q); }}><input value={q} onChange={e => setQ(e.target.value)} className="text" placeholder="Ask about this package…" autoComplete="off" /><button className="btn p">Ask</button></form>
  </div>;
}
