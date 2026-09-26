import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function formatPostDate(date, month = "short") {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month,
    day: "numeric",
    year: "numeric",
  });
}

export function PostMeta({ items, className }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-fg-subtle", className)}>
      {items.filter(Boolean).map((item, index) => (
        <span key={`${item}-${index}`} className="inline-flex items-center gap-3">
          {index > 0 ? <span aria-hidden className="size-[5px] rounded-full bg-accent" /> : null}
          {item}
        </span>
      ))}
    </p>
  );
}

export function PostCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-surface transition-transform duration-300 ease-out-quart hover:-translate-y-1 active:scale-[0.99]"
    >
      <span className="relative block aspect-[16/10] overflow-hidden bg-surface">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            sizes="(min-width: 1400px) 600px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
          />
        ) : null}
      </span>
      <span className="flex flex-1 flex-col bg-[radial-gradient(circle,rgb(255_255_255/0.04),transparent)] p-5 md:p-6">
        <span className="block font-display text-2xl font-medium text-fg">{post.title}</span>
        <span className="mt-1 block font-display text-xl font-medium text-fg-subtle">
          {[post.category, formatPostDate(post.date)].filter(Boolean).join(", ")}
        </span>
        <span className="mt-4 line-clamp-2 text-base text-fg-muted">{post.description}</span>
      </span>
    </Link>
  );
}
