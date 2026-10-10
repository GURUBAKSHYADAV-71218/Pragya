"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navGroups } from "./navItems";
import Leaves from "@/components/environment/Leaves";
import BrandMark from "@/components/ui/BrandMark";
import ThemeToggle from "@/components/ui/ThemeToggle";

function Links({ onNavigate }: { onNavigate?: () => void }) {
  const path = usePathname();
  return (
    <nav aria-label="Main" className="space-y-5">
      {navGroups.map((g) => (
        <div key={g.label}><p className="label mb-1 px-4">{g.label}</p>
          <ul>{g.items.map(({ href, label, icon: Icon }) => {
            const on = path === href;
            return <li key={href}><Link href={href} onClick={onNavigate} aria-current={on ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl border-l-2 px-4 py-2 text-[13px] transition-colors ${on ? "border-gold bg-sage/30 font-medium text-deep" : "border-transparent text-muted hover:bg-sage/15 hover:text-deep"}`}>
              <Icon size={16} strokeWidth={1.4} />{label}</Link></li>;
          })}</ul></div>
      ))}
    </nav>
  );
}
export default function AppNav() {
  const [open, setOpen] = useState(false); const path = usePathname();
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false); addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, []);
  return (
    <>
      <aside className="hidden w-52 shrink-0 flex-col overflow-y-auto border-r border-line/70 bg-surface/60 px-4 py-8 md:sticky md:top-0 md:flex md:h-screen">
        <Link href="/" aria-label="PRAGYA home" className="mb-8 block px-2"><BrandMark stacked /></Link><Links />
        <Leaves className="mt-auto h-28 w-20 shrink-0 opacity-80" />
      </aside>
      <header className="flex items-center justify-between gap-2 border-b border-line/70 bg-surface/70 px-4 py-3 md:hidden">
        <Link href="/" aria-label="PRAGYA home"><BrandMark /></Link>
        <div className="flex items-center gap-2"><ThemeToggle />
          <button aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)} className="grid h-9 w-9 place-items-center rounded-lg border border-line text-deep hover:border-forest"><Menu size={18} strokeWidth={1.4} /></button></div>
      </header>
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="settle fixed inset-0 z-50 overflow-y-auto bg-bg px-6 py-6 md:hidden">
          <button aria-label="Close menu" onClick={() => setOpen(false)} className="mb-6 ml-auto grid h-9 w-9 place-items-center rounded-lg border border-line text-deep"><X size={18} strokeWidth={1.4} /></button>
          <Links onNavigate={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
