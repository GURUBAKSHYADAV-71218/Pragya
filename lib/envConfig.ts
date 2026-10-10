/** Pure parsing of the public Supabase settings, so it can be unit-tested. Returns variable NAMES only, never values. */
export interface SupabaseEnvStatus { configured: boolean; url: string; key: string; missing: string[] }
export function parseSupabaseEnv(url: string | undefined, key: string | undefined): SupabaseEnvStatus {
  const u = (url ?? "").trim().replace(/^["']|["']$/g, ""), k = (key ?? "").trim().replace(/^["']|["']$/g, "");
  const missing: string[] = [];
  if (!u) missing.push("NEXT_PUBLIC_SUPABASE_URL"); else if (!/^https?:\/\/[^\s/]+/.test(u)) missing.push("NEXT_PUBLIC_SUPABASE_URL (must start with https://)");
  if (!k) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  return { configured: missing.length === 0, url: u, key: k, missing };
}
