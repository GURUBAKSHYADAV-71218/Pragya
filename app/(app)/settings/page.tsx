"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Page from "@/components/ui/Page";
import { Button } from "@/components/ui/Button";
import Status from "@/components/ui/Status";
import { usePracticeData } from "@/hooks/usePracticeData";
import { repository } from "@/lib/repository";
import { signOut, authMode } from "@/lib/auth";
import { getTheme, setTheme, type ThemeName } from "@/lib/theme";
import AccountSection from "@/components/settings/AccountSection";
import PracticeDataView from "@/components/settings/PracticeDataView";
import type { Settings } from "@/types";

export default function SettingsPage() {
  const { data, refresh } = usePracticeData(); const s = data.settings, router = useRouter();
  const [theme, setT] = useState<ThemeName>("light"); const [msg, setMsg] = useState(""); const [ask, setAsk] = useState(false);
  useEffect(() => { setT(getTheme()); const h = () => setT(getTheme()); window.addEventListener("pragya-theme", h); return () => window.removeEventListener("pragya-theme", h); }, []);
  const set = async (p: Partial<Settings>) => { await repository.saveSettings({ ...s, ...p }); await refresh(); setMsg("Saved."); };
  const row = "flex items-center justify-between gap-4 py-3 text-sm";
  return (
    <Page title="Settings" subtitle="Customise your experience.">
      <div className="max-w-xl space-y-4">
        <AccountSection />
        <section className="panel divide-y divide-line/70 !py-2"><h2 className="py-3 text-lg">Appearance and motion</h2>
          <div className={row}><span>Appearance</span><div role="group" aria-label="Appearance" className="flex gap-2">{(["light", "dark"] as ThemeName[]).map((t) => <button key={t} aria-pressed={theme === t} onClick={() => { setTheme(t); void set({ theme: t }); }} className="chip capitalize">{t}</button>)}</div></div>
          <label className={row}><span>Reduce motion <span className="block text-xs text-muted">Your system setting is also respected.</span></span><input type="checkbox" className="h-4 w-4 accent-[rgb(var(--forest))]" checked={s.reducedMotion} onChange={(e) => set({ reducedMotion: e.target.checked })} /></label></section>
        <section className="panel divide-y divide-line/70 !py-2"><h2 className="py-3 text-lg">Reminders</h2>
          <label className={row}>Remind me to practise<input type="checkbox" className="h-4 w-4 accent-[rgb(var(--forest))]" checked={s.reminders} onChange={(e) => set({ reminders: e.target.checked })} /></label>
          <label className={row}>Preferred time<input type="time" value={s.reminderTime} onChange={(e) => set({ reminderTime: e.target.value })} className="rounded-lg border border-line bg-bg/60 p-1.5" /></label>
          <p className="py-3 text-xs text-muted">This saves a preference only. PRAGYA does not send notifications yet.</p></section>
        <section className="panel"><h2 className="text-lg">My practice data</h2>
          <PracticeDataView data={data} local={authMode() === "local"} />
          <div className="mt-4 flex flex-wrap gap-3">
            {ask ? <><Button variant="danger" onClick={async () => { await repository.clearAll(); await refresh(); setAsk(false); setMsg("Your practice data was cleared."); }}>Yes, clear everything</Button><Button variant="secondary" onClick={() => setAsk(false)}>Cancel</Button></> : <Button variant="danger" onClick={() => setAsk(true)}>Clear my data</Button>}
            {authMode() === "supabase" && <Button variant="secondary" onClick={async () => { await signOut(); router.push("/login"); }}>Log out</Button>}</div>
          {ask && <p className="mt-2 text-xs text-muted">This deletes sessions, reflections, assessment and profile for the current mode. It cannot be undone.</p>}</section>
        <Status message={msg} />
        <section className="panel"><h2 className="text-lg">About PRAGYA</h2><p className="mt-1 text-sm text-muted">Understand the mind. Change the response. PRAGYA is a space for attention, awareness and reflection. It is not medical or therapeutic advice.</p></section>
      </div>
    </Page>
  );
}
