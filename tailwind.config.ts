import type { Config } from "tailwindcss";
const v = (n: string) => `rgb(var(--${n}) / <alpha-value>)`;
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { bg: v("bg"), surface: v("surface"), sage: v("sage"), forest: v("forest"), deep: v("deep"), gold: v("gold"), ink: v("ink"), muted: v("muted"), line: v("line") },
    fontFamily: { serif: ["Iowan Old Style", "Palatino Linotype", "Georgia", "serif"], sans: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"] },
  } },
  plugins: [],
};
export default config;
