import { cn } from "@/lib/utils";

export function Tag({ className, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-white/[0.02] px-2.5 py-1 text-xs font-medium text-fg-muted",
        className,
      )}
      {...props}
    />
  );
}

export function TagList({ items, className }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
