import { cn } from "@/lib/utils";

export function SectionHeader({ eyebrow, title, description, dark = false, centered = false, className }) {
  const label = typeof eyebrow === "string" ? eyebrow.replace(/^\d+\s*·\s*/, "") : eyebrow;

  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        centered && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.14em]",
            dark ? "text-blue-300" : "text-blue-600",
            centered &&
              "before:h-px before:w-7 before:bg-current after:h-px after:w-7 after:bg-current",
            !centered && "before:h-px before:w-6 before:bg-current",
          )}
        >
          {label}
        </span>
      ) : null}
      {title ? (
        <h2
          className={cn(
            "font-display text-3xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl",
            dark ? "text-white" : "text-slate-950",
          )}
        >
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className={cn("text-base leading-7 md:text-lg", dark ? "text-slate-300" : "text-slate-500")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
