export default function MiniLandscape({ tone = 0 }: { tone?: number }) {
  const sh = [[20, 60, 55, 35, 90, 62, 130, 50], [10, 55, 50, 30, 100, 58, 140, 46], [0, 62, 40, 42, 85, 54, 120, 60]][tone % 3];
  return (
    <svg aria-hidden viewBox="0 0 140 70" preserveAspectRatio="none" className="h-20 w-full rounded-t-xl bg-gradient-to-b from-sage/25 to-surface">
      <circle cx="105" cy="22" r="7" fill="rgb(var(--gold))" opacity=".4" />
      <path d={`M0 70 L0 ${sh[1]} L${sh[0]} ${sh[1] - 12} L${sh[2]} ${sh[3]} L${sh[4]} ${sh[5] - 4} L${sh[6]} ${sh[7]} L140 ${sh[7] + 6} L140 70Z`} fill="rgb(var(--sage))" opacity=".5" />
      <path d="M0 70 L0 60 Q50 50 140 62 L140 70Z" fill="rgb(var(--forest))" opacity=".25" />
    </svg>
  );
}
