/* Settings button at the bottom of the navigation rail: theme choice and a short summary of this instance. */
import { useEffect, useRef, useState } from "react";
import type { Status } from "../types";
import type { ThemePref } from "../theme";

const SUN = <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" /></svg>;
const MOON = <svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /></svg>;
const SCREEN = <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>;
const OPTIONS: [ThemePref, string, JSX.Element][] = [["light", "Light", SUN], ["dark", "Dark", MOON], ["system", "System", SCREEN]];

export function Settings({ pref, setPref, status }: { pref: ThemePref; setPref: (p: ThemePref) => void; status: Status | null }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);
  const e = status?.engines;
  const rows: [string, string][] = status ? [
    ["Version", status.version],
    ["Q&A", status.claude ? `Claude agent (${status.model})` : "local planner"],
    ["Reviews", e?.queue?.async ? "Celery workers" : "inline"],
    ["Scans", [e?.ocr, e?.layout_model && `${e.layout_model} layout`].filter(Boolean).join(" + ") || "—"],
    ["Retrieval", e?.retrieval ? `${e.retrieval.store}, ${e.retrieval.documents} documents` : "—"],
  ] : [];
  return <div className="settings" ref={ref}>
    <a id="settings-button" className={open ? "on" : ""} title="Settings" role="button" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(o => !o)}>{SUN}<span>Settings</span></a>
    {open && <div className="pop" role="dialog" aria-label="Settings">
      <h4>Settings</h4>
      <div className="lbl">Theme</div>
      <div className="seg" role="radiogroup" aria-label="Theme">{OPTIONS.map(([k, label, icon]) =>
        <button key={k} data-theme-option={k} role="radio" aria-checked={pref === k} className={pref === k ? "on" : ""} onClick={() => setPref(k)}>{icon}{label}</button>)}</div>
      <div className="note">Drawing sheets keep a white background in both themes, like paper. The choice is saved in this browser.</div>
      {!!rows.length && <><div className="lbl">This instance</div><div className="kv">{rows.map(([k, v]) => <div key={k}><span>{k}</span><span>{v}</span></div>)}</div></>}
    </div>}
  </div>;
}
