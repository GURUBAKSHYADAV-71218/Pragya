import Page from "@/components/ui/Page";
import LearnLink from "@/components/learn/LearnLink";
import BreathingSession from "@/components/breathing/BreathingSession";
export const metadata = { title: "Breathing — PRAGYA" };
export default function BreathingPage() {
  return <Page title="Breathe" subtitle="Follow the rhythm. Return to the now." center><BreathingSession /><div className="mt-4"><LearnLink slug="choosing-a-breathing-rhythm" from="/breathing" label="Learn breathing techniques" /></div></Page>;
}
