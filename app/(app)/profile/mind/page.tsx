"use client";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Radar from "@/components/progress/Radar";
import { usePracticeData } from "@/hooks/usePracticeData";
import { indicators } from "@/lib/indicators";
import { EXERCISES } from "@/lib/content";
function Item({ t, children }: { t: string; children: React.ReactNode }) { return <div className="panel !p-5"><p className="label">{t}</p><div className="mt-1 text-sm">{children}</div></div>; }
export default function MindProfile() {
  const { data } = usePracticeData(); const v = indicators(data), a = data.assessment;
  const cnt = (slug: string) => data.sessions.filter((s) => s.type === slug || (slug === "breathing-wave" && s.type === "breathing")).length;
  const ranked = EXERCISES.map((e) => [e.title, cnt(e.slug)] as const);
  const freq = ranked.filter((r) => r[1] > 0).sort((x, y) => y[1] - x[1]).slice(0, 3), less = ranked.filter((r) => r[1] === 0).slice(0, 4);
  const themes: Record<string, number> = {}; data.reflections.forEach((r) => (themes[r.category] = (themes[r.category] || 0) + 1));
  return (
    <Page title="Mind Profile" subtitle="Your practice indicators and patterns. Observations, not diagnoses.">
      <div className="grid max-w-4xl gap-4 md:grid-cols-2">
        <div className="panel md:row-span-4"><Radar values={v} /></div>
        <Item t="Primary · Secondary focus">{a ? `${a.primary} · ${a.secondary}` : <Link href="/assessment" className="underline">Take the assessment</Link>}</Item>
        <Item t="Frequently practised">{freq.length ? freq.map((f) => `${f[0]} (${f[1]})`).join(", ") : "Nothing yet."}</Item>
        <Item t="Less practised">{less.length ? less.map((f) => f[0]).join(", ") : "You have tried every exercise."}</Item>
        <Item t="Reflection themes">{Object.keys(themes).length ? Object.entries(themes).sort((x, y) => y[1] - x[1]).map(([k, n]) => `${k} (${n})`).join(", ") : "No reflections yet."}</Item>
      </div>
    </Page>
  );
}
