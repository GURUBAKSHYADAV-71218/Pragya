import { EXPLAIN } from "@/lib/explain";
export default function ExerciseIntro({ slug }: { slug: string }) {
  const x = EXPLAIN[slug]; if (!x) return null;
  return (
    <section className="panel mb-6 max-w-xl" aria-label="About this practice">
      <p className="label">Why this practice?</p><p className="mt-1 text-sm">{x.why}</p>
      <p className="label mt-3">What will I do?</p><p className="mt-1 text-sm">{x.what}</p>
      <details className="mt-3 text-sm"><summary className="cursor-pointer text-deep">Why it works and what to notice</summary>
        <p className="label mt-3">Why does this step matter?</p><p className="mt-1">{x.matters}</p>
        <p className="label mt-3">What should I notice?</p><p className="mt-1">{x.notice}</p>
        <p className="mt-3 text-xs text-muted">This may help, but it will not work the same way for everyone.</p></details>
    </section>
  );
}
