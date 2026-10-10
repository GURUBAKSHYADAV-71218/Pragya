"use client";
import { useEffect, useRef, useState } from "react";
import Page from "@/components/ui/Page";
import Scene from "@/components/environment/Scene";
import LearnLink from "@/components/learn/LearnLink";
import { Button } from "@/components/ui/Button";
import Status from "@/components/ui/Status";
import { repository } from "@/lib/repository";

type Phase = "idle" | "run" | "paused" | "done";
const fmt = (s: number) => `${Math.floor(Math.max(s, 0) / 60)}:${String(Math.max(s, 0) % 60).padStart(2, "0")}`;
export default function SilencePage() {
  const [mins, setMins] = useState(5); const [phase, setPhase] = useState<Phase>("idle"); const [left, setLeft] = useState(300);
  const [text, setText] = useState(""); const [msg, setMsg] = useState(""); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false); const [spent, setSpent] = useState(0);
  const acc = useRef(0), t0 = useRef(0), minsRef = useRef(5); minsRef.current = mins;

  const finish = (ms: number) => { setSpent(ms); setPhase("done"); const m = Math.round(ms / 6000) / 10; if (ms >= 12000) void repository.addSession({ type: "silence", minutes: m }); };
  useEffect(() => {
    if (phase !== "run") return;
    const id = setInterval(() => { const e = acc.current + Date.now() - t0.current, total = minsRef.current * 60000; if (e >= total) { clearInterval(id); finish(total); } else setLeft(Math.ceil((total - e) / 1000)); }, 250);
    return () => clearInterval(id);
  }, [phase]);

  const begin = () => { acc.current = 0; t0.current = Date.now(); setLeft(mins * 60); setMsg(""); setErr(""); setText(""); setPhase("run"); };
  const pause = () => { acc.current += Date.now() - t0.current; setPhase("paused"); };
  const resume = () => { t0.current = Date.now(); setPhase("run"); };
  const end = () => finish(acc.current + (phase === "run" ? Date.now() - t0.current : 0));
  const save = async () => { setBusy(true); setErr(""); try { await repository.addReflection({ title: "After silence", text: text.trim(), category: "Silence" }); setMsg("Reflection saved."); setText(""); } catch { setErr("Could not save your reflection. Please try again."); } setBusy(false); };

  return (
    <>
      <Page title="Silence" subtitle="Step away from noise. Be with what is." variant="rocks" center>
        <div role="group" aria-label="Duration" className="mb-8 flex flex-wrap justify-center gap-2">{[5, 10, 20, 30].map((m) => <button key={m} aria-pressed={mins === m} onClick={() => { setMins(m); setLeft(m * 60); }} className="chip">{m} min</button>)}</div>
        <p className="display text-7xl md:text-8xl" aria-label={`${mins} minutes`}>{mins}:00</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><Button onClick={begin}>Begin</Button><LearnLink slug="beginning-a-short-silence" from="/silence" label="Explore Silence" /></div>
      </Page>
      {phase !== "idle" && (
        <div role="dialog" aria-modal="true" aria-label="Silence session" className="settle fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-bg px-6 py-10 text-center">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-70"><Scene variant="rocks" /></div>
          {phase !== "done" ? (
            <div className="relative"><p className="display text-8xl md:text-9xl">{fmt(left)}</p><p className="mt-3 text-muted">{phase === "paused" ? "Paused" : "Nothing to solve right now."}</p>
              <div className="mt-8 flex justify-center gap-3">{phase === "run" ? <Button variant="secondary" onClick={pause}>Pause</Button> : <Button onClick={resume}>Resume</Button>}<Button variant="secondary" onClick={end}>End</Button></div></div>
          ) : (
            <div className="relative w-full max-w-md"><h2 className="text-5xl">You are here.</h2>
              <p className="mt-2 text-sm text-muted">{spent >= 12000 ? `${Math.round(spent / 6000) / 10} min of silence saved.` : "That was very short, so it was not saved."}</p>
              <p className="mt-4 text-muted">What did you notice?</p>
              <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} aria-label="What did you notice?" className="mt-3 w-full rounded-xl border border-line bg-surface/80 p-3 text-ink" />
              <div className="mt-3 flex justify-center gap-3"><Button onClick={save} loading={busy} disabled={!text.trim()}>Save reflection</Button><Button variant="secondary" onClick={() => { setPhase("idle"); setLeft(mins * 60); setMsg(""); setErr(""); }}>Close</Button></div>
              <div className="mt-3"><Status message={err || msg} tone={err ? "error" : "success"} /></div></div>)}
        </div>)}
    </>
  );
}
