"use client";
import Link from "next/link";
import { useState } from "react";
import Page from "@/components/ui/Page";
import { Ask } from "@/components/exercises/ChoiceFlows";
import { DIMS, QUESTIONS, START, type Dim } from "@/lib/content";
import { usePracticeData } from "@/hooks/usePracticeData";
import { repository } from "@/lib/repository";

const zero = () => Object.fromEntries(DIMS.map((d) => [d, 0])) as Record<string, number>;
export default function AssessmentPage() {
  const { data, ready, refresh } = usePracticeData();
  const [i, setI] = useState(0); const [scores, setScores] = useState(zero()); const [retake, setRetake] = useState(false);
  const a = data.assessment; const showResult = ready && a && !retake;
  const pick = async (label: string) => {
    const dim = QUESTIONS[i].options.find((o) => o[0] === label)![1]; const s = { ...scores, [dim]: scores[dim] + 1 };
    if (i + 1 < QUESTIONS.length) { setScores(s); setI(i + 1); return; }
    const r = DIMS.slice().sort((x, y) => s[y] - s[x]);
    await repository.saveAssessment({ primary: r[0], secondary: r[1], scores: s }); await refresh(); setRetake(false); setI(0); setScores(zero());
  };
  return (
    <Page title="Your starting practice profile" subtitle="Eight questions. There are no right answers.">
      {!ready ? <p className="text-muted">Loading…</p> : showResult ? (
        <div className="panel settle max-w-xl"><p className="label">Your current practice areas</p>
          <h2 className="mt-2 text-3xl">Primary focus: {a.primary}</h2><p className="mt-1 text-muted">Secondary: {a.secondary}</p>
          <p className="mt-4">Suggested practice: <b className="font-medium text-deep">{START[a.primary as Dim].label}</b> · {START[a.primary as Dim].sub}</p>
          <p className="mt-2 text-xs text-muted">Practice indicators drawn from your answers. Not a diagnosis.</p>
          <div className="mt-5 flex gap-3"><Link href={START[a.primary as Dim].href} className="btn btn-primary">Start</Link><button onClick={() => { setRetake(true); setI(0); }} className="btn btn-secondary">Retake</button></div></div>
      ) : <><div className="mb-3 h-1 max-w-xl rounded bg-line"><div className="h-1 rounded bg-gold transition-all duration-700" style={{ width: `${(i / QUESTIONS.length) * 100}%` }} /></div>
        <Ask sub={`${i + 1} of ${QUESTIONS.length}`} q={QUESTIONS[i].q} options={QUESTIONS[i].options.map((o) => o[0])} onPick={pick} /></>}
    </Page>
  );
}
