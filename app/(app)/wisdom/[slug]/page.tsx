import { notFound } from "next/navigation";
import Page from "@/components/ui/Page";
import { LinkButton } from "@/components/ui/Button";
import { GuidedScenario } from "@/components/exercises/ChoiceFlows";
import { SCENARIOS } from "@/lib/wisdomScenarios";
import LearnLink from "@/components/learn/LearnLink";
import { WISDOM_LEARN } from "@/lib/learn";
import { WISDOM } from "@/lib/content";
export const dynamicParams = false;
export const generateStaticParams = () => WISDOM.map((w) => ({ slug: w.slug }));
export default function WisdomTopic({ params }: { params: { slug: string } }) {
  const w = WISDOM.find((x) => x.slug === params.slug); if (!w) notFound();
  return (
    <Page title={w.title} subtitle={w.explain} back={{ href: "/wisdom", label: "Wisdom" }}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <section className="panel"><p className="label">In practice</p><p className="mt-2 font-serif text-2xl leading-snug text-deep">{w.practical}</p></section>
          <section className="panel"><p className="label">Reflect</p><p className="mt-2 text-lg">{w.prompt}</p><div className="mt-4 flex flex-wrap gap-2"><LinkButton href="/reflections" variant="secondary">Write a reflection</LinkButton>{WISDOM_LEARN[w.slug] && <LearnLink slug={WISDOM_LEARN[w.slug]} from={`/wisdom/${w.slug}`} label="Go deeper" />}</div></section>
        </div>
        <div>{SCENARIOS[w.slug] ? <GuidedScenario s={SCENARIOS[w.slug]} /> : <p className="panel text-sm text-muted">This topic has no scenario. Try the practical line above during your day, then note what you noticed.</p>}</div>
      </div>
    </Page>
  );
}
