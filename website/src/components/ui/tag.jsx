import { cn } from "@/lib/utils";

const sizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
};

export function Tag({ size = "sm", className, ...props }) {
  return (
    <span
      className={cn("inline-flex items-center rounded-md bg-surface-2 font-display font-medium text-fg", sizes[size], className)}
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
