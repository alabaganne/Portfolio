import { SmartLink } from "@/components/ui/smart-link";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-accent text-canvas hover:opacity-80",
  secondary: "bg-surface-2 text-fg hover:bg-line-strong",
};

const sizes = {
  sm: "min-h-10 px-5 text-sm",
  md: "min-h-12 px-6 text-base",
  lg: "min-h-14 px-6 text-lg",
};

export function Button({ href, variant = "primary", size = "md", className, children, ...props }) {
  const classes = cn(
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md pb-px font-display font-medium uppercase leading-none tracking-[1px] transition-[opacity,background-color,transform] duration-250 active:scale-[0.98] [&_svg]:size-4",
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
