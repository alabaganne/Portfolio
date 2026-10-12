import { cn } from "@/lib/utils";

// A list with small yellow dots, for case study and job details.
export function BulletList({ items, className }) {
  return (
    <ul className={cn("grid gap-4", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3.5 text-body text-fg-muted">
          <span aria-hidden className="mt-[0.7em] size-[5px] shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
