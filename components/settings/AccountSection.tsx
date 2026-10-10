"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, LinkButton } from "@/components/ui/Button";
import Status from "@/components/ui/Status";
import { authMode, resetPassword, sessionEmail } from "@/lib/auth";
import { localRepository, type PracticeData } from "@/lib/repository";
import { usePracticeData } from "@/hooks/usePracticeData";

export default function AccountSection() {
  const { data, refresh } = usePracticeData(); const [email, setEmail] = useState<string | null | undefined>(undefined); const [guest, setGuest] = useState<PracticeData | null>(null);
  const [msg, setMsg] = useState(""); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  useEffect(() => { void sessionEmail().then(setEmail); void localRepository.load().then(setGuest); }, []);
  if (authMode() === "local") return <section className="panel"><h2 className="text-lg">Account</h2><p className="mt-1 text-sm text-muted">Accounts are not set up in this deployment. You are using PRAGYA as a guest, and your practice is saved in this browser only.</p></section>;
  const guestCount = guest ? guest.sessions.length + guest.reflections.length : 0;
  const canImport = !!email && guestCount > 0 && !data.settings.guestImported;
  const doImport = async () => { setBusy(true); setErr(""); setMsg(""); try { const { supabaseRepository } = await import("@/lib/supabaseRepository"); const r = await supabaseRepository.importGuest(guest!); await refresh(); setMsg(`Imported ${r.sessions} sessions and ${r.reflections} reflections${r.skipped ? ` (${r.skipped} already in your account were skipped)` : ""}.`); } catch (e) { setErr(e instanceof Error ? e.message : "Import failed. Nothing was changed."); } setBusy(false); };
  return (
    <section className="panel"><h2 className="text-lg">Account</h2>
      {email === undefined ? <p className="mt-1 text-sm text-muted">Checking…</p> : email ? <>
        <p className="mt-1 text-sm">Signed in as <b className="font-medium text-deep">{email}</b>. Your practice is saved to your account.</p>
        <div className="mt-3 flex flex-wrap gap-2"><Button variant="secondary" onClick={async () => { const m = await resetPassword(email); if (m) setErr(m); else setMsg("Password reset email sent."); }}>Send password reset email</Button></div>
        {canImport && <div className="mt-4 rounded-xl bg-sage/15 p-4 text-sm"><p>You have practice saved as a guest on this device ({guest!.sessions.length} sessions, {guest!.reflections.length} reflections). Import it into your account?</p><p className="mt-1 text-xs text-muted">This adds copies once. Nothing in your account is overwritten and nothing is deleted from this device.</p><Button className="mt-3" loading={busy} onClick={doImport}>Import guest data</Button></div>}
        {data.settings.guestImported && <p className="mt-3 text-xs text-muted">Guest data from this device has been imported.</p>}
      </> : <><p className="mt-1 text-sm text-muted">You are using PRAGYA as a guest. Practice is saved on this device only. Create an account to keep it across devices.</p><div className="mt-3 flex gap-2"><LinkButton href="/login" variant="secondary">Log in</LinkButton><LinkButton href="/signup">Create account</LinkButton></div></>}
      <div className="mt-3"><Status message={err || msg} tone={err ? "error" : "success"} /></div>
      <p className="mt-1 text-xs text-muted">See <Link href="/learn" className="underline">guides</Link> for how PRAGYA stores data.</p>
    </section>
  );
}
