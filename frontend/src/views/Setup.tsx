/* Setup: a customer's title-block wording, the spec library and the released-revision register. A new customer is set up
   here once, in the browser: the title blocks of its uploaded drawings are scanned for wording that is not recognised yet. */
import { useCallback, useEffect, useState } from "react";
import { api } from "../api";
import type { Customer, CustomerField, CustomerSummary, ImportResult, RevisionRecord, Severity, SpecRecord, Suggestion } from "../types";
import { Chips, Empty, Spin, Tag, toast } from "../components/ui";
import type { SetupTab, ViewProps } from "../App";

const TABS: [SetupTab, string][] = [["customers", "Customers"], ["specs", "Spec library"], ["revisions", "Released revisions"]];
const SEVERITIES: Severity[] = ["critical", "high", "medium", "low"];
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;
const sgKey = (s: Suggestion) => s.kind + ":" + s.text;

export function SetupView({ route, go, setCrumb }: ViewProps) {
  const tab: SetupTab = route.tab || "customers";
  useEffect(() => { setCrumb(["Setup", TABS.find(t => t[0] === tab)?.[1] || ""]); }, [tab, setCrumb]);
  return <div className="page">
    <h2>Setup</h2>
    <p className="sub">Set up a customer once: the wording of its title blocks, the specifications its drawings call out and its released revisions. New uploads use the setup straight away. To apply it to drawings already in the queue, re-check the customer.</p>
    <div className="tabs page-tabs">{TABS.map(([k, l]) => <button key={k} className={tab === k ? "on" : ""} onClick={() => go({ view: "setup", tab: k, customer: k === "customers" ? route.customer : undefined })}>{l}</button>)}</div>
    {tab === "customers" ? <Customers route={route} go={go} /> : tab === "specs" ? <Specs /> : <Revisions />}
  </div>;
}

async function waitForJobs(ids: string[], timeoutMs = 300000) {
  const t0 = Date.now();
  for (;;) {
    const st = await Promise.all(ids.map(id => api.jobStatus(id).catch(() => ({ status: "done" }))));
    if (st.every(s => s.status === "done" || s.status === "error") || Date.now() - t0 > timeoutMs) return;
    await new Promise(r => setTimeout(r, 1200));
  }
}

