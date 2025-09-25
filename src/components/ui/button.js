import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  default:
    "bg-gradient-to-r from-[#7c5bff] via-[#6366f1] to-[#22d3ee] text-white shadow-[0_18px_40px_-20px_rgba(99,102,241,0.9)] hover:brightness-110",
  outline:
    "border border-white/15 bg-transparent text-slate-100 hover:bg-white/10 hover:border-white/30",
  ghost: "bg-transparent text-slate-300 hover:bg-white/10",
  subtle:
    "bg-white/10 text-white hover:bg-white/20",
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
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-60",
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
