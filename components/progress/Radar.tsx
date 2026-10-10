export default function Radar({ values }: { values: Record<string, number> }) {
  const keys = Object.keys(values), c = 130, R = 80;
  const pt = (i: number, v: number): [number, number] => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / keys.length; return [c + (R * v) / 100 * Math.cos(a), c + (R * v) / 100 * Math.sin(a)]; };
  const ring = (v: number) => keys.map((_, i) => pt(i, v).join(",")).join(" ");
  return (
    <svg viewBox="0 0 260 260" role="img" aria-label={"Practice indicators: " + keys.map((k) => `${k} ${values[k]}`).join(", ")} className="mx-auto w-full max-w-[260px]">
      {[33, 66, 100].map((v) => <polygon key={v} points={ring(v)} fill="none" stroke="rgb(var(--line))" />)}
      {keys.map((_, i) => <line key={i} x1={c} y1={c} x2={pt(i, 100)[0]} y2={pt(i, 100)[1]} stroke="rgb(var(--line))" />)}
      <polygon points={keys.map((k, i) => pt(i, values[k]).join(",")).join(" ")} fill="rgb(var(--forest))" fillOpacity=".35" stroke="rgb(var(--forest))" strokeWidth="1.5" />
      {keys.map((k, i) => { const [x, y] = pt(i, 128); return <text key={k} x={x} y={y} fontSize="10" textAnchor="middle" fill="rgb(var(--muted))">{k} {values[k]}</text>; })}
    </svg>
  );
}
