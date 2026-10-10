import Page from "@/components/ui/Page";
import LearnBoard from "@/components/learn/LearnBoard";
export const metadata = { title: "Explore & Learn — PRAGYA", description: "Practical guides to the techniques you practise in PRAGYA." };
export default function LearnPage() {
  return (
    <Page title="Explore & Learn" subtitle="Understand a technique, practise it, then bring it into daily life. Read freely, no account needed.">
      <LearnBoard />
    </Page>
  );
}
