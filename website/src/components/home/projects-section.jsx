import Image from "next/image";

import { ProjectCard } from "@/components/home/project-card";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SplitRow } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag";
import { featuredProjects, imageVersion, moreProjects } from "@/content/projects";

function Fact({ label, children }) {
  return (
    <div>
      <dt className="text-base text-fg-subtle">{label}</dt>
      <dd className="mt-1 text-body text-fg-muted">{children}</dd>
    </div>
  );
}

function FeaturedProject({ project, index }) {
  return (
    <li data-reveal>
      <article
        aria-labelledby={`project-${project.slug}`}
        className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14"
      >
        <div className="overflow-hidden rounded-xl bg-black">
          <Image
            src={`${project.image.src}?v=${imageVersion}`}
            alt={project.image.alt}
            width={1448}
            height={1086}
            sizes="(min-width: 1400px) 650px, (min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full"
          />
        </div>
        <div>
          <p className="text-base text-fg-subtle">
            <span className="font-display font-medium text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span className="mx-2 text-fg-faint">/</span>
            {project.type} <span className="text-fg-faint">·</span> {project.period}{" "}
            <span className="text-fg-faint">·</span> {project.status}
          </p>
          <h3 id={`project-${project.slug}`} className="mt-3 text-label text-fg">
            {project.name}
          </h3>
          <p className="mt-4 text-body text-fg-muted">{project.summary}</p>
          <dl className="mt-6 grid gap-5">
            <Fact label="My role">{project.role}</Fact>
            <Fact label="Key decision">{project.decision}</Fact>
          </dl>
          <TagList items={project.tech} className="mt-6" />
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button href={`/projects/${project.slug}`}>
              Read case study<span className="sr-only">: {project.name}</span>
            </Button>
            {project.links.map((link) => (
              <ArrowLink key={link.href} href={link.href}>
                {link.label}
              </ArrowLink>
            ))}
          </div>
        </div>
      </article>
    </li>
  );
}

export function ProjectsSection() {
  return (
    <>
      <section id="work" aria-labelledby="work-title" className="rounded-3xl bg-surface">
        {/* Older links point to /#projects. */}
        <span id="projects" aria-hidden />
        <Container>
          <SplitRow label="Selected work" labelId="work-title" className="pt-16 md:pt-24 lg:pt-32">
            <p data-reveal className="text-body text-fg-muted">
              Four products I built end to end. Each case study covers the problem, my role, the architecture and one
              real tradeoff.
            </p>
          </SplitRow>
          <ol className="mt-12 grid gap-20 pb-16 md:mt-16 md:pb-24 lg:gap-28 lg:pb-32">
            {featuredProjects.map((project, index) => (
              <FeaturedProject key={project.slug} project={project} index={index} />
            ))}
          </ol>
        </Container>
      </section>

      <Section aria-labelledby="more-projects-title" divider={false} padding="pt-16 pb-4 md:pt-24 lg:pt-32">
        <SplitRow label="More projects" labelId="more-projects-title">
          <p data-reveal className="text-body text-fg-muted">
            Client work, internship projects and smaller products, each with a live site or demo.
          </p>
        </SplitRow>
        <ul data-reveal className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {moreProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </ul>
      </Section>
    </>
  );
}
