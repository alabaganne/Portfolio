import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { sectionPadding, SplitSection } from "@/components/ui/section";
import { site } from "@/lib/site";

export function HeroSection() {
  return (
    <>
      <section aria-labelledby="hero-title">
        <Container>
          <div className={`${sectionPadding} text-center`}>
            <h1 id="hero-title" className="mx-auto max-w-[900px] text-balance text-display uppercase text-fg">
              I’m Ala, a <span className="whitespace-nowrap text-accent">full-stack</span> engineer
            </h1>
          </div>
        </Container>
      </section>

      <SplitSection label="About">
        <p data-reveal className="text-body text-fg-muted">
          I build web apps, online stores and AI features, from the first sketch to production. For over five years
          I&apos;ve shipped software for teams in the US, Belgium and Hong Kong, and for clients around the world.
        </p>
        <p data-reveal className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-base font-medium text-fg-subtle">
          <span className="inline-flex items-center gap-2.5 text-fg">
            <span aria-hidden className="size-[7px] rounded-full bg-accent" />
            Open to full-time roles
          </span>
          <span>{site.location}</span>
        </p>
        <div data-reveal className="mt-8 flex flex-wrap gap-3">
          <Button href="/about" size="lg">
            More about me
          </Button>
          <Button href={site.resume} variant="secondary" size="lg" download>
            Download resume
          </Button>
        </div>
      </SplitSection>
    </>
  );
}
