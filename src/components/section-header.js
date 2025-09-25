import { cn } from "@/lib/utils";

export function SectionHeader({ eyebrow, title, description, className }) {
  return (
    <div className={cn("space-y-4", className)}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className="max-w-2xl text-base text-slate-300">
          {description}
        </p>
      ) : null}
    </div>
  );
}
