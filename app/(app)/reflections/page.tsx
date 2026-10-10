"use client";
import { useState } from "react";
import Page from "@/components/ui/Page";
import LearnLink from "@/components/learn/LearnLink";
import { Button } from "@/components/ui/Button";
import Status from "@/components/ui/Status";
import { usePracticeData } from "@/hooks/usePracticeData";
import { repository } from "@/lib/repository";
import { REFLECTION_CATEGORIES } from "@/types";

export default function ReflectionsPage() {
  const { data, ready, refresh } = usePracticeData();
  const [title, setTitle] = useState(""); const [text, setText] = useState(""); const [cat, setCat] = useState<string>("General"); const [edit, setEdit] = useState<string | null>(null);
  const [q, setQ] = useState(""); const [f, setF] = useState("All"); const [busy, setBusy] = useState(false); const [msg, setMsg] = useState(""); const [err, setErr] = useState(""); const [confirmId, setConfirmId] = useState<string | null>(null);
  const reset = () => { setTitle(""); setText(""); setCat("General"); setEdit(null); };
  const save = async () => {
    if (!text.trim()) { setErr("Write a few words before saving."); setMsg(""); return; }
    setBusy(true); setErr(""); setMsg("");
    try { const r = { title: title.trim(), text: text.trim(), category: cat }; if (edit) await repository.updateReflection(edit, r); else await repository.addReflection(r); await refresh(); setMsg(edit ? "Reflection updated." : "Reflection saved."); reset(); }
    catch { setErr("Could not save your reflection. Nothing was lost; please try again."); }
    setBusy(false);
  };
  const remove = async (id: string) => { try { await repository.deleteReflection(id); await refresh(); setMsg("Reflection deleted."); setErr(""); if (edit === id) reset(); } catch { setErr("Could not delete that reflection."); } setConfirmId(null); };
  const list = data.reflections.filter((r) => (f === "All" || r.category === f) && `${r.title} ${r.text}`.toLowerCase().includes(q.toLowerCase())).sort((a, b) => b.at - a.at);
  const field = "mt-1 w-full rounded-xl border border-line bg-bg/60 p-3 text-ink";
  return (
    <Page title="Reflections" subtitle="Write. Observe. Understand.">
      <div className="mb-5"><LearnLink slug="reflection-prompts-after-practice" from="/reflections" label="Reflection prompts" /></div>
      <div className="grid gap-6 lg:grid-cols-5">
        <section className="panel lg:col-span-2" aria-label="Write a reflection">
          <label className="block text-sm text-muted">Title (optional)<input value={title} onChange={(e) => setTitle(e.target.value)} className={field} /></label>
          <label className="mt-3 block text-sm text-muted">What did you notice?<textarea value={text} onChange={(e) => { setText(e.target.value); if (err) setErr(""); }} rows={5} className={field} aria-invalid={!!err && !text.trim()} /></label>
          <label className="mt-3 block text-sm text-muted">Category<select value={cat} onChange={(e) => setCat(e.target.value)} className={field}>{REFLECTION_CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></label>
          <div className="mt-4 flex flex-wrap gap-3"><Button onClick={save} loading={busy}>{edit ? "Update entry" : "Save entry"}</Button>{edit && <Button variant="secondary" onClick={reset}>Cancel</Button>}</div>
          <div className="mt-3"><Status message={err || msg} tone={err ? "error" : "success"} /></div>
        </section>
        <section className="lg:col-span-3" aria-label="Entries">
          <div className="mb-4 flex flex-wrap gap-3"><input aria-label="Search reflections" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} className="rounded-xl border border-line bg-surface/80 px-3 py-2 text-sm" />
            <select aria-label="Filter by category" value={f} onChange={(e) => setF(e.target.value)} className="rounded-xl border border-line bg-surface/80 px-3 py-2 text-sm"><option>All</option>{REFLECTION_CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></div>
          {!ready ? <p className="text-muted">Loading…</p> : list.length === 0 ? <div className="panel"><h2 className="text-xl">Your first reflection is waiting.</h2><p className="mt-1 text-sm text-muted">{data.reflections.length ? "Nothing matches your search." : "Write a few lines to begin."}</p></div> : (
            <ul className="space-y-3">{list.map((r) => { const d = new Date(r.at); return (
              <li key={r.id} className="panel flex gap-4 !p-5"><div className="w-10 shrink-0 text-center"><p className="display text-2xl">{d.getDate()}</p><p className="label !tracking-normal">{d.toLocaleString("en", { month: "short" })}</p></div>
                <div className="min-w-0 flex-1"><p className="label">{r.category}</p>{r.title && <h2 className="text-lg">{r.title}</h2>}<p className="mt-1 whitespace-pre-wrap break-words text-sm">{r.text}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {confirmId === r.id ? <><Button variant="danger" className="!min-h-8 !px-3" onClick={() => remove(r.id)}>Confirm delete</Button><Button variant="secondary" className="!min-h-8 !px-3" onClick={() => setConfirmId(null)}>Cancel</Button></> :
                      <><Button variant="secondary" className="!min-h-8 !px-3" onClick={() => { setEdit(r.id); setTitle(r.title); setText(r.text); setCat(r.category); setMsg(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Edit</Button><Button variant="danger" className="!min-h-8 !px-3" onClick={() => setConfirmId(r.id)}>Delete</Button></>}
                  </div></div></li>); })}</ul>)}
        </section>
      </div>
    </Page>
  );
}
