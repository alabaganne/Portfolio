"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function MetaDots({ items }) {
  return (
    <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">
      {items.filter(Boolean).map((item, index) => (
        <span key={`${item}-${index}`} className="inline-flex items-center gap-2">
          {index > 0 && <span className="h-1 w-1 rounded-full bg-current opacity-40" aria-hidden />}
          {item}
        </span>
      ))}
    </div>
  );
}

function FeaturedPost({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid overflow-hidden rounded-[20px] border border-slate-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-blue-100 hover:shadow-[0_24px_60px_-32px_rgba(15,23,42,0.45)] lg:grid-cols-[1.1fr_1fr]"
    >
      {post.coverImage ? (
        <div className="relative min-h-72 overflow-hidden bg-slate-100 lg:min-h-[380px]">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            priority
          />
        </div>
      ) : null}
      <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          {post.category && (
            <span className="rounded-full bg-blue-600 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
              {post.category}
            </span>
          )}
          <MetaDots items={[formatDate(post.date), post.readTime]} />
        </div>
        <h2 className="font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-slate-950 md:text-4xl">
          {post.title}
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">{post.description}</p>
        {post.tags.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((tag) => (
              <li key={tag} className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 font-mono text-[11px] text-blue-700">
                #{tag}
              </li>
            ))}
          </ul>
        ) : null}
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition group-hover:gap-3">
          Read the post
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

function PostCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-slate-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-blue-100 hover:shadow-[0_20px_48px_-30px_rgba(15,23,42,0.42)]"
    >
      {post.coverImage ? (
        <div className="relative aspect-video overflow-hidden bg-slate-100">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {post.category && (
            <span className="rounded-full bg-blue-50 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-blue-700">
              {post.category}
            </span>
          )}
          <MetaDots items={[formatDate(post.date)]} />
        </div>
        <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.01em] text-slate-950 transition group-hover:text-blue-600">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">{post.description}</p>
        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">
          <span>{post.readTime}</span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogListClient({ posts }) {
  const [filter, setFilter] = useState("All");
  const featured = posts[0];
  const rest = posts.slice(1);
  const categories = useMemo(() => ["All", ...Array.from(new Set(posts.map((post) => post.category).filter(Boolean)))], [posts]);
  const filtered = filter === "All" ? rest : rest.filter((post) => post.category === filter);

  if (!featured) {
    return (
      <section className="bg-white px-5 py-20 sm:px-8">
        <p className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
          Fresh stories are on the way. Check back soon for articles on development, product strategy, and technical SEO.
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-blue-600 before:h-px before:w-6 before:bg-current">
              Featured
            </span>
          </div>
          <FeaturedPost post={featured} />
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-blue-600 before:h-px before:w-6 before:bg-current">
              All posts
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-950 md:text-5xl">
              Everything I&apos;ve written.
            </h2>
          </div>

          <div className="mb-9 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  filter === category
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                {category}
                {category !== "All" && (
                  <span className="ml-2 text-xs opacity-60">{posts.filter((post) => post.category === category).length}</span>
                )}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-sm text-slate-500">Nothing in this category yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
