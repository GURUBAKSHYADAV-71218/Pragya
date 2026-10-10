"use client";
import Link from "next/link";
import Page from "@/components/ui/Page";
import LearnLink from "@/components/learn/LearnLink";
import { LinkButton } from "@/components/ui/Button";
import { usePracticeData } from "@/hooks/usePracticeData";
import { computeInsights } from "@/lib/insights";
export default function InsightsPage() {
  const { data, ready } = usePracticeData(); const list = computeInsights(data);
  const dist = list.some((x) => /distraction/i.test(x));
  return (
    <Page title="Insights" subtitle="Observations from your own practice and reflections.">
      <div className="max-w-xl space-y-3">{!ready ? <p className="text-muted">Loading…</p> : list.length ? list.map((x) => <p key={x} className="panel !p-5"><span className="mr-2 text-gold">·</span>{x}</p>) : <div className="panel"><p>More observations will appear as you continue your journey.</p><Link href="/exercises" className="btn btn-secondary mt-3">Begin a practice</Link></div>}
        {ready && <div className="flex flex-wrap gap-2 pt-2">{dist && <LearnLink slug="returning-after-distraction" from="/insights" label="Returning after distraction" />}<LinkButton href="/learn" variant="secondary">Explore & Learn</LinkButton></div>}</div>
    </Page>
  );
}
