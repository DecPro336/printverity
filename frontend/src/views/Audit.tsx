import { useEffect, useState } from "react";
import { api } from "../api";
import type { AuditRow } from "../types";
import { toast } from "../components/ui";
import type { ViewProps } from "../App";

export function AuditView({ setCrumb }: ViewProps) {
  const [rows, setRows] = useState<AuditRow[]>([]);
  useEffect(() => { setCrumb(["Audit log", ""]); api.audit().then(setRows).catch(e => toast(e.message, true)); }, [setCrumb]);
  return <div className="page"><h2>Audit log</h2><p className="sub">Every check, decision, generated document and template edit, newest first.</p>
    <table><thead><tr><th>Time</th><th>Event</th><th>Details</th></tr></thead><tbody>
      {rows.length ? rows.map((r, i) => <tr key={i}><td className="mono">{r.time}</td><td>{r.event}</td><td className="small">{Object.entries(r).filter(([k]) => !["time", "event"].includes(k)).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v)}`).join(" · ")}</td></tr>) : <tr><td colSpan={3} className="empty">Nothing logged yet.</td></tr>}
    </tbody></table></div>;
}
