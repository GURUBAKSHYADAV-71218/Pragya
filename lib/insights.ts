import type { PracticeData } from "@/lib/repository";
import { EXERCISES, START, exHref, type Dim } from "@/lib/content";

/** Statements are produced only when the recorded data supports them. */
export function computeInsights(d: PracticeData): string[] {
  const out: string[] = [], s = d.sessions;
  const n = (slugs: string[]) => s.filter((x) => slugs.includes(x.type)).length;
  if (s.length >= 3) {
    const a = n(["attention-anchor", "distraction-drift", "focus-reset"]), r = n(["the-pause", "reaction-chain"]);
    if (a > r) out.push(`You have practised attention more often than reaction (${a} sessions to ${r}).`);
    else if (r > a) out.push(`You have practised reaction more often than attention (${r} sessions to ${a}).`);
    const wk = new Set(s.filter((x) => Date.now() - x.at < 7 * 864e5).map((x) => new Date(x.at).toDateString())).size;
    if (wk >= 3) out.push(`You practised on ${wk} of the last 7 days.`);
  }
  if (s.length >= 5) {
    const ev = s.filter((x) => new Date(x.at).getHours() >= 17).length;
    if (ev > s.length / 2) out.push("Most of your practice happens in the evening."); else if (s.length - ev > s.length / 2) out.push("Most of your practice happens before the evening.");
  }
  if (d.reflections.length >= 3) {
    const c: Record<string, number> = {}; d.reflections.forEach((r) => (c[r.category] = (c[r.category] || 0) + 1));
    const [k, v] = Object.entries(c).sort((x, y) => y[1] - x[1])[0];
    out.push(`Your reflections most often fall under ${k} (${v} of ${d.reflections.length}).`);
  }
  const text = d.reflections.map((r) => `${r.title} ${r.text}`.toLowerCase());
  const dist = text.filter((t) => /distract|wander|scatter|phone/.test(t)).length;
  if (dist >= 2) out.push(`Distraction appears in ${dist} of your reflections.`);
  if (d.assessment) out.push(`Your assessment pointed to ${d.assessment.primary} as a starting area.`);
  return out;
}
export function recommend(d: PracticeData): { title: string; href: string; why: string }[] {
  const out: { title: string; href: string; why: string }[] = [];
  const cnt = (slug: string) => d.sessions.filter((s) => s.type === slug || (slug === "breathing-wave" && s.type === "breathing")).length;
  if (d.assessment) { const st = START[d.assessment.primary as Dim]; if (st) out.push({ title: st.label, href: st.href, why: `${d.assessment.primary} is your starting area.` }); }
  const last = d.sessions.at(-1);
  if (last && Date.now() - last.at > 3 * 864e5) out.push({ title: "Breathing Wave", href: "/breathing", why: `Your last practice was ${Math.floor((Date.now() - last.at) / 864e5)} days ago. A short breath is an easy way back.` });
  if (d.reflections.filter((r) => /distract|wander|scatter/.test(`${r.title} ${r.text}`.toLowerCase())).length >= 2) out.push({ title: "Focus Reset", href: "/exercises/focus-reset", why: "Your reflections mention distraction." });
  [...EXERCISES].sort((a, b) => cnt(a.slug) - cnt(b.slug)).forEach((e) => {
    if (out.length < 4 && !out.some((o) => o.title === e.title)) out.push({ title: e.title, href: exHref(e.slug), why: cnt(e.slug) === 0 ? `${e.title} has not been practised yet.` : `${e.title} is among your least practised (${cnt(e.slug)}).` });
  });
  return out;
}
