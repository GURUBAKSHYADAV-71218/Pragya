"use client";
import { useCallback, useState } from "react";
import Done, { type Result } from "./Done";
import AttentionPlayer from "./AttentionPlayer";
import BodyScan from "./BodyScan";
import { Labelling, Pause, ReactionChain } from "./ChoiceFlows";
import { Grounding, EmotionCheckin, FocusReset, PatiencePractice } from "./NewPlayers";
import { WhiteElephant, Waiting, AttentionSwitch } from "./Experiments";
import { repository } from "@/lib/repository";

type Dest = { href: string; label: string };
export interface TrainingCtx { stage: string; step: string; next: Dest; back: Dest }
export default function ExercisePlayer({ slug, experiment = false, training }: { slug: string; experiment?: boolean; training?: TrainingCtx }) {
  const [r, setR] = useState<Result | null>(null); const [run, setRun] = useState(0);
  const complete = useCallback(async () => { if (training) await repository.completeTrainingStep(training.stage, training.step, "done"); }, [training]);
  if (r) return <Done r={r} back={training?.back ?? { href: experiment ? "/experiments" : "/exercises", label: experiment ? "Back to experiments" : "Back to exercises" }} next={training?.next} onComplete={complete} onAgain={() => { setR(null); setRun((v) => v + 1); }} />;
  const kind = experiment ? ("experiment" as const) : undefined, fin = (x: Result) => setR(x), key = `${slug}-${run}`;
  if (experiment) {
    if (slug === "white-elephant") return <WhiteElephant key={key} onFinish={fin} />;
    if (slug === "waiting") return <Waiting key={key} onFinish={fin} />;
    if (slug === "attention-switch") return <AttentionSwitch key={key} onFinish={fin} />;
    return <ReactionChain key={key} type={slug} kind={kind} onFinish={fin} />;
  }
  switch (slug) {
    case "attention-anchor": return <AttentionPlayer key={key} mode="anchor" type={slug} onFinish={fin} />;
    case "focus-reset": return <FocusReset key={key} onFinish={fin} />;
    case "the-pause": return <Pause key={key} type={slug} onFinish={fin} />;
    case "thought-labelling": return <Labelling key={key} type={slug} onFinish={fin} />;
    case "reaction-chain": return <ReactionChain key={key} type={slug} onFinish={fin} />;
    case "body-scan": return <BodyScan key={key} onFinish={fin} />;
    case "grounding": return <Grounding key={key} onFinish={fin} />;
    case "emotion-checkin": return <EmotionCheckin key={key} onFinish={fin} />;
    case "patience-practice": return <PatiencePractice key={key} onFinish={fin} />;
    default: return null;
  }
}
