import { useEffect, useState } from "react";
import { api } from "../api";
import type { CompareReport, JobSummary } from "../types";
import { Tag, Tiles, Spin, toast } from "../components/ui";
import type { ViewProps } from "../App";

export type DrawingOption = ReturnType<typeof drawingOptions>[number];
const KIND_RANK: Record<string, number> = { dxf: 0, pdf: 1, image: 2 };
function revKey(rev?: string | null): [number, number, string] { const v = (rev || "").toUpperCase().replace(/[^A-Z0-9]/g, ""); return !v ? [0, 0, ""] : /^\d+$/.test(v) ? [1, Number(v), ""] : [2, v.length, v]; }
function cmpRev(a?: string | null, b?: string | null) { const x = revKey(a), y = revKey(b); return x[0] - y[0] || x[1] - y[1] || x[2].localeCompare(y[2]); }
/** Default From/To pair: the most recently uploaded part that exists in two or more revisions, its two latest revisions.
 *  For each revision the native DXF is preferred over a PDF plot or a scan, and the first upload over later copies. */
export function defaultPair(o: DrawingOption[]): [string, string] | null {
  const parts: string[] = []; for (const x of o) if (x.part_no && !parts.includes(x.part_no)) parts.push(x.part_no);   // queue order: newest job first
  const best = new Map<string, DrawingOption>();
  for (const x of [...o].reverse()) { if (!x.part_no || !x.rev) continue; const k = x.part_no + "|" + x.rev; const cur = best.get(k); if (!cur || (KIND_RANK[x.kind] ?? 9) < (KIND_RANK[cur.kind] ?? 9)) best.set(k, x); }
  for (const p of parts) { const revs = [...best.values()].filter(x => x.part_no === p).sort((a, b) => cmpRev(a.rev, b.rev)); if (revs.length >= 2) return [revs[revs.length - 2].value, revs[revs.length - 1].value]; }
  return o.length > 1 ? [o[1].value, o[0].value] : null;
}

export function drawingOptions(jobs: JobSummary[]) { return jobs.flatMap(j => j.drawings.filter(d => !d.error).map(d => ({ value: j.id + "|" + d.id, label: `${d.part_no || d.file} Rev ${d.rev || "?"} — ${d.file} (${j.name.split(" · ")[0]})`, part_no: d.part_no, rev: d.rev, kind: d.kind }))); }

export function CompareView({ setCrumb }: ViewProps) {
  const [jobs, setJobs] = useState<JobSummary[]>([]); const [a, setA] = useState(""); const [b, setB] = useState(""); const [rep, setRep] = useState<CompareReport | null>(null); const [busy, setBusy] = useState(false); const [sent, setSent] = useState("");
  const ids = () => { const [aj, ad] = a.split("|"), [bj, bd] = b.split("|"); return [aj, ad, bj, bd] as const; };
  const inbox = async () => { const [aj, ad, bj, bd] = ids(); try { const r = await api.compareInbox(aj, ad, bj, bd); setSent(r.channel === "smtp" ? `Sent to ${r.to}` : `Dropped in the quality inbox folder (${r.location}). ${r.note || ""}`); toast("Change report handed to quality"); } catch (e) { toast((e as Error).message, true); } };
  useEffect(() => { setCrumb(["Revision comparison", ""]); api.jobs().then(js => { setJobs(js); const pair = defaultPair(drawingOptions(js)); if (pair) { setA(pair[0]); setB(pair[1]); } }).catch(e => toast(e.message, true)); }, [setCrumb]);
  const opts = drawingOptions(jobs);
  const run = async () => { if (!a || !b) return; setBusy(true); try { const [aj, ad] = a.split("|"), [bj, bd] = b.split("|"); setRep(await api.compare(aj, ad, bj, bd)); } catch (e) { toast((e as Error).message, true); } setBusy(false); };
  useEffect(() => { if (a && b && !rep) run(); /* eslint-disable-next-line */ }, [a, b]);
  const ecoTag: Record<string, JSX.Element> = { match: <Tag kind="ok">ECO matches PLM</Tag>, mismatch: <Tag kind="critical">ECO mismatch</Tag>, "missing on drawing": <Tag kind="medium">No ECO on drawing</Tag>, "revision not released": <Tag kind="high">Rev not released in PLM</Tag>, unknown: <Tag kind="info">Part not in PLM</Tag> };
  return <div className="page"><h2>Revision comparison</h2><p className="sub">Pick two revisions of the same part. PrintVerity pairs dimensions by feature points, notes by number and text, and classifies each change by impact.</p>
    <div className="card"><div className="grid2"><label className="field">From (older revision)<select value={a} onChange={e => setA(e.target.value)}>{opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></label><label className="field">To (newer revision)<select value={b} onChange={e => setB(e.target.value)}>{opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></label></div>
      <div className="row" style={{ marginTop: 10 }}><button className="btn p" onClick={run} disabled={busy}>Compare</button>{busy && <Spin />}</div></div>
    {rep && <>
      <Tiles items={[{ v: rep.summary.total, l: `changes ${rep.labelA} → ${rep.labelB}` }, { v: rep.summary.dimensions, l: "dimensions / tolerances" }, { v: rep.summary.notes + rep.summary.callouts, l: "notes and callouts" }, { v: rep.summary.affects_fit, l: "affect fit or function", color: rep.summary.affects_fit ? "var(--red)" : "var(--green)" }]} />
      <div className="grid2"><div className="card"><h3>ECO cross-check {ecoTag[rep.eco.status] || null}</h3><div className="kv"><div><span>Part</span><span className="mono">{rep.eco.part_no} Rev {rep.eco.rev}</span></div><div><span>Drawing ECO</span><span className="mono">{rep.eco.drawing_eco || "—"}</span></div><div><span>PLM ECO</span><span className="mono">{rep.eco.plm_eco || "—"} {rep.eco.plm_rev ? `(Rev ${rep.eco.plm_rev}, released ${rep.eco.released})` : ""}{rep.eco.source ? <span className="small"> · {rep.eco.source}</span> : null}</span></div></div></div>
        <div className="card"><h3>Downstream</h3>{rep.downstream.length ? <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13 }}>{rep.downstream.map((x, i) => <li key={i}>{x}</li>)}</ul> : <div className="small">No downstream actions.</div>}</div></div>
      <div className="row" style={{ margin: "12px 0" }}><a className="btn p" href={api.compareXlsxUrl(...ids())}>Export change report (xlsx)</a><a className="btn" href={api.comparePdfUrl(...ids())} target="_blank" rel="noreferrer">Open side-by-side PDF</a><button className="btn" onClick={inbox}>Send to quality inbox</button>{sent && <span className="small">{sent}</span>}</div>
      <table><thead><tr><th>#</th><th>Kind</th><th>Item</th><th>{rep.labelA}</th><th>{rep.labelB}</th><th>Change</th><th>Impact</th></tr></thead><tbody>
        {rep.changes.length ? rep.changes.map((c, i) => <tr key={i}><td>{i + 1}</td><td>{c.kind}</td><td>{c.item}</td><td className="mono">{c.a}</td><td className="mono">{c.b}</td><td>{c.change}</td><td><Tag kind={c.impact}>{c.impact}</Tag> <span className="small">{c.why}</span></td></tr>) : <tr><td colSpan={7} className="empty">No differences found.</td></tr>}
      </tbody></table></>}
  </div>;
}
