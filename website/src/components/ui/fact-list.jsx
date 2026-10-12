import { ArrowUpRight } from "lucide-react";

import { SmartLink } from "@/components/ui/smart-link";
import { cn } from "@/lib/utils";

// Label/value pairs: a grid of small facts, or one line of them with `inline`.
// An item with an `href` links its value.
export function FactList({ items, inline = false, className, ...props }) {
  return (
    <dl className={cn(inline ? "flex flex-wrap gap-x-8 gap-y-2 text-base" : "grid", className)} {...props}>
      {items.map(({ label, value, href }) => (
        <div key={label} className={inline ? "flex gap-2" : undefined}>
          <dt className={inline ? "text-fg-subtle" : "text-base text-fg-subtle"}>{label}</dt>
          <dd className={inline ? "text-fg" : "mt-1 font-display text-heading-xs text-fg"}>
            {href ? (
              <SmartLink href={href} className="group/link transition-opacity duration-250 hover:opacity-80">
                {/* The arrow stays on the line of the last word. */}
                {value.slice(0, value.lastIndexOf(" ") + 1)}
                <span className="whitespace-nowrap">
                  {value.slice(value.lastIndexOf(" ") + 1)}
                  <ArrowUpRight
                    aria-hidden
                    className="ml-1 inline size-[0.9em] align-[-0.1em] transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  />
                </span>
              </SmartLink>
            ) : (
              value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
