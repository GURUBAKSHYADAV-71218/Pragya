"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Ask } from "./ChoiceFlows";
import { Button } from "@/components/ui/Button";
import type { Result } from "./Done";

const field = "mt-2 w-full rounded-xl border border-line bg-bg/60 p-3 text-ink";
const Card = ({ children }: { children: React.ReactNode }) => <div className="panel settle w-full max-w-xl">{children}</div>;

const SENSES: [number, string, string][] = [[5, "see", "Look around. Name five things you can see."], [4, "feel", "Notice four things you can feel: clothing, the chair, the floor, the air."], [3, "hear", "Listen for three sounds, near or far."], [2, "smell", "Notice two smells. If you cannot smell anything, recall a smell you like."], [1, "taste", "Notice one taste in your mouth, or take a sip of water."]];
export function Grounding({ onFinish }: { onFinish: (r: Result) => void }) {
  const [i, setI] = useState(0); const [n, setN] = useState(0); const [done, setDone] = useState<number[]>([]);
  const [need, sense, prompt] = SENSES[i];
  const next = (counted: boolean) => { const d = counted ? [...done, i] : done; if (i + 1 >= SENSES.length) onFinish({ type: "grounding", minutes: 2, completed: d.length >= 3, detail: `${d.length} of 5 senses`, summary: `You moved through ${d.length} of 5 senses. Skipping a sense is fine.` }); else { setDone(d); setI(i + 1); setN(0); } };
  return (
    <Card><p className="label">Step {i + 1} of 5</p><h2 className="mt-1 text-3xl">{need} things you can {sense}</h2><p className="mt-2 text-muted">{prompt}</p>
      <p className="mt-4 text-sm" aria-live="polite">Noticed: {n} of {need}</p>
      <div className="mt-4 flex flex-wrap gap-2"><Button disabled={n >= need} onClick={() => setN(n + 1)}>I noticed one</Button>{n >= need && <Button onClick={() => next(true)}>{i + 1 >= 5 ? "Finish" : "Next sense"}</Button>}
        {i > 0 && <Button variant="secondary" onClick={() => { setI(i - 1); setN(0); }}>Back</Button>}<Button variant="secondary" onClick={() => next(false)}>Skip this one</Button></div>
      <p className="mt-4 text-xs text-muted">If this feels uncomfortable, stop and look at something neutral, or take a few normal breaths.</p></Card>
  );
}
const FEELINGS = ["Calm", "Anxious", "Angry", "Sad", "Happy", "Tired", "Overwhelmed", "Not sure"];
const NEXT: Record<string, { label: string; href: string }> = { "A pause": { label: "Try The Pause", href: "/exercises/the-pause" }, "To settle my body": { label: "Try Comfortable Breathing", href: "/breathing" }, "To finish one task": { label: "Try Focus Reset", href: "/exercises/focus-reset" }, "To understand my thoughts": { label: "Try Thought Labelling", href: "/exercises/thought-labelling" }, "Rest": { label: "Try Silence", href: "/silence" }, "Nothing yet": { label: "", href: "" } };
export function EmotionCheckin({ onFinish }: { onFinish: (r: Result) => void }) {
  const [step, setStep] = useState(0); const [what, setWhat] = useState(""); const [feel, setFeel] = useState<string[]>([]); const [level, setLevel] = useState(0); const [need, setNeed] = useState("");
  const toggle = (f: string) => setFeel(feel.includes(f) ? feel.filter((x) => x !== f) : [...feel, f]);
  if (step === 0) return <Card><p className="label">1 of 3 · What happened?</p><p className="mt-1 text-muted">Optional. This stays on this screen and is not saved unless you write it as a reflection later.</p><textarea value={what} onChange={(e) => setWhat(e.target.value)} rows={3} className={field} aria-label="What happened" /><div className="mt-4"><Button onClick={() => setStep(1)}>{what.trim() ? "Next" : "Skip"}</Button></div></Card>;
  if (step === 1) return <Card><p className="label">2 of 3 · What do you feel?</p><p className="mt-1 text-muted">Choose any, or none. A feeling does not need to be fixed.</p>
    <div role="group" aria-label="Feelings" className="mt-3 flex flex-wrap gap-2">{FEELINGS.map((f) => <button key={f} aria-pressed={feel.includes(f)} onClick={() => toggle(f)} className="chip">{f}</button>)}</div>
    <label className="mt-4 block text-sm text-muted">Intensity (optional): {level ? `${level} of 5` : "not set"}<input type="range" min={0} max={5} value={level} onChange={(e) => setLevel(+e.target.value)} className="mt-2 w-full accent-[rgb(var(--forest))]" /></label>
    <div className="mt-4 flex gap-2"><Button variant="secondary" onClick={() => setStep(0)}>Back</Button><Button onClick={() => setStep(2)}>Next</Button></div></Card>;
  return <Card><p className="label">3 of 3 · What do you need next?</p>
    <div role="group" aria-label="Next" className="mt-3 flex flex-wrap gap-2">{Object.keys(NEXT).map((k) => <button key={k} aria-pressed={need === k} onClick={() => setNeed(k)} className="chip">{k}</button>)}</div>
    {need && NEXT[need].href && <p className="mt-3 text-sm"><Link className="underline" href={NEXT[need].href}>{NEXT[need].label}</Link> afterwards if you like.</p>}
    <div className="mt-4 flex gap-2"><Button variant="secondary" onClick={() => setStep(1)}>Back</Button><Button onClick={() => onFinish({ type: "emotion-checkin", minutes: 1.5, detail: JSON.stringify({ feel, level, need }), summary: `${feel.length ? `You noted: ${feel.join(", ")}${level ? ` (intensity ${level} of 5)` : ""}.` : "You checked in without naming a feeling."} ${need && need !== "Nothing yet" ? `Next, you chose: ${need.toLowerCase()}.` : ""}` })}>Finish</Button></div></Card>;
}
const OBST = ["Phone", "Social media", "Feeling tired", "Not sure where to start", "My own thoughts", "Something else"];
export function FocusReset({ onFinish }: { onFinish: (r: Result) => void }) {
  const [step, setStep] = useState(0); const [task, setTask] = useState(""); const [obst, setObst] = useState(""); const [action, setAction] = useState(""); const [block, setBlock] = useState(10);
  const [timer, setTimer] = useState<"off" | "run" | "paused">("off"); const [left, setLeft] = useState(0); const acc = useRef(0), t0 = useRef(0);
  const finish = (ms: number) => onFinish({ type: "focus-reset", minutes: Math.max(2, ms / 60000), detail: JSON.stringify({ obstacle: obst, block, timed: ms > 0 }), summary: ms > 0 ? `You worked on one small action for ${Math.max(1, Math.round(ms / 60000))} min. Decide whether to continue or rest.` : `Your plan: ${block} minutes on one small action. Take the first step now, outside the app.` });
  useEffect(() => { if (timer !== "run") return; const id = setInterval(() => { const e = acc.current + Date.now() - t0.current, total = block * 60000; if (e >= total) { clearInterval(id); finish(total); } else setLeft(Math.ceil((total - e) / 1000)); }, 250); return () => clearInterval(id); }, [timer]); // eslint-disable-line react-hooks/exhaustive-deps
  if (timer !== "off") return <Card><p className="label">Focus interval</p><p className="display mt-2 text-6xl" aria-live="off">{Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}</p><p className="mt-2 text-muted">Only this: <b className="font-medium text-deep">{action}</b></p>
    <div className="mt-4 flex flex-wrap gap-2">{timer === "run" ? <Button variant="secondary" onClick={() => { acc.current += Date.now() - t0.current; setTimer("paused"); }}>Pause</Button> : <Button onClick={() => { t0.current = Date.now(); setTimer("run"); }}>Resume</Button>}<Button variant="secondary" onClick={() => finish(acc.current + (timer === "run" ? Date.now() - t0.current : 0))}>Done for now</Button></div></Card>;
  if (step === 0) return <Card><p className="label">1 of 4 · Your task</p><p className="mt-1 text-muted">What do you want to get back to? A short label is enough.</p><input value={task} onChange={(e) => setTask(e.target.value)} className={field} aria-label="Your task" placeholder="For example: chemistry revision" /><div className="mt-4"><Button disabled={!task.trim()} onClick={() => setStep(1)}>Next</Button></div></Card>;
  if (step === 1) return <Card><p className="label">2 of 4 · What is in the way?</p><p className="mt-1 text-muted">Optional. Naming it makes it easier to set aside.</p><div role="group" aria-label="Obstacle" className="mt-3 flex flex-wrap gap-2">{OBST.map((p) => <button key={p} aria-pressed={obst === p} onClick={() => setObst(obst === p ? "" : p)} className="chip">{p}</button>)}</div><div className="mt-4 flex gap-2"><Button variant="secondary" onClick={() => setStep(0)}>Back</Button><Button onClick={() => setStep(2)}>{obst ? "Next" : "Skip"}</Button></div></Card>;
  if (step === 2) return <Card><p className="label">3 of 4 · One small next action</p><p className="mt-1 text-muted">Small enough to start now: read one page, solve one question, write the first sentence.</p><input value={action} onChange={(e) => setAction(e.target.value)} className={field} aria-label="Next action" placeholder={`First step for: ${task}`} />
    <div role="group" aria-label="Time block" className="mt-3 flex gap-2">{[5, 10, 15].map((m) => <button key={m} aria-pressed={block === m} onClick={() => setBlock(m)} className="chip">{m} min</button>)}</div><div className="mt-4 flex gap-2"><Button variant="secondary" onClick={() => setStep(1)}>Back</Button><Button disabled={!action.trim()} onClick={() => setStep(3)}>Next</Button></div></Card>;
  return <Card><p className="label">4 of 4 · Your restart plan</p><ol className="mt-3 list-decimal space-y-2 pl-5"><li>{obst ? `Put ${obst.toLowerCase()} out of reach for now.` : "Clear one thing off your desk."}</li><li>Work on: <b className="font-medium text-deep">{task}</b></li><li>Do only this first: <b className="font-medium text-deep">{action}</b></li><li>After {block} minutes, choose to continue or rest.</li></ol>
    <div className="mt-5 flex flex-wrap gap-2"><Button variant="secondary" onClick={() => setStep(2)}>Back</Button><Button onClick={() => { acc.current = 0; t0.current = Date.now(); setLeft(block * 60); setTimer("run"); }}>Start {block}-minute interval</Button><Button variant="secondary" onClick={() => finish(0)}>Finish without a timer</Button></div></Card>;
}
const SCENES: { s: string; opts: [string, string][] }[] = [
  { s: "You sent an important message an hour ago and still have no reply.", opts: [["Wait and do something else", "Switching attention lets the urge pass without feeding it."], ["Check once, on purpose", "Choosing to check is different from checking on impulse."], ["Ask for an update", "Acting can be reasonable. Notice if the urge to hurry drives it."]] },
  { s: "You are in a slow queue and already running late.", opts: [["Take one slow breath and look around", "A breath gives the urge room to rise and fall."], ["Plan what to do when you reach the front", "Planning can help, though it can also keep your mind busy."], ["Reach for your phone", "Common and fine. Notice whether it settles the urge or feeds it."]] },
  { s: "A train is delayed with no new information.", opts: [["Accept the delay and use the time", "Using the time moves you from waiting to doing."], ["Check updates every minute", "Notice how checking affects the urge to hurry."], ["Let it be for a minute", "Sitting with uncertainty is the practice."]] },
];
export function PatiencePractice({ onFinish }: { onFinish: (r: Result) => void }) {
  const [i, setI] = useState(0); const [stage, setStage] = useState<"urge" | "act" | "fb">("urge"); const [urge, setUrge] = useState(""); const [fb, setFb] = useState("");
  const sc = SCENES[i];
  const nextScene = () => { if (i + 1 >= SCENES.length) onFinish({ type: "patience-practice", minutes: 3, detail: `${SCENES.length} scenarios`, summary: "You noticed the urge to hurry in three waiting situations. Feeling impatient is different from acting on it." }); else { setI(i + 1); setStage("urge"); } };
  if (stage === "urge") return <Ask sub={`Scenario ${i + 1} of ${SCENES.length}`} q={`${sc.s} What do you notice first?`} options={["Restlessness", "Irritation", "An urge to check", "Planning ahead"]} onPick={(o) => { setUrge(o); setStage("act"); }} />;
  if (stage === "act") return <Ask sub={`You noticed: ${urge}`} q="How might you respond?" options={sc.opts.map((o) => o[0])} onPick={(o) => { setFb(sc.opts.find((x) => x[0] === o)![1]); setStage("fb"); }} />;
  return <Card><p>{fb}</p><p className="mt-2 text-sm text-muted">No response here is the correct one. You are practising noticing the urge.</p><div className="mt-4"><Button onClick={nextScene}>{i + 1 >= SCENES.length ? "Finish" : "Next scenario"}</Button></div></Card>;
}
