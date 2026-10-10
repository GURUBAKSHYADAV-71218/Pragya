"use client";
import { useEffect, useRef, useState } from "react";
import { Button, LinkButton } from "@/components/ui/Button";
import type { Result } from "./Done";

export function Ask({ q, options, onPick, sub }: { q: string; options: string[]; onPick: (o: string) => void; sub?: string }) {
  const [sel, setSel] = useState<string | null>(null); const tm = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => { setSel(null); }, [q]);
  useEffect(() => () => clearTimeout(tm.current), []);
  return (
    <div className="panel settle w-full max-w-xl">
      {sub && <p className="label mb-2">{sub}</p>}
      <h2 className="text-2xl">{q}</h2>
      <div role="group" aria-label="Choices" className="mt-5 flex flex-wrap gap-2">{options.map((o) => (
        <button key={o} type="button" aria-pressed={sel === o} onClick={() => { if (sel) return; setSel(o); tm.current = setTimeout(() => onPick(o), 260); }} className="chip !py-2 text-left">{o}</button>))}</div>
    </div>
  );
}
const Card = ({ children }: { children: React.ReactNode }) => <div className="panel settle w-full max-w-xl">{children}</div>;

const TRIGGERS: { t: string; alts: [string, string][] }[] = [
  { t: "A colleague criticises your work in front of others.", alts: [["Ask a question to understand", "You learn what they meant before deciding how to feel about it."], ["Say you need a moment", "Buys time. It may feel awkward, but it avoids saying something you regret."], ["Respond to the fair part", "Shows you listened. The rest can wait."], ["Reply later in writing", "Gives you room to think, but may delay resolving it."]] },
  { t: "Someone cuts in front of you in a queue.", alts: [["Say calmly that the queue starts behind you", "Clear and direct. They may or may not respond well."], ["Let it go and breathe", "Saves energy, though you may stay annoyed for a while."], ["Notice the irritation, then decide", "Separates the feeling from the action."], ["Ask staff to help", "Brings in someone with authority, at the cost of a little time."]] },
  { t: "A friend's message reads: 'We need to talk.'", alts: [["Ask 'Is everything okay?'", "Invites information instead of guessing."], ["Check how you feel first", "Stops you replying from worry."], ["Call them", "Faster clarity, if you can stay steady."], ["Notice the story you are telling yourself", "Separates the message from your interpretation."]] },
];
export function Pause({ type, onFinish }: { type: string; onFinish: (r: Result) => void }) {
  const [stage, setStage] = useState<"trig" | "first" | "wait" | "notice" | "alt" | "fb">("trig"); const [ti, setTi] = useState(0); const [first, setFirst] = useState(""); const [seen, setSeen] = useState(""); const [fb, setFb] = useState(""); const [t, setT] = useState(6);
  useEffect(() => { if (stage !== "wait") return; setT(6); const id = setInterval(() => setT((v) => { if (v <= 1) { clearInterval(id); setStage("notice"); return 0; } return v - 1; }), 1000); return () => clearInterval(id); }, [stage]);
  const tr = TRIGGERS[ti];
  if (stage === "trig") return <Ask sub="Choose a situation" q="Which of these feels most relatable?" options={TRIGGERS.map((x) => x.t)} onPick={(o) => { setTi(TRIGGERS.findIndex((x) => x.t === o)); setStage("first"); }} />;
  if (stage === "first") return <Ask sub={tr.t} q="Your first impulse is to…" options={["Defend myself", "Snap back", "Go quiet", "Reply right away"]} onPick={(o) => { setFirst(o); setStage("wait"); }} />;
  if (stage === "wait") return <Card><div className="mx-auto grid h-36 w-36 place-items-center rounded-full border-[8px] border-sage/60 font-serif text-2xl text-deep">{t}</div><p className="mt-4 text-center text-muted">Pause. You have not acted on “{first.toLowerCase()}” yet. Breathe out slowly.</p></Card>;
  if (stage === "notice") return <Ask q="What do you notice first?" options={["A thought", "A feeling", "A body sensation", "An urge"]} onPick={(o) => { setSeen(o); setStage("alt"); }} />;
  if (stage === "alt") return <Ask sub={`You noticed: ${seen.toLowerCase()}`} q="Now that you have paused, which response would you consider?" options={tr.alts.map((a) => a[0])} onPick={(o) => { setFb(tr.alts.find((a) => a[0] === o)![1]); setStage("fb"); setSeen(`${seen}|${o}`); }} />;
  return <Card><p>{fb}</p><p className="mt-2 text-sm text-muted">Your first impulse, “{first.toLowerCase()}”, is a normal human reaction. The pause is about having a choice, not about suppressing what you feel. No option here is the one right answer.</p>
    <div className="mt-4"><Button onClick={() => onFinish({ type, minutes: 1.5, detail: JSON.stringify({ first, seen }), summary: `You paused before acting on “${first.toLowerCase()}” and compared other responses.` })}>Finish</Button></div></Card>;
}

