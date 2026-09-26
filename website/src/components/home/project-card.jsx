import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { ArrowLink } from "@/components/ui/arrow-link";
import { TagList } from "@/components/ui/tag";

function ProjectImage({ project }) {
  const accent = project.accent || "#5b8cff";

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
      {project.image ? (
        <Image
          src={`${project.image}?v=20260924-3`}
          alt={`${project.name} demo`}
          fill
          sizes="(min-width: 1240px) 588px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04]"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(80% 80% at 50% 0%, ${accent}40, transparent 70%)` }}
        />
      )}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10" />
      <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
        <span aria-hidden className="size-1.5 rounded-full" style={{ background: accent }} />
        {project.badge}
      </span>
      {project.href ? (
        <span
          aria-hidden
          className="absolute bottom-4 right-4 grid size-12 translate-y-2 place-items-center rounded-full bg-white text-black opacity-0 transition duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight className="size-5" />
        </span>
      ) : null}
    </div>
  );
}

export function ProjectCard({ project }) {
  return (
    <article className="group flex h-full flex-col">
      {project.href ? (
        <a href={project.href} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden>
          <ProjectImage project={project} />
        </a>
      ) : (
        <ProjectImage project={project} />
      )}

      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-title text-fg">
            {project.href ? (
              <a className="transition-colors hover:text-fg-muted" href={project.href} target="_blank" rel="noreferrer">
                {project.name}
              </a>
            ) : (
              project.name
            )}
          </h3>
          <p className="mt-1.5 text-sm text-fg-subtle">{project.tag}</p>
        </div>
        <p className="shrink-0 pt-1.5 text-xs text-fg-subtle">{project.category.join(" / ")}</p>
      </div>

      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-muted">{project.description}</p>
      {project.previewPassword ? (
        <p className="mt-3 text-sm text-fg-muted">
          Preview password:{" "}
          <code className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[13px] text-fg">{project.previewPassword}</code>
        </p>
      ) : null}

      <TagList items={project.tech} className="mt-5" />

      <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-6">
        {project.href ? (
          <ArrowLink href={project.href}>{project.linkLabel || "Visit live"}</ArrowLink>
        ) : (
          <span className="text-sm text-fg-subtle">Private client work</span>
        )}
        {project.details ? (
          <ArrowLink href={project.details} direction="right" tone="muted">
            Screenshots
          </ArrowLink>
        ) : null}
      </div>
    </article>
  );
}
