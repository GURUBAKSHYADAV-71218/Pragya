export type Theme = "light" | "dark";
export interface Settings { theme: Theme; reducedMotion: boolean; reminders: boolean; reminderTime: string; guestImported?: boolean }
export interface PracticeSession { id: string; type: string; minutes: number; at: number; detail?: string; kind?: "exercise" | "experiment" }
export interface Reflection { id: string; title: string; text: string; category: string; at: number }
export interface Assessment { primary: string; secondary: string; scores: Record<string, number>; at: number }
export interface Profile { name: string; tz?: string; time?: string }
export const REFLECTION_CATEGORIES = ["Awareness", "Focus", "Patience", "Reaction", "Gratitude", "Silence", "General"] as const;
