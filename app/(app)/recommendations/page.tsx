"use client";
import Link from "next/link";
import Page from "@/components/ui/Page";
import LearnLink from "@/components/learn/LearnLink";
import { usePracticeData } from "@/hooks/usePracticeData";
import { recommend } from "@/lib/insights";
import { articleForHref } from "@/lib/learn";
export default function RecommendationsPage() {
  const { data, ready } = usePracticeData(); const recs = recommend(data);
  return (
    <Page title="Recommended for You" subtitle={data.assessment ? `Your current focus: ${data.assessment.primary}.` : "Take the assessment for a focused starting point."}>
      {!data.assessment && ready && <Link href="/assessment" className="btn btn-secondary mb-5">Take the assessment</Link>}
      <div className="grid gap-4 sm:grid-cols-2">{recs.map((r) => { const g = articleForHref(r.href); return (
        <article key={r.title} className="panel panel-hover"><h2 className="text-xl">{r.title}</h2><p className="mt-1 text-sm text-muted">Why: {r.why}</p>
          <div className="mt-4 flex flex-wrap gap-2"><Link href={r.href} className="btn btn-primary">Start</Link>{g && <LearnLink slug={g.slug} from="/recommendations" label="Learn first" />}</div></article>); })}</div>
    </Page>
  );
}
