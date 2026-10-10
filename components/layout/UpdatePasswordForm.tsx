"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authMode, hasRecoverySession, updatePassword } from "@/lib/auth";
import { validatePassword } from "@/lib/validate";
import { Button, LinkButton } from "@/components/ui/Button";
import Status from "@/components/ui/Status";

export default function UpdatePasswordForm() {
  const [state, setState] = useState<"checking" | "ready" | "invalid" | "done">("checking"); const [pw, setPw] = useState(""); const [pw2, setPw2] = useState(""); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  useEffect(() => { let on = true; const t = setTimeout(async () => { const ok = await hasRecoverySession(); if (on) setState(ok ? "ready" : "invalid"); }, 600); return () => { on = false; clearTimeout(t); }; }, []);
  const field = "mt-1 w-full rounded-xl border border-line bg-bg/60 p-3 text-ink";
  if (authMode() === "local") return <div className="panel w-full max-w-sm"><p className="text-sm">Accounts are not set up in this deployment.</p><div className="mt-4"><LinkButton href="/dashboard">Continue as guest</LinkButton></div></div>;
  if (state === "checking") return <div className="panel w-full max-w-sm"><p className="text-sm text-muted">Checking your reset link…</p></div>;
  if (state === "invalid") return <div className="panel w-full max-w-sm"><h1 className="text-2xl">This link is not valid</h1><p className="mt-2 text-sm text-muted">It may have expired or already been used.</p><div className="mt-4"><LinkButton href="/forgot-password">Request a new link</LinkButton></div></div>;
  if (state === "done") return <div className="panel w-full max-w-sm"><h1 className="text-2xl">Password updated</h1><p className="mt-2 text-sm text-muted">You are signed in.</p><div className="mt-4"><LinkButton href="/dashboard">Continue</LinkButton></div></div>;
  const submit = async (e: React.FormEvent) => { e.preventDefault(); setErr(""); const bad = validatePassword(pw, "signup"); if (bad) return setErr(bad); if (pw !== pw2) return setErr("The two passwords do not match."); setBusy(true); const m = await updatePassword(pw); setBusy(false); if (m) setErr(m); else setState("done"); };
  return (
    <form onSubmit={submit} noValidate className="panel w-full max-w-sm"><h1 className="text-3xl">Choose a new password</h1>
      <label className="mt-4 block text-sm text-muted">New password (8+ characters)<input type="password" value={pw} onChange={(e) => setPw(e.target.value)} className={field} autoComplete="new-password" /></label>
      <label className="mt-3 block text-sm text-muted">Confirm password<input type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} className={field} autoComplete="new-password" /></label>
      <div className="mt-3"><Status message={err} tone="error" /></div><Button type="submit" loading={busy} className="mt-2 w-full">Update password</Button>
      <p className="mt-4 text-center text-sm text-muted"><Link href="/login" className="underline">Back to log in</Link></p></form>
  );
}
