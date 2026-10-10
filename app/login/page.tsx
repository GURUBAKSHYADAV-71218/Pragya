import AuthForm from "@/components/layout/AuthForm";
import Scene from "@/components/environment/Scene";
export const metadata = { title: "login — PRAGYA" };
export default function Page() {
  return <main className="relative grid min-h-screen place-items-center overflow-hidden px-5"><div aria-hidden className="absolute inset-x-0 bottom-0 h-72"><Scene /></div><div className="relative z-10 w-full max-w-sm"><AuthForm mode="login" /></div></main>;
}
