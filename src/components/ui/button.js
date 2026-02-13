import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  default:
    "bg-[var(--accent)] text-white shadow-sm transition hover:bg-[#1d4ed8] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
  outline:
    "border border-[var(--border)] bg-white text-[var(--foreground)] shadow-sm hover:border-[#94a3b8] hover:bg-slate-50",
  ghost: "bg-transparent text-[var(--foreground)] hover:bg-slate-100",
  subtle:
    "bg-[var(--accent-soft)] text-[var(--accent)] hover:bg-[#c7d2fe]",
};

const buttonSizes = {
  default: "h-11 px-6",
  sm: "h-9 px-4 text-sm",
  lg: "h-12 px-7 text-base",
};

export const Button = forwardRef(function Button(
  { className, variant = "default", size = "default", href, type, ...props },
  ref,
) {
  const Component = href ? "a" : "button";

  return (
    <Component
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60",
        buttonVariants[variant] ?? buttonVariants.default,
        buttonSizes[size] ?? buttonSizes.default,
        className,
      )}
      href={href}
      type={href ? undefined : type ?? "button"}
      {...props}
    />
  );
});
