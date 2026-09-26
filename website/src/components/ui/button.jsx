import { ArrowUpRight } from "lucide-react";

import { SmartLink } from "@/components/ui/smart-link";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-fg text-canvas hover:bg-white",
  secondary: "border border-line-strong text-fg hover:border-white/30 hover:bg-white/[0.04]",
  ghost: "text-fg-muted hover:text-fg",
};

const sizes = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

export function Button({ href, variant = "primary", size = "md", className, children, ...props }) {
  const classes = cn(
    "group/button inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-colors duration-300 [&_svg]:size-4",
    variants[variant] ?? variants.primary,
    sizes[size] ?? sizes.md,
    className,
  );

  if (href) {
    return (
      <SmartLink href={href} className={classes} {...props}>
        {children}
      </SmartLink>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

// Arrow that nudges up and right when its parent Button is hovered.
export function ButtonArrow({ className }) {
  return (
    <ArrowUpRight
      aria-hidden
      className={cn(
        "transition-transform duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5",
        className,
      )}
    />
  );
}
