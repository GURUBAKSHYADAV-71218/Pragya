import type { TrainingState, StepStatus } from "@/lib/training";
import type { Assessment, PracticeSession, Profile, Reflection, Settings } from "@/types";
import { currentUserId } from "@/lib/auth";
import { supabaseConfigured } from "@/lib/supabase";

export interface MindState { value: string; at: number }
export interface PracticeData { sessions: PracticeSession[]; reflections: Reflection[]; settings: Settings; assessment: Assessment | null; profile: Profile; mindState: MindState | null; training: TrainingState }
export interface PracticeRepository {
  load(): Promise<PracticeData>;
  addSession(s: Omit<PracticeSession, "id" | "at">): Promise<void>;
  saveSettings(s: Settings): Promise<void>;
  saveMindState(value: string): Promise<void>;
  saveProfile(p: Profile): Promise<void>;
  saveAssessment(a: Omit<Assessment, "at">): Promise<void>;
  addReflection(r: Pick<Reflection, "title" | "text" | "category">): Promise<void>;
  updateReflection(id: string, r: Pick<Reflection, "title" | "text" | "category">): Promise<void>;
  deleteReflection(id: string): Promise<void>;
  completeTrainingStep(stage: string, step: string, status: StepStatus): Promise<void>;
  clearAll(): Promise<void>;
}
export const emptyData = (): PracticeData => ({ sessions: [], reflections: [], assessment: null, profile: { name: "" }, mindState: null, training: {},
  settings: { theme: "light", reducedMotion: false, reminders: false, reminderTime: "07:00" } });

const KEY = "pragya:v1";
const write = (d: PracticeData) => { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch {} };
const mut = async (fn: (d: PracticeData) => void) => { const d = await localRepository.load(); fn(d); write(d); };

/** Local mode: data lives only in this browser. */
export const localRepository: PracticeRepository = {
  async load() { try { const p = JSON.parse(localStorage.getItem(KEY) ?? "{}"); const e = emptyData(); return { ...e, ...p, settings: { ...e.settings, ...p.settings } }; } catch { return emptyData(); } },
  addSession: (s) => mut((d) => { d.sessions.push({ ...s, id: crypto.randomUUID(), at: Date.now() }); }),
  saveSettings: (settings) => mut((d) => { d.settings = settings; }),
  saveMindState: (value) => mut((d) => { d.mindState = { value, at: Date.now() }; }),
  saveProfile: (profile) => mut((d) => { d.profile = profile; }),
  saveAssessment: (a) => mut((d) => { d.assessment = { ...a, at: Date.now() }; }),
  addReflection: (r) => mut((d) => { d.reflections.push({ ...r, id: crypto.randomUUID(), at: Date.now() }); }),
  updateReflection: (id, r) => mut((d) => { d.reflections = d.reflections.map((x) => (x.id === id ? { ...x, ...r } : x)); }),
  deleteReflection: (id) => mut((d) => { d.reflections = d.reflections.filter((x) => x.id !== id); }),
  completeTrainingStep: (stage, step, status) => mut((d) => { d.training = { ...d.training, [stage]: { ...(d.training?.[stage] ?? {}), [step]: { status, at: Date.now() } } }; }),
  clearAll: async () => { try { localStorage.removeItem(KEY); } catch {} },
};

/** The UI only ever talks to this. It uses Supabase when configured and signed in, otherwise local storage. */
async function pick(): Promise<PracticeRepository> {
  if (supabaseConfigured && (await currentUserId())) return (await import("./supabaseRepository")).supabaseRepository;
  return localRepository;
}
export const repository: PracticeRepository = {
  load: async () => (await pick()).load(),
  addSession: async (s) => (await pick()).addSession(s),
  saveSettings: async (s) => (await pick()).saveSettings(s),
  saveMindState: async (v) => (await pick()).saveMindState(v),
  saveProfile: async (p) => (await pick()).saveProfile(p),
  saveAssessment: async (a) => (await pick()).saveAssessment(a),
  addReflection: async (r) => (await pick()).addReflection(r),
  updateReflection: async (id, r) => (await pick()).updateReflection(id, r),
  deleteReflection: async (id) => (await pick()).deleteReflection(id),
  completeTrainingStep: async (a, b, c) => (await pick()).completeTrainingStep(a, b, c),
  clearAll: async () => (await pick()).clearAll(),
};
