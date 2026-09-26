import { cn } from "@/lib/utils";

// Row of toggle pills. `options` is a list of { value, count? }.
export function FilterPills({ label, options, value, onChange, className }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} role="group" aria-label={label}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex h-9 items-center rounded-full border px-4 text-[13px] font-medium transition-colors duration-300",
              active ? "border-fg bg-fg text-canvas" : "border-line text-fg-muted hover:border-line-strong hover:text-fg",
            )}
          >
            {option.value}
            {option.count !== undefined ? <span className="ml-1.5 tabular-nums opacity-50">{option.count}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
