"use client";
import { useEffect, useRef, useState } from "react";
import { Ask } from "./ChoiceFlows";
import type { Result } from "./Done";

function useCountdown(n: number, active: boolean, onEnd: () => void) {
  const [t, setT] = useState(n); const end = useRef(onEnd); end.current = onEnd;
  useEffect(() => { if (!active) return; const id = setInterval(() => setT((v) => { if (v <= 1) { clearInterval(id); setTimeout(() => end.current(), 0); return 0; } return v - 1; }), 1000); return () => clearInterval(id); }, [active]);
  return t;
}
export function WhiteElephant({ onFinish }: { onFinish: (r: Result) => void }) {
  const [phase, setPhase] = useState<"intro" | "run" | "ask">("intro");
  const t = useCountdown(30, phase === "run", () => setPhase("ask"));
  if (phase === "ask") return <Ask q="Did it appear?" options={["Not at all", "Once or twice", "Often"]} onPick={(o) => onFinish({ type: "white-elephant", kind: "experiment", minutes: 0.5, detail: o, summary: `You answered: ${o}. Trying to push a thought away can keep it close. Noticing it without a fight is a different move.` })} />;
  return <div className="panel max-w-xl text-center"><p className="display text-2xl">Try not to think about a white elephant for 30 seconds.</p><p className="display my-6 text-6xl">{phase === "run" ? t : 30}</p>{phase === "intro" && <button onClick={() => setPhase("run")} className="btn btn-primary">Begin</button>}</div>;
}
export function Waiting({ onFinish }: { onFinish: (r: Result) => void }) {
  const [run, setRun] = useState(false); const [skips, setSkips] = useState(0);
  const sk = useRef(0);
  const t = useCountdown(20, run, () => onFinish({ type: "waiting", kind: "experiment", minutes: 0.33, detail: String(sk.current), summary: `You reached for skip ${sk.current} time${sk.current === 1 ? "" : "s"}. The urge to skip is something you can simply notice.` }));
  return <div className="panel max-w-xl text-center transition-opacity duration-1000" style={{ opacity: run ? 0.55 + 0.45 * (t / 20) : 1 }}><p className="display text-2xl">Stay with the countdown. Nothing else to do.</p><p className="display my-6 text-6xl">{run ? t : 20}</p>
    {!run ? <button onClick={() => setRun(true)} className="btn btn-primary">Begin</button> : <button onClick={() => { sk.current++; setSkips(sk.current); }} className="btn btn-secondary">Skip {skips ? `(${skips})` : ""}</button>}</div>;
}
export function AttentionSwitch({ onFinish }: { onFinish: (r: Result) => void }) {
  const [run, setRun] = useState(false); const [active, setActive] = useState<0 | 1>(0);
  const s = useRef({ changedAt: 0, answered: true, hits: 0, misses: 0, total: 0, wrong: 0 });
  const done = () => { const x = s.current; const avg = x.hits ? x.total / x.hits / 1000 : 0; onFinish({ type: "attention-switch", kind: "experiment", minutes: 0.5, detail: JSON.stringify(x), summary: `You followed ${x.hits} switches (average ${avg.toFixed(1)} s), missed ${x.misses} and tapped the wrong target ${x.wrong} times.` }); };
  const t = useCountdown(30, run, done);
  useEffect(() => { if (!run) return; let id: ReturnType<typeof setTimeout>; const next = () => { const x = s.current; if (!x.answered) x.misses++; x.answered = false; x.changedAt = Date.now(); setActive((v) => (v ? 0 : 1)); id = setTimeout(next, 2000 + Math.random() * 2000); }; id = setTimeout(next, 1500); return () => clearTimeout(id); }, [run]);
  const tap = (i: number) => { const x = s.current; if (!run) return; if (i === active && !x.answered && x.changedAt) { x.answered = true; x.hits++; x.total += Date.now() - x.changedAt; } else if (i !== active) x.wrong++; };
  return (
    <div className="max-w-xl"><p className="mb-4 text-muted">One target is lit. When the light moves, tap the new one. Notice how attention shifts.</p>
      <div className="grid grid-cols-2 gap-4">{[0, 1].map((i) => <button key={i} onClick={() => tap(i)} aria-label={`Target ${i + 1}${run && active === i ? ", lit" : ""}`} className={`h-40 rounded-2xl border transition-colors duration-700 ${run && active === i ? "border-gold bg-gold/25" : "border-line bg-surface/80"}`} />)}</div>
      <div className="mt-4 flex items-center gap-4">{!run ? <button onClick={() => setRun(true)} className="btn btn-primary">Begin</button> : <span className="text-sm text-muted">{t}s</span>}</div></div>
  );
}
