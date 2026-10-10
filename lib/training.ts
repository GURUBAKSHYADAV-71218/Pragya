export type StepStatus = "done" | "skipped";
export type TrainingState = Record<string, Record<string, { status: StepStatus; at: number }>>;
export interface Step { id: string; kind: "exercise" | "experiment" | "reflect"; slug?: string; title: string; why: string; does: string; feedback: string; completion: string }
export interface Stage { id: string; title: string; skill: string; steps: Step[]; teachesNext: string }
const reflect = (prompt: string): Step => ({ id: "reflect", kind: "reflect", title: "Reflect", why: "Writing a line connects the practice to your own experience.", does: prompt, feedback: "Your entry is saved in Reflections.", completion: "Save a reflection, or skip it. Skipping is recorded as skipped." });
export const TRAINING: Stage[] = [
  { id: "attention", title: "Attention", skill: "Staying with one thing, and returning when you drift.", teachesNext: "Next, Reaction: noticing the moment before you respond.", steps: [
    { id: "anchor", kind: "exercise", slug: "attention-anchor", title: "Attention Anchor", why: "Each return after a drift is one repetition of the skill.", does: "Follow a moving point for a minute. Tap Drifted and Returned.", feedback: "Your drift and return counts.", completion: "Finish the minute, or at least 30 seconds." },
    { id: "switch", kind: "experiment", slug: "attention-switch", title: "Attention Switch", why: "It shows how attention moves between two targets.", does: "Follow a lit target as it changes for 30 seconds.", feedback: "Average time to follow each change, misses and wrong taps.", completion: "Run the full 30 seconds." },
    reflect("Where did your attention go most easily, and what pulled it away?")] },
  { id: "reaction", title: "Reaction", skill: "Creating a pause between a trigger and your response.", teachesNext: "Next, Focus: keeping steady on a task.", steps: [
    { id: "pause", kind: "exercise", slug: "the-pause", title: "The Pause", why: "A short gap gives you a chance to choose your response.", does: "Pick a situation, choose a first reaction, pause, then compare other responses.", feedback: "What you noticed first, and the possible effect of each response.", completion: "Reach the end of the scenario." },
    { id: "chain", kind: "exercise", slug: "reaction-chain", title: "Reaction Chain", why: "Tracing the steps shows where another response could fit.", does: "Choose an interpretation, feeling, urge and response, then try a different interpretation.", feedback: "How the same situation leads to different chains.", completion: "Build one full chain." },
    reflect("What did you notice first when you paused, and what response would you choose?")] },
  { id: "focus", title: "Focus", skill: "Restarting a task and noticing what interrupts you.", teachesNext: "Next, Presence: coming back to the present moment.", steps: [
    { id: "reset", kind: "exercise", slug: "focus-reset", title: "Focus Reset", why: "One small next action makes restarting clearer.", does: "Choose a task, name an obstacle, pick one small action and an optional timer.", feedback: "A restart plan you can use right away.", completion: "Reach your restart plan." },
    { id: "labelling", kind: "exercise", slug: "thought-labelling", title: "Thought Labelling", why: "Naming thoughts that interrupt you can help you set them aside.", does: "Label four thoughts and decide whether each is a fact or an interpretation.", feedback: "Common labels and a note on each thought.", completion: "Go through all four thoughts." },
    reflect("What interrupts you more often: outside distractions or your own thoughts?")] },
  { id: "presence", title: "Presence", skill: "Returning to what is here, in your senses and your body.", teachesNext: "You have finished the path. Explore Breathing, Silence or the guides next.", steps: [
    { id: "grounding", kind: "exercise", slug: "grounding", title: "Grounding 5-4-3-2-1", why: "Concrete details give attention something specific to rest on.", does: "Notice things you see, feel, hear, smell and taste. Skip any you like.", feedback: "How many senses you moved through.", completion: "Complete at least three senses." },
    { id: "scan", kind: "exercise", slug: "body-scan", title: "Body Scan", why: "Noticing areas one at a time lets you observe without changing anything.", does: "Move through body areas at your own pace. Go back or skip any area.", feedback: "How many areas you visited.", completion: "Visit at least four areas." },
    reflect("Which sense or body area held your attention best?")] },
];
export const stepHref = (stage: string, step: string) => `/training/${stage}/${step}`;
export const getStage = (id: string) => TRAINING.find((s) => s.id === id);
export const getStep = (stage: string, step: string) => getStage(stage)?.steps.find((x) => x.id === step);
export function stageStatus(state: TrainingState | undefined, stageId: string) {
  const st = getStage(stageId); const rec = state?.[stageId] ?? {};
  const total = st?.steps.length ?? 0, finished = st ? st.steps.filter((s) => rec[s.id]).length : 0;
  return { total, finished, complete: total > 0 && finished === total, nextStep: st?.steps.find((s) => !rec[s.id]) ?? null };
}
/** Destination after finishing a step: the next step of the same stage, then the next stage, then the overview. Uses only training state. */
export function nextAfter(stageId: string, stepId: string): { href: string; label: string } {
  const st = getStage(stageId); if (!st) return { href: "/training", label: "Back to training" };
  const i = st.steps.findIndex((s) => s.id === stepId);
  if (i >= 0 && i + 1 < st.steps.length) return { href: stepHref(stageId, st.steps[i + 1].id), label: `Next: ${st.steps[i + 1].title}` };
  const j = TRAINING.findIndex((s) => s.id === stageId);
  if (j >= 0 && j + 1 < TRAINING.length) return { href: stepHref(TRAINING[j + 1].id, TRAINING[j + 1].steps[0].id), label: `Next stage: ${TRAINING[j + 1].title}` };
  return { href: "/training", label: "Finish training" };
}
export function previousOf(stageId: string, stepId: string): { href: string; label: string } | null {
  const st = getStage(stageId); const i = st ? st.steps.findIndex((s) => s.id === stepId) : -1;
  return st && i > 0 ? { href: stepHref(stageId, st.steps[i - 1].id), label: st.steps[i - 1].title } : null;
}
