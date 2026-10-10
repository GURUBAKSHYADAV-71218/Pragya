"use client";
import Scene from "@/components/environment/Scene";
import Leaves from "@/components/environment/Leaves";
import Radar from "@/components/progress/Radar";
import { usePracticeData } from "@/hooks/usePracticeData";
import { indicators } from "@/lib/indicators";
const ELEMENT: Record<string, string> = { Awareness: "light", Calmness: "water", Focus: "mountain", Patience: "stone", Discipline: "path", Presence: "breath" };
export default function MentalLandscape() {
  const { data } = usePracticeData(); const v = indicators(data);
  return (
    <main className="relative min-h-screen overflow-hidden px-5 pb-20 pt-10 md:px-12">
      <div className="absolute inset-x-0 bottom-0 h-[70vh]" aria-hidden><Scene /></div><Leaves className="absolute right-4 top-2 h-52 w-36 rotate-12" />
      <header className="settle relative z-10 mb-6"><h1 className="text-4xl md:text-5xl">Your Mental Landscape</h1><p className="mt-2 max-w-md text-muted">Six practice indicators, drawn from what you have practised. An environment, not a score.</p></header>
      <div className="relative z-10 grid max-w-4xl items-center gap-6 rounded-3xl border border-line/70 bg-surface/70 p-6 md:grid-cols-2">
        <Radar values={v} />
        <ul className="space-y-3">{Object.entries(v).map(([k, n]) => <li key={k}><div className="flex justify-between text-sm"><span className="text-deep">{k} <span className="text-muted">· {ELEMENT[k]}</span></span><span className="text-muted">{n}</span></div><div className="mt-1 h-1 rounded bg-line"><div className="h-1 rounded bg-forest transition-all duration-1000" style={{ width: `${n}%` }} /></div></li>)}</ul>
        {data.sessions.length === 0 && <p className="text-sm text-muted md:col-span-2">The landscape grows as you practise. Nothing to solve right now.</p>}
      </div>
    </main>
  );
}
