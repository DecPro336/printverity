import { useCallback, useEffect, useRef, useState } from "react";
import { api, customerSlug } from "../api";
import type { Drawing, Finding, Job } from "../types";
import { Tag, Empty, Spin, toast } from "../components/ui";
import type { ViewProps, SetupTab } from "../App";

export function ReviewView({ route, go, setCrumb }: ViewProps) {
  const [job, setJob] = useState<Job | null>(null);
  const [drawing, setDrawing] = useState<Drawing | null>(null);
  const [tab, setTab] = useState<"findings" | "extract" | "pipeline">("findings");
  const [markers, setMarkers] = useState(true);
  const [page, setPage] = useState(0);
  const [imgKey, setImgKey] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true; setLoading(true);
    (async () => {
      try {
        const jobs = await api.jobs(); const jid = route.job || jobs[0]?.id;
        if (!jid) { if (alive) { setJob(null); setDrawing(null); setLoading(false); } return; }
        const j = await api.job(jid); const d = j.drawings.find(x => x.id === route.drawing) || j.drawings[0] || null;
        if (alive) { setJob(j); setDrawing(d); setPage(0); setLoading(false); }
      } catch (e) { toast((e as Error).message, true); setLoading(false); }
    })();
    return () => { alive = false; };
  }, [route.job, route.drawing]);
  useEffect(() => { if (job && drawing) setCrumb(["Drawing review", `${job.name} › ${drawing.part_no || drawing.file} Rev ${drawing.rev || "-"}${drawing.title ? " › " + drawing.title : ""}`]); else setCrumb(["Review", ""]); }, [job, drawing, setCrumb]);
  const refresh = useCallback(() => setImgKey(k => k + 1), []);
  const updateFinding = (f: Finding) => { if (!drawing) return; const nd = { ...drawing, findings: drawing.findings.map(x => x.id === f.id ? { ...x, ...f } : x) }; setDrawing(nd); refresh(); };
  if (loading) return <div className="page"><Empty><Spin /> Loading…</Empty></div>;
  if (!job || !drawing) return <div className="page"><Empty>No drawings to review yet. Go to Queue and upload a drawing package.</Empty></div>;
  const ex = drawing.extraction; const cnt = (s: string) => drawing.findings.filter(f => f.severity === s && f.status !== "rejected").length;
  const onRecheck = async () => { try { await api.recheck(job.id, drawing.id); toast("Re-checked"); go({ view: "review", job: job.id, drawing: drawing.id }); setImgKey(k => k + 1); } catch (e) { toast((e as Error).message, true); } };
  return <div className="review">
    <div className="viewer">
      <div className="dtabs">{job.drawings.map(x => <button key={x.id} className={x.id === drawing.id ? "on" : ""} onClick={() => go({ view: "review", job: job.id, drawing: x.id })}>{x.part_no || x.file} {x.rev || ""} <span className="small" style={{ color: "inherit", opacity: .8 }}>{x.kind.toUpperCase()}</span></button>)}</div>
      <Viewer key={drawing.id} job={job} drawing={drawing} markers={markers} setMarkers={setMarkers} page={page} setPage={setPage} onRecheck={onRecheck} tick={imgKey} initialZoom={route.zoom} initialOverlay={route.overlay} />
      <div className="foot">Source: {drawing.file} ({drawing.kind.toUpperCase()}{ex?.source?.dxfversion ? " " + ex.source.dxfversion : ""}{ex?.source?.scale ? ", plot scale " + ex.source.scale : ""}, units {ex?.source?.units || "?"}) · {ex?.counts?.dimensions ?? 0} dimensions, {ex?.fcfs?.length ?? 0} FCF, {ex?.notes?.length ?? 0} notes, {ex?.circles?.length ?? 0} circles extracted · checked in {drawing.duration} s{ex?.source?.raster ? ` · scanned sheet read with ${ex.source.ocr} OCR and the ${ex.source.layout_model} layout model` : ""}</div>
    </div>
    <div className="panel">
      <div className="ph"><strong>Findings</strong>{(["critical", "high", "medium", "low"] as const).map(s => cnt(s) ? <Tag key={s} kind={s}>{cnt(s)} {s}</Tag> : null)}{drawing.findings.length === 0 && <Tag kind="ok">no findings</Tag>}</div>
      <div className="tabs"><button className={tab === "findings" ? "on" : ""} onClick={() => setTab("findings")}>Findings</button><button className={tab === "extract" ? "on" : ""} onClick={() => setTab("extract")}>Extracted data</button><button className={tab === "pipeline" ? "on" : ""} onClick={() => setTab("pipeline")}>Pipeline</button></div>
      <div className="plist">{tab === "findings" ? <FindingsList job={job} drawing={drawing} onChange={updateFinding} go={go} /> : tab === "extract" ? <ExtractionPanel drawing={drawing} /> : <PipelinePanel drawing={drawing} />}</div>
    </div>
  </div>;
}

