"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Result } from "./Done";

const AREAS = [["Feet", "Notice contact, temperature or tingling."], ["Legs", "Notice weight, warmth or tightness."], ["Hips", "Notice where you are supported."], ["Belly", "Notice any movement as you breathe."], ["Chest", "Notice the rise and fall, or nothing at all."], ["Hands", "Notice temperature and the surface they touch."], ["Shoulders", "Notice whether they are lifted or loose."], ["Face", "Notice the jaw, eyes and forehead."]] as const;
function Body({ active }: { active: string }) {
  const f = (k: string) => ({ fill: active === k ? "rgb(var(--gold))" : "rgb(var(--sage))", fillOpacity: active === k ? 0.85 : 0.35, stroke: "rgb(var(--forest))", strokeOpacity: 0.4 });
  return (
    <svg viewBox="0 0 100 195" role="img" aria-label={`Body outline, ${active} highlighted`} className="mx-auto h-64">
      <circle cx="50" cy="18" r="12" {...f("Face")} /><path d="M26 44 Q50 36 74 44 L72 54 Q50 47 28 54Z" {...f("Shoulders")} />
      <rect x="32" y="56" width="36" height="26" rx="10" {...f("Chest")} /><rect x="34" y="84" width="32" height="22" rx="10" {...f("Belly")} /><rect x="32" y="108" width="36" height="16" rx="8" {...f("Hips")} />
      <g {...f("Hands")}><circle cx="20" cy="100" r="7" /><circle cx="80" cy="100" r="7" /></g>
      <g {...f("Legs")}><rect x="34" y="126" width="14" height="46" rx="6" /><rect x="52" y="126" width="14" height="46" rx="6" /></g>
      <g {...f("Feet")}><ellipse cx="41" cy="180" rx="10" ry="5" /><ellipse cx="59" cy="180" rx="10" ry="5" /></g>
    </svg>
  );
}
export default function BodyScan({ onFinish }: { onFinish: (r: Result) => void }) {
  const [i, setI] = useState(-1); const [visited, setVisited] = useState<number[]>([]); const [auto, setAuto] = useState(false);
  const go = (counted: boolean) => { const v = counted && !visited.includes(i) ? [...visited, i] : visited; setVisited(v); if (i + 1 >= AREAS.length) onFinish({ type: "body-scan", minutes: 2, completed: v.length >= 4, detail: `${v.length} of ${AREAS.length} areas`, summary: `You visited ${v.length} of ${AREAS.length} areas, at your own pace. Noticing nothing is a valid result.` }); else setI(i + 1); };
  useEffect(() => { if (!auto || i < 0) return; const id = setTimeout(() => go(true), 15000); return () => clearTimeout(id); }, [auto, i]); // eslint-disable-line react-hooks/exhaustive-deps
  if (i < 0) return <div className="panel max-w-xl"><p>We will move through eight body areas, one at a time. You decide when to move on, and you can skip any area.</p><p className="mt-2 text-sm text-muted">If focusing on the body feels uncomfortable, skip the area or stop. Nothing needs to change.</p><div className="mt-4"><Button onClick={() => setI(0)}>Begin</Button></div></div>;
  const [name, tip] = AREAS[i];
  return (
    <div className="panel w-full max-w-xl text-center"><p className="label">Area {i + 1} of {AREAS.length}</p><Body active={name} /><h2 className="mt-2 text-3xl">{name}</h2><p className="mt-1 text-muted">{tip}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">{i > 0 && <Button variant="secondary" onClick={() => setI(i - 1)}>Back</Button>}<Button onClick={() => go(true)}>{i + 1 >= AREAS.length ? "Finish" : "Next area"}</Button><Button variant="secondary" onClick={() => go(false)}>Skip this area</Button></div>
      <label className="mt-4 flex items-center justify-center gap-2 text-sm text-muted"><input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} className="accent-[rgb(var(--forest))]" /> Move on automatically after 15 seconds</label></div>
  );
}
