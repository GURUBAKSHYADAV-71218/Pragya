import Scene from "@/components/environment/Scene";
import Leaves from "@/components/environment/Leaves";
import { LinkButton } from "@/components/ui/Button";
export default function Page({ title, subtitle, children, variant, back, center }: { title: string; subtitle?: string; children: React.ReactNode; variant?: "rocks"; back?: { href: string; label: string }; center?: boolean }) {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 pb-72 pt-6 md:px-12">
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {back && <div className="mb-6"><LinkButton href={back.href} variant="secondary">← {back.label}</LinkButton></div>}
        <header className={`settle mb-8 max-w-2xl ${center ? "mx-auto text-center" : ""}`}><h1 className="text-4xl md:text-5xl">{title}</h1>{subtitle && <p className="mt-2 text-muted">{subtitle}</p>}</header>
        <div className={center ? "mx-auto flex w-full flex-col items-center" : ""}>{children}</div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-72 opacity-80"><Scene variant={variant} /></div>
      <Leaves className="absolute -top-2 right-2 h-48 w-32 rotate-12 opacity-70" />
    </main>
  );
}