function Customers({ route, go }: Pick<ViewProps, "route" | "go">) {
  const [list, setList] = useState<CustomerSummary[] | null>(null);
  const [cust, setCust] = useState<Customer | null>(null);
  const [draft, setDraft] = useState<CustomerField[]>([]);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState("");
  const [newName, setNewName] = useState("");
  const [picks, setPicks] = useState<Record<string, string>>({});
  const slug = route.customer || list?.[0]?.slug;
  const loadList = useCallback(() => api.customers().then(setList).catch(e => toast(e.message, true)), []);
  const loadCust = useCallback(async (s: string) => {
    try { const c = await api.customer(s); setCust(c); setDraft(c.fields.map(f => ({ ...f, labels: [...f.labels], tags: [...f.tags] }))); setDirty(false); setPicks({}); }
    catch (e) { setCust(null); toast((e as Error).message, true); }
  }, []);
  useEffect(() => { loadList(); }, [loadList]);
  useEffect(() => { if (slug) loadCust(slug); else setCust(null); }, [slug, loadCust]);

  const select = (s: string) => { if (s === slug || (dirty && !confirm("Discard the unsaved changes for this customer?"))) return; go({ view: "setup", tab: "customers", customer: s }); };
  const update = (field: string, patch: Partial<CustomerField>) => { setDraft(d => d.map(f => f.field === field ? { ...f, ...patch } : f)); setDirty(true); };
  const inDraft = (s: Suggestion) => draft.some(f => (s.kind === "label" ? f.labels : f.tags).some(x => x.toUpperCase() === s.text.toUpperCase()));
  const pending = (cust?.suggestions || []).filter(s => !inDraft(s));
  const fieldFor = (s: Suggestion) => picks[sgKey(s)] ?? s.field ?? "";
  const accept = (items: Suggestion[]) => {
    let d = draft; let added = 0;
    for (const s of items) {
      const field = fieldFor(s); if (!field) continue;
      d = d.map(f => f.field !== field ? f : s.kind === "label" ? { ...f, labels: [...f.labels, s.text] } : { ...f, tags: [...f.tags, s.text] }); added++;
    }
    if (!added) { toast("Choose the field this entry holds first", true); return; }
    setDraft(d); setDirty(true);
  };
  const save = async (recheck: boolean) => {
    if (!cust) return; setBusy(recheck ? "recheck" : "save");
    try {
      const c = await api.saveCustomer(cust.slug, cust.name, draft);
      setCust(c); setDraft(c.fields); setDirty(false); toast("Setup saved");
      if (recheck) {
        const r = await api.recheckCustomer(cust.slug); toast(`Re-checking ${plural(r.drawings, "drawing")}…`);
        await waitForJobs(r.jobs); await loadCust(cust.slug); toast("Re-check complete");
      }
      loadList();
    } catch (e) { toast((e as Error).message, true); }
    setBusy("");
  };
  const remove = async () => {
    if (!cust || !confirm(`Remove the setup for ${cust.name}? Its drawings go back to the standard wording on the next check.`)) return;
    try { await api.deleteCustomer(cust.slug); toast("Setup removed"); await loadList(); if (cust.jobs.length) await loadCust(cust.slug); else go({ view: "setup", tab: "customers" }); }
    catch (e) { toast((e as Error).message, true); }
  };
  const add = async (ev: React.FormEvent) => {
    ev.preventDefault();
    try { const c = await api.addCustomer(newName); setNewName(""); await loadList(); go({ view: "setup", tab: "customers", customer: c.slug }); }
    catch (e) { toast((e as Error).message, true); }
  };
  const label = (k: string) => draft.find(f => f.field === k)?.label || k;
  const drawings = cust?.jobs.reduce((a, j) => a + j.drawings, 0) || 0;
  const missing = Object.entries(cust?.missing || {});

  return <div className="setup">
    <div className="setup-list">
      <form className="row" onSubmit={add}><input className="text" aria-label="New customer name" placeholder="New customer name" value={newName} onChange={e => setNewName(e.target.value)} /><button className="btn" disabled={!newName.trim()}>Add</button></form>
      {list === null ? <Empty><Spin /></Empty> : list.length ? list.map(c => <div key={c.slug} role="button" className={"cust" + (c.slug === slug ? " on" : "")} onClick={() => select(c.slug)}>
        <div className="row between"><strong>{c.name}</strong>{c.has_setup ? <Tag kind="ok">set up</Tag> : <Tag kind="info">standard</Tag>}</div>
        <div className="small">{plural(c.jobs, "job")} · {plural(c.drawings, "drawing")}</div>
        {Object.keys(c.missing).length ? <div className="small warn-text">Not found: {Object.entries(c.missing).map(([k, n]) => `${k.replace("_", " ")} (${n})`).join(", ")}</div> : null}
      </div>) : <Empty>No customers yet. Upload a drawing package with a customer name, or add a customer here.</Empty>}
    </div>
    <div className="setup-edit">{!cust ? (slug ? <Empty><Spin /></Empty> : <Empty>Select a customer.</Empty>) : <>
      <div className="row between" style={{ marginBottom: 12 }}>
        <div><h3 className="h">{cust.name}</h3><div className="small">{cust.has_setup ? `Customer wording saved ${cust.updated || ""}` : "Using the standard title-block wording"} · {plural(cust.jobs.length, "job")}, {plural(drawings, "drawing")}</div></div>
        <div className="row">{dirty && <span className="small">Unsaved changes</span>}
          <button className="btn" disabled={!!busy || !dirty} onClick={() => save(false)}>{busy === "save" ? <Spin /> : "Save"}</button>
          <button className="btn p" id="save-recheck" disabled={!!busy || !drawings} onClick={() => save(true)}>{busy === "recheck" ? <><Spin /> Re-checking…</> : `Save and re-check ${plural(drawings, "drawing")}`}</button>
          {cust.has_setup && <button className="btn danger" disabled={!!busy} onClick={remove}>Remove setup</button>}</div>
      </div>
      {missing.length ? <div className="card warn">On {cust.name}'s drawings PrintVerity could not find: <b>{missing.map(([k, n]) => `${label(k)} (${plural(n, "drawing")})`).join(", ")}</b>. Add the customer's wording for {missing.length === 1 ? "that field" : "those fields"} below, then save and re-check.</div>
        : cust.jobs.length ? <div className="card plain small">Every required title-block field is read on this customer's drawings.</div> : null}
      {pending.length > 0 && <div className="card" id="suggestions"><div className="row between"><h3>Found in this customer's title blocks, not recognised yet</h3>
          {pending.some(s => fieldFor(s)) && <button className="btn sm p" onClick={() => accept(pending.filter(s => fieldFor(s)))}>Add all with a field</button>}</div>
        <p className="small" style={{ margin: "0 0 8px" }}>Read from the customer's uploaded drawings. Check the field each entry holds and click Add; then save and re-check.</p>
        <table><thead><tr><th>Entry</th><th>Example value</th><th>Seen on</th><th>Field</th><th></th></tr></thead><tbody>
          {pending.map(s => <tr key={sgKey(s)}><td><Tag kind="info">{s.kind === "label" ? "label" : "attribute"}</Tag> <span className="mono">{s.text}</span></td><td className="mono">{s.example || "—"}</td>
            <td className="small" title={s.files.join(", ")}>{plural(s.drawings, "drawing")}</td>
            <td><select aria-label={`Field for ${s.text}`} value={fieldFor(s)} onChange={e => setPicks(p => ({ ...p, [sgKey(s)]: e.target.value }))}><option value="">choose…</option>{draft.map(f => <option key={f.field} value={f.field}>{f.label}</option>)}</select></td>
            <td><button className="btn sm" onClick={() => accept([s])}>Add</button></td></tr>)}
        </tbody></table></div>}
      <div className="card plain"><h3>Title-block wording</h3>
        <p className="small" style={{ margin: "0 0 8px" }}>The standard wording is always recognised. Add the words this customer prints next to each field, and for DXF title blocks the block attribute tags. Required fields are reported when missing, with the severity shown.</p>
        <table className="fields"><thead><tr><th>Field</th><th>Standard wording</th><th>Customer labels</th><th>Attribute tags (DXF)</th><th>Required</th><th>If missing</th></tr></thead><tbody>
          {draft.map(f => <tr key={f.field}><td><strong>{f.label}</strong>{cust.missing[f.field] ? <div><Tag kind="medium">not found on {cust.missing[f.field]}</Tag></div> : null}</td>
            <td className="small" title={f.standard_labels.join(", ")}>{f.standard_labels.slice(0, 5).join(", ")}{f.standard_labels.length > 5 ? ` +${f.standard_labels.length - 5}` : ""}</td>
            <td><Chips values={f.labels} onChange={v => update(f.field, { labels: v })} placeholder="add label" /></td>
            <td><Chips values={f.tags} onChange={v => update(f.field, { tags: v })} placeholder="add tag" /></td>
            <td><input type="checkbox" aria-label={`${f.label} required`} checked={f.required} onChange={e => update(f.field, { required: e.target.checked })} /></td>
            <td><select aria-label={`${f.label} severity`} value={f.severity} disabled={!f.required} onChange={e => update(f.field, { severity: e.target.value as Severity })}>{SEVERITIES.map(s => <option key={s} value={s}>{s}</option>)}</select></td></tr>)}
        </tbody></table></div>
    </>}</div>
  </div>;
}

function ImportCard({ title, columns, example, onImport }: { title: string; columns: string; example: string; onImport: (fd: FormData) => Promise<ImportResult> }) {
  const [busy, setBusy] = useState(false); const [res, setRes] = useState<ImportResult | null>(null);
  const submit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault(); const form = ev.currentTarget; const fd = new FormData(form);
    if (!(fd.get("file") as File | null)?.name) { toast("Choose a .csv or .xlsx file first", true); return; }
    setBusy(true);
    try { const r = await onImport(fd); setRes(r); form.reset(); toast(`${plural(r.imported, "record")} imported`, !!r.errors.length && !r.imported); }
    catch (e) { toast((e as Error).message, true); }
    setBusy(false);
  };
  return <div className="card"><h3>{title}</h3>
    <p className="small" style={{ margin: "0 0 8px" }}>{columns} CSV or Excel, one header row. Existing entries are updated, new ones added.</p>
    <pre className="mono example">{example}</pre>
    <form className="row" onSubmit={submit}><input type="file" name="file" accept=".csv,.tsv,.xlsx,.xlsm" /><button className="btn p" disabled={busy}>{busy ? <Spin /> : "Import"}</button></form>
    {res && <div className="small" style={{ marginTop: 8 }}>{plural(res.imported, "record")} imported ({(res.specs || res.parts || []).join(", ") || "none"}); {res.total} in total.{res.errors.length ? <ul className="errs">{res.errors.map(e => <li key={e}>{e}</li>)}</ul> : null}</div>}
  </div>;
}

