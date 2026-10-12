import Image from "next/image";

import { ArrowLink, ArrowLinkList } from "@/components/ui/arrow-link";
import { BulletList } from "@/components/ui/bullet-list";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FactList } from "@/components/ui/fact-list";
import { Section, sectionPadding, SplitRow } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag";
import { cn } from "@/lib/utils";
import { featuredProjects, imageVersion } from "@/content/projects";

// Turns a case study section's blocks (see src/content/projects.js) into paragraphs, lists and link rows.
function Block({ block }) {
  if (typeof block === "string") return <p className="text-body text-fg-muted">{block}</p>;

  if (block.list) return <BulletList items={block.list} />;
  return <ArrowLinkList links={block.links} />;
}

function slugify(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Shared layout for /projects/<slug>: title and facts, the mockup, then the case study sections.
// `children` renders after the sections (e.g. Internly's screenshot gallery).
export function CaseStudy({ project, children }) {
  const others = featuredProjects.filter((other) => other.slug !== project.slug);
  const facts = [
    { label: "Role", value: project.role },
    { label: "Type", value: project.type },
    { label: "Timeline", value: project.period },
    { label: "Status", value: project.status },
  ];

  return (
    <>
      <header>
        <Container>
          <div className="pb-12 pt-10 md:pb-16 md:pt-16 lg:pt-20">
            <ArrowLink href="/#work" direction="left" tone="muted">
              All work
            </ArrowLink>
            <p className="mt-10 text-base text-fg-subtle md:mt-12">Case study</p>
            <h1 className="mt-2 text-display uppercase text-fg max-sm:text-[2.25rem]">{project.name}</h1>
            <p className="mt-6 max-w-[46rem] text-pretty text-lead text-fg">{project.summary}</p>
            <FactList
              items={facts}
              className="mt-10 grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 lg:grid-cols-4"
            />
            <TagList items={project.tech} className="mt-8" />
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {project.links.map((link, index) =>
                index === 0 ? (
                  // Domains get long in uppercase, so the button names the project; the domain is under Evidence.
                  <Button key={link.href} href={link.href}>
                    Visit {project.name}
                  </Button>
                ) : (
                  <ArrowLink key={link.href} href={link.href}>
                    {link.label}
                  </ArrowLink>
                ),
              )}
            </div>
          </div>
        </Container>
      </header>

      <Container>
        <div className="overflow-hidden rounded-xl bg-black">
          <Image
            src={`${project.image.src}?v=${imageVersion}`}
            alt={project.image.alt}
            width={1448}
            height={1086}
            sizes="(min-width: 1024px) 1000px, 100vw"
            className="mx-auto h-auto w-full max-w-[1000px]"
          />
        </div>
      </Container>

      {project.sections.map((section, index) => (
        <Section
          key={section.label}
          id={slugify(section.label)}
          divider={index > 0}
          padding={index === 0 ? "pt-16 pb-12 md:pt-24 md:pb-16" : "py-12 md:py-16"}
        >
          <SplitRow label={section.label}>
            <div data-reveal className="grid gap-6">
              {section.body.map((block, blockIndex) => (
                <Block key={blockIndex} block={block} />
              ))}
            </div>
          </SplitRow>
        </Section>
      ))}

      {project.gallery?.length ? (
        <Container>
          <div className="grid items-start gap-10 pb-8 pt-4 md:grid-cols-2">
            {project.gallery.map((shot) => (
              <figure
                key={shot.src}
                data-reveal
                className={cn("mx-auto w-full", project.gallery.length === 1 && "md:col-span-2")}
                // Small captures and phone screenshots set their own width so they stay sharp and phone-sized.
                style={{ maxWidth: shot.displayWidth ?? 900 }}
              >
                <a
                  href={shot.src}
                  target="_blank"
                  rel="noreferrer"
                  className="block overflow-hidden rounded-xl bg-surface"
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes={`(min-width: 768px) ${shot.displayWidth ?? 900}px, 100vw`}
                    className="h-auto w-full"
                  />
                  <span className="sr-only"> (full-size image, opens in a new tab)</span>
                </a>
                <figcaption className="mt-4 text-base text-fg-subtle">{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      ) : null}

      {children}

      <Section padding={sectionPadding}>
        <SplitRow label="More case studies">
          <ul className="grid gap-6">
            {others.map((other) => (
              <li key={other.slug}>
                <ArrowLink href={`/projects/${other.slug}`} direction="right" size="title">
                  {other.name}
                </ArrowLink>
                <p className="mt-1 text-base text-fg-subtle">{other.type}</p>
              </li>
            ))}
          </ul>
        </SplitRow>
      </Section>
    </>
  );
}

export function caseStudyMetadata(project) {
  const url = `/projects/${project.slug}`;

  return {
    title: project.seo.title,
    description: project.seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.name}: case study`,
      description: project.seo.description,
      type: "article",
      url,
      images: [project.image.src],
    },
  };
}
