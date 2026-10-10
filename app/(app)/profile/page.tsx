"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Page from "@/components/ui/Page";
import { Button } from "@/components/ui/Button";
import Status from "@/components/ui/Status";
import { usePracticeData } from "@/hooks/usePracticeData";
import { repository } from "@/lib/repository";
import { sessionEmail } from "@/lib/auth";

const FALLBACK_ZONES = ["UTC", "Asia/Kolkata", "Europe/London", "Europe/Paris", "America/New_York", "America/Chicago", "America/Los_Angeles", "Asia/Tokyo", "Australia/Sydney"];
export default function ProfilePage() {
  const { data, ready, refresh } = usePracticeData();
  const browserTz = useMemo(() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"; } catch { return "UTC"; } }, []);
  const zones = useMemo(() => { let z: string[] = FALLBACK_ZONES; try { const f = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] }).supportedValuesOf; if (f) z = f("timeZone"); } catch {} return Array.from(new Set([browserTz, data.profile.tz ?? browserTz, ...z])).sort(); }, [browserTz, data.profile.tz]);
  const saved = { name: data.profile.name, tz: data.profile.tz ?? browserTz, time: data.profile.time ?? "07:00" };
  const [form, setForm] = useState(saved); const [phase, setPhase] = useState<"idle" | "saving" | "saved" | "error">("idle"); const [email, setEmail] = useState<string | null>(null);
  useEffect(() => { if (ready) setForm({ name: data.profile.name, tz: data.profile.tz ?? browserTz, time: data.profile.time ?? "07:00" }); }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { void sessionEmail().then(setEmail); }, []);
  const dirty = form.name.trim() !== saved.name || form.tz !== saved.tz || form.time !== saved.time;
  const edit = (p: Partial<typeof form>) => { setForm({ ...form, ...p }); if (phase === "saved" || phase === "error") setPhase("idle"); };
  const save = async () => { setPhase("saving"); try { await repository.saveProfile({ name: form.name.trim(), tz: form.tz, time: form.time }); await refresh(); setPhase("saved"); setTimeout(() => setPhase((p) => (p === "saved" ? "idle" : p)), 2500); } catch { setPhase("error"); } };
  const field = "mt-1 w-full rounded-xl border border-line bg-bg/60 p-3 text-ink";
  const exp = data.sessions.filter((s) => s.kind === "experiment").length, mins = Math.round(data.sessions.reduce((a, s) => a + s.minutes, 0) * 10) / 10;
  return (
    <Page title="Profile" subtitle="Continue your journey within.">
      <div className="grid gap-4 md:grid-cols-2">
        <section className="panel"><p className="label mb-3">{email ?? "Guest · saved on this device"}</p>
          <label className="block text-sm text-muted">Name<input value={form.name} onChange={(e) => edit({ name: e.target.value })} className={field} /></label>
          <label className="mt-3 block text-sm text-muted">Timezone<select value={form.tz} onChange={(e) => edit({ tz: e.target.value })} className={field}>{zones.map((z) => <option key={z} value={z}>{z.replace(/_/g, " ")}</option>)}</select></label>
          <label className="mt-3 block text-sm text-muted">Preferred practice time<input type="time" value={form.time} onChange={(e) => edit({ time: e.target.value })} className={field} /></label>
          <div className="mt-4 flex min-h-10 items-center gap-3">{(dirty || phase === "saving" || phase === "error") && <Button onClick={save} loading={phase === "saving"}>{phase === "error" ? "Try again" : "Save changes"}</Button>}
            <Status message={phase === "saved" ? "Saved." : phase === "error" ? "Could not save. Your changes are still here." : ""} tone={phase === "error" ? "error" : "success"} /></div></section>
        <section className="grid grid-cols-2 gap-4">{[["Practice minutes", mins], ["Practice sessions", data.sessions.length], ["Reflections", data.reflections.length], ["Experiments", exp]].map(([l, v]) => <div key={l} className="panel !p-5"><p className="label">{l}</p><p className="display mt-1 text-4xl">{v}</p></div>)}
          <div className="panel col-span-2 !p-5"><p className="label">Current focus</p>{data.assessment ? <><p className="display mt-1 text-2xl">{data.assessment.primary}</p><p className="mt-1 text-xs text-muted">From your starting assessment. <Link href="/assessment" className="underline">Retake it</Link></p></> : <p className="mt-1 text-sm text-muted">Not set yet. <Link href="/assessment" className="underline">Take the assessment</Link> to choose a starting focus.</p>}</div></section>
      </div>
    </Page>
  );
}
