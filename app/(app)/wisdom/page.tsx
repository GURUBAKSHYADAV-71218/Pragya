import Link from "next/link";
import Page from "@/components/ui/Page";
import MiniLandscape from "@/components/ui/MiniLandscape";
import { SCENARIOS } from "@/lib/wisdomScenarios";
import { WISDOM } from "@/lib/content";
export const metadata = { title: "Wisdom — PRAGYA" };
export default function WisdomPage() {
  return (
    <Page title="Wisdom" subtitle="Timeless ideas for everyday life.">
      <div className="grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">{WISDOM.map((w, i) => (
        <Link key={w.slug} href={`/wisdom/${w.slug}`} className="panel-hover block overflow-hidden rounded-2xl border border-line/80 bg-surface/85">
          <MiniLandscape tone={i} /><div className="p-5"><h2 className="text-xl">{w.title}</h2><p className="mt-1 text-sm text-muted">{w.explain}</p>{SCENARIOS[w.slug] && <p className="label mt-3">Includes a scenario</p>}</div></Link>))}</div>
    </Page>
  );
}