const REGION_COLORS: Record<string, string> = { title_block: "#1f5fa8", note: "#1f5fa8", dimension: "#2a7a3b", callout: "#2a7a3b", fcf: "#b8720a", parts_list: "#8a5cc7", balloon: "#8a5cc7", datum: "#b8720a" };

function Viewer({ job, drawing, markers, setMarkers, page, setPage, onRecheck, tick, initialZoom, initialOverlay }: { job: Job; drawing: Drawing; markers: boolean; setMarkers: (b: boolean) => void; page: number; setPage: (p: number) => void; onRecheck: () => void; tick: number; initialZoom?: number; initialOverlay?: "layout" | "ocr" }) {
  const stage = useRef<HTMLDivElement>(null); const wrap = useRef<HTMLDivElement>(null); const img = useRef<HTMLImageElement>(null);
  const st = useRef({ zoom: 1, pan: { x: 0, y: 0 }, nat: [0, 0] as [number, number], drag: null as null | { x: number; y: number }, fitted: false });
  const [zoomLabel, setZoomLabel] = useState("100%");
  const [overlay, setOverlay] = useState<"none" | "layout" | "ocr">(initialOverlay || "none");
  const [natural, setNatural] = useState<[number, number]>([0, 0]);
  const apply = useCallback(() => { const s = st.current; if (wrap.current) wrap.current.style.transform = `translate(${s.pan.x}px,${s.pan.y}px) scale(${s.zoom})`; setZoomLabel(Math.round(s.zoom * 100) + "%"); }, []);
  const fit = useCallback(() => { const s = st.current; const el = stage.current; if (!el || !s.nat[0]) return; s.zoom = Math.min((el.clientWidth - 24) / s.nat[0], (el.clientHeight - 24) / s.nat[1]); s.pan = { x: (el.clientWidth - s.nat[0] * s.zoom) / 2, y: (el.clientHeight - s.nat[1] * s.zoom) / 2 }; apply(); }, [apply]);
  /* zoom about a point in stage coordinates so the feature under the cursor (or the view centre) stays put */
  const zoomAt = useCallback((k: number, cx?: number, cy?: number) => {
    const s = st.current; const el = stage.current; if (!el) return;
    const px = cx ?? el.clientWidth / 2, py = cy ?? el.clientHeight / 2;
    const next = Math.min(40, Math.max(0.05, s.zoom * k)); const kk = next / s.zoom;
    s.pan = { x: px - (px - s.pan.x) * kk, y: py - (py - s.pan.y) * kk }; s.zoom = next; apply();
  }, [apply]);
  useEffect(() => { window.addEventListener("resize", fit); return () => window.removeEventListener("resize", fit); }, [fit]);
  useEffect(() => {   /* wheel zoom needs a non-passive listener to stop the page from scrolling */
    const el = stage.current; if (!el) return;
    const onWheel = (ev: WheelEvent) => { ev.preventDefault(); const r = el.getBoundingClientRect(); zoomAt(ev.deltaY < 0 ? 1.15 : 1 / 1.15, ev.clientX - r.left, ev.clientY - r.top); };
    el.addEventListener("wheel", onWheel, { passive: false }); return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt]);
  const onLoad = () => {
    const i = img.current!; const s = st.current; s.nat = [i.naturalWidth, i.naturalHeight]; setNatural([i.naturalWidth, i.naturalHeight]);
    i.width = i.naturalWidth; i.height = i.naturalHeight;
    if (wrap.current) { wrap.current.style.width = i.naturalWidth + "px"; wrap.current.style.height = i.naturalHeight + "px"; }
    if (!s.fitted) { fit(); s.fitted = true; if (initialZoom && initialZoom > 0) zoomAt(initialZoom / s.zoom); } else apply();
  };
  const onDown = (ev: React.MouseEvent) => { st.current.drag = { x: ev.clientX - st.current.pan.x, y: ev.clientY - st.current.pan.y }; };
  const onMove = (ev: React.MouseEvent) => { const s = st.current; if (!s.drag) return; s.pan = { x: ev.clientX - s.drag.x, y: ev.clientY - s.drag.y }; apply(); };
  const onUp = () => { st.current.drag = null; };
  const src = drawing.extraction?.source; const isRaster = !!src?.raster;
  const pageSize = src?.page_sizes?.[page]; const scale = pageSize && natural[0] ? natural[0] / pageSize[0] : 0;
  const boxes = overlay === "layout" ? (src?.regions?.[page] || []).map(r => ({ cls: r.cls, conf: r.conf, bbox: r.bbox })) : overlay === "ocr" ? (drawing.extraction?.texts || []).filter(t => t.bbox && (t.page ?? 0) === page).map(t => ({ cls: "text", conf: t.conf ?? 0, bbox: t.bbox! })) : [];
  return <>
    <div className="bar"><button className="btn sm" onClick={fit}>Fit</button><button className="btn sm" onClick={() => zoomAt(1 / 1.25)}>−</button><span className="small">{zoomLabel}</span><button className="btn sm" onClick={() => zoomAt(1.25)}>+</button>
      {drawing.kind !== "dxf" && drawing.pages > 1 && <><button className="btn sm" onClick={() => setPage(Math.max(0, page - 1))}>‹ page</button><span className="small">{page + 1} / {drawing.pages}</span><button className="btn sm" onClick={() => setPage(Math.min(drawing.pages - 1, page + 1))}>page ›</button></>}
      <label className="small" style={{ marginLeft: 6 }}><input type="checkbox" checked={markers} onChange={e => setMarkers(e.target.checked)} /> markers</label>
      {isRaster && <span className="small" style={{ marginLeft: 6 }}>Overlay: {(["none", "layout", "ocr"] as const).map(o => <button key={o} className={"btn sm" + (overlay === o ? " p" : "")} style={{ marginLeft: 4 }} onClick={() => setOverlay(o)}>{o === "none" ? "original" : o === "layout" ? "layout regions" : "OCR lines"}</button>)}</span>}
      <span style={{ flex: 1 }} />
      <a className="btn sm" href={api.markupUrl(job.id, drawing.id)} target="_blank" rel="noreferrer">Markup PDF</a><a className="btn sm" href={api.findingsUrl(job.id, drawing.id, "csv")}>Findings CSV</a><button className="btn sm" onClick={onRecheck}>Re-check</button></div>
    <div className="stage" ref={stage} onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}>
      {drawing.error ? <Empty>{drawing.error}</Empty> : <div ref={wrap} className="canvaswrap">
        <img ref={img} alt="drawing" src={api.renderUrl(job.id, drawing.id, page, markers) + "&r=" + tick} onLoad={onLoad} draggable={false} />
        {scale > 0 && boxes.map((b, i) => { const [x0, y0, x1, y1] = b.bbox; const col = REGION_COLORS[b.cls] || "#5b6673"; const left = x0 * scale, top = (pageSize![1] - y1) * scale, w = (x1 - x0) * scale, h = (y1 - y0) * scale;
          return <div key={i} className="region" style={{ left, top, width: w, height: h, borderColor: col, background: col + "14" }}><span className="rlabel" style={{ background: col }}>{b.cls.replace("_", " ")} {b.conf.toFixed(2)}</span></div>; })}
      </div>}
    </div>
  </>;
}

