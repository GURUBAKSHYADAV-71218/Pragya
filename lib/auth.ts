import { getSupabase, supabaseConfigured } from "@/lib/supabase";
export const authMode = (): "supabase" | "local" => (supabaseConfigured ? "supabase" : "local");
export const NOT_CONFIGURED = "Accounts are not set up in this deployment, so sign-in is unavailable. You can keep practising as a guest.";
export async function currentUserId(): Promise<string | null> {
  const sb = getSupabase(); if (!sb) return null;
  const { data } = await sb.auth.getSession(); return data.session?.user.id ?? null;
}
export async function sessionEmail(): Promise<string | null> {
  const sb = getSupabase(); if (!sb) return null;
  const { data } = await sb.auth.getSession(); return data.session?.user.email ?? null;
}
const origin = () => (typeof window !== "undefined" ? window.location.origin : "");
const msg = (m: string) => (/invalid login|invalid credentials/i.test(m) ? "Email or password is incorrect." : /already registered|already been registered/i.test(m) ? "An account with this email already exists. Try logging in." : m);
/** Returns an error message, or null on success. There is no client-side fake session: without Supabase these always fail. */
export async function signUp(email: string, password: string): Promise<string | null> {
  const sb = getSupabase(); if (!sb) return NOT_CONFIGURED;
  try { const { data, error } = await sb.auth.signUp({ email, password, options: { emailRedirectTo: origin() ? `${origin()}/login` : undefined } }); if (error) return msg(error.message); return data.session ? null : "Check your email to confirm your account, then log in."; }
  catch { return "Could not reach the sign-in service. Check your connection and try again."; }
}
export async function signIn(email: string, password: string): Promise<string | null> {
  const sb = getSupabase(); if (!sb) return NOT_CONFIGURED;
  try { const { error } = await sb.auth.signInWithPassword({ email, password }); return error ? msg(error.message) : null; }
  catch { return "Could not reach the sign-in service. Check your connection and try again."; }
}
export async function signOut() { const sb = getSupabase(); if (sb) await sb.auth.signOut(); }
/** Sends a recovery email. The response never reveals whether the address has an account. */
export async function resetPassword(email: string): Promise<string | null> {
  const sb = getSupabase(); if (!sb) return NOT_CONFIGURED;
  try { const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${origin()}/auth/update-password` }); return error && !/not found/i.test(error.message) ? msg(error.message) : null; }
  catch { return "Could not reach the service. Check your connection and try again."; }
}
export async function hasRecoverySession(): Promise<boolean> { const sb = getSupabase(); if (!sb) return false; const { data } = await sb.auth.getSession(); return !!data.session; }
export async function updatePassword(password: string): Promise<string | null> {
  const sb = getSupabase(); if (!sb) return NOT_CONFIGURED;
  try { const { error } = await sb.auth.updateUser({ password }); return error ? msg(error.message) : null; }
  catch { return "Could not reach the service. Check your connection and try again."; }
}
