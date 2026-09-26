import { PageHeader } from "@/components/page-header";
import { getAllPostsMetadata } from "@/lib/blog";
import BlogListClient from "./blog-list-client";

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
        label={`Writing & notes · ${posts.length} posts`}
        title={
          <>
            The engineering <span className="text-fg-subtle">notebook.</span>
          </>
        }
        description="Practical notes from shipping production software, full-stack patterns, background jobs, and the messy reality of running a SaaS solo."
      />
      <BlogListClient posts={posts} />
    </>
  );
}