const THOUGHTS = [
  { t: "I should have said something different yesterday.", fact: false, labels: "memory or judgement", note: "The conversation happened, but “should have” is a judgement about it." },
  { t: "What if the meeting goes badly?", fact: false, labels: "worry", note: "It is a prediction. It may or may not happen." },
  { t: "I need to buy groceries after work.", fact: true, labels: "planning", note: "A plan is something you can check and act on." },
  { t: "The room is quiet right now.", fact: true, labels: "observation", note: "You can check this by listening." },
];
export function Labelling({ type, onFinish }: { type: string; onFinish: (r: Result) => void }) {
  const [i, setI] = useState(0); const [stage, setStage] = useState<"label" | "fact" | "fb">("label"); const [label, setLabel] = useState(""); const [kind, setKind] = useState(""); const [rec, setRec] = useState<string[]>([]);
  const th = THOUGHTS[i];
  if (stage === "label") return <Ask sub={`Thought ${i + 1} of ${THOUGHTS.length}`} q={`“${th.t}”`} options={["Memory", "Worry", "Planning", "Observation", "Judgement"]} onPick={(o) => { setLabel(o); setStage("fact"); }} />;
  if (stage === "fact") return <Ask sub={`You labelled it: ${label}`} q="Is this something you can check, or an interpretation?" options={["Something I can check", "An interpretation", "A bit of both"]} onPick={(o) => { setKind(o); setStage("fb"); }} />;
  return <Card><p className="label">Thought {i + 1} of {THOUGHTS.length}</p><p className="mt-2">People often call this {th.labels}. You chose <b className="font-medium text-deep">{label.toLowerCase()}</b>, and see it as: {kind.toLowerCase()}.</p><p className="mt-2 text-muted">{th.note}</p><p className="mt-2 text-sm text-muted">Neither answer is wrong. The point is noticing a thought as a thought.</p>
    <div className="mt-4"><Button onClick={() => { const r = [...rec, `${label}/${kind}`]; if (i + 1 >= THOUGHTS.length) onFinish({ type, minutes: 2, detail: r.join(","), summary: "You looked at four thoughts and separated what you can check from what is interpretation." }); else { setRec(r); setI(i + 1); setStage("label"); } }}>{i + 1 >= THOUGHTS.length ? "Finish" : "Next thought"}</Button></div></Card>;
}

type Interp = { t: string; f: string[]; u: string[]; r: [string, string][] };
const CHAINS: { s: string; interps: Interp[] }[] = [
  { s: "A colleague edits your work without asking.", interps: [
    { t: "They don't respect me.", f: ["Irritated", "Hurt"], u: ["Reply sharply", "Withdraw"], r: [["Reply sharply right away", "It may feel good now and harden the disagreement."], ["Pause, then ask why they did it", "Gives them room to explain."]] },
    { t: "They were trying to help.", f: ["Curious", "Slightly annoyed"], u: ["Ask why", "Let it go"], r: [["Ask what they changed and why", "You may learn something, and agree on how to work together."], ["Say thanks and ask to be told next time", "Keeps things light while setting a preference."]] },
    { t: "I may have made a mistake.", f: ["Worried", "Embarrassed"], u: ["Check my work", "Hide"], r: [["Review the changes calmly", "Replaces worry with information."], ["Avoid them for the day", "Relieves the feeling for a while but leaves the question open."]] }] },
  { s: "A friend has not replied to your message for two days.", interps: [
    { t: "They are ignoring me.", f: ["Hurt", "Angry"], u: ["Send an angry message", "Stop writing"], r: [["Send a sharp message", "May release tension but can cause a real rift."], ["Wait, then check in kindly", "Leaves room for the real reason."]] },
    { t: "They are probably busy.", f: ["Calm", "A little uncertain"], u: ["Wait", "Send a light follow-up"], r: [["Wait a few more days", "Avoids pressure and needs some patience."], ["Send a light follow-up", "Keeps contact open without blame."]] },
    { t: "I said something wrong.", f: ["Anxious", "Guilty"], u: ["Over-explain", "Replay it"], r: [["Re-read what you wrote before deciding", "Checks the worry against the actual words."], ["Send a long apology", "May add pressure for something that was not a problem."]] }] },
];
export function ReactionChain({ type, kind, onFinish }: { type: string; kind?: "experiment"; onFinish: (r: Result) => void }) {
  const [sc, setSc] = useState<number | null>(null); const [it, setIt] = useState<Interp | null>(null); const [feel, setFeel] = useState(""); const [urge, setUrge] = useState(""); const [resp, setResp] = useState<[string, string] | null>(null); const [explored, setExplored] = useState<string[]>([]);
  if (sc === null) return <Ask sub="Choose a situation" q="Which situation do you want to explore?" options={CHAINS.map((c) => c.s)} onPick={(o) => setSc(CHAINS.findIndex((c) => c.s === o))} />;
  const ch = CHAINS[sc], restart = () => { setIt(null); setFeel(""); setUrge(""); setResp(null); };
  if (!it) return <Ask sub={ch.s} q="How might you interpret it? The same event can be read in different ways." options={ch.interps.map((x) => x.t)} onPick={(o) => setIt(ch.interps.find((x) => x.t === o)!)} />;
  if (!feel) return <Ask sub={`Interpretation: ${it.t}`} q="What might you feel?" options={it.f} onPick={setFeel} />;
  if (!urge) return <Ask sub={`Feeling: ${feel}`} q="What urge might come with it?" options={it.u} onPick={setUrge} />;
  if (!resp) return <Ask sub={`Urge: ${urge}`} q="Which response would you choose?" options={it.r.map((x) => x[0])} onPick={(o) => setResp(it.r.find((x) => x[0] === o)!)} />;
  const done = Array.from(new Set([...explored, it.t]));
  return (
    <Card><p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">{[["Situation", ch.s], ["Interpretation", it.t], ["Feeling", feel], ["Urge", urge], ["Response", resp[0]]].map(([k, v], n) => <span key={k}><b className="font-medium text-deep">{k}:</b> {v} {n < 4 && <span className="text-gold">→</span>}</span>)}</p>
      <p className="mt-3">{resp[1]}</p><p className="mt-2 text-sm text-muted">A pause between the urge and the response is where another choice can fit. Your interpretation shaped the feeling and the urge.</p>
      {done.length > 1 && <p className="mt-2 text-sm">You have now explored {done.length} interpretations of the same situation. Notice how the chain changed.</p>}
      <div className="mt-4 flex flex-wrap gap-2"><Button variant="secondary" onClick={() => { setExplored(done); restart(); }}>Try a different interpretation</Button><Button onClick={() => onFinish({ type, kind, minutes: 2, detail: JSON.stringify({ explored: done }), summary: `You traced a reaction from situation to response and looked at ${done.length} interpretation${done.length > 1 ? "s" : ""}.` })}>Finish</Button></div></Card>
  );
}

