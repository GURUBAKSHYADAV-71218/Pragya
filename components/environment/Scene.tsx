/** Misty mountains, sun, still water and a far shore. One art direction, reused across pages. */
export default function Scene({ className = "", variant }: { className?: string; variant?: "rocks" }) {
  return (
    <svg aria-hidden viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax slice" className={`pointer-events-none h-full w-full ${className}`}>
      <defs>
        <filter id="soft"><feGaussianBlur stdDeviation="1.6" /></filter>
        <radialGradient id="sun"><stop offset="0" stopColor="rgb(var(--gold))" stopOpacity=".55" /><stop offset="1" stopColor="rgb(var(--gold))" stopOpacity="0" /></radialGradient>
        <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgb(var(--surface))" stopOpacity="0" /><stop offset="1" stopColor="rgb(var(--surface))" stopOpacity=".9" /></linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgb(var(--sage))" stopOpacity=".28" /><stop offset="1" stopColor="rgb(var(--sage))" stopOpacity=".08" /></linearGradient>
      </defs>
      <g className="drift2" fill="rgb(var(--surface))" opacity=".55"><ellipse cx="300" cy="90" rx="90" ry="14" /><ellipse cx="360" cy="80" rx="60" ry="11" /><ellipse cx="980" cy="60" rx="80" ry="12" /></g><circle cx="760" cy="150" r="110" fill="url(#sun)" /><circle cx="760" cy="150" r="26" fill="rgb(var(--gold))" opacity=".5" />
      <path className="drift" d="M-60 250 L120 150 L240 215 L400 100 L560 230 L700 160 L860 240 L1000 130 L1260 250 L1260 300 L-60 300Z" fill="rgb(var(--sage))" opacity=".26" />
      <g filter="url(#soft)">
        <path d="M-60 280 L160 195 L320 260 L520 175 L700 270 L920 200 L1260 280 L1260 320 L-60 320Z" fill="rgb(var(--forest))" opacity=".2" />
      </g>
      <rect y="210" width="1200" height="110" fill="url(#haze)" />
      <path d="M0 318 Q150 300 300 316 T520 318 V330 H0Z" fill="rgb(var(--forest))" opacity=".35" />
      <g fill="rgb(var(--forest))" opacity=".3"><ellipse cx="60" cy="298" rx="22" ry="30" /><ellipse cx="105" cy="305" rx="16" ry="22" /><ellipse cx="250" cy="308" rx="14" ry="18" /></g>
      <rect y="320" width="1200" height="100" fill="url(#water)" />
      <g fill="none" stroke="rgb(var(--surface))" strokeWidth="1.5" opacity=".7"><path d="M120 345 H320 M420 360 H700 M800 342 H1040 M200 385 H520" /></g>
      <g fill="none" stroke="rgb(var(--forest))" strokeWidth="1.6" opacity=".4"><ellipse className="ripple" cx="860" cy="372" rx="60" ry="10" /><ellipse className="ripple" style={{ animationDelay: "3s" }} cx="860" cy="372" rx="60" ry="10" /></g>
      <g fill="none" stroke="rgb(var(--ink))" strokeWidth="1.2" opacity=".35"><path d="M520 90 q5 -5 10 0 q5 -5 10 0" /><path d="M560 112 q4 -4 8 0 q4 -4 8 0" /></g>
      {variant === "rocks" && (<g><g fill="none" stroke="rgb(var(--surface))" strokeWidth="1.5" opacity=".8"><path d="M700 380 Q850 360 1000 380 M720 395 Q860 372 1010 395 M740 410 Q870 385 1020 410" /></g><g fill="rgb(var(--ink))"><ellipse cx="900" cy="372" rx="70" ry="38" opacity=".28" /><ellipse cx="985" cy="388" rx="42" ry="22" opacity=".22" /><ellipse cx="820" cy="392" rx="30" ry="16" opacity=".2" /></g></g>)}
    </svg>
  );
}
