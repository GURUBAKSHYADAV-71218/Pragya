import { AlertCircle, Check } from "lucide-react";
/** Inline status message. The live region is always mounted so screen readers announce changes. */
export default function Status({ message, tone = "success" }: { message: string; tone?: "success" | "error" }) {
  return (
    <div role={tone === "error" ? "alert" : "status"} aria-live="polite" className="min-h-6">
      {message && <span className={`settle inline-flex items-center gap-1.5 text-sm ${tone === "error" ? "text-[#9a4a3a]" : "text-forest"}`}>{tone === "error" ? <AlertCircle size={15} /> : <Check size={15} />}{message}</span>}
    </div>
  );
}
