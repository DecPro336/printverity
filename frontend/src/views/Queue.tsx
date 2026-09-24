import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../api";
import type { JobSummary } from "../types";
import { Tag, Tiles, Empty, Spin, WorstTag, toast } from "../components/ui";
import type { ViewProps } from "../App";

export function QueueView({ go, setCrumb }: ViewProps) {
  const [jobs, setJobs] = useState<JobSummary[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [busy, setBusy] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const load = useCallback(() => api.jobs().then(setJobs).catch(e => toast(e.message, true)), []);
  useEffect(() => { setCrumb(["Queue", ""]); load(); }, [load, setCrumb]);
  // poll while any job is still processing
  useEffect(() => { if (!jobs.some(j => j.status === "queued" || j.status === "processing" || j.status === "pending")) return; const t = setInterval(load, 1500); return () => clearInterval(t); }, [jobs, load]);
  const dws = jobs.flatMap(j => j.drawings.map(d => ({ ...d, job: j })));
  const open = dws.reduce((a, d) => a + (d.open || 0), 0); const need = dws.filter(d => d.open > 0).length;
  const durs = dws.map(d => d.duration).filter((x): x is number => x != null).sort((a, b) => a - b); const med = durs.length ? durs[Math.floor(durs.length / 2)] : null;
  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault(); const fd = new FormData(ev.currentTarget); setBusy("upload");
    try { const j = await api.createJob(fd); toast(j.status === "queued" || j.status === "processing" ? "Package queued for review" : `Checked ${j.drawings.length} drawing(s)`); setShowUpload(false); formRef.current?.reset(); await load(); if (j.status === "done") go({ view: "review", job: j.id }); }
    catch (e) { toast((e as Error).message, true); }
    setBusy("");
  };
  const onDelete = async (id: string) => { if (!confirm("Delete this job and its files?")) return; await api.deleteJob(id); load(); };
  return <div className="page">
    <div className="row between"><div><h2>Drawing queue</h2><p className="sub">Every drawing package checked by PrintVerity. Click a drawing to review it.</p></div>
      <div className="row"><button className="btn p" onClick={() => setShowUpload(true)}>Upload drawing package</button></div></div>
    <Tiles items={[{ v: dws.length, l: "drawings in queue" }, { v: need, l: "need engineer review" }, { v: open, l: "findings open" }, { v: med != null ? (med < 1 ? Math.round(med * 1000) + " ms" : med.toFixed(1) + " s") : "—", l: "median check time" }]} />
    {showUpload && <div className="card"><h3>New drawing package</h3>
      <form ref={formRef} className="grid2" onSubmit={onSubmit}>
        <label className="field">Job name<input name="name" required placeholder="Job 24-1230 · Housing" /></label>
        <label className="field">Customer<input name="customer" placeholder="OEM customer B" /></label>
        <label className="field">Drawings (DXF, PDF or scanned image, multiple)<input name="drawings" type="file" multiple accept=".dxf,.pdf,.dwg,.png,.jpg,.jpeg,.tif,.tiff" /></label>
        <label className="field">STEP model (optional)<input name="step" type="file" accept=".stp,.step" /></label>
        <label className="field">BOM (xlsx / csv, optional)<input name="bom" type="file" accept=".xlsx,.csv" /></label>
        <label className="field">Purchase order (xlsx / csv, optional)<input name="po" type="file" accept=".xlsx,.csv" /></label>
        <div className="row" style={{ gridColumn: "1/3" }}><button className="btn p" type="submit" disabled={busy === "upload"}>Check package</button><button className="btn" type="button" onClick={() => setShowUpload(false)}>Cancel</button>{busy === "upload" && <span className="small"><Spin /> Extracting and checking…</span>}</div>
      </form></div>}
    {dws.length ? <table><thead><tr><th>Job</th><th>Part / Rev</th><th>Title</th><th>Input</th><th>Findings</th><th>Worst</th><th>Status</th><th>Checked</th><th></th></tr></thead><tbody>
      {dws.map(d => { const pending = d.status === "pending" || d.job.status === "queued" || d.job.status === "processing"; return <tr key={d.id} className="click" onClick={() => !pending && go({ view: "review", job: d.job.id, drawing: d.id })}>
        <td>{d.job.name}<div className="small">{d.job.customer}</div></td><td className="mono">{d.part_no || (pending ? "…" : "?")} {d.rev || ""}</td><td>{d.title || d.file}</td>
        <td>{d.kind.toUpperCase()}{d.job.has_step ? " + STEP" : ""}{d.job.has_bom ? " + BOM" : ""}{d.job.has_po ? " + PO" : ""}</td>
        <td>{pending ? <Spin /> : d.error ? <Tag kind="critical">error</Tag> : d.findings === 0 ? <Tag kind="ok">0</Tag> : <Tag kind={d.worst || "low"}>{String(d.open)}</Tag>}</td>
        <td>{pending ? <Tag kind="info">processing</Tag> : d.error ? <Tag kind="critical">error</Tag> : <WorstTag w={d.worst} />}</td>
        <td>{pending ? "In the queue" : d.error ? d.error.slice(0, 60) : d.open > 0 ? "Needs review" : d.findings > 0 ? "All decided" : "Clean"}</td>
        <td className="small">{d.checked_at || ""}<div>{d.duration != null ? d.duration + " s" : ""}</div></td>
        <td><button className="btn sm danger" title="Delete job" onClick={ev => { ev.stopPropagation(); onDelete(d.job.id); }}>✕</button></td></tr>; })}
    </tbody></table> : <Empty>No drawings yet. Click <b>Upload drawing package</b> and add DXF, PDF or scanned drawings, with an optional STEP model, BOM and purchase order.</Empty>}
  </div>;
}
