import Link from "next/link";
import Leaves from "@/components/environment/Leaves";
import { LinkButton } from "@/components/ui/Button";
import BoxDiagram from "./BoxDiagram";
import { ARTICLES, getArticle, readingMinutes, type Article } from "@/lib/learn";

const H = ({ children }: { children: React.ReactNode }) => <h2 className="mt-12 border-t border-line/70 pt-6 text-2xl md:text-3xl">{children}</h2>;
const List = ({ items }: { items: string[] }) => <ul className="mt-3 space-y-2">{items.map((x) => <li key={x} className="flex gap-3"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" /><span>{x}</span></li>)}</ul>;

export default function ArticleView({ a, back }: { a: Article; back: { href: string; label: string } | null }) {
  const same = ARTICLES.filter((x) => x.category === a.category), i = same.findIndex((x) => x.slug === a.slug);
  const prev = same[i - 1], next = same[i + 1], related = a.related.map(getArticle).filter(Boolean) as Article[];
  const tail = back ? `?from=${encodeURIComponent(back.href)}` : "";
  return (
    <main className="relative overflow-hidden px-5 pb-24 pt-6 md:px-12">
      <Leaves className="absolute -top-2 right-2 h-44 w-28 rotate-12 opacity-60" />
      <article className="relative z-10 mx-auto max-w-2xl text-[17px] leading-relaxed">
        <div className="mb-6 flex flex-wrap gap-2"><LinkButton href={back ? back.href : "/learn"} variant="secondary">← Back to {back ? back.label : "Explore & Learn"}</LinkButton>{back && !back.href.startsWith("/learn") && <LinkButton href="/learn" variant="secondary">All guides</LinkButton>}</div>
        <header className="settle"><p className="label">{a.category} · {readingMinutes(a)} min read</p><h1 className="mt-2 text-4xl leading-tight md:text-5xl">{a.title}</h1><p className="mt-3 text-lg text-muted">{a.summary}</p></header>

        <H>What it means</H><p className="mt-3">{a.meaning}</p>
        {a.why && <><H>Why it may help</H><p className="mt-3">{a.why}</p></>}
        {a.when && <><H>When to use it</H><List items={a.when} /></>}
        <H>The technique</H>
        <ol className="mt-4 space-y-3">{a.steps.map((s, n) => <li key={s} className="flex gap-4"><span className="display grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/70 text-sm">{n + 1}</span><span className="pt-0.5">{s}</span></li>)}</ol>
        {a.diagram === "box" && <div className="mt-6"><BoxDiagram /></div>}
        {a.example && <><H>A realistic example</H><p className="panel mt-3 !p-5 italic">{a.example}</p></>}
        {a.mistakes && <><H>Common mistakes</H><List items={a.mistakes} /></>}
        {a.tips && <><H>Tips and variations</H><List items={a.tips} /></>}
        {a.safety && <aside aria-label="Comfort and safety" className="mt-10 rounded-2xl border border-gold/50 bg-gold/10 p-5 text-base"><p className="label mb-1">Comfort and safety</p>{a.safety}</aside>}

        <section aria-labelledby="try" className="mt-12 rounded-2xl border border-line bg-sage/20 p-6"><h2 id="try" className="text-2xl">Try it now</h2><p className="mt-2">{a.tryNow}</p><div className="mt-4"><LinkButton href={a.practice.href}>{a.practice.label}</LinkButton></div></section>
        <p className="display mt-10 border-l-2 border-gold pl-4 text-2xl leading-snug">{a.takeaway}</p>

        {related.length > 0 && <><H>Related guides</H><div className="mt-4 grid gap-3 sm:grid-cols-2">{related.map((r) => <Link key={r.slug} href={`/learn/${r.slug}${tail}`} className="panel panel-hover !p-5 text-base"><p className="label">{r.category} · {readingMinutes(r)} min</p><p className="mt-1 font-serif text-lg text-deep">{r.title}</p></Link>)}</div></>}
        <nav aria-label="More in this topic" className="mt-10 flex flex-wrap justify-between gap-3 border-t border-line/70 pt-6">
          {prev ? <LinkButton href={`/learn/${prev.slug}${tail}`} variant="secondary">← {prev.title}</LinkButton> : <span />}
          {next && <LinkButton href={`/learn/${next.slug}${tail}`} variant="secondary">{next.title} →</LinkButton>}
        </nav>
        <p className="mt-6 text-center"><Link href="/learn" className="text-sm text-muted underline">Back to the Knowledge Board</Link></p>
      </article>
    </main>
  );
}
