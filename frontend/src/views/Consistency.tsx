import { useEffect, useState } from "react";
import { api } from "../api";
import type { ConsistencyReport, JobSummary } from "../types";
import { Tag, Spin, toast } from "../components/ui";
import type { ViewProps } from "../App";

export function ConsistencyView({ setCrumb }: ViewProps) {
  const [jobs, setJobs] = useState<JobSummary[]>([]); const [jid, setJid] = useState(""); const [rep, setRep] = useState<ConsistencyReport | null>(null); const [busy, setBusy] = useState(false);
  useEffect(() => { setCrumb(["Cross-document consistency", ""]); api.jobs().then(js => { setJobs(js); setJid((js.find(j => j.has_bom || j.has_po) || js[0])?.id || ""); }).catch(e => toast(e.message, true)); }, [setCrumb]);
  const run = async (id = jid) => { if (!id) return; setBusy(true); try { setRep(await api.consistency(id)); } catch (e) { toast((e as Error).message, true); } setBusy(false); };
  useEffect(() => { if (jid) run(jid); /* eslint-disable-next-line */ }, [jid]);
  const attach = async (ev: React.FormEvent<HTMLFormElement>) => { ev.preventDefault(); const fd = new FormData(ev.currentTarget); try { await api.addFiles(jid, fd); toast("Files attached"); setJobs(await api.jobs()); run(); } catch (e) { toast((e as Error).message, true); } };
  return <div className="page"><h2>Drawing set vs BOM vs purchase order</h2><p className="sub">Reads the drawings, the BOM and the PO of a job together and flags where they disagree: revision, material, finish, quantities, hardware.</p>
    <div className="card"><div className="row"><label className="field">Job<select value={jid} onChange={e => setJid(e.target.value)}>{jobs.map(j => <option key={j.id} value={j.id}>{j.name}{j.has_bom ? " · BOM" : ""}{j.has_po ? " · PO" : ""}</option>)}</select></label>
      <button className="btn p" style={{ marginTop: 16 }} onClick={() => run()} disabled={busy}>Run check</button>{busy && <Spin />}</div>
      <form className="row" style={{ marginTop: 8 }} onSubmit={attach}><span className="small">Add to this job:</span><label className="field">BOM<input type="file" name="bom" accept=".xlsx,.csv" /></label><label className="field">PO<input type="file" name="po" accept=".xlsx,.csv" /></label><button className="btn sm" style={{ marginTop: 16 }}>Attach and re-run</button></form></div>
    {rep && <>
      {!!rep.errors?.length && <div className="card warn">{rep.errors.map((e, i) => <div key={i}>{e}</div>)}</div>}
      <div className="row" style={{ marginBottom: 10 }}>{rep.conflicts ? <Tag kind="critical">{rep.conflicts} conflicts</Tag> : <Tag kind="ok">no conflicts</Tag>}<span className="small">Sources: {rep.sources.join(" · ")}</span></div>
      <table><thead><tr><th>Field</th><th>Part</th><th>Drawing</th><th>BOM</th><th>PO</th><th>Status</th><th>Detail</th></tr></thead><tbody>
        {rep.rows.length ? rep.rows.map((x, i) => <tr key={i}><td>{x.field}</td><td className="mono">{x.part}</td><td className="mono">{x.drawing}</td><td className="mono">{x.bom}</td><td className="mono">{x.po}</td><td><Tag kind={x.status}>{x.label}</Tag></td><td className="small">{x.detail}</td></tr>) : <tr><td colSpan={7} className="empty">Nothing to compare.</td></tr>}
      </tbody></table></>}
  </div>;
}
