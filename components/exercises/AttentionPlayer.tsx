"use client";
import { useEffect, useRef, useState } from "react";
import type { Result } from "./Done";
type Mode = "anchor" | "focus" | "drift";
const COPY: Record<Mode, string> = { anchor: "Follow the circle. When you notice your mind has wandered, tap Drifted. When you come back, tap Returned.", focus: "Keep your eyes on the circle. Small distractions will appear. Tap Back to the circle each time you return.", drift: "Follow the circle. Tap Noticed when you catch your mind leaving, Drifted when it has gone, Returned when you are back." };
const WORDS = ["a message", "a sound", "a thought", "something to do"];
const DUR = 60;
export default function AttentionPlayer({ mode, type, onFinish }: { mode: Mode; type: string; onFinish: (r: Result) => void }) {
  const dot = useRef<HTMLDivElement>(null);
  const c = useRef({ k: 0, run: false, drift: 0, ret: 0, noticed: 0, dist: 0, left: DUR });
  const [run, setRun] = useState(false); const [left, setLeft] = useState(DUR); const [n, setN] = useState({ drift: 0, ret: 0, noticed: 0 }); const [word, setWord] = useState("");
  useEffect(() => {
    const id = setInterval(() => {
      const s = c.current; if (!s.run) return; s.k++;
      const p = s.k / 40; if (dot.current) { dot.current.style.left = `${50 + 36 * Math.sin(p)}%`; dot.current.style.top = `${50 + 30 * Math.sin(p * 1.3)}%`; }
      if (s.k % 20 === 0) { s.left--; setLeft(s.left); }
      if (mode !== "anchor" && s.k % 80 === 0) { s.dist++; setWord(WORDS[s.dist % 4]); } if (mode !== "anchor" && s.k % 80 === 40) setWord("");
      if (s.left <= 0) finish();
    }, 50);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function finish() {
    const s = c.current; s.run = false; const mins = (DUR - s.left) / 60;
    onFinish({ type, minutes: mins, completed: s.left <= 0 || DUR - s.left >= 30, detail: JSON.stringify({ drift: s.drift, returns: s.ret, noticed: s.noticed, distractions: s.dist }),
      summary: mode === "focus" ? `Distractions appeared ${s.dist} times. You returned to the circle ${s.ret} times.` : mode === "drift" ? `You noticed ${s.noticed}, drifted ${s.drift} and returned ${s.ret} times.` : `Drift events: ${s.drift}. Returns: ${s.ret}.` });
  }
  const tap = (k: "drift" | "ret" | "noticed") => { c.current[k]++; setN({ drift: c.current.drift, ret: c.current.ret, noticed: c.current.noticed }); };
  const btn = "btn btn-secondary";
  return (
    <div className="max-w-xl">
      <div className="relative h-72 overflow-hidden rounded-2xl border border-line bg-surface/80">
        <div ref={dot} className="absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest/70 ring-8 ring-sage/25" style={{ left: "50%", top: "50%" }} />
        {word && <span className="absolute right-6 top-6 text-sm italic text-muted">{word}</span>}
      </div>
      <p className="mt-4 text-sm text-muted">{COPY[mode]}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button onClick={() => { c.current.run = !c.current.run; setRun(c.current.run); }} className="btn btn-primary">{run ? "Pause" : c.current.k ? "Resume" : "Begin"}</button>
        {mode === "drift" && <button disabled={!run} onClick={() => tap("noticed")} className={btn}>Noticed ({n.noticed})</button>}
        {mode !== "focus" && <button disabled={!run} onClick={() => tap("drift")} className={btn}>Drifted ({n.drift})</button>}
        <button disabled={!run} onClick={() => tap("ret")} className={btn}>{mode === "focus" ? "Back to the circle" : "Returned"} ({n.ret})</button>
        <button onClick={finish} className="btn btn-secondary">End</button>
        <span className="text-sm text-muted" aria-live="off">{left}s</span>
      </div>
    </div>
  );
}
