import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

import { getAllPostsMetadata } from "@/lib/blog";
import { SiteNavbar } from "@/components/site-navbar";
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
    <main className="min-h-screen bg-white text-slate-700">
      <SiteNavbar />

      <header className="relative isolate flex min-h-[56vh] items-center overflow-hidden bg-slate-950 px-5 pb-20 pt-36 text-white sm:px-8">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.55),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(29,78,216,0.42),transparent_36%),linear-gradient(135deg,#050e22_0%,#0b1c3a_50%,#0a224a_100%)]" />
        <div className="absolute inset-0 -z-10 bg-slate-950/65" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)]" />
        <div className="mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-blue-200">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            Writing &amp; notes · {posts.length} posts
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-bold leading-none tracking-[-0.03em] text-white md:text-7xl">
            The <span className="text-blue-300">engineering notebook</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/70 md:text-lg">
            Practical notes from shipping production software, full-stack patterns, background jobs, and the messy reality of running a SaaS solo.
          </p>
        </div>
      </header>

      <BlogListClient posts={posts} />

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
    </main>
  );
}
