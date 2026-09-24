/* Typed client for the PrintVerity API. */
import type { Answer, BulkResult, CompareReport, ConsistencyReport, DocResult, Finding, Job, JobSummary, ModelReport, Status, Template, AuditRow, Drawing, Mesh, Customer, CustomerField, CustomerSummary, SpecRecord, RevisionRecord, ImportResult } from "./types";

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const r = await fetch(path, init);
  const ct = r.headers.get("content-type") || "";
  if (r.status === 401) { location.reload(); throw new Error("access token required"); }
  if (!r.ok) {
    let msg = r.statusText;
    try { const j = await r.json(); msg = j.error || j.detail || msg; } catch { /* keep statusText */ }
    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
  }
  return (ct.includes("json") ? r.json() : (r as unknown)) as Promise<T>;
}
/** Same slug the server derives from a customer name (patterns.profile_slug). */
export const customerSlug = (name: string) => name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const json = (body: unknown): RequestInit => ({ method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });

export const api = {
  customers: () => req<CustomerSummary[]>("/api/customers"),
  customer: (slug: string) => req<Customer>(`/api/customers/${encodeURIComponent(slug)}`),
  addCustomer: (name: string) => req<Customer>("/api/customers", json({ name })),
  saveCustomer: (slug: string, name: string, fields: CustomerField[]) => req<Customer>(`/api/customers/${encodeURIComponent(slug)}`, { ...json({ name, fields }), method: "PUT" }),
  deleteCustomer: (slug: string) => req<{ ok: boolean }>(`/api/customers/${encodeURIComponent(slug)}`, { method: "DELETE" }),
  recheckCustomer: (slug: string) => req<{ jobs: string[]; drawings: number; mode: string }>(`/api/customers/${encodeURIComponent(slug)}/recheck`, { method: "POST" }),
  specs: () => req<SpecRecord[]>("/api/reference/specs"),
  importSpecs: (fd: FormData) => req<ImportResult>("/api/reference/specs", { method: "POST", body: fd }),
  deleteSpec: (ref: string) => req<{ ok: boolean }>(`/api/reference/specs/${encodeURIComponent(ref)}`, { method: "DELETE" }),
  revisions: () => req<{ source: string; parts: RevisionRecord[] }>("/api/reference/revisions"),
  importRevisions: (fd: FormData) => req<ImportResult>("/api/reference/revisions", { method: "POST", body: fd }),
  deleteRevision: (part: string) => req<{ ok: boolean }>(`/api/reference/revisions/${encodeURIComponent(part)}`, { method: "DELETE" }),
  status: () => req<Status>("/api/status"),
  jobs: () => req<JobSummary[]>("/api/jobs"),
  job: (id: string) => req<Job>(`/api/jobs/${id}`),
  jobStatus: (id: string) => req<{ status: string; drawings: { id: string; status: string }[] }>(`/api/jobs/${id}/status`),
  createJob: (fd: FormData) => req<JobSummary>("/api/jobs?wait=0", { method: "POST", body: fd }),
  addFiles: (id: string, fd: FormData) => req<Job>(`/api/jobs/${id}/files?wait=1`, { method: "POST", body: fd }),
  deleteJob: (id: string) => req<{ ok: boolean }>(`/api/jobs/${id}`, { method: "DELETE" }),
  recheck: (j: string, d: string) => req<Drawing>(`/api/jobs/${j}/drawings/${d}/recheck`, { method: "POST" }),
  decide: (j: string, d: string, f: string, body: { status?: string; note?: string }) => req<Finding>(`/api/jobs/${j}/drawings/${d}/findings/${f}`, json(body)),
  voiceNote: (j: string, d: string, f: string, fd: FormData) => fetch(`/api/jobs/${j}/drawings/${d}/findings/${f}/voice-note`, { method: "POST", body: fd }).then(async r => ({ status: r.status, body: await r.json() })),
  compare: (a_job: string, a_drawing: string, b_job: string, b_drawing: string) => req<CompareReport>("/api/compare", json({ a_job, a_drawing, b_job, b_drawing })),
  consistency: (id: string) => req<ConsistencyReport>(`/api/jobs/${id}/consistency`),
  modelCheck: (id: string) => req<ModelReport>(`/api/jobs/${id}/model-check`),
  mesh: (id: string) => req<Mesh>(`/api/jobs/${id}/model/mesh`),
  compareXlsxUrl: (a_job: string, a_drawing: string, b_job: string, b_drawing: string) => `/api/compare/report.xlsx?a_job=${a_job}&a_drawing=${a_drawing}&b_job=${b_job}&b_drawing=${b_drawing}`,
  comparePdfUrl: (a_job: string, a_drawing: string, b_job: string, b_drawing: string) => `/api/compare/side-by-side.pdf?a_job=${a_job}&a_drawing=${a_drawing}&b_job=${b_job}&b_drawing=${b_drawing}`,
  compareInbox: (a_job: string, a_drawing: string, b_job: string, b_drawing: string) => req<{ channel: string; location?: string; to?: string; subject: string; note?: string }>("/api/compare/inbox", json({ a_job, a_drawing, b_job, b_drawing })),
  doc: (id: string, kind: "inspection-plan" | "coc" | "work-instruction", body: { drawing: string; qty?: string; po?: string }) => req<DocResult>(`/api/jobs/${id}/docs/${kind}`, json(body)),
  release: (name: string) => req<{ name: string; storage: string; location: string }>("/api/docs/release", json({ name })),
  templates: () => req<Template[]>("/api/templates"),
  bulk: (find: string, replace: string, preview: boolean) => req<BulkResult>("/api/templates/bulk-edit", json({ find, replace, preview })),
  ask: (id: string, question: string, history: { role: string; content: string }[]) => req<Answer>(`/api/jobs/${id}/ask`, json({ question, history })),
  audit: () => req<AuditRow[]>("/api/audit"),
  renderUrl: (j: string, d: string, page: number, markers: boolean) => `/api/jobs/${j}/drawings/${d}/render?page=${page}&markers=${markers ? 1 : 0}&t=${Date.now()}`,
  markupUrl: (j: string, d: string) => `/api/jobs/${j}/drawings/${d}/markup.pdf`,
  calloutUrl: (j: string, d: string, f: string) => `/api/jobs/${j}/drawings/${d}/findings/${f}/callout.png`,
  findingsUrl: (j: string, d: string, fmt: "csv" | "json") => `/api/jobs/${j}/drawings/${d}/findings.${fmt}`,
};
