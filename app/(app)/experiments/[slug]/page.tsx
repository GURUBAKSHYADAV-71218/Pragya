import { notFound } from "next/navigation";
import Page from "@/components/ui/Page";
import LearnLink from "@/components/learn/LearnLink";
import { EXPERIMENT_LEARN } from "@/lib/learn";
import ExercisePlayer from "@/components/exercises/ExercisePlayer";
import { EXPERIMENTS } from "@/lib/content";
export const dynamicParams = false;
export const generateStaticParams = () => EXPERIMENTS.map((e) => ({ slug: e.slug }));
export default function ExperimentPage({ params }: { params: { slug: string } }) {
  const e = EXPERIMENTS.find((x) => x.slug === params.slug); if (!e) notFound();
  return <Page title={e.title} subtitle={e.blurb} back={{ href: "/experiments", label: "Experiments" }}>{EXPERIMENT_LEARN[e.slug] && <div className="mb-5"><LearnLink slug={EXPERIMENT_LEARN[e.slug]} from={`/experiments/${e.slug}`} label="Read about this experiment" /></div>}<ExercisePlayer slug={e.slug} experiment /></Page>;
}
