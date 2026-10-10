"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Page from "@/components/ui/Page";
import { Button, LinkButton } from "@/components/ui/Button";
import Status from "@/components/ui/Status";
import ExercisePlayer from "@/components/exercises/ExercisePlayer";
import { usePracticeData } from "@/hooks/usePracticeData";
import { repository } from "@/lib/repository";
import { getStage, getStep, nextAfter, previousOf } from "@/lib/training";

const CATEGORY: Record<string, string> = { attention: "Focus", reaction: "Reaction", focus: "Focus", presence: "Awareness" };
function Reflect({ stageId, prompt, next }: { stageId: string; prompt: string; next: { href: string; label: string } }) {
  const router = useRouter(); const [text, setText] = useState(""); const [busy, setBusy] = useState(false); const [err, setErr] = useState("");
  const go = async (save: boolean) => {
    setBusy(true); setErr("");
    try { if (save) await repository.addReflection({ title: "Training reflection", text: text.trim(), category: CATEGORY[stageId] ?? "General" }); await repository.completeTrainingStep(stageId, "reflect", save ? "done" : "skipped"); router.push(next.href); }
    catch { setErr("Could not save. Please try again."); setBusy(false); }
  };
  return (
    <div className="panel w-full max-w-xl"><p className="text-lg">{prompt}</p>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} aria-label="Reflection" className="mt-3 w-full rounded-xl border border-line bg-bg/60 p-3 text-ink" />
      <div className="mt-3"><Status message={err} tone="error" /></div>
      <div className="mt-2 flex flex-wrap gap-3"><Button loading={busy} disabled={!text.trim()} onClick={() => go(true)}>Save and continue</Button><Button variant="secondary" disabled={busy} onClick={() => go(false)}>Skip reflection</Button></div>
      <p className="mt-3 text-xs text-muted">Skipping is recorded as skipped, and you can continue.</p></div>
  );
}
export default function TrainingStepView({ stageId, stepId }: { stageId: string; stepId: string }) {
  const { data } = usePracticeData();
  const stage = getStage(stageId)!, step = getStep(stageId, stepId)!, i = stage.steps.findIndex((s) => s.id === stepId);
  const next = nextAfter(stageId, stepId), prev = previousOf(stageId, stepId), before = data.training?.[stageId]?.[stepId];
  return (
    <Page title={step.title} subtitle={`${stage.title} · step ${i + 1} of ${stage.steps.length}`} back={{ href: "/training", label: "Training" }}>
      <div className="mb-5 max-w-xl"><div className="panel"><p className="label">Why this step?</p><p className="mt-1 text-sm">{step.why}</p><p className="label mt-3">What will I do?</p><p className="mt-1 text-sm">{step.does}</p>
        <details className="mt-3 text-sm"><summary className="cursor-pointer text-deep">Feedback and completion</summary><p className="mt-2"><b className="font-medium text-deep">Feedback:</b> {step.feedback}</p><p className="mt-1"><b className="font-medium text-deep">Counts as complete when:</b> {step.completion}</p><p className="mt-1 text-muted">{stage.teachesNext}</p></details></div>
        {before && <p className="mt-3 text-sm text-forest">You {before.status === "done" ? "completed" : "skipped"} this step before. Repeating it is fine.</p>}
        {prev && <div className="mt-3"><LinkButton href={prev.href} variant="secondary">← Previous: {prev.label}</LinkButton></div>}</div>
      {step.kind === "reflect" ? <Reflect stageId={stageId} prompt={step.does} next={next} /> : <ExercisePlayer slug={step.slug!} experiment={step.kind === "experiment"} training={{ stage: stageId, step: stepId, next, back: { href: "/training", label: "Back to training" } }} />}
    </Page>
  );
}
