"use client";

import { useMemo, useState } from "react";

import { FeaturedPostCard, PostCard } from "@/components/post-card";
import { Container } from "@/components/ui/container";
import { FilterPills } from "@/components/ui/filter-pills";
import { Section, SectionHeading } from "@/components/ui/section";

export default function BlogListClient({ posts }) {
  const [filter, setFilter] = useState("All");
  const featured = posts[0];
  const rest = posts.slice(1);
  const categories = useMemo(() => ["All", ...Array.from(new Set(posts.map((post) => post.category).filter(Boolean)))], [posts]);
  const filtered = filter === "All" ? rest : rest.filter((post) => post.category === filter);

  if (!featured) {
    return (
      <Container className="pb-24">
        <p className="rounded-2xl border border-line p-8 text-center text-sm text-fg-muted">
          Fresh stories are on the way. Check back soon for articles on development, product strategy, and technical SEO.
        </p>
      </Container>
    );
  }

  return (
    <>
      <Container className="pb-20 md:pb-28">
        <div data-reveal>
          <FeaturedPostCard post={featured} />
        </div>
      </Container>

      {rest.length > 0 ? (
        <Section>
          <SectionHeading
            label="All posts"
            title={
              <>
                Everything <span className="text-fg-subtle">I&apos;ve written.</span>
              </>
            }
          >
            <FilterPills
              className="mt-10"
              label="Filter posts"
              options={categories.map((category) => ({
                value: category,
                count: category === "All" ? undefined : posts.filter((post) => post.category === category).length,
              }))}
              value={filter}
              onChange={setFilter}
            />
          </SectionHeading>

          {filtered.length > 0 ? (
            <div className="mt-14 grid gap-x-8 gap-y-14 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-sm text-fg-subtle">Nothing in this category yet.</p>
          )}
        </Section>
      ) : null}
    </>
  );
}
