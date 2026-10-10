"use client";
import { useMemo, useState } from "react";
import { usePracticeData } from "@/hooks/usePracticeData";
import { NEEDS, recommendFor } from "@/lib/needs";
import { EXERCISE_LEARN } from "@/lib/learn";
import { LinkButton } from "@/components/ui/Button";
import LearnLink from "@/components/learn/LearnLink";

const guideFor = (p: { id: string; type: string }) => EXERCISE_LEARN[p.id] ?? (p.type === "breathing" ? "choosing-a-breathing-rhythm" : p.type === "silence" ? "beginning-a-short-silence" : undefined);
export default function NeedPicker() {
  const { data } = usePracticeData(); const [id, setId] = useState<string | null>(null);
  const recent = useMemo(() => data.sessions.slice().sort((a, b) => b.at - a.at).map((s) => s.type), [data.sessions]);
  const rec = recommendFor(id, recent);
  return (
    <div>
      <div role="group" aria-label="What do you need right now?" className="flex flex-wrap gap-2">{NEEDS.map((n) => <button key={n.id} aria-pressed={id === n.id} onClick={() => setId(n.id)} className="chip">{n.label}</button>)}</div>
      <div aria-live="polite" className="mt-5">{!rec ? <p className="text-sm text-muted">Pick the one that fits best. You can change it at any time.</p> : (
        <section key={rec.need.id} className="panel settle">
          <p className="label">Suggested practice · about {rec.primary.minutes} min</p>
          <h3 className="mt-1 text-3xl">{rec.primary.title}</h3>
          <dl className="mt-4 grid gap-4 text-sm md:grid-cols-3">
            <div><dt className="label">Why this practice?</dt><dd className="mt-1">{rec.need.why}</dd></div>
            <div><dt className="label">What will I do?</dt><dd className="mt-1">{rec.need.what}</dd></div>
            <div><dt className="label">What should I notice?</dt><dd className="mt-1">{rec.need.notice}</dd></div>
          </dl>
          {rec.repeated && <p className="mt-3 text-sm text-muted">You did this one most recently. Repeating is fine, or try the alternative for variety.</p>}
          <p className="mt-3 text-xs text-muted">One session will not change you permanently. It is a way to notice and try.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <LinkButton href={rec.primary.href}>Start {rec.primary.title}</LinkButton>
            <LinkButton href={rec.alternative.href} variant="secondary">Or try {rec.alternative.title}</LinkButton>
            {guideFor(rec.primary) && <LearnLink slug={guideFor(rec.primary)!} from="/dashboard" label="Why it works" />}
          </div>
        </section>)}</div>
    </div>
  );
}
