import { cn } from "@/lib/utils";

export function SectionHeader({ eyebrow, title, description, className }) {
  return (
    <div className={cn("space-y-3", className)}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className="max-w-2xl text-base text-[var(--muted)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
