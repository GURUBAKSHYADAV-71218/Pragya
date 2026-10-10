"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authMode, resetPassword, signIn, signUp } from "@/lib/auth";
import { missingSupabaseVars } from "@/lib/supabase";
import { validateEmail, validatePassword } from "@/lib/validate";
import { repository } from "@/lib/repository";
import { Button, LinkButton } from "@/components/ui/Button";
import Status from "@/components/ui/Status";

export default function AuthForm({ mode }: { mode: "login" | "signup" | "forgot" }) {
  const r = useRouter(); const [email, setEmail] = useState(""); const [pw, setPw] = useState(""); const [name, setName] = useState(""); const [err, setErr] = useState(""); const [info, setInfo] = useState(""); const [busy, setBusy] = useState(false);
  const field = "mt-1 w-full rounded-xl border border-line bg-bg/60 p-3 text-ink";
  if (authMode() === "local") return (
    <div className="panel settle w-full max-w-sm"><h1 className="text-3xl">{mode === "signup" ? "Accounts" : "Sign in"}</h1>
      <p className="mt-3 text-sm">Accounts are not set up in this deployment, so signing in or creating an account is not available here.</p>
      <p className="mt-2 text-sm text-muted">You can use everything as a guest. Your practice is saved in this browser only.</p>
      <div className="mt-3 rounded-xl bg-sage/15 p-3 text-xs text-muted"><p className="font-medium text-deep">Developer note</p><p className="mt-1">Missing or invalid: {missingSupabaseVars().join(", ")}. Set them in <code>.env.local</code> and restart the dev server (or rebuild), because these values are read when the app starts.</p></div>
      <div className="mt-5"><LinkButton href="/dashboard">Continue as guest</LinkButton></div></div>);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(""); setInfo("");
    const bad = validateEmail(email) || (mode === "forgot" ? null : validatePassword(pw, mode)); if (bad) { setErr(bad); return; }
    setBusy(true);
    if (mode === "forgot") { const m = await resetPassword(email.trim()); setBusy(false); if (m) setErr(m); else setInfo("If an account exists for that email, a reset link is on its way."); return; }
    const m = mode === "signup" ? await signUp(email.trim(), pw) : await signIn(email.trim(), pw);
    setBusy(false);
    if (m) { /confirm/i.test(m) ? setInfo(m) : setErr(m); return; }
    if (mode === "signup" && name.trim()) await repository.saveProfile({ name: name.trim() }).catch(() => {});
    r.push(mode === "signup" ? "/assessment" : "/dashboard");
  };
  return (
    <form onSubmit={submit} noValidate className="panel settle w-full max-w-sm">
      <h1 className="text-3xl">{mode === "signup" ? "Begin your journey" : mode === "forgot" ? "Reset your password" : "Welcome back"}</h1>
      <p className="mt-2 text-xs text-muted">Practice you saved as a guest stays on this device. It is not synced to your account.</p>
      {mode === "signup" && <label className="mt-4 block text-sm text-muted">Name (optional)<input value={name} onChange={(e) => setName(e.target.value)} className={field} autoComplete="name" /></label>}
      <label className="mt-4 block text-sm text-muted">Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} autoComplete="email" /></label>
      {mode !== "forgot" && <label className="mt-3 block text-sm text-muted">Password{mode === "signup" && " (8+ characters)"}<input type="password" value={pw} onChange={(e) => setPw(e.target.value)} className={field} autoComplete={mode === "signup" ? "new-password" : "current-password"} /></label>}
      {mode === "login" && <p className="mt-2 text-sm"><Link href="/forgot-password" className="underline">Forgot your password?</Link></p>}
      <div className="mt-3"><Status message={err || info} tone={err ? "error" : "success"} /></div>
      <Button type="submit" loading={busy} className="mt-2 w-full">{mode === "signup" ? "Create account" : mode === "forgot" ? "Send reset link" : "Log in"}</Button>
      <p className="mt-4 text-center text-sm text-muted">{mode === "signup" ? <>Already have an account? <Link href="/login" className="underline">Log in</Link></> : <>New here? <Link href="/signup" className="underline">Sign up</Link></>} · <Link href="/dashboard" className="underline">Continue as guest</Link></p>
    </form>
  );
}