function Filter({ q, setQ, n, total }: { q: string; setQ: (s: string) => void; n: number; total: number }) {
  return <div className="row between" style={{ margin: "4px 0 8px" }}><input className="text" style={{ maxWidth: 320 }} aria-label="Filter" placeholder="Filter" value={q} onChange={e => setQ(e.target.value)} /><span className="small">{n === total ? `${total} ${total === 1 ? "entry" : "entries"}` : `${n} of ${total}`}</span></div>;
}

function Specs() {
  const [rows, setRows] = useState<SpecRecord[] | null>(null); const [q, setQ] = useState("");
  const load = useCallback(() => api.specs().then(setRows).catch(e => toast(e.message, true)), []);
  useEffect(() => { load(); }, [load]);
  const del = async (ref: string) => { if (!confirm(`Remove ${ref} from the spec library?`)) return; try { await api.deleteSpec(ref); load(); } catch (e) { toast((e as Error).message, true); } };
  const shown = (rows || []).filter(s => !q || (s.ref + " " + (s.title || "")).toLowerCase().includes(q.toLowerCase()));
  return <>
    <ImportCard title="Import a spec register" columns="Columns: Spec, Revision, Status (current or superseded), Superseded on, Title, On file. One row per revision." example={"Spec,Revision,Status,Superseded on,Title,On file\nNB-QS-27,A,superseded,2026-05-01,Supplier spec: hard anodize,yes\nNB-QS-27,B,current,,Supplier spec: hard anodize,yes"} onImport={async fd => { const r = await api.importSpecs(fd); load(); return r; }} />
    <p className="small">Drawings are checked against this library: a spec reference not on file, a superseded revision or an unknown revision is reported. Specs listed here are recognised on drawings by their exact reference, whatever the numbering scheme.</p>
    {rows === null ? <Empty><Spin /></Empty> : <><Filter q={q} setQ={setQ} n={shown.length} total={rows.length} />
      <table><thead><tr><th>Spec</th><th>Title</th><th>Revisions</th><th>Current</th><th>Superseded</th><th>On file</th><th></th></tr></thead><tbody>
        {shown.map(s => <tr key={s.ref}><td className="mono">{s.ref}</td><td>{s.title || ""}</td><td className="mono">{s.revisions.join(", ")}</td><td className="mono">{s.current || "—"}</td>
          <td className="small">{Object.entries(s.superseded || {}).map(([r, d]) => `${r} on ${d}`).join("; ") || "—"}</td><td>{s.on_file === false ? <Tag kind="medium">no</Tag> : <Tag kind="ok">yes</Tag>}</td>
          <td><button className="btn sm danger" title={`Remove ${s.ref}`} onClick={() => del(s.ref)}>✕</button></td></tr>)}
      </tbody></table></>}
  </>;
}

