"use client";
import Link from "next/link";
import { useState } from "react";
import Page from "@/components/ui/Page";
import MiniLandscape from "@/components/ui/MiniLandscape";
import { EXERCISES, FILTERS, exHref } from "@/lib/content";
import { usePracticeData } from "@/hooks/usePracticeData";

export default function ExercisesPage() {
  const [f, setF] = useState("All"); const { data } = usePracticeData();
  const count = (slug: string) => data.sessions.filter((s) => s.type === slug || (slug === "breathing-wave" && s.type === "breathing")).length;
  return (
    <Page title="Exercises" subtitle="Practice makes awareness stronger.">
      <div role="group" aria-label="Filter" className="mb-6 flex flex-wrap gap-2">{FILTERS.map((x) => <button key={x} aria-pressed={f === x} onClick={() => setF(x)} className="chip">{x}</button>)}</div>
      <div className="grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EXERCISES.filter((e) => f === "All" || e.category === f).map((e, i) => (
          <article key={e.slug} className="overflow-hidden rounded-2xl border border-line/80 bg-surface/85">
            <MiniLandscape tone={i} />
            <div className="p-5"><p className="label">{e.category} · {e.minutes} min · {e.level}</p><h2 className="mt-1 text-xl">{e.title}</h2><p className="mt-1 text-sm text-muted">{e.blurb}</p>
              <div className="mt-4 flex items-center justify-between"><Link href={exHref(e.slug)} className="btn btn-primary">Start</Link><span className="text-xs text-muted">{count(e.slug)} done</span></div></div>
          </article>))}
      </div>
    </Page>
  );
}
