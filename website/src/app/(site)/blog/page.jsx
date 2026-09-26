import { PageHeader } from "@/components/page-header";
import { PostCard } from "@/components/post-card";
import { Section, SectionLabel } from "@/components/ui/section";
import { getAllPostsMetadata } from "@/lib/blog";

export const metadata = {
  title: "Blog | Ala Baganne — Full-Stack Software Engineer",
  description:
    "Read product updates, case studies, and engineering notes from Ala Baganne on building SEO-ready, high-performance web applications and SaaS products.",
  keywords: [
    "Ala Baganne blog",
    "Next.js articles",
    "full-stack engineering blog",
    "restaurant technology insights",
    "SaaS case studies",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Ala Baganne Blog",
    description:
      "Explore Ala Baganne's writing on digital products, Next.js development, SEO, and technology strategies for growing businesses.",
    type: "website",
    url: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getAllPostsMetadata();

  return (
    <>
      <PageHeader
        title={
          <>
            The engineering <span className="text-accent">notebook</span>
          </>
        }
        description="Notes from shipping real software: full-stack patterns, background jobs, and running a SaaS on my own."
      />
      <Section>
        <div data-reveal className="grid items-baseline gap-3 md:grid-cols-2 md:gap-10">
          <SectionLabel>All posts</SectionLabel>
          <p className="font-display text-xl font-medium text-fg-faint md:justify-self-end">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>
        {posts.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-10">
            {posts.map((post) => (
              <div key={post.slug} data-reveal>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-body text-fg-muted">New posts are on the way. Check back soon.</p>
        )}
      </Section>
    </>
  );
}
