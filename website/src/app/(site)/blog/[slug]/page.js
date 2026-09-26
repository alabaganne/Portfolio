import Image from "next/image";
import { notFound } from "next/navigation";

import { formatPostDate, PostCard } from "@/components/post-card";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { LogoMark } from "@/components/ui/logo";
import { Section, sectionPadding, SectionLabel } from "@/components/ui/section";
import { Tag, TagList } from "@/components/ui/tag";
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
  const relatedPosts = posts.filter((item) => item.slug !== metadata.slug).slice(0, 2);
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
        <header>
          <Container>
            <div className={sectionPadding}>
              <ArrowLink href="/blog" direction="left" tone="muted">
                All posts
              </ArrowLink>
              <h1 className="mt-10 max-w-[1000px] text-balance text-heading uppercase text-fg md:mt-12">{metadata.title}</h1>
              <ul className="mt-8 flex flex-wrap gap-3">
                {[
                  metadata.category,
                  publishedLabel ? <time dateTime={metadata.date}>{publishedLabel}</time> : null,
                  metadata.readTime,
                ]
                  .filter(Boolean)
                  .map((item, index) => (
                    <li key={index}>
                      <Tag size="md">{item}</Tag>
                    </li>
                  ))}
              </ul>
              <p className="mt-10 max-w-[700px] text-lead text-fg-muted">{metadata.description}</p>
            </div>
          </Container>
        </header>

        {metadata.coverImage ? (
          <Container>
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-surface">
              <Image
                src={metadata.coverImage}
                alt={metadata.coverImageAlt}
                fill
                sizes="(min-width: 1400px) 1240px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </Container>
        ) : null}

        <Container className={sectionPadding}>
          <div className="mx-auto max-w-[720px]">
            <div className="blog-article mdx-content text-lg" dangerouslySetInnerHTML={{ __html: html }} />

            {metadata.tags.length > 0 ? (
              <TagList items={metadata.tags.map((tag) => `#${tag}`)} className="mt-14 border-t border-line pt-8" />
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="text-base text-fg-subtle">Share</span>
              {shareLinks.map((link) => (
                <ArrowLink key={link.label} href={link.href} tone="muted">
                  {link.label}
                </ArrowLink>
              ))}
            </div>

            <aside className="mt-12 flex flex-col gap-5 rounded-xl bg-surface p-6 sm:flex-row md:p-8">
              <LogoMark className="size-14" />
              <div>
                <h2 className="text-xl text-fg">Written by {metadata.author || site.name}</h2>
                <p className="mt-2 text-base text-fg-muted">
                  Full-stack software engineer building web apps, AI features and SaaS products from {site.location}.
                </p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
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
          <SectionLabel>Keep reading</SectionLabel>
          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-10">
            {relatedPosts.map((item) => (
              <div key={item.slug} data-reveal>
                <PostCard post={item} />
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
