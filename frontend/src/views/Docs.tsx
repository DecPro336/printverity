import { useEffect, useState } from "react";
import { api } from "../api";
import type { BulkResult, DocResult, JobSummary, Template } from "../types";
import { Tag, Spin, toast } from "../components/ui";
import { drawingOptions } from "./Compare";
import type { ViewProps } from "../App";

export function DocsView({ setCrumb }: ViewProps) {
  const [jobs, setJobs] = useState<JobSummary[]>([]); const [tpls, setTpls] = useState<Template[]>([]); const [sel, setSel] = useState(""); const [qty, setQty] = useState(""); const [po, setPo] = useState("");
  const [doc, setDoc] = useState<DocResult | null>(null); const [busy, setBusy] = useState(""); const [find, setFind] = useState(""); const [repl, setRepl] = useState(""); const [bulk, setBulk] = useState<BulkResult | null>(null); const [released, setReleased] = useState<string>("");
  useEffect(() => { setCrumb(["Documentation and templates", ""]); api.jobs().then(js => { setJobs(js); setSel(drawingOptions(js)[0]?.value || ""); }).catch(e => toast(e.message, true)); api.templates().then(setTpls).catch(() => undefined); }, [setCrumb]);
  const gen = async (kind: "inspection-plan" | "coc" | "work-instruction") => { const [jid, did] = sel.split("|"); setBusy(kind); setReleased(""); try { setDoc(await api.doc(jid, kind, { drawing: did, qty, po })); } catch (e) { toast((e as Error).message, true); } setBusy(""); };
  const release = async () => { if (!doc) return; try { const r = await api.release(doc.name); setReleased(`${r.storage}: ${r.location}`); toast("Released to " + r.storage); } catch (e) { toast((e as Error).message, true); } };
  const runBulk = async (preview: boolean) => { setBusy("bulk"); try { setBulk(await api.bulk(find, repl, preview)); } catch (e) { toast((e as Error).message, true); } setBusy(""); };
  const mark = (t: string) => { const i = t.indexOf(find); if (i < 0) return <>{t}</>; return <>{t.slice(0, i)}<del>{find}</del><ins>{repl}</ins>{t.slice(i + find.length)}</>; };
  return <div className="page"><h2>Documentation and templates</h2><p className="sub">Fill the shop's standard templates from the drawing data, or change every template at once with tracked changes.</p>
    <div className="grid2"><div className="card"><h3>Generate from a drawing</h3>
      <div className="row"><label className="field">Drawing<select value={sel} onChange={e => setSel(e.target.value)}>{drawingOptions(jobs).map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></label><label className="field">Qty<input size={6} value={qty} onChange={e => setQty(e.target.value)} /></label><label className="field">PO<input size={8} value={po} onChange={e => setPo(e.target.value)} /></label></div>
      <div className="row" style={{ marginTop: 10 }}><button className="btn p" disabled={!!busy} onClick={() => gen("inspection-plan")}>Inspection plan (xlsx)</button><button className="btn p" disabled={!!busy} onClick={() => gen("coc")}>Certificate of conformance (docx)</button><button className="btn p" disabled={!!busy} onClick={() => gen("work-instruction")}>Work instruction (docx)</button>{busy && busy !== "bulk" && <Spin />}</div>
      {doc && <div style={{ marginTop: 10 }}><div className="row"><Tag kind="ok">generated</Tag><a className="btn sm" href={doc.url}>Download {doc.name}</a><button className="btn sm" onClick={release}>Approve and release</button>{doc.images != null && <span className="small">{doc.images} callout image{doc.images === 1 ? "" : "s"}</span>}{released && <span className="small">Released → {released}</span>}</div>
        {doc.characteristics && <table style={{ marginTop: 8 }}><thead><tr><th>#</th><th>Characteristic</th><th>Nominal</th><th>Tol</th><th>Method</th><th>Freq</th></tr></thead><tbody>{doc.characteristics.map(c => <tr key={c.n}><td>{c.n}</td><td>{c.characteristic}</td><td className="mono">{c.nominal}</td><td className="mono">{c.tol}</td><td>{c.method}</td><td>{c.freq}</td></tr>)}</tbody></table>}</div>}
    </div>
    <div className="card"><h3>Template library</h3><table><thead><tr><th>Template</th><th>Type</th><th>Use</th></tr></thead><tbody>{tpls.map(t => <tr key={t.name}><td><a href={`/api/templates/${t.name}`}>{t.name}</a></td><td>{t.kind}</td><td>{t.description}</td></tr>)}</tbody></table></div></div>
    <div className="card"><h3>Bulk template edit (tracked changes)</h3><p className="small" style={{ margin: "0 0 8px" }}>Example: the customer superseded QS-114 Rev B with Rev D. Update every template that references it. Word files receive tracked changes for review; Excel files get a change-log sheet.</p>
      <div className="row"><label className="field">Find<input value={find} size={24} placeholder="e.g. QS-114 Rev B" onChange={e => setFind(e.target.value)} /></label><label className="field">Replace with<input value={repl} size={24} placeholder="e.g. QS-114 Rev D" onChange={e => setRepl(e.target.value)} /></label><button className="btn" style={{ marginTop: 16 }} disabled={!!busy || !find.trim()} onClick={() => runBulk(true)}>Preview</button><button className="btn p" style={{ marginTop: 16 }} disabled={!!busy || !find.trim()} onClick={() => runBulk(false)}>Apply with tracked changes</button>{busy === "bulk" && <Spin />}</div>
      {bulk && <div style={{ marginTop: 10 }}><div className="row" style={{ marginBottom: 8 }}>{bulk.total ? <Tag kind={bulk.preview ? "medium" : "ok"}>{bulk.total} occurrence{bulk.total !== 1 ? "s" : ""} in {bulk.results.length} template{bulk.results.length !== 1 ? "s" : ""}{bulk.preview ? " (preview, nothing written)" : " (written)"}</Tag> : <Tag kind="info">no matches</Tag>}</div>
        {bulk.results.map(x => <div key={x.file} className="card plain"><div className="row between"><strong>{x.file}</strong><span className="small">{x.kind} · {x.count} change{x.count !== 1 ? "s" : ""} · {x.mode}</span>{!bulk.preview && <a className="btn sm" href={bulk.files.find(f => f.name === x.file)?.url || "#"}>Download</a>}</div>
          {x.previews.map((p, i) => <div key={i} className="diff small" style={{ marginTop: 6 }}>{p.cell ? <span className="mono">{p.cell} </span> : null}{mark(p.before)}</div>)}</div>)}</div>}
    </div>
  </div>;
}
