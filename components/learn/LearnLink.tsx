import { BookOpen } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
/** Secondary link from a practice page to its guide. `from` lets the guide link back to where the reader came from. */
export default function LearnLink({ slug, from, label = "Learn the technique" }: { slug: string; from: string; label?: string }) {
  return <LinkButton href={`/learn/${slug}?from=${encodeURIComponent(from)}`} variant="secondary"><BookOpen size={15} strokeWidth={1.5} />{label}</LinkButton>;
}
