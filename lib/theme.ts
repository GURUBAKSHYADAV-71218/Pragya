export type ThemeName = "light" | "dark";
const KEY = "pragya:theme";
/** Single source of truth for the theme. Light unless the user explicitly chose dark. */
export function getTheme(): ThemeName {
  try {
    const t = localStorage.getItem(KEY);
    if (t === "dark" || t === "light") return t;
    return JSON.parse(localStorage.getItem("pragya:v1") ?? "{}").settings?.theme === "dark" ? "dark" : "light";
  } catch { return "light"; }
}
export function setTheme(t: ThemeName) {
  try { localStorage.setItem(KEY, t); } catch {}
  const h = document.documentElement;
  h.setAttribute("data-theme", t); h.style.colorScheme = t;
  window.dispatchEvent(new Event("pragya-theme"));
}
export const themeInitScript = `try{var k=localStorage.getItem('pragya:theme');if(!k){var s=JSON.parse(localStorage.getItem('pragya:v1')||'{}').settings;k=s&&s.theme}var h=document.documentElement;h.setAttribute('data-theme',k==='dark'?'dark':'light');h.style.colorScheme=k==='dark'?'dark':'light'}catch(e){}`;
