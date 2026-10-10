import { notFound, redirect } from "next/navigation";
import Page from "@/components/ui/Page";
import LearnLink from "@/components/learn/LearnLink";
import { EXERCISE_LEARN } from "@/lib/learn";
import ExerciseIntro from "@/components/exercises/ExerciseIntro";
import ExercisePlayer from "@/components/exercises/ExercisePlayer";
import { EXERCISES } from "@/lib/content";
export const dynamicParams = false;
export const generateStaticParams = () => EXERCISES.map((e) => ({ slug: e.slug }));
export default function ExercisePage({ params }: { params: { slug: string } }) {
  if (params.slug === "breathing-wave") redirect("/breathing");
  const e = EXERCISES.find((x) => x.slug === params.slug); if (!e) notFound();
  return <Page title={e.title} subtitle={e.blurb} back={{ href: "/exercises", label: "Exercises" }}>{EXERCISE_LEARN[e.slug] && <div className="mb-5"><LearnLink slug={EXERCISE_LEARN[e.slug]} from={`/exercises/${e.slug}`} /></div>}<ExerciseIntro slug={e.slug} /><ExercisePlayer slug={e.slug} /></Page>;
}
