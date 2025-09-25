import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Card = forwardRef(function Card({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "group/card relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm transition hover:shadow-md",
        className,
      )}
      {...props}
    />
  );
});

export const CardHeader = forwardRef(function CardHeader(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("mb-4 flex flex-col gap-2", className)}
      {...props}
    />
  );
});

export const CardTitle = forwardRef(function CardTitle(
  { className, ...props },
  ref,
) {
  return (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold tracking-tight text-[var(--foreground)]", className)}
      {...props}
    />
  );
});

export const CardDescription = forwardRef(function CardDescription(
  { className, ...props },
  ref,
) {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-[var(--muted)]", className)}
      {...props}
    />
  );
});

export const CardContent = forwardRef(function CardContent(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("mt-0 flex flex-col gap-4 text-sm text-[var(--muted)]", className)}
      {...props}
    />
  );
});

export const CardFooter = forwardRef(function CardFooter(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("mt-6 flex flex-wrap items-center gap-3", className)}
      {...props}
    />
  );
});
