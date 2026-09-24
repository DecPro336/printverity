/* Application shell: header, navigation rail with Settings (theme), hash routing, status pills. */
import { useCallback, useEffect, useState } from "react";
import { api } from "./api";
import type { Status } from "./types";
import { Toasts } from "./components/ui";
import { Settings } from "./components/Settings";
import { ThemeContext, useThemeState } from "./theme";
import { QueueView } from "./views/Queue";
import { ReviewView } from "./views/Review";
import { CompareView } from "./views/Compare";
import { ConsistencyView } from "./views/Consistency";
import { ModelView } from "./views/Model";
import { DocsView } from "./views/Docs";
import { AskView } from "./views/Ask";
import { AuditView } from "./views/Audit";
import { SetupView } from "./views/Setup";

export type ViewKey = "queue" | "review" | "compare" | "consistency" | "model" | "docs" | "ask" | "audit" | "setup";
export type SetupTab = "customers" | "specs" | "revisions";
export interface Route { view: ViewKey; job?: string; drawing?: string; zoom?: number; overlay?: "layout" | "ocr"; tab?: SetupTab; customer?: string }
const NAV: [ViewKey, string][] = [["queue", "Queue"], ["review", "Review"], ["compare", "Compare"], ["consistency", "Consistency"], ["model", "Model"], ["docs", "Docs"], ["ask", "Ask"], ["audit", "Audit"], ["setup", "Setup"]];
const ICONS: Record<ViewKey, JSX.Element> = {
  queue: <svg viewBox="0 0 24 24"><path d="M3 5h18M3 12h18M3 19h12" /></svg>,
  review: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="11" cy="11" r="3.5" /><path d="M13.5 13.5L17 17" /></svg>,
  compare: <svg viewBox="0 0 24 24"><path d="M4 7h12l-3-3M20 17H8l3 3" /></svg>,
  consistency: <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M9 4v16" /></svg>,
  model: <svg viewBox="0 0 24 24"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" /></svg>,
  docs: <svg viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></svg>,
  ask: <svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z" /></svg>,
  audit: <svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></svg>,
  setup: <svg viewBox="0 0 24 24"><path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1" /><circle cx="15" cy="6" r="2" /><circle cx="9" cy="12" r="2" /><circle cx="17" cy="18" r="2" /></svg>,
};

function parseHash(): Route {
  const h = location.hash.replace(/^#/, "");
  const [v, q] = h.split("?"); const p = new URLSearchParams(q || "");
  const view = (NAV.some(([k]) => k === v) ? v : "queue") as ViewKey;
  return { view, job: p.get("job") || undefined, drawing: p.get("drawing") || undefined, zoom: p.get("zoom") ? Number(p.get("zoom")) : undefined, overlay: (p.get("overlay") as "layout" | "ocr" | null) || undefined, tab: (p.get("tab") as SetupTab | null) || undefined, customer: p.get("customer") || undefined };
}
export function routeHash(r: Route) {
  const q = new URLSearchParams();
  if (r.job) q.set("job", r.job); if (r.drawing) q.set("drawing", r.drawing); if (r.tab) q.set("tab", r.tab); if (r.customer) q.set("customer", r.customer);
  const s = q.toString(); return "#" + r.view + (s ? "?" + s : "");
}

export function App() {
  const [route, setRoute] = useState<Route>(parseHash());
  const [status, setStatus] = useState<Status | null>(null);
  const [crumb, setCrumb] = useState<[string, string]>(["Queue", ""]);
  const { pref, theme, setPref } = useThemeState();
  const go = useCallback((r: Route) => { const h = routeHash(r); if (location.hash !== h) history.replaceState(null, "", h); setRoute(r); }, []);
  useEffect(() => { const on = () => setRoute(parseHash()); window.addEventListener("hashchange", on); return () => window.removeEventListener("hashchange", on); }, []);
  useEffect(() => { const load = () => api.status().then(setStatus).catch(() => setStatus(null)); load(); const t = setInterval(load, 60000); return () => clearInterval(t); }, []);
  const q = status?.engines?.queue;
  const view = (() => {
    const p = { route, go, setCrumb, status };
    switch (route.view) {
      case "review": return <ReviewView {...p} />;
      case "compare": return <CompareView {...p} />;
      case "consistency": return <ConsistencyView {...p} />;
      case "model": return <ModelView {...p} />;
      case "docs": return <DocsView {...p} />;
      case "ask": return <AskView {...p} />;
      case "audit": return <AuditView {...p} />;
      case "setup": return <SetupView {...p} />;
      default: return <QueueView {...p} />;
    }
  })();
  return <ThemeContext.Provider value={theme}><div id="app">
    <div className="top"><span className="brand">PRINTVERITY</span><span className="crumb w">{crumb[0]}</span><span className="crumb">{crumb[1]}</span>
      <div className="right">
        {status && <span className={"pill " + (status.claude ? "green" : "")} title={status.claude ? `Q&A answers with Claude (${status.model}) through the LangGraph agent` : "No Anthropic credentials: Q&A uses the local planner"}>{status.claude ? "Claude connected" : "Q&A: local mode"}</span>}
        {q && <span className="pill" title={q.async ? "Reviews run on Celery workers" : "Reviews run inline"}>{q.async ? "Workers online" : "Inline"}</span>}
        <span className="pill">v{status?.version || "?"}</span>
      </div></div>
    <div className="body">
      <nav className="side">{NAV.map(([k, l]) => <a key={k} className={route.view === k ? "on" : ""} onClick={() => go({ view: k })}>{ICONS[k]}<span>{l}</span></a>)}<div className="sp" /><Settings pref={pref} setPref={setPref} status={status} /><div className="u">DH</div></nav>
      <main>{view}</main>
    </div>
    <Toasts />
  </div></ThemeContext.Provider>;
}
export interface ViewProps { route: Route; go: (r: Route) => void; setCrumb: (c: [string, string]) => void; status: Status | null }
