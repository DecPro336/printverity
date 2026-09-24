/* Colour theme: light, dark, or follow the operating system. The choice is stored per browser and applied as
   <html data-theme="light|dark">; index.html applies the stored choice before the first paint so there is no flash. */
import { createContext, useContext, useEffect, useState } from "react";

export type ThemePref = "light" | "dark" | "system";
export type Theme = "light" | "dark";
export const THEME_KEY = "pv-theme";

const darkQuery = (): MediaQueryList | null => (typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null);

export function loadThemePref(): ThemePref {
  try { const v = localStorage.getItem(THEME_KEY); if (v === "light" || v === "dark" || v === "system") return v; } catch { /* storage blocked: use the default */ }
  return "light";
}
function saveThemePref(p: ThemePref) { try { localStorage.setItem(THEME_KEY, p); } catch { /* storage blocked: the choice lasts for this page only */ } }
export function resolveTheme(p: ThemePref): Theme { return p === "system" ? (darkQuery()?.matches ? "dark" : "light") : p; }
function applyTheme(t: Theme) { const el = document.documentElement; el.dataset.theme = t; el.style.colorScheme = t; }

/** Current preference, the theme actually shown, and a setter that persists the preference. */
export function useThemeState(): { pref: ThemePref; theme: Theme; setPref: (p: ThemePref) => void } {
  const [pref, setPref] = useState<ThemePref>(loadThemePref);
  const [theme, setTheme] = useState<Theme>(() => resolveTheme(pref));
  useEffect(() => {
    const update = () => { const t = resolveTheme(pref); applyTheme(t); setTheme(t); };
    update(); saveThemePref(pref);
    const q = darkQuery(); if (pref !== "system" || !q) return;
    q.addEventListener("change", update); return () => q.removeEventListener("change", update);
  }, [pref]);
  return { pref, theme, setPref };
}

export const ThemeContext = createContext<Theme>("light");
export const useTheme = () => useContext(ThemeContext);
