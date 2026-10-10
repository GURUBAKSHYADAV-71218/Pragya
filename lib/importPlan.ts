/** Decides which guest records still need to be added to an account. Matching on type + original timestamp makes repeated imports safe. */
export interface PlanSession { type: string; minutes: number; at: number; detail?: string; kind?: "exercise" | "experiment" }
export interface PlanReflection { title: string; text: string; category: string; at: number }
export interface ImportPlan { exercises: PlanSession[]; experiments: PlanSession[]; reflections: PlanReflection[]; skipped: number }
const sKey = (s: PlanSession) => `${s.kind === "experiment" ? "x" : "e"}|${s.type}|${s.at}`;
const rKey = (r: PlanReflection) => `${r.at}|${r.title}|${r.text}`;
export function planImport(local: { sessions: PlanSession[]; reflections: PlanReflection[] }, existing: { sessions: PlanSession[]; reflections: PlanReflection[] }): ImportPlan {
  const haveS = new Set(existing.sessions.map(sKey)), haveR = new Set(existing.reflections.map(rKey));
  const newS = local.sessions.filter((s) => !haveS.has(sKey(s))), newR = local.reflections.filter((r) => !haveR.has(rKey(r)));
  return { exercises: newS.filter((s) => s.kind !== "experiment"), experiments: newS.filter((s) => s.kind === "experiment"), reflections: newR, skipped: local.sessions.length - newS.length + local.reflections.length - newR.length };
}