// findings that customer setup resolves link straight to the right Setup tab
const SETUP_LINK: Record<string, [SetupTab, string, string]> = {
  "TB-01": ["customers", "Set up wording", "Add this customer's title-block wording in Setup"],
  "PL-01": ["revisions", "Add revisions", "Import the customer's released revisions in Setup"],
  "SP-01": ["specs", "Add spec", "Import the customer's spec register in Setup"],
};

function FindingsList({ job, drawing, onChange, go }: { job: Job; drawing: Drawing; onChange: (f: Finding) => void; go: ViewProps["go"] }) {
  const voiceRef = useRef<HTMLInputElement>(null); const [voiceFor, setVoiceFor] = useState<string | null>(null);
  if (!drawing.findings.length) return <Empty>No findings. {drawing.error || "The rule checks passed on this sheet."}</Empty>;
  const decide = async (f: Finding, status: string) => { try { onChange(await api.decide(job.id, drawing.id, f.id, { status })); } catch (e) { toast((e as Error).message, true); } };
  const note = async (f: Finding) => { const n = prompt("Note for this finding:", f.note || ""); if (n === null) return; try { onChange(await api.decide(job.id, drawing.id, f.id, { note: n })); } catch (e) { toast((e as Error).message, true); } };
  const onVoice = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0]; const fid = voiceFor; ev.target.value = ""; if (!file || !fid) return;
    const fd = new FormData(); fd.append("audio", file);
    try { const r = await api.voiceNote(job.id, drawing.id, fid, fd); onChange(r.body.finding); toast(r.status === 202 ? r.body.message : "Voice note transcribed and attached", r.status === 202); } catch (e) { toast((e as Error).message, true); }
  };
  return <>
    <input ref={voiceRef} type="file" accept="audio/*,.m4a,.mp3,.wav,.ogg,.webm" style={{ display: "none" }} onChange={onVoice} />
    {drawing.findings.map(f => <div key={f.id} className={"f " + f.status}>
      <div className="t"><span className="n">{f.n}</span><span className="ttl">{f.title}</span><span className="conf" title="confidence">{f.confidence.toFixed(2)}</span></div>
      <div className="loc">{f.detail}</div>
      {!!f.references?.length && <div className="small" style={{ marginTop: 4 }}>Basis: {f.references.map(r => r.title).join(" · ")}</div>}
      <div className="b"><Tag kind={f.severity}>{f.severity} · {f.category}</Tag>
        {f.status === "open" ? <><button className="btn sm p" onClick={() => decide(f, "accepted")}>Accept</button><button className="btn sm" onClick={() => decide(f, "rejected")}>Reject</button></> : <><span className="small">{f.status}</span><button className="btn sm" onClick={() => decide(f, "open")}>Reopen</button></>}
        <button className="btn sm" onClick={() => note(f)}>Note</button>
        <button className="btn sm" title="Attach a voice note (transcribed with AssemblyAI)" onClick={() => { setVoiceFor(f.id); voiceRef.current?.click(); }}>Voice</button>
        {f.loc && <a className="btn sm" href={api.calloutUrl(job.id, drawing.id, f.id)} target="_blank" rel="noreferrer" title="Work-instruction callout image">Callout</a>}
        {f.rule && SETUP_LINK[f.rule] && <button className="btn sm" title={SETUP_LINK[f.rule][2]} onClick={() => go({ view: "setup", tab: SETUP_LINK[f.rule!][0], customer: job.customer ? customerSlug(job.customer) : undefined })}>{SETUP_LINK[f.rule][1]}</button>}
        {f.rule && <span className="small mono">{f.rule}</span>}</div>
      {f.note && <div className="note">{f.note}</div>}
    </div>)}
  </>;
}

