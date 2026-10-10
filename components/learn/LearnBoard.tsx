"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ARTICLES, LEARN_CATEGORIES, readingMinutes } from "@/lib/learn";
import { Button } from "@/components/ui/Button";
import MiniLandscape from "@/components/ui/MiniLandscape";

export default function LearnBoard() {
  const [cat, setCat] = useState<string>("All"); const [q, setQ] = useState("");
  const list = useMemo(() => ARTICLES.filter((a) => (cat === "All" || a.category === cat) && `${a.title} ${a.summary} ${a.category}`.toLowerCase().includes(q.trim().toLowerCase())), [cat, q]);
  return (
    <div>
      <div className="mb-5 flex flex-col gap-4">
        <input type="search" aria-label="Search guides" placeholder="Search guides" value={q} onChange={(e) => setQ(e.target.value)} className="w-full max-w-md rounded-xl border border-line bg-surface/80 px-4 py-2.5 text-sm text-ink" />
        <div role="group" aria-label="Topic" className="flex flex-wrap gap-2">{["All", ...LEARN_CATEGORIES].map((c) => <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)} className="chip">{c}</button>)}</div>
      </div>
      {list.length === 0 ? (
        <div className="panel max-w-md"><h2 className="text-xl">Nothing matches that yet.</h2><p className="mt-1 text-sm text-muted">Try a different word or choose another topic.</p><Button variant="secondary" className="mt-4" onClick={() => { setQ(""); setCat("All"); }}>Show all guides</Button></div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((a, i) => (
          <Link key={a.slug} href={`/learn/${a.slug}`} className="panel-hover block overflow-hidden rounded-2xl border border-line/80 bg-surface/85">
            <MiniLandscape tone={i} />
            <div className="p-5"><p className="label">{a.category} · {readingMinutes(a)} min read</p><h2 className="mt-1 text-xl">{a.title}</h2><p className="mt-1 text-sm text-muted">{a.summary}</p></div>
          </Link>))}</div>)}
    </div>
  );
}
