import type { PracticeSession } from "@/types";
export function currentStreak(sessions: PracticeSession[]): number {
  const days = new Set(sessions.map((s) => new Date(s.at).toDateString()));
  const d = new Date(); if (!days.has(d.toDateString())) d.setDate(d.getDate() - 1);
  let n = 0; while (days.has(d.toDateString())) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
export function lastSevenDays(sessions: PracticeSession[]): { label: string; done: boolean }[] {
  const days = new Set(sessions.map((s) => new Date(s.at).toDateString()));
  return Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - 6 + i); return { label: "SMTWTFS"[d.getDay()], done: days.has(d.toDateString()) }; });
}