export interface GuidedScenarioData { situation: string; thoughts: [string, string][]; body: string[]; emotions: string[]; actions: [string, string][] }
export function GuidedScenario({ s }: { s: GuidedScenarioData }) {
  const [sel, setSel] = useState<{ thought?: number; body?: string; emotion?: string; action?: number }>({});
  const n = Object.keys(sel).length;
  const Group = ({ title, items, value, set }: { title: string; items: string[]; value: string | number | undefined; set: (i: number) => void }) => (
    <div><p className="label">{title}</p><div role="group" aria-label={title} className="mt-2 flex flex-wrap gap-2">{items.map((x, i) => <button key={x} aria-pressed={value === i || value === x} onClick={() => set(i)} className="chip text-left">{x}</button>)}</div></div>);
  return (
    <div className="panel w-full space-y-5">
      <div><p className="label">What is this for?</p><p className="mt-1 text-sm text-muted">A scenario for observing a reaction. It is not a test: there is no correct answer. Try to separate what you might think, feel in your body, feel emotionally and do.</p></div>
      <h3 className="text-xl">{s.situation}</h3>
      <Group title="What might you think?" items={s.thoughts.map((t) => t[0])} value={sel.thought} set={(i) => setSel({ ...sel, thought: i })} />
      <Group title="What might you notice in your body?" items={s.body} value={sel.body} set={(i) => setSel({ ...sel, body: s.body[i] })} />
      <Group title="What emotion might be there?" items={s.emotions} value={sel.emotion} set={(i) => setSel({ ...sel, emotion: s.emotions[i] })} />
      <Group title="What might you do?" items={s.actions.map((a) => a[0])} value={sel.action} set={(i) => setSel({ ...sel, action: i })} />
      {n >= 2 && <div aria-live="polite" className="settle rounded-xl border border-gold/50 bg-gold/10 p-4 text-sm">
        <p className="label mb-1">What you could observe</p>
        {sel.thought !== undefined && <p>Thought: “{s.thoughts[sel.thought][0]}” This is an interpretation. {s.thoughts[sel.thought][1]}</p>}
        {(sel.body || sel.emotion) && <p className="mt-2">{[sel.body && `Body: ${sel.body.toLowerCase()}`, sel.emotion && `Emotion: ${sel.emotion.toLowerCase()}`].filter(Boolean).join(" · ")}. Noticing these before acting gives you information about what is happening.</p>}
        {sel.action !== undefined && <p className="mt-2">Action: {s.actions[sel.action][0].toLowerCase()}. {s.actions[sel.action][1]}</p>}
        <p className="mt-2 text-muted">Try a different thought and see how the feeling and next step might change. None of these reactions is bad.</p></div>}
      <div className="flex gap-2"><Button variant="secondary" onClick={() => setSel({})} disabled={n === 0}>Reset</Button><LinkButton href="/exercises/reaction-chain" variant="secondary">Trace it step by step in Reaction Chain</LinkButton></div>
    </div>
  );
}
