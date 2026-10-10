export default function BoxDiagram() {
  const t = { fill: "rgb(var(--muted))", fontSize: 11, textAnchor: "middle" as const };
  return (
    <figure className="panel !p-5"><svg viewBox="0 0 220 190" role="img" aria-label="Box breathing: inhale, hold, exhale, hold, each for four counts" className="mx-auto w-full max-w-[240px]">
      <rect x="55" y="40" width="110" height="110" rx="10" fill="rgb(var(--sage))" fillOpacity=".15" stroke="rgb(var(--forest))" strokeWidth="1.5" />
      <path d="M55 40 H165" stroke="rgb(var(--gold))" strokeWidth="2.5" /><circle cx="55" cy="40" r="4" fill="rgb(var(--gold))" />
      <text x="110" y="28" {...t}>Inhale · 4</text><text x="190" y="98" {...t} transform="rotate(90 190 98)">Hold · 4</text>
      <text x="110" y="172" {...t}>Exhale · 4</text><text x="30" y="98" {...t} transform="rotate(-90 30 98)">Hold · 4</text>
    </svg><figcaption className="mt-2 text-center text-xs text-muted">Trace the square: each side is one phase of four counts.</figcaption></figure>
  );
}