function Revisions() {
  const [data, setData] = useState<{ source: string; parts: RevisionRecord[] } | null>(null); const [q, setQ] = useState("");
  const load = useCallback(() => api.revisions().then(setData).catch(e => toast(e.message, true)), []);
  useEffect(() => { load(); }, [load]);
  const del = async (pn: string) => { if (!confirm(`Remove ${pn} from the revision register?`)) return; try { await api.deleteRevision(pn); load(); } catch (e) { toast((e as Error).message, true); } };
  const shown = (data?.parts || []).filter(p => !q || (p.part_no + " " + (p.title || "")).toLowerCase().includes(q.toLowerCase()));
  return <>
    <ImportCard title="Import released revisions" columns="Columns: Part No, Revision, ECO, Released (date), Title. One row per released revision; the latest release becomes the current revision." example={"Part No,Revision,ECO,Released,Title\nNB-3120-001,1,CO-4410,2026-02-14,HOUSING PLATE\nNB-3120-001,2,CO-4478,2026-07-02,HOUSING PLATE"} onImport={async fd => { const r = await api.importRevisions(fd); load(); return r; }} />
    <p className="small">{data?.source === "epicor" ? "Released revisions are read live from Epicor. This register is the fallback when the ERP cannot be reached." : "No ERP connection is configured on this installation, so the PLM checks (revision released, superseded, ECO match) read this register. In a connected installation they read the ERP directly."}</p>
    {data === null ? <Empty><Spin /></Empty> : <><Filter q={q} setQ={setQ} n={shown.length} total={data.parts.length} />
      <table><thead><tr><th>Part</th><th>Current revision</th><th>ECO</th><th>Released</th><th>Title</th><th>Earlier revisions</th><th></th></tr></thead><tbody>
        {shown.map(p => <tr key={p.part_no}><td className="mono">{p.part_no}</td><td className="mono">{p.rev}</td><td className="mono">{p.eco || "—"}</td><td>{p.released || "—"}</td><td>{p.title || ""}</td>
          <td className="small">{(p.history || []).map(h => `${h.rev} (${h.eco || "no ECO"}, ${h.released || "no date"})`).join("; ") || "—"}</td>
          <td><button className="btn sm danger" title={`Remove ${p.part_no}`} onClick={() => del(p.part_no)}>✕</button></td></tr>)}
      </tbody></table></>}
  </>;
}
