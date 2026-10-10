/** PRAGYA emblem, simplified: aware figure, lotus, leaf, golden sun, water ripple and ring. Uses theme colours. */
export function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 64 64" fill="none" className="shrink-0">
      <circle cx="32" cy="32" r="29.5" stroke="rgb(var(--gold))" strokeWidth="1.5" />
      <path d="M13 45c-5-10 0-23 12-30 1 12-3 23-12 30Z" fill="rgb(var(--forest))" opacity=".85" />
      <circle cx="32" cy="14.5" r="5.5" fill="rgb(var(--gold))" />
      <circle cx="32" cy="24.5" r="3" fill="rgb(var(--forest))" />
      <path d="M32 29.5c-5 2-5 7.5 0 9s5 6.5 0 8.5" stroke="rgb(var(--forest))" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 51c-8-1-12-6-13-11 6 1 11 4 13 11Zm0 0c8-1 12-6 13-11-6 1-11 4-13 11Z" fill="rgb(var(--sage))" stroke="rgb(var(--gold))" strokeWidth=".8" />
      <path d="M32 51c-3-4-3-8 0-11 3 3 3 7 0 11Z" fill="rgb(var(--surface))" stroke="rgb(var(--gold))" strokeWidth=".8" />
      <path d="M17 53.5c6 2 24 2 30 0" stroke="rgb(var(--gold))" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
export default function BrandMark({ stacked = false }: { stacked?: boolean }) {
  return (
    <span className={`inline-flex items-center ${stacked ? "flex-col gap-1.5" : "gap-3"}`}>
      <Mark size={stacked ? 44 : 30} />
      <span className="font-serif text-lg tracking-[.35em] text-deep">PRAGYA</span>
    </span>
  );
}
