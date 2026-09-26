import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({ className, ...props }) {
  return (
    <Link
      href="/"
      aria-label="Ala Baganne, home"
      className={cn("font-display text-[1.875rem] font-semibold leading-none tracking-[0.01em] text-fg", className)}
      {...props}
    >
      B<span className="text-accent">.</span>Ala
    </Link>
  );
}

// The round "BA" mark, used where a small avatar fits better than the full logo.
export function LogoMark({ className }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-12 shrink-0 place-items-center rounded-full bg-canvas font-display text-base font-semibold tracking-[0.02em] text-fg ring-1 ring-line-strong",
        className,
      )}
    >
      BA
    </span>
  );
}
