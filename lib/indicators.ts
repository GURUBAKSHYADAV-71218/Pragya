import type { PracticeData } from "@/lib/repository";
import type { PracticeSession } from "@/types";
/** Practice indicators derived from recorded activity only. They are not psychological scores. */
export function indicators(d: PracticeData): Record<string, number> {
  const by = (...t: string[]) => d.sessions.filter((s) => t.includes(s.type));
  const pts = (a: PracticeSession[], extra = 0) => Math.min(100, Math.round(a.length * 8 + a.reduce((x, s) => x + s.minutes, 0) * 3 + extra));
  const days = new Set(d.sessions.map((s) => new Date(s.at).toDateString())).size;
  return {
    Awareness: pts(by("thought-labelling", "reaction-chain", "white-elephant", "body-scan", "emotion-checkin", "grounding"), d.reflections.length * 6),
    Calmness: pts(by("breathing", "silence", "body-scan")),
    Focus: pts(by("attention-anchor", "focus-reset", "distraction-drift", "attention-switch", "study-restart")),
    Patience: pts(by("waiting", "silence", "the-pause", "patience-practice")),
    Discipline: Math.min(100, days * 10 + d.sessions.length * 2),
    Presence: pts(by("the-pause", "breathing", "silence", "body-scan", "grounding")),
  };
}
