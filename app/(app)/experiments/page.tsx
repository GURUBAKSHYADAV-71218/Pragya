import Link from "next/link";
import Page from "@/components/ui/Page";
import MiniLandscape from "@/components/ui/MiniLandscape";
import { EXPERIMENTS } from "@/lib/content";
export const metadata = { title: "Experiments — PRAGYA" };
export default function ExperimentsPage() {
  return (
    <Page title="Experiments" subtitle="Explore how your mind works.">
      <div className="grid max-w-4xl gap-4 sm:grid-cols-2">{EXPERIMENTS.map((e, i) => (
        <Link key={e.slug} href={`/experiments/${e.slug}`} className="panel-hover block overflow-hidden rounded-2xl border border-line/80 bg-surface/85 ">
          <MiniLandscape tone={i} /><div className="p-5"><p className="label">Experiment 0{i + 1}</p><h2 className="mt-1 text-xl">{e.title}</h2><p className="mt-1 text-sm text-muted">{e.blurb}</p></div></Link>))}</div>
    </Page>
  );
}
