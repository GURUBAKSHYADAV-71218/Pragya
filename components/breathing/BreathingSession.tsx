"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { repository } from "@/lib/repository";
import { Button } from "@/components/ui/Button";
import Status from "@/components/ui/Status";

/** [inhale, hold, exhale, hold] in seconds. */
const PATTERNS = { Natural: [4, 0, 4, 0], Box: [4, 4, 4, 4], "4-6": [4, 0, 6, 0], Slow: [5, 0, 7, 0] } as const;
type Name = keyof typeof PATTERNS;
const LABELS = ["Inhale", "Hold", "Exhale", "Hold"];
const MIN = 0.8, MAX = 1.3; // resting (contracted) and expanded scale
const ease = (p: number) => 0.5 - 0.5 * Math.cos(Math.PI * p);
type Phase = "idle" | "run" | "paused" | "confirm" | "done";

export default function BreathingSession() {
  const [mins, setMins] = useState(2); const [name, setName] = useState<Name>("Natural");
  const [status, setStatus] = useState<Phase>("idle"); const [phase, setPhase] = useState(0); const [left, setLeft] = useState(120); const [note, setNote] = useState("");
  const orb = useRef<HTMLDivElement>(null);
  const raf = useRef(0), acc = useRef(0), t0 = useRef(0), lastPhase = useRef(-1), lastLeft = useRef(-1), still = useRef(false);
  const cfg = useRef({ mins, name }); cfg.current = { mins, name };

  const setScale = (s: number) => { if (orb.current) orb.current.style.transform = `scale(${still.current ? 1 : s})`; };
  const stop = () => cancelAnimationFrame(raf.current);
  const finish = (ms: number, mode: "complete" | "save" | "discard") => {
    stop(); const m = Math.round(ms / 6000) / 10;
    if (mode !== "discard" && ms >= 30000) { void repository.addSession({ type: "breathing", minutes: m, detail: cfg.current.name }); }
    setScale(MIN);
    setNote(mode === "discard" ? "Session discarded." : ms < 30000 ? "Ended. Under 30 seconds, so nothing was saved." : `${mode === "complete" ? "Session complete" : "Session saved"}: ${m} min of ${cfg.current.name} breathing.`);
    setStatus(mode === "complete" ? "done" : "idle");
  };
  const frame = useCallback(() => {
    const { mins, name } = cfg.current; const total = mins * 60000, el = acc.current + (performance.now() - t0.current);
    if (el >= total) { finish(total, "complete"); return; }
    const p = PATTERNS[name], cycle = p[0] + p[1] + p[2] + p[3], t = (el / 1000) % cycle;
    let from = 0, ph = 0, prog = 0;
    for (let i = 0; i < 4; i++) { if (p[i] > 0 && t < from + p[i]) { ph = i; prog = (t - from) / p[i]; break; } from += p[i]; }
    setScale(ph === 0 ? MIN + (MAX - MIN) * ease(prog) : ph === 1 ? MAX : ph === 2 ? MAX - (MAX - MIN) * ease(prog) : MIN);
    if (ph !== lastPhase.current) { lastPhase.current = ph; setPhase(ph); }
    const l = Math.ceil((total - el) / 1000); if (l !== lastLeft.current) { lastLeft.current = l; setLeft(l); }
    raf.current = requestAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { setScale(MIN); return stop; }, []);

  const begin = () => { acc.current = 0; t0.current = performance.now(); lastPhase.current = -1; lastLeft.current = -1; still.current = matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.hasAttribute("data-rm"); setNote(""); setLeft(mins * 60); setStatus("run"); raf.current = requestAnimationFrame(frame); };
  const pause = () => { acc.current += performance.now() - t0.current; stop(); setStatus("paused"); };
  const resume = () => { t0.current = performance.now(); setStatus("run"); raf.current = requestAnimationFrame(frame); };
  const askEnd = () => { if (status === "run") { acc.current += performance.now() - t0.current; stop(); } setStatus("confirm"); };

  const active = status === "run" || status === "paused" || status === "confirm";
  const label = status === "paused" || status === "confirm" ? "Paused" : status === "run" ? LABELS[phase] : status === "done" ? "Complete" : "Ready";
  const p = PATTERNS[name];
  return (
    <div className="mx-auto w-full max-w-md text-center">
      <div className="mb-3 space-y-3">
        <div role="group" aria-label="Duration" className="flex flex-wrap justify-center gap-2">{[2, 5, 10].map((m) => <button key={m} disabled={active} aria-pressed={mins === m} onClick={() => { setMins(m); setLeft(m * 60); }} className="chip">{m} min</button>)}</div>
        <div role="group" aria-label="Breathing pattern" className="flex flex-wrap justify-center gap-2">{(Object.keys(PATTERNS) as Name[]).map((n) => <button key={n} disabled={active} aria-pressed={name === n} onClick={() => setName(n)} className="chip">{n}</button>)}</div>
        <p className="text-xs text-muted">Inhale {p[0]}{p[1] ? ` · Hold ${p[1]}` : ""} · Exhale {p[2]}{p[3] ? ` · Hold ${p[3]}` : ""}</p>
      </div>
      <div className="grid h-64 place-items-center" aria-hidden={false}>
        <div ref={orb} className="grid h-48 w-48 place-items-center rounded-full border-[10px] border-sage/60 bg-surface/70 ring-[16px] ring-sage/15 will-change-transform">
          <span aria-live="polite" className="font-serif text-xl text-deep">{label}</span></div>
      </div>
      <p className="min-h-5 text-sm text-muted">{active ? `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")} remaining` : ""}</p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        {(status === "idle" || status === "done") && <Button onClick={begin}>{status === "done" ? "Begin again" : "Begin"}</Button>}
        {status === "run" && <><Button variant="secondary" onClick={pause}>Pause</Button><Button variant="secondary" onClick={askEnd}>End session</Button></>}
        {status === "paused" && <><Button onClick={resume}>Resume</Button><Button variant="secondary" onClick={askEnd}>End session</Button></>}
        {status === "confirm" && <div className="panel w-full !p-4"><p className="mb-3 text-sm">End this session? Practice so far: {Math.round(acc.current / 6000) / 10} min.</p>
          <div className="flex flex-wrap justify-center gap-2"><Button onClick={() => finish(acc.current, "save")}>Save and end</Button><Button variant="danger" onClick={() => finish(acc.current, "discard")}>Discard</Button><Button variant="secondary" onClick={resume}>Keep going</Button></div></div>}
      </div>
      <div className="mt-2"><Status message={note} /></div>
    </div>
  );
}
