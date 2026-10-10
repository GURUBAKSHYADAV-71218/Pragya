export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export function validateEmail(e: string): string | null { const v = e.trim(); if (!v) return "Enter your email."; return EMAIL_RE.test(v) ? null : "Enter a valid email address."; }
export function validatePassword(p: string, mode: "login" | "signup"): string | null {
  if (!p) return "Enter your password.";
  if (mode === "signup" && p.length < 8) return "Use at least 8 characters.";
  return null;
}
/** Only same-site paths made of safe characters are accepted as navigation targets. */
export const isInternalPath = (p: unknown): p is string => typeof p === "string" && /^\/[a-zA-Z0-9\-_/]*$/.test(p) && !p.startsWith("//");
