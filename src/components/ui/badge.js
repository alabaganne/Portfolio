import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "border border-transparent bg-[var(--accent-soft)] text-[var(--accent)]",
  outline: "border-[var(--border)] text-[var(--muted)]",
  subtle: "border-transparent bg-slate-100 text-[var(--foreground)]",
};

export const Badge = forwardRef(function Badge(
  { className, variant = "default", ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide",
        badgeVariants[variant] ?? badgeVariants.default,
        className,
      )}
      {...props}
    />
  );
});
