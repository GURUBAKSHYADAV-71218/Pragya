/** A single botanical branch used as a quiet corner detail. */
export default function Leaves({ className = "" }: { className?: string }) {
  const L = [[40,150,-35],[70,115,-20],[100,85,-10],[40,100,35],[75,65,30],[105,40,25]];
  return (
    <svg aria-hidden viewBox="0 0 140 200" className={`sway pointer-events-none ${className}`}>
      <path d="M20 200 C40 150 70 90 115 10" fill="none" stroke="rgb(var(--forest))" strokeWidth="1.5" opacity=".55" />
      {L.map(([x,y,r],i) => <ellipse key={i} cx={x} cy={y} rx="9" ry="24" transform={`rotate(${r} ${x} ${y})`} fill="rgb(var(--forest))" opacity={i % 2 ? .3 : .45} />)}
    </svg>
  );
}
