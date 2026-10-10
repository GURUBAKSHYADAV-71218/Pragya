"use client";
import { useEffect, useRef, useState } from "react";
import { repository } from "@/lib/repository";
import { Button, LinkButton } from "@/components/ui/Button";
import Status from "@/components/ui/Status";
export interface Result { type: string; minutes: number; summary: string; detail?: string; kind?: "exercise" | "experiment"; completed?: boolean }
type Dest = { href: string; label: string };
/** Shown when an activity ends. A session is saved (and training advanced) only if it was actually completed. */
export default function Done({ r, onAgain, back, next, onComplete }: { r: Result; onAgain: () => void; back: Dest; next?: Dest; onComplete?: () => Promise<void> | void }) {
  const ran = useRef(false); const counted = r.completed !== false;
  const [text, setText] = useState(""); const [msg, setMsg] = useState(""); const [err, setErr] = useState("");
  useEffect(() => {
    if (ran.current || !counted) return; ran.current = true;
    void (async () => { try { if (r.minutes > 0) await repository.addSession({ type: r.type, minutes: Math.round(r.minutes * 10) / 10, detail: r.detail, kind: r.kind }); await onComplete?.(); } catch { setErr("Your session could not be saved. Please try again."); } })();
  }, [r, counted, onComplete]);
  if (!counted) return (
    <div className="panel settle max-w-xl"><h2 className="text-2xl">Ended early.</h2><p className="mt-2 text-muted">This was too short to count, so it was not saved.</p>
      <div className="mt-4 flex flex-wrap gap-3"><Button onClick={onAgain}>Try again</Button><LinkButton href={back.href} variant="secondary">{back.label}</LinkButton></div></div>);
  return (
    <div className="panel settle max-w-xl">
      <h2 className="text-3xl">Practice complete.</h2><p className="mt-3">{r.summary}</p><p className="label mt-2">Practice indicators, not a score</p>
      <details className="mt-4 text-sm"><summary className="cursor-pointer text-deep">Add a reflection (optional)</summary>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} aria-label="Reflection" className="mt-2 w-full rounded-xl border border-line bg-bg/60 p-3 text-ink" />
        <Button variant="secondary" className="mt-2" disabled={!text.trim()} onClick={async () => { try { await repository.addReflection({ title: `After ${r.type.replace(/-/g, " ")}`, text: text.trim(), category: "General" }); setMsg("Reflection saved."); setText(""); } catch { setErr("Could not save your reflection."); } }}>Save reflection</Button></details>
      <div className="mt-4"><Status message={err || msg} tone={err ? "error" : "success"} /></div>
      <div className="mt-2 flex flex-wrap gap-3">{next && <LinkButton href={next.href}>{next.label}</LinkButton>}<Button variant="secondary" onClick={onAgain}>Practise again</Button><LinkButton href={back.href} variant="secondary">{back.label}</LinkButton></div>
    </div>
  );
}
