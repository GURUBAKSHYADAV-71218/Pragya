import { EXERCISES, EXPERIMENTS } from "@/lib/content";
const LEGACY: Record<string, string> = { "distraction-drift": "Distraction Drift (now part of Attention Anchor)", "study-restart": "Study Restart (now Focus Reset)" };
export function practiceName(type: string, kind?: string): string {
  if (LEGACY[type]) return LEGACY[type];
  if (type === "breathing") return "Breathing";
  if (type === "silence") return "Silence";
  const ex = EXERCISES.find((e) => e.slug === type), xp = EXPERIMENTS.find((e) => e.slug === type);
  if (kind === "experiment" && xp) return xp.title;
  return ex?.title ?? xp?.title ?? type.replace(/-/g, " ");
}
