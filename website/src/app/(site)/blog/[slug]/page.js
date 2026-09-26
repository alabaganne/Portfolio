import Image from "next/image";
import { notFound } from "next/navigation";

import { formatPostDate, PostCard, PostMeta } from "@/components/post-card";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Glow } from "@/components/ui/glow";
import { Section, SectionHeading } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { getAllPostSlugs, getAllPostsMetadata, getPostBySlug } from "@/lib/blog";
import { site, socialLinks } from "@/lib/site";

const siteUrl = site.url;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

function keywordsForMetadata(keywords) {
  if (!keywords || keywords.length === 0) return undefined;
  return keywords;
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
  const publishedLabel = formatPostDate(metadata.date, "long");

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

  const shareLinks = [
    { label: "Twitter", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(metadata.title)}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}` },
    { label: "Email", href: `mailto:?subject=${encodeURIComponent(metadata.title)}` },
  ];

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden">
          <Glow />
          <Container className="pb-14 pt-32 md:pb-16 md:pt-44">
            <div className="mx-auto max-w-[720px]">
              <div className="motion-safe:animate-rise">
                <ArrowLink href="/blog" direction="left" tone="muted">
                  All posts
                </ArrowLink>
              </div>
              <PostMeta
                className="mt-12 motion-safe:animate-rise"
                items={[
                  metadata.category,
                  publishedLabel ? <time dateTime={metadata.date}>{publishedLabel}</time> : null,
                  metadata.readTime,
                ]}
              />
              <h1 className="mt-5 text-balance text-[clamp(2.25rem,1.4rem+3.4vw,4rem)] font-medium leading-[1.04] tracking-[-0.04em] text-fg motion-safe:animate-rise motion-safe:[animation-delay:80ms]">
                {metadata.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-fg-muted motion-safe:animate-rise motion-safe:[animation-delay:160ms] md:text-xl">
                {metadata.description}
              </p>
              {metadata.author ? (
                <div className="mt-10 flex items-center gap-3 motion-safe:animate-rise motion-safe:[animation-delay:240ms]">
                  <span className="grid size-11 place-items-center rounded-full border border-line-strong bg-surface text-sm font-medium text-fg">
                    AB
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-fg">{metadata.author}</span>
                    <span className="block text-sm text-fg-subtle">{site.role}</span>
                  </span>
                </div>
              ) : null}
            </div>
          </Container>
        </header>

        {metadata.coverImage ? (
          <Container>
            <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-2xl bg-surface motion-safe:animate-rise motion-safe:[animation-delay:300ms]">
              <Image src={metadata.coverImage} alt={metadata.coverImageAlt} fill sizes="(min-width: 1100px) 1024px, 100vw" className="object-cover" priority />
              <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10" />
            </div>
          </Container>
        ) : null}

        <Container className="py-16 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <div className="blog-article mdx-content text-[17px] leading-[1.8]" dangerouslySetInnerHTML={{ __html: html }} />

            {metadata.tags.length > 0 ? (
              <ul className="mt-14 flex flex-wrap gap-2 border-t border-line pt-8">
                {metadata.tags.map((tag) => (
                  <li key={tag}>
                    <Tag>#{tag}</Tag>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="text-sm text-fg-subtle">Share</span>
              {shareLinks.map((link) => (
                <ArrowLink key={link.label} href={link.href} tone="muted">
                  {link.label}
                </ArrowLink>
              ))}
            </div>

            <aside className="mt-12 flex flex-col gap-5 rounded-2xl border border-line bg-surface p-7 sm:flex-row">
              <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line-strong bg-canvas text-base font-medium text-fg">
                AB
              </span>
              <div>
                <h2 className="text-lg font-medium tracking-[-0.02em] text-fg">Written by {metadata.author || site.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  Full-Stack Software Engineer building production web apps, AI document systems, and SaaS products from
                  Monastir, Tunisia.
                </p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {socialLinks.slice(0, 2).map((link) => (
                    <ArrowLink key={link.href} href={link.href}>
                      {link.label}
                    </ArrowLink>
                  ))}
                  <ArrowLink href={`mailto:${site.email}`}>Email</ArrowLink>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </article>

      {relatedPosts.length > 0 ? (
        <Section>
          <SectionHeading
            label="Keep reading"
            title={
              <>
                More from <span className="text-fg-subtle">the notebook.</span>
              </>
            }
          />
          <div className="mt-14 grid gap-x-8 gap-y-14 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((item) => (
              <PostCard key={item.slug} post={item} />
            ))}
          </div>
        </Section>
      ) : null}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
