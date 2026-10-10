"use client";
import Page from "@/components/ui/Page";
import Radar from "@/components/progress/Radar";
import { usePracticeData } from "@/hooks/usePracticeData";
import { indicators } from "@/lib/indicators";
import { currentStreak } from "@/lib/stats";
export default function ProgressPage() {
  const { data, ready } = usePracticeData(); const s = data.sessions;
  const mins = Math.round(s.reduce((a, x) => a + x.minutes, 0) * 10) / 10;
  const days = Array.from({ length: 14 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - 13 + i); return s.filter((x) => new Date(x.at).toDateString() === d.toDateString()).reduce((a, x) => a + x.minutes, 0); });
  const mx = Math.max(1, ...days);
  return (
    <Page title="Progress" subtitle="Observe your growth over time.">
      {!ready ? <p className="text-muted">Loading…</p> : s.length === 0 ? <div className="panel max-w-xl"><p>More observations will appear as you continue your journey.</p></div> : (
        <div className="grid max-w-5xl gap-4 lg:grid-cols-3">
          <div className="grid grid-cols-3 gap-4 lg:col-span-3">{[["Total practices", s.length], ["Total minutes", mins], ["Current streak", currentStreak(s)]].map(([l, v]) => <div key={l} className="panel !p-5"><p className="label">{l}</p><p className="display mt-1 text-4xl">{v}</p></div>)}</div>
          <section className="panel lg:col-span-2"><h2 className="text-lg">Last 14 days</h2><p className="mt-1 text-xs text-muted">Minutes from sessions you completed or chose to save.</p><div className="mt-4 flex h-32 items-end gap-1.5" role="img" aria-label="Minutes practised per day">{days.map((d, i) => <i key={i} title={`${d.toFixed(1)} min`} className="flex-1 rounded-t bg-sage" style={{ height: `${Math.max(3, (d / mx) * 100)}%` }} />)}</div></section>
          <section className="panel"><h2 className="text-lg">Practice indicators</h2><p className="mt-1 text-xs text-muted">These grow with the sessions and minutes recorded in each area. They are not scores of ability.</p><Radar values={indicators(data)} /></section>
          <section className="panel lg:col-span-3"><h2 className="text-lg">Recent practice</h2><ul className="mt-2 divide-y divide-line/70 text-sm">{s.slice(-8).reverse().map((x) => <li key={x.id} className="flex justify-between py-2"><span className="capitalize">{x.type.replace(/-/g, " ")}</span><span className="text-muted">{x.minutes} min · {new Date(x.at).toLocaleDateString()}</span></li>)}</ul></section>
        </div>)}
    </Page>
  );
}
