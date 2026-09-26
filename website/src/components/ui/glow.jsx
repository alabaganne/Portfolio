import { cn } from "@/lib/utils";

// Soft colour wash behind page headers.
export function Glow({ className }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] bg-[radial-gradient(45%_55%_at_82%_0%,rgba(91,140,255,0.16),transparent_70%),radial-gradient(35%_45%_at_8%_8%,rgba(168,120,255,0.08),transparent_70%)]",
        className,
      )}
    />
  );
}