function ExtractionPanel({ drawing }: { drawing: Drawing }) {
  const ex = drawing.extraction; if (!ex) return <Empty>{drawing.error || "No extraction"}</Empty>;
  const tb = ex.title_block?.fields || {};
  const H = ({ children }: { children: React.ReactNode }) => <h3 style={{ margin: "14px 0 6px", fontSize: 13 }}>{children}</h3>;
  return <div style={{ padding: "12px 14px" }} className="kv">
    <h3 style={{ margin: "0 0 6px", fontSize: 13 }}>Title block</h3>{Object.keys(tb).length ? Object.entries(tb).map(([k, v]) => <div key={k}><span>{k.replace("_", " ")}</span><span>{v.value || "(blank)"} <span className="small">{v.conf} · {v.source || ""}</span></span></div>) : <div className="small">none detected</div>}
    <H>Notes ({ex.notes?.length ?? 0})</H>{(ex.notes || []).map(n => <div key={n.n}><span>{n.n}</span><span>{n.text}</span></div>)}
    <H>Dimensions ({ex.dimensions?.length ?? 0})</H>{(ex.dimensions || []).map((x, i) => <div key={i}><span>{x.type}</span><span className="mono">{x.text}{x.measured != null && x.override ? <span className="small"> (geometry {x.measured})</span> : null}</span></div>)}
    <H>GD&amp;T</H>{(ex.fcfs || []).map((f, i) => <div key={i}><span>{f.symbol || "frame"}</span><span>{f.diameter ? "Ø" : ""}{f.tolerance ?? "?"} {(f.modifiers || []).join(" ")} → {(f.datums || []).join("-") || "no datums"}</span></div>)}
    {!(ex.fcfs || []).length && <div className="small">no feature control frames</div>}
    <div><span>datums defined</span><span>{(ex.datums || []).map(x => x.id).join(", ") || "none"}</span></div>
    <H>Callouts &amp; threads</H>{(ex.threads || []).map((t, i) => <div key={i}><span>thread</span><span>{t.spec} · tap drill Ø{t.tap_drill}{t.circle ? ` · hole Ø${(t.circle.r * 2).toFixed(2)} (${t.circle.via})` : " · no hole associated"}</span></div>)}
    {(ex.callouts || []).filter(c => !/^\s*\d+[.)]/.test(c.text)).map((c, i) => <div key={i}><span>callout</span><span>{c.text}</span></div>)}
    <H>Specs referenced</H>{(ex.specs || []).map((s, i) => <div key={i}><span>{s.ref}</span><span>{s.rev ? "Rev " + s.rev : "no rev stated"}</span></div>)}{!(ex.specs || []).length && <div className="small">none</div>}
    {ex.parts_list && <><H>Parts list ({ex.parts_list.rows.length})</H>{ex.parts_list.rows.map(r => <div key={r.item}><span>{r.item}</span><span className="mono">{r.qty}× {r.part_no} {r.description || ""} {r.rev ? "rev " + r.rev : ""}</span></div>)}</>}
    {!!ex.warnings?.length && <><H>Parser notes</H>{ex.warnings.map((w, i) => <div key={i} className="small">{w}</div>)}</>}
  </div>;
}

function PipelinePanel({ drawing }: { drawing: Drawing }) {
  const trace = drawing.trace || [];
  return <div style={{ padding: "12px 14px" }} className="kv">
    <div className="small" style={{ marginBottom: 8 }}>LangGraph review pipeline: ingest → extract → rule check → enrich (retrieval) → finalize. Each node's status and time for this drawing.</div>
    {trace.length ? trace.map((s, i) => <div key={i}><span>{s.node}</span><span><Tag kind={s.status === "ok" ? "ok" : s.status === "skipped" ? "info" : "critical"}>{s.status}</Tag> <span className="mono">{s.ms} ms</span> <span className="small">{s.detail}</span></span></div>) : <div className="small">No trace recorded for this drawing (checked before the pipeline graph was introduced). Re-check to record one.</div>}
  </div>;
}
