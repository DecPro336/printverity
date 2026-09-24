/* Small presentational pieces shared by the views. */
import { useEffect, useState } from "react";
import type { Severity } from "../types";

export const Tag = ({ kind, children }: { kind: string; children?: React.ReactNode }) => <span className={`tag ${kind}`}>{children ?? kind}</span>;
export const Spin = () => <span className="spin" />;
export const WorstTag = ({ w }: { w?: Severity | null }) => (w ? <Tag kind={w}>{w}</Tag> : <Tag kind="ok">clean</Tag>);

let listeners: ((m: { text: string; err?: boolean }) => void)[] = [];
export function toast(text: string, err = false) { listeners.forEach(l => l({ text, err })); }
export function Toasts() {
  const [items, setItems] = useState<{ id: number; text: string; err?: boolean }[]>([]);
  useEffect(() => {
    const l = (m: { text: string; err?: boolean }) => { const id = Date.now() + Math.random(); setItems(x => [...x, { id, ...m }]); setTimeout(() => setItems(x => x.filter(i => i.id !== id)), m.err ? 6000 : 3000); };
    listeners.push(l); return () => { listeners = listeners.filter(x => x !== l); };
  }, []);
  return <>{items.map((t, i) => <div key={t.id} className={"toast" + (t.err ? " err" : "")} style={{ bottom: 18 + i * 52 }}>{t.text}</div>)}</>;
}
export function Tiles({ items }: { items: { v: React.ReactNode; l: string; color?: string }[] }) {
  return <div className="tiles">{items.map((t, i) => <div className="tile" key={i}><div className="v" style={t.color ? { color: t.color } : undefined}>{t.v}</div><div className="l">{t.l}</div></div>)}</div>;
}
export const Empty = ({ children }: { children: React.ReactNode }) => <div className="empty">{children}</div>;

/** Editable list of short text entries: Enter, comma or leaving the box adds the typed entry; × removes one. */
export function Chips({ values, onChange, placeholder }: { values: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [v, setV] = useState("");
  const add = () => { const t = v.trim().replace(/,$/, ""); if (t && !values.some(x => x.toUpperCase() === t.toUpperCase())) onChange([...values, t]); setV(""); };
  return <div className="chips">{values.map(x => <span key={x} className="chip">{x}<button type="button" aria-label={`Remove ${x}`} onClick={() => onChange(values.filter(y => y !== x))}>×</button></span>)}
    <input value={v} placeholder={values.length ? "" : placeholder} onChange={e => setV(e.target.value)} onBlur={add} onKeyDown={e => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(); } else if (e.key === "Backspace" && !v && values.length) onChange(values.slice(0, -1)); }} /></div>;
}
