import { useEffect, useState } from "react";
import { api } from "../api";
import type { JobSummary, ModelReport } from "../types";
import { Tag, Spin, Empty, toast } from "../components/ui";
import { ModelViewer, STATUS_COLORS, webglAvailable } from "../components/ModelViewer";
import type { Mesh } from "../types";
import type { ViewProps } from "../App";
import { useTheme } from "../theme";

export function ModelView({ setCrumb }: ViewProps) {
  const theme = useTheme();
  const [jobs, setJobs] = useState<JobSummary[]>([]); const [jid, setJid] = useState(""); const [rep, setRep] = useState<ModelReport | null>(null); const [busy, setBusy] = useState(false);
  const [mesh, setMesh] = useState<Mesh | null>(null); const [meshMsg, setMeshMsg] = useState("");
  const [software, setSoftware] = useState<string>(() => (webglAvailable() ? "" : "WebGL is not available in this browser")); const [view, setView] = useState<"iso" | "top" | "front" | "side">("iso");
  useEffect(() => { setCrumb(["Drawing vs STEP model", ""]); api.jobs().then(js => { setJobs(js); const withStep = js.filter(j => j.has_step).sort((a, b) => a.created.localeCompare(b.created)); setJid((withStep[0] || js[0])?.id || ""); }).catch(e => toast(e.message, true)); }, [setCrumb]);
  const run = async (id = jid) => { if (!id) return; setBusy(true); setMesh(null); setMeshMsg("");
    try { setRep(await api.modelCheck(id)); } catch (e) { toast((e as Error).message, true); }
    try { setMesh(await api.mesh(id)); } catch (e) { setMeshMsg((e as Error).message); }
    setBusy(false); };
  useEffect(() => { if (jid) run(jid); /* eslint-disable-next-line */ }, [jid]);
  const attach = async (ev: React.FormEvent<HTMLFormElement>) => { ev.preventDefault(); const fd = new FormData(ev.currentTarget); try { await api.addFiles(jid, fd); setJobs(await api.jobs()); run(); } catch (e) { toast((e as Error).message, true); } };
  const mo = rep?.model;
  return <div className="page"><h2>Drawing vs STEP model</h2><p className="sub">Cylindrical features (holes, bores, bosses) read from the STEP file are matched against hole callouts and diameter dimensions on each drawing of the job.</p>
    <div className="card"><div className="row"><label className="field">Job<select value={jid} onChange={e => setJid(e.target.value)}>{jobs.map(j => <option key={j.id} value={j.id}>{j.name}{j.has_step ? " · STEP" : ""}</option>)}</select></label><button className="btn p" style={{ marginTop: 16 }} onClick={() => run()} disabled={busy}>Run check</button>{busy && <Spin />}
      <form className="row" onSubmit={attach}><label className="field">Attach STEP<input type="file" name="step" accept=".stp,.step" /></label><button className="btn sm" style={{ marginTop: 16 }}>Attach and re-run</button></form></div></div>
    {rep?.error && <div className="card warn">{rep.error}</div>}
    {rep && !rep.error && <>
      <div className="grid2" style={{ gridTemplateColumns: "1.1fr 1fr" }}>
        <div className="card"><h3>3D model{mesh?.drawing ? <span className="small"> · checked against {mesh.drawing}</span> : null}</h3>
          {mesh ? <>{software ? <div><img className="viewer3d" src={`/api/jobs/${jid}/model/preview.png?view=${view}&theme=${theme}&t=${mesh.triangles}`} alt="model preview" />
              <div className="row" style={{ marginTop: 6 }}><span className="small">Software preview ({software}). View:</span>{(["iso", "top", "front", "side"] as const).map(v => <button key={v} className={"btn sm" + (view === v ? " p" : "")} onClick={() => setView(v)}>{v}</button>)}</div></div>
            : <ModelViewer mesh={mesh} onFail={setSoftware} />}
            <div className="legend3d">{Object.entries({ match: "matches the drawing", conflict: "size or count conflict", info: "not called out on this sheet", neutral: "other faces" }).map(([k, l]) => <span key={k}><i style={{ background: STATUS_COLORS[k] }} />{l}</span>)}</div>
            <div className="small" style={{ marginTop: 6 }}>{mesh.triangles} triangles · {mesh.engine} · {software ? "rendered on the server" : "drag to orbit, wheel to zoom"}. Cylinders: {mesh.legend.map(l => `Ø${l.diameter} (${l.status})`).join(", ")}</div></>
            : <Empty>{meshMsg || <Spin />}</Empty>}</div>
        <div className="card"><h3>Model {mo?.file || ""} {mo?.product ? "· product " + mo.product : ""} · units {mo?.units || "?"}{mo?.schema ? " · " + mo.schema : ""}{mo?.engine ? <span className="small"> · read with {mo.engine}</span> : null}</h3>
        <div className="row">{(mo?.cylinders || []).map((c, i) => <span key={i} className="pill chip">Ø{c.diameter} × {c.surfaces}</span>)}{mo?.extents && <span className="small">extents {mo.extents.x} × {mo.extents.y}{mo.extents.z != null ? " × " + mo.extents.z : ""}</span>}</div>
          <div className="small" style={{ marginTop: 8 }}>Feature matching tolerance 0.05 mm on size, 0.5 mm on position. Cylinders are grouped by diameter; two half-faces of one hole count once.</div></div></div>
      {rep.drawings.length ? rep.drawings.map(d => d.skipped ? <div key={d.file}><h3 style={{ margin: "14px 0 6px" }}>{d.file} <Tag kind="info">not checked</Tag></h3><div className="small" style={{ marginBottom: 8 }}>{d.skipped}</div></div> :
        <div key={d.file}><h3 style={{ margin: "14px 0 6px" }}>{d.file} {d.conflicts ? <Tag kind="critical">{d.conflicts} conflicts</Tag> : null} <Tag kind="ok">{d.matches} match</Tag></h3>
          <table><thead><tr><th>Feature (drawing)</th><th>Drawing</th><th>Model</th><th>Status</th><th>Detail</th></tr></thead><tbody>{d.rows.map((x, i) => <tr key={i}><td>{x.feature}</td><td className="mono">{x.drawing}</td><td className="mono">{x.model}</td><td><Tag kind={x.status}>{x.status}</Tag></td><td className="small">{x.detail || ""}</td></tr>)}</tbody></table></div>) : <Empty>No drawings in this job.</Empty>}
    </>}
  </div>;
}
