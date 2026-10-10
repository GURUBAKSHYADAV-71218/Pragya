import Link from "next/link";
import Scene from "@/components/environment/Scene";
import Leaves from "@/components/environment/Leaves";
import BrandMark from "@/components/ui/BrandMark";
import ThemeToggle from "@/components/ui/ThemeToggle";
import NeedPicker from "@/components/needs/NeedPicker";
import { LinkButton } from "@/components/ui/Button";
import { EXERCISES, exHref } from "@/lib/content";

const AREAS = [["Attention", "Learn to stay with one thing."], ["Reaction", "Create a pause before responding."], ["Focus", "Train the mind to stay steady."], ["Presence", "Return to what is here."]];
const STEPS = [["Understand", "Take a short assessment to find your starting point."], ["Practice", "Do small, interactive exercises, not just listen."], ["Observe", "See what your attention and reactions actually do."], ["Reflect", "Write what you noticed. It stays with you."], ["Improve", "Return to what needs attention, gently, over time."]];

export default function Landing() {
  return (
    <div className="relative overflow-hidden">
      <header className="relative z-20 mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5">
        <Link href="/" aria-label="PRAGYA home"><BrandMark /></Link>
        <nav aria-label="Account" className="flex items-center gap-2 sm:gap-3">
          <Link href="/login" className="btn btn-secondary !min-h-9 !px-4">Sign in</Link>
          <Link href="/signup" className="btn btn-primary !min-h-9 !px-4">Create account</Link>
          <ThemeToggle />
        </nav>
      </header>

      <section className="relative">
        <div className="relative z-10 mx-auto max-w-3xl px-6 pb-72 pt-14 text-center settle">
          <p className="label mb-5">An interactive mind-training platform</p>
          <h1 className="text-5xl leading-tight md:text-7xl">Understand the mind.<br />Change the response.</h1>
          <p className="mx-auto mt-6 max-w-md text-muted">An interactive space to train attention, awareness, focus and inner calm.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <LinkButton href="#start">Find a practice for right now</LinkButton>
            <LinkButton href="#explore" variant="secondary">Explore PRAGYA</LinkButton>
          </div>
          <p className="mt-4 text-sm text-muted">Or <Link href="/assessment" className="underline">take the starting assessment</Link> · <Link href="/exercises" className="underline">browse the exercises</Link>. No account needed.</p>
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-72"><Scene /></div>
        <Leaves className="absolute right-4 top-0 h-52 w-36 rotate-12" />
      </section>

      <section id="start" className="mx-auto max-w-3xl scroll-mt-6 px-6 pb-16 pt-4">
        <h2 className="mb-1 text-center text-3xl">What do you need right now?</h2>
        <p className="mx-auto mb-6 max-w-md text-center text-muted">Choose one. You will get a practice, the reason it fits, and what you will do.</p>
        <NeedPicker />
      </section>

      <section id="explore" className="mx-auto max-w-4xl scroll-mt-6 px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl">Most platforms ask you to listen.<br />PRAGYA asks you to notice.</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">Meditation content is something you consume. PRAGYA is something you do: small exercises where you watch your own attention, reactions and thoughts as they happen.</p>
        <dl className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-y-3 text-left text-sm">
          {[["Meditation", "Practice"], ["Attention", "Train"], ["Reaction", "Observe"], ["Reflection", "Understand"], ["Focus", "Strengthen"]].map(([a, b]) => (
            <div key={a} className="contents"><dt className="text-muted">{a}</dt><dd className="font-serif text-deep">→ {b}</dd></div>))}
        </dl>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="mb-8 text-center text-3xl">Four areas of training</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{AREAS.map(([t, d], i) => <div key={t} className="panel"><p className="label">0{i + 1}</p><h3 className="mt-1 text-xl">{t}</h3><p className="mt-1 text-sm text-muted">{d}</p></div>)}</div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="mb-2 text-center text-3xl">Real exercises, not videos</h2>
        <p className="mx-auto mb-8 max-w-md text-center text-muted">Try any of them as a guest.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{EXERCISES.map((e) => (
          <Link key={e.slug} href={exHref(e.slug)} className="panel panel-hover !p-5"><p className="label">{e.category} · {e.minutes} min</p><h3 className="mt-1 text-lg">{e.title}</h3><p className="mt-1 text-sm text-muted">{e.blurb}</p></Link>))}</div>
        <p className="mt-6 text-center text-sm text-muted">Also: <Link href="/breathing" className="underline">Breathing</Link>, <Link href="/silence" className="underline">Silence</Link> <Link href="/experiments" className="underline">mind experiments</Link> and <Link href="/learn" className="underline">guides to each technique</Link>.</p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20">
        <h2 className="mb-8 text-center text-3xl">How PRAGYA works</h2>
        <ol className="space-y-3">{STEPS.map(([t, d], i) => <li key={t} className="panel flex gap-4 !p-5"><span className="display text-2xl text-gold">{i + 1}</span><div><h3 className="text-lg">{t}</h3><p className="text-sm text-muted">{d}</p></div></li>)}</ol>
      </section>

      <section className="mx-auto max-w-2xl px-6 pb-24 text-center">
        <h2 className="text-3xl">Nothing to solve right now.</h2>
        <p className="mt-3 text-muted">Start with a few questions, or go straight to practice. As a guest, your practice is saved on this device only.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3"><LinkButton href="/assessment">Begin your journey</LinkButton><LinkButton href="/exercises" variant="secondary">Browse exercises</LinkButton></div>
      </section>

      <footer className="border-t border-line/70 px-6 py-8 text-center text-xs text-muted">
        <p>PRAGYA · Understand the mind. Change the response.</p>
        <p className="mt-1">A space for attention, awareness and reflection. Not medical or therapeutic advice.</p>
        <p className="mt-2"><Link href="/login" className="underline">Sign in</Link> · <Link href="/signup" className="underline">Create account</Link></p>
      </footer>
    </div>
  );
}
