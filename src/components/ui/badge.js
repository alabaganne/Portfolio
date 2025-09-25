import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  default:
    "border-transparent bg-gradient-to-r from-[#5f5be0]/40 to-[#3fb6f1]/30 text-sky-100 backdrop-blur", 
  outline: "border-white/20 text-slate-200",
  subtle: "border-transparent bg-white/5 text-slate-200",
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
