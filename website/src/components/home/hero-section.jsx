import { ArrowLink } from "@/components/ui/arrow-link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FactList } from "@/components/ui/fact-list";
import { TagList } from "@/components/ui/tag";
import { site } from "@/lib/site";

const stack = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Supabase", "LLM APIs & RAG"];

const facts = [
  { label: "Based in", value: `${site.location} (${site.timezone})` },
  { label: "Speaks", value: site.languages },
];

// Kept compact so the role, the job search and the main links fit on the first screen of a laptop.
export function HeroSection() {
  return (
    <section aria-labelledby="hero-title">
      <Container>
        <div className="pb-12 pt-8 sm:pt-12 md:pb-16 lg:pb-14 lg:pt-12">
          <h1 id="hero-title" className="uppercase text-fg">
            <span className="block text-display">{site.name}</span>
            <span className="sr-only">, </span>
            <span className="mt-3 block text-title text-accent md:mt-4">Full-stack engineer</span>
          </h1>
          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
            <div>
              <p className="max-w-[42rem] text-pretty text-body text-fg-muted">
                I build web products with React, Next.js, TypeScript, and Node.js, with PostgreSQL and Supabase for data
                and applied AI where it helps.
              </p>
              <p className="mt-5 flex items-center gap-2.5 text-base font-medium text-fg">
                <span aria-hidden className="size-[7px] shrink-0 rounded-full bg-accent" />
                Open to full-time engineering roles, remote or on-site.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-4">
                <Button href="#work" size="lg">
                  View selected work
                </Button>
                <Button href={site.resume} variant="secondary" size="lg" download>
                  Download CV
                </Button>
                <ArrowLink href="/contact" direction="right" className="ml-1 py-3 sm:ml-3">
                  Get in touch
                </ArrowLink>
              </div>
              <FactList items={facts} inline className="mt-8" />
            </div>

            {/* Shorter than the left column on desktop, so its chip wrapping (which changes when the fonts load)
                doesn't move the page. */}
            <div className="border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <p className="text-base text-fg-subtle">Main stack</p>
              <TagList items={stack} className="mt-3" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
