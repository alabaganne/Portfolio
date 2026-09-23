import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

import { getAllPostSlugs, getAllPostsMetadata, getPostBySlug } from "@/lib/blog";
import { SiteNavbar } from "@/components/site-navbar";

const siteUrl = "https://alabaganne.com";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

function keywordsForMetadata(keywords) {
  if (!keywords || keywords.length === 0) return undefined;
  return keywords;
}

function formatShortDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function RelatedPostCard({ post }) {
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
          {post.date && <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">{formatShortDate(post.date)}</span>}
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

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog post not found | Ala Baganne",
    };
  }

  const { metadata } = post;
  const canonical = `/blog/${metadata.slug}`;

  return {
    title: `${metadata.title} | Ala Baganne Blog`,
    description: metadata.description,
    keywords: keywordsForMetadata(metadata.keywords),
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: metadata.title,
      description: metadata.description,
      publishedTime: metadata.date || undefined,
      authors: metadata.author ? [metadata.author] : undefined,
      tags: metadata.tags.length > 0 ? metadata.tags : undefined,
      images: metadata.coverImage
        ? [{ url: metadata.coverImage, alt: metadata.coverImageAlt }]
        : [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ala Baganne, Full-Stack Software Engineer" }],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: metadata.coverImage
        ? [{ url: metadata.coverImage, alt: metadata.coverImageAlt }]
        : [{ url: "/og-image.png", alt: "Ala Baganne, Full-Stack Software Engineer" }],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { metadata, html } = post;
  const posts = await getAllPostsMetadata();
  const relatedPosts = posts.filter((item) => item.slug !== metadata.slug).slice(0, 3);
  const publishedLabel = metadata.date
    ? new Date(metadata.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const canonicalUrl = `${siteUrl}/blog/${metadata.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: metadata.title,
    description: metadata.description,
    datePublished: metadata.date || undefined,
    dateModified: metadata.date || undefined,
    author: metadata.author
      ? {
          "@type": "Person",
          name: metadata.author,
    }
      : undefined,
    url: canonicalUrl,
    image: metadata.coverImage ? `${siteUrl}${metadata.coverImage}` : undefined,
    keywords: metadata.keywords.length > 0 ? metadata.keywords.join(", ") : undefined,
    articleSection: metadata.category || undefined,
  };

  return (
    <main className="min-h-screen bg-white text-slate-700">
      <SiteNavbar />

      <header className="relative isolate flex min-h-[64vh] items-center overflow-hidden bg-slate-950 px-5 pb-20 pt-40 text-white sm:px-8">
        {metadata.coverImage ? (
          <Image
            src={metadata.coverImage}
            alt=""
            fill
            sizes="100vw"
            className="-z-20 object-cover opacity-45"
            priority
          />
        ) : (
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.55),transparent_34%),linear-gradient(135deg,#050e22_0%,#0b1c3a_55%,#07142b_100%)]" />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#07142b]/80 via-[#07142b]/85 to-[#0b1c3a]/95" />
        <div className="mx-auto max-w-4xl text-center">
          <Link href="/blog" className="mb-8 inline-flex items-center gap-2 font-mono text-sm font-medium text-white/70 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All posts
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.08em] text-white/70">
            {metadata.category && (
              <span className="rounded-full bg-blue-600 px-3 py-1.5 font-semibold text-white">
                {metadata.category}
              </span>
            )}
            {publishedLabel && (
              <>
                <span className="h-1 w-1 rounded-full bg-current opacity-50" aria-hidden />
                <time dateTime={metadata.date}>{publishedLabel}</time>
              </>
            )}
            {metadata.readTime && (
              <>
                <span className="h-1 w-1 rounded-full bg-current opacity-50" aria-hidden />
                <span>{metadata.readTime}</span>
              </>
            )}
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold leading-tight tracking-[-0.03em] text-white md:text-6xl">
            {metadata.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/75 md:text-lg">
            {metadata.description}
          </p>
          {metadata.author ? (
            <div className="mt-9 inline-flex items-center gap-3 text-left">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 font-display text-sm font-semibold tracking-[0.04em] text-white">
                AB
              </span>
              <span>
                <span className="block font-display text-sm font-semibold text-white">{metadata.author}</span>
                <span className="block text-sm text-white/60">Full-Stack Software Engineer</span>
              </span>
            </div>
          ) : null}
        </div>
      </header>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-[760px]">
          <div
            className="blog-article mdx-content text-[17.5px] leading-[1.78] text-slate-800"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {metadata.tags.length > 0 ? (
            <ul className="mt-14 flex flex-wrap gap-2 border-t border-slate-200 pt-7">
              {metadata.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-600">
                  #{tag}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="mr-1 font-mono text-xs uppercase tracking-[0.08em] text-slate-500">Share</span>
            <Link className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-blue-600 hover:text-blue-600" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(metadata.title)}`} target="_blank" rel="noreferrer">
              Twitter
            </Link>
            <Link className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-blue-600 hover:text-blue-600" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`} target="_blank" rel="noreferrer">
              LinkedIn
            </Link>
            <Link className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-blue-600 hover:text-blue-600" href={`mailto:?subject=${encodeURIComponent(metadata.title)}`}>
              Email
            </Link>
          </div>

          <aside className="mt-12 flex gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-7">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 font-display text-lg font-semibold tracking-[0.04em] text-white">
              AB
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold text-slate-950">Written by {metadata.author || "Ala Baganne"}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Full-Stack Software Engineer building production web apps, AI document systems, and SaaS products from Monastir, Tunisia.
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700" href="https://linkedin.com/in/alabaganne" target="_blank" rel="noreferrer">
                  <Linkedin className="h-4 w-4" aria-hidden />
                  LinkedIn
                </Link>
                <Link className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700" href="https://github.com/alabaganne" target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" aria-hidden />
                  GitHub
                </Link>
                <Link className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700" href="mailto:alabaganne9@gmail.com">
                  <Mail className="h-4 w-4" aria-hidden />
                  Email
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {relatedPosts.length > 0 ? (
        <section className="bg-slate-50 px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 max-w-3xl">
              <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-blue-600 before:h-px before:w-6 before:bg-current">
                Keep reading
              </span>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-950 md:text-5xl">
                More from the notebook.
              </h2>
            </div>
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((item) => (
                <RelatedPostCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <footer className="relative overflow-hidden bg-[#07142b] px-5 py-20 text-center text-slate-300 sm:px-8">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(600px_300px_at_50%_0%,rgba(37,99,235,0.35),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-blue-300 before:h-px before:w-7 before:bg-current after:h-px after:w-7 after:bg-current">
            Get in touch
          </span>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em] text-white md:text-6xl">
            Like what you read?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
            I write about the things I&apos;m shipping, production web apps, full-stack patterns, and the messy parts of building software.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link className="inline-flex items-center gap-2 rounded-full border border-blue-600 bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:border-blue-700 hover:bg-blue-700" href="mailto:alabaganne9@gmail.com">
              <Mail className="h-4 w-4" aria-hidden />
              alabaganne9@gmail.com
            </Link>
            <Link className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-blue-600 hover:bg-blue-600" href="https://linkedin.com/in/alabaganne" target="_blank" rel="noreferrer">
              <Linkedin className="h-4 w-4" aria-hidden />
              LinkedIn
            </Link>
            <Link className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-blue-600 hover:bg-blue-600" href="https://github.com/alabaganne" target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" aria-hidden />
              GitHub
            </Link>
          </div>
          <div className="mt-14 border-t border-white/10 pt-7 text-center text-sm font-medium text-slate-500">
            <span>© {new Date().getFullYear()} Ala Baganne. All rights reserved.</span>
          </div>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
