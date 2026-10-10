import { getSupabase } from "@/lib/supabase";
import { currentUserId } from "@/lib/auth";
import { emptyData, type PracticeData, type PracticeRepository } from "@/lib/repository";
import { planImport } from "@/lib/importPlan";

const ts = (v: string) => new Date(v).getTime();
async function ctx() { const sb = getSupabase()!, uid = (await currentUserId())!; return { sb, uid }; }
const check = (e: { message: string } | null) => { if (e) throw new Error(e.message); };

export interface ImportResult { sessions: number; reflections: number; skipped: number }
/** The base repository plus the account-only operation of importing guest data. */
export interface SupabaseRepository extends PracticeRepository { importGuest(local: PracticeData): Promise<ImportResult> }
export const supabaseRepository: SupabaseRepository = {
  async load(): Promise<PracticeData> {
    const { sb, uid } = await ctx(), base = emptyData();
    const [p, a, s, x, r, st] = await Promise.all([
      sb.from("profiles").select("*").eq("id", uid).maybeSingle(),
      sb.from("assessment_results").select("*").eq("user_id", uid).order("created_at", { ascending: false }).limit(1),
      sb.from("exercise_sessions").select("*").eq("user_id", uid),
      sb.from("experiment_results").select("*").eq("user_id", uid),
      sb.from("reflections").select("*").eq("user_id", uid),
      sb.from("user_settings").select("*").eq("user_id", uid).maybeSingle(),
    ]);
    return {
      ...base,
      profile: { name: p.data?.name ?? "", tz: p.data?.tz ?? undefined, time: p.data?.preferred_time ?? undefined },
      mindState: p.data?.mind_state ?? null,
      assessment: a.data?.[0] ? { primary: a.data[0].primary_focus, secondary: a.data[0].secondary_focus, scores: a.data[0].scores, at: ts(a.data[0].created_at) } : null,
      sessions: [
        ...(s.data ?? []).map((r) => ({ id: r.id, type: r.type, minutes: Number(r.minutes), detail: r.detail ?? undefined, at: ts(r.created_at), kind: "exercise" as const })),
        ...(x.data ?? []).map((r) => ({ id: r.id, type: r.experiment, minutes: Number(r.minutes), detail: r.detail ?? undefined, at: ts(r.created_at), kind: "experiment" as const })),
      ].sort((m, n) => m.at - n.at),
      reflections: (r.data ?? []).map((e) => ({ id: e.id, title: e.title, text: e.body, category: e.category, at: ts(e.created_at) })),
      settings: { ...base.settings, ...(st.data?.settings ?? {}) },
      training: st.data?.settings?.training ?? {},
    };
  },
  async addSession(s) {
    const { sb, uid } = await ctx();
    const { error } = s.kind === "experiment"
      ? await sb.from("experiment_results").insert({ user_id: uid, experiment: s.type, minutes: s.minutes, detail: s.detail })
      : await sb.from("exercise_sessions").insert({ user_id: uid, type: s.type, minutes: s.minutes, detail: s.detail });
    check(error);
  },
  async saveSettings(settings) { const { sb, uid } = await ctx(); check((await sb.from("user_settings").upsert({ user_id: uid, settings })).error); },
  async saveMindState(value) { const { sb, uid } = await ctx(); check((await sb.from("profiles").upsert({ id: uid, mind_state: { value, at: Date.now() } })).error); },
  async saveProfile(p) { const { sb, uid } = await ctx(); check((await sb.from("profiles").upsert({ id: uid, name: p.name, tz: p.tz, preferred_time: p.time })).error); },
  async saveAssessment(a) { const { sb, uid } = await ctx(); check((await sb.from("assessment_results").insert({ user_id: uid, primary_focus: a.primary, secondary_focus: a.secondary, scores: a.scores })).error); },
  async addReflection(r) { const { sb, uid } = await ctx(); check((await sb.from("reflections").insert({ user_id: uid, title: r.title, body: r.text, category: r.category })).error); },
  async updateReflection(id, r) { const { sb } = await ctx(); check((await sb.from("reflections").update({ title: r.title, body: r.text, category: r.category }).eq("id", id)).error); },
  async deleteReflection(id) { const { sb } = await ctx(); check((await sb.from("reflections").delete().eq("id", id)).error); },
  async completeTrainingStep(stage, step, status) {
    const { sb, uid } = await ctx(); const cur = await supabaseRepository.load();
    const training = { ...cur.training, [stage]: { ...(cur.training[stage] ?? {}), [step]: { status, at: Date.now() } } };
    check((await sb.from("user_settings").upsert({ user_id: uid, settings: { ...cur.settings, training } })).error);
  },
  /** Adds a guest's local records to the account. Only adds, never overwrites or deletes, and skips records already imported. */
  async importGuest(local: PracticeData): Promise<ImportResult> {
    const { sb, uid } = await ctx(); const cur = await supabaseRepository.load(); const plan = planImport(local, cur);
    const iso = (t: number) => new Date(t).toISOString();
    if (plan.exercises.length) check((await sb.from("exercise_sessions").insert(plan.exercises.map((s) => ({ user_id: uid, type: s.type, minutes: s.minutes, detail: s.detail, created_at: iso(s.at) })))).error);
    if (plan.experiments.length) check((await sb.from("experiment_results").insert(plan.experiments.map((s) => ({ user_id: uid, experiment: s.type, minutes: s.minutes, detail: s.detail, created_at: iso(s.at) })))).error);
    if (plan.reflections.length) check((await sb.from("reflections").insert(plan.reflections.map((r) => ({ user_id: uid, title: r.title, body: r.text, category: r.category, created_at: iso(r.at) })))).error);
    if (!cur.assessment && local.assessment) check((await sb.from("assessment_results").insert({ user_id: uid, primary_focus: local.assessment.primary, secondary_focus: local.assessment.secondary, scores: local.assessment.scores, created_at: iso(local.assessment.at) })).error);
    if (!cur.profile.name && local.profile.name) check((await sb.from("profiles").upsert({ id: uid, name: local.profile.name })).error);
    const training = { ...local.training }; for (const k of Object.keys(cur.training)) training[k] = { ...(training[k] ?? {}), ...cur.training[k] };
    check((await sb.from("user_settings").upsert({ user_id: uid, settings: { ...cur.settings, training, guestImported: true } })).error);
    return { sessions: plan.exercises.length + plan.experiments.length, reflections: plan.reflections.length, skipped: plan.skipped };
  },
  async clearAll() {
    const { sb, uid } = await ctx();
    for (const t of ["exercise_sessions", "experiment_results", "reflections", "assessment_results", "user_settings"]) check((await sb.from(t).delete().eq("user_id", uid)).error);
    check((await sb.from("profiles").delete().eq("id", uid)).error);
  },
};
