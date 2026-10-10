"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Clock, Wind } from "lucide-react";
import Scene from "@/components/environment/Scene";
import Leaves from "@/components/environment/Leaves";
import NeedPicker from "@/components/needs/NeedPicker";
import Radar from "@/components/progress/Radar";
import { usePracticeData } from "@/hooks/usePracticeData";
import { repository } from "@/lib/repository";
import { indicators } from "@/lib/indicators";
import { START, type Dim } from "@/lib/content";
import { currentStreak, lastSevenDays } from "@/lib/stats";

const STATES = ["Calm", "Restless", "Focused", "Distracted", "Present"];

export default function Dashboard() {
  const { data, ready, refresh } = usePracticeData();
  const [greeting, setGreeting] = useState("Hello.");
  useEffect(() => { const h = new Date().getHours(); setGreeting(h < 12 ? "Good morning." : h < 18 ? "Good afternoon." : "Good evening."); }, []);
  const streak = currentStreak(data.sessions);
  const focus = (data.assessment && START[data.assessment.primary as Dim]) || { label: "Breathing Wave", href: "/breathing", sub: "5 min · All levels" };
  const hasData = data.sessions.length > 0 || data.reflections.length > 0;
  const name = data.profile.name;
  return (
    <main className="relative px-5 pb-16 pt-6 md:px-10 md:pt-8">
      <div className="mb-4 flex items-baseline gap-3"><span className="display text-3xl" lang="hi">प्रज्ञा</span><span className="h-1.5 w-1.5 rounded-full bg-gold/70" /><span className="hidden text-xs text-muted sm:inline">Understand the mind. Change the response.</span></div>

      <section className="settle relative h-[400px] overflow-hidden rounded-3xl border border-line/70 bg-gradient-to-b from-surface to-sage/10 md:h-[400px]">
        <div aria-hidden className="absolute inset-y-0 right-0 w-full md:w-[78%] [-webkit-mask-image:linear-gradient(to_right,transparent,black_45%)] [mask-image:linear-gradient(to_right,transparent,black_45%)]"><Scene /></div>
        <Leaves className="absolute -right-2 -top-4 h-56 w-40 rotate-12" />
        <div className="relative z-10 max-w-md p-7 md:p-10">
          <h1 className="text-5xl md:text-6xl">{greeting.replace(".", name ? `, ${name}.` : ".")}</h1>
          <p className="mt-2 text-muted">How is your mind today?</p>
          <Link href={focus.href} className="mt-7 inline-flex items-center gap-3 rounded-full border border-line bg-surface/90 py-2 pl-5 pr-2 text-sm text-deep">
            Continue your practice <span className="grid h-7 w-7 place-items-center rounded-full bg-pine text-[rgb(var(--pine-ink))]"><ArrowRight size={14} /></span></Link>
        </div>
      </section>

      <div className="relative z-10 -mt-12 grid gap-4 px-2 md:grid-cols-5 md:px-6">
        <figure className="panel !bg-surface md:col-span-3 md:self-end">
          <svg aria-hidden viewBox="0 0 60 40" className="mb-2 h-8 w-12"><g fill="none" stroke="rgb(var(--forest))" strokeWidth="1"><ellipse className="ripple" cx="30" cy="22" rx="22" ry="6" /><ellipse className="ripple" style={{ animationDelay: "2.5s" }} cx="30" cy="22" rx="22" ry="6" /></g><circle cx="30" cy="22" r="2.5" fill="rgb(var(--gold))" /></svg>
          <blockquote className="display text-2xl leading-snug">You cannot control every thought.<br />You can learn how to respond to them.</blockquote>
        </figure>
        <section aria-labelledby="today" className="btn btn-primary relative overflow-hidden rounded-2xl p-6 md:col-span-2">
          <Leaves className="absolute -bottom-6 -right-4 h-36 w-28 opacity-40 invert" />
          <p id="today" className="text-[11px] tracking-[.22em] uppercase opacity-70">Today&apos;s focus <span className="text-gold">·</span></p>
          <h2 className="mt-2 text-2xl !text-[rgb(var(--pine-ink))]">{focus.label}</h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm opacity-75"><Clock size={13} /> {focus.sub}</p>
          <Link href={focus.href} className="mt-5 btn border-gold bg-gold text-ink hover:brightness-105">Begin <ArrowRight size={14} /></Link>
        </section>
      </div>

      <section aria-labelledby="need" className="mx-2 mt-4 md:mx-6"><h2 id="need" className="mb-3 text-2xl">What do you need right now?</h2><NeedPicker /></section>

      <div className="mt-4 grid gap-4 px-2 md:grid-cols-3 md:px-6">
        <section className="panel" aria-labelledby="ind"><h2 id="ind" className="mb-2 text-lg">Practice indicators</h2>
          {hasData ? <Radar values={indicators(data)} /> : <p className="py-8 text-sm text-muted">Indicators appear as you practise. Nothing to solve right now.</p>}
        </section>
        <section className="panel" aria-labelledby="streak"><h2 id="streak" className="text-lg">Practice streak</h2>
          <p className="display mt-2 text-5xl">{streak}<span className="ml-2 font-sans text-sm text-muted">day{streak === 1 ? "" : "s"}</span></p>
          <p className="mt-1 text-sm text-muted">{ready && data.sessions.length === 0 ? "Your first practice is waiting." : "Keep going, gently."}</p>
          <ol className="mt-5 flex gap-2" aria-label="Last seven days">{lastSevenDays(data.sessions).map((d, i) => (
            <li key={i} className="text-center text-[10px] text-muted"><span className={`mb-1 block h-5 w-5 rounded-full border ${d.done ? "border-forest bg-forest" : "border-line"}`} /><span>{d.label}</span><span className="sr-only">{d.done ? " practised" : " no practice"}</span></li>))}</ol>
        </section>
        <section className="panel" aria-labelledby="mind"><h2 id="mind" className="text-lg">Mind state</h2>
          <p className="display mt-2 text-4xl">{data.mindState ? data.mindState.value : "—"}</p>
          <p className="mt-1 mb-4 text-sm text-muted">{data.mindState ? "How you noted it. A reflection, not a measurement." : "Notice how you are, then choose a word."}</p>
          <div className="flex flex-wrap gap-2">{STATES.map((s) => <button key={s} aria-pressed={data.mindState?.value === s} onClick={async () => { await repository.saveMindState(s); await refresh(); }}
            className="chip !px-3 !py-1 !text-xs">{s}</button>)}</div>
        </section>
      </div>

      <section className="panel mx-2 mt-4 flex items-center gap-6 md:mx-6" aria-labelledby="qa">
        <h2 id="qa" className="text-lg">Quick access</h2>
        <nav aria-label="Quick access" className="flex flex-wrap gap-x-6 gap-y-2">{[["/breathing","Breathing"],["/exercises/body-scan","Body Scan"],["/reflections","Journaling"],["/silence","Silence"]].map(([h, l]) => <Link key={h} href={h} className="chip gap-2"><Wind size={16} strokeWidth={1.3} className="text-forest" />{l}</Link>)}</nav>
      </section>
    </main>
  );
}
