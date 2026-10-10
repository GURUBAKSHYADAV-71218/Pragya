import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { parseSupabaseEnv } from "./envConfig";
// NEXT_PUBLIC_* values are inlined by Next.js when the dev server starts or the app is built, so each variable must be referenced literally.
// The publishable key is accepted under either of the two names Supabase has used.
const env = parseSupabaseEnv(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
export const supabaseConfigured = env.configured;
export const missingSupabaseVars = (): string[] => env.missing;
let client: SupabaseClient | null = null;
export function getSupabase(): SupabaseClient | null {
  if (!env.configured) return null;
  client ??= createClient(env.url, env.key);
  return client;
}
