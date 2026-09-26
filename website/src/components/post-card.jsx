import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
    <p className={cn("flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-fg-subtle", className)}>
      {items.filter(Boolean).map((item, index) => (
        <span key={`${item}-${index}`} className="inline-flex items-center gap-2.5">
          {index > 0 ? <span aria-hidden className="size-1 rounded-full bg-current opacity-60" /> : null}
          {item}
        </span>
      ))}
    </p>
  );
}

function PostImage({ post, sizes, priority, className }) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-surface", className)}>
      {post.coverImage ? (
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04]"
        />
      ) : null}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10" />
    </div>
  );
}

export function PostCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
      <PostImage post={post} className="aspect-[16/10]" sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw" />
      <PostMeta className="mt-6" items={[post.category, formatPostDate(post.date)]} />
      <h3 className="mt-3 text-xl font-medium leading-snug tracking-[-0.02em] text-fg transition-colors group-hover:text-fg-muted">
        {post.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-fg-muted">{post.description}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-fg">
        Read post
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}

export function FeaturedPostCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group grid items-center gap-8 md:grid-cols-12 md:gap-8">
      <PostImage
        post={post}
        className="aspect-[16/10] md:col-span-7"
        sizes="(min-width: 1240px) 680px, (min-width: 768px) 58vw, 100vw"
        priority
      />
      <div className="md:col-span-5 md:pl-4">
        <PostMeta items={[post.category, formatPostDate(post.date), post.readTime]} />
        <h2 className="mt-4 text-balance text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] font-medium leading-[1.08] tracking-[-0.035em] text-fg transition-colors group-hover:text-fg-muted">
          {post.title}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-fg-muted">{post.description}</p>
        <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-fg">
          Read the post
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
