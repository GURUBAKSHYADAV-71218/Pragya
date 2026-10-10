"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { getTheme, setTheme, type ThemeName } from "@/lib/theme";
export default function ThemeToggle() {
  const [t, setT] = useState<ThemeName>("light");
  useEffect(() => { setT(getTheme()); const h = () => setT(getTheme()); window.addEventListener("pragya-theme", h); return () => window.removeEventListener("pragya-theme", h); }, []);
  const opt = (v: ThemeName, Icon: typeof Sun, label: string) => (
    <button type="button" aria-pressed={t === v} aria-label={label} title={label} onClick={() => setTheme(v)}
      className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:text-deep aria-pressed:bg-[rgb(var(--btn))] aria-pressed:text-[rgb(var(--btn-ink))]"><Icon size={15} strokeWidth={1.6} /></button>
  );
  return <div role="group" aria-label="Theme" className="flex rounded-full border border-line bg-surface/70 p-0.5">{opt("light", Sun, "Light theme")}{opt("dark", Moon, "Dark theme")}</div>;
}
