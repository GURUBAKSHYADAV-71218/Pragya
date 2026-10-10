import Link from "next/link";
import type { ComponentProps } from "react";
type Variant = "primary" | "secondary" | "danger";
const cls = (v: Variant, extra?: string) => `btn btn-${v}${extra ? " " + extra : ""}`;
export function Button({ variant = "primary", loading = false, className, children, disabled, ...rest }: ComponentProps<"button"> & { variant?: Variant; loading?: boolean }) {
  return (
    <button type="button" {...rest} disabled={disabled || loading} aria-busy={loading || undefined} className={cls(variant, className)}>
      {loading && <span aria-hidden className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      {children}
    </button>
  );
}
export function LinkButton({ variant = "primary", className, ...rest }: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link {...rest} className={cls(variant, className)} />;
}
