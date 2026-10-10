"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Status from "@/components/ui/Status";
import { practiceName } from "@/lib/labels";
import type { PracticeData } from "@/lib/repository";

const when = (t: number) => new Date(t).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
const Section = ({ title, count, children }: { title: string; count?: number; children: React.ReactNode }) => (
  <section className="border-t border-line/70 py-4"><h3 className="font-serif text-lg text-deep">{title}{count !== undefined && <span className="ml-2 font-sans text-sm text-muted">({count})</span>}</h3><div className="mt-2 text-sm">{children}</div></section>
);
export default function PracticeDataView({ data, local }: { data: PracticeData; local: boolean }) {
  const [all, setAll] = useState(false); const [msg, setMsg] = useState("");
  const sessions = data.sessions.slice().sort((a, b) => b.at - a.at), refl = data.reflections.slice().sort((a, b) => b.at - a.at), a = data.assessment;
  const max = a ? Math.max(1, ...Object.values(a.scores ?? {})) : 1, lim = all ? 100 : 5;
  const exportData = () => {
    try {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob), el = document.createElement("a");
      el.href = url; el.download = `pragya-data-${new Date().toISOString().slice(0, 10)}.json`; document.body.appendChild(el); el.click(); el.remove(); URL.revokeObjectURL(url);
      setMsg("Your data was exported.");
    } catch { setMsg(""); }
  };
  const empty = data.sessions.length + data.reflections.length === 0 && !a;
  return (
    <div>
      <p className="mt-1 text-sm text-muted">{local ? "Stored only in this browser on this device. It is not synced to an account." : "Stored in your account. Anything you saved as a guest stays on that device and is separate."}</p>
      {empty ? <p className="mt-4 rounded-xl bg-sage/15 p-4 text-sm">You have not recorded any practices yet. Once you complete an exercise, breathing or silence session, or write a reflection, it will appear here.</p> : <>
        <div className="mt-3">
          <div className="grid grid-cols-3 gap-3 pb-4 text-center">{[["Sessions", data.sessions.length], ["Minutes", Math.round(data.sessions.reduce((t, x) => t + x.minutes, 0) * 10) / 10], ["Reflections", data.reflections.length]].map(([l, v]) => <div key={l} className="rounded-xl bg-sage/15 p-3"><p className="display text-2xl">{v}</p><p className="label !tracking-normal">{l}</p></div>)}</div>
          <Section title="Practice sessions" count={sessions.length}>
            {sessions.length === 0 ? <p className="text-muted">No sessions yet.</p> : <ul className="divide-y divide-line/60">{sessions.slice(0, lim).map((s) => <li key={s.id} className="flex justify-between gap-3 py-2"><span>{practiceName(s.type, s.kind)}<span className="block text-xs text-muted">{when(s.at)}</span></span><span className="shrink-0 text-muted">{s.minutes} min</span></li>)}</ul>}
          </Section>
          <Section title="Reflections" count={refl.length}>
            {refl.length === 0 ? <p className="text-muted">No reflections yet.</p> : <ul className="divide-y divide-line/60">{refl.slice(0, lim).map((r) => <li key={r.id} className="py-2"><p className="font-medium text-deep">{r.title || "Untitled"}<span className="ml-2 text-xs font-normal text-muted">{r.category} · {when(r.at)}</span></p><p className="text-muted">{r.text.length > 110 ? r.text.slice(0, 110).trimEnd() + "…" : r.text}</p></li>)}</ul>}
          </Section>
          <Section title="Starting assessment">
            {!a ? <p className="text-muted">You have not taken the assessment yet.</p> : <><p className="text-muted">Taken {when(a.at)}. Primary focus: {a.primary}. Secondary: {a.secondary}.</p>
              <ul className="mt-3 space-y-2">{["Awareness", "Calmness", "Focus", "Patience", "Discipline", "Presence"].map((d) => { const v = a.scores?.[d] ?? 0; return <li key={d}><div className="flex justify-between"><span>{d}</span><span className="text-muted">{v}</span></div><div className="mt-1 h-1 rounded bg-line"><div className="h-1 rounded bg-forest" style={{ width: `${(v / max) * 100}%` }} /></div></li>; })}</ul>
              <p className="mt-2 text-xs text-muted">Higher means more of your answers pointed to that area. These are practice indicators, not a diagnosis.</p></>}
          </Section>
          <Section title="Preferences"><p className="text-muted">Reduce motion: {data.settings.reducedMotion ? "on" : "off"} · Reminder preference: {data.settings.reminders ? `on, ${data.settings.reminderTime}` : "off"}</p></Section>
        </div>
        {(sessions.length > 5 || refl.length > 5) && <Button variant="secondary" onClick={() => setAll(!all)}>{all ? "Show fewer" : "View details"}</Button>}
      </>}
      <div className="mt-4 flex flex-wrap items-center gap-3"><Button variant="secondary" onClick={exportData} disabled={empty}>Export my data</Button><Status message={msg} /></div>
    </div>
  );
}
