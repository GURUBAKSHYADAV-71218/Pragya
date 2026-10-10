"use client";
import Page from "@/components/ui/Page";
import { LinkButton } from "@/components/ui/Button";
import { usePracticeData } from "@/hooks/usePracticeData";
import { TRAINING, stageStatus, stepHref } from "@/lib/training";

export default function TrainingPage() {
  const { data, ready } = usePracticeData();
  const all = ready && TRAINING.every((s) => stageStatus(data.training, s.id).complete);
  const firstOpen = TRAINING.findIndex((s) => !stageStatus(data.training, s.id).complete);
  return (
    <Page title="Your Path" subtitle="Four skills, each with a few different activities. Your progress is saved, and only steps you finish here count.">
      {all && <div className="panel mb-6 max-w-2xl"><h2 className="text-2xl">You have finished the path.</h2><p className="mt-1 text-sm text-muted">Keep practising what helped. Try Breathing or Silence, or read a guide.</p><div className="mt-4 flex flex-wrap gap-2"><LinkButton href="/breathing" variant="secondary">Breathing</LinkButton><LinkButton href="/silence" variant="secondary">Silence</LinkButton><LinkButton href="/learn" variant="secondary">Explore & Learn</LinkButton></div></div>}
      <ol className="relative ml-4 max-w-2xl space-y-4 border-l border-gold/50 pl-8">
        {TRAINING.map((st, i) => {
          const s = stageStatus(data.training, st.id); const rec = data.training?.[st.id] ?? {};
          return (
            <li key={st.id} className="relative">
              <span className={`absolute -left-[48px] grid h-8 w-8 place-items-center rounded-full border text-xs ${s.complete ? "border-forest bg-forest text-[rgb(var(--btn-ink))]" : i === firstOpen ? "border-gold bg-surface text-deep" : "border-line bg-surface text-muted"}`}>0{i + 1}</span>
              <div className="panel"><h2 className="text-2xl">{st.title}</h2><p className="text-sm text-muted">{st.skill}</p>
                <ul className="mt-3 divide-y divide-line/60 text-sm">{st.steps.map((p) => { const r = rec[p.id]; return <li key={p.id} className="flex items-center justify-between gap-3 py-2"><span>{p.title}<span className="block text-xs text-muted">{p.does}</span></span><span className={`shrink-0 text-xs ${r ? "text-forest" : "text-muted"}`}>{r ? (r.status === "done" ? "Done" : "Skipped") : p.id === s.nextStep?.id ? "Next" : ""}</span></li>; })}</ul>
                <div className="mt-4 flex flex-wrap items-center gap-3"><LinkButton href={stepHref(st.id, (s.nextStep ?? st.steps[0]).id)}>{s.complete ? "Review" : s.finished ? "Continue" : "Start"}</LinkButton><span className="text-xs text-muted">{s.finished} of {s.total} steps · {s.complete ? "Stage complete" : st.teachesNext}</span></div></div>
            </li>);
        })}
      </ol>
    </Page>
  );
}
