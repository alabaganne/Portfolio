import { featuredProjects } from "@/content/projects";
import { getAllPostsMetadata } from "@/lib/blog";

const siteUrl = "https://alabaganne.com";

export default async function sitemap() {
  const lastModified = new Date().toISOString();
  const posts = await getAllPostsMetadata();

  const blogEntries = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date).toISOString() : lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...featuredProjects.map(({ slug }) => ({
      url: `${siteUrl}/projects/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    ...blogEntries,
  ];
}
