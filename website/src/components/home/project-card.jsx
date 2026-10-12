import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { SmartLink } from "@/components/ui/smart-link";
import { imageVersion } from "@/content/projects";

// Compact Irene-style work card for the "More projects" grid: the mockup on black, then the name and tagline.
// The name link stretches over the whole card, so the card is one tab stop with the project's name.
export function ProjectCard({ project }) {
  return (
    <li className="group relative flex flex-col overflow-hidden rounded-xl bg-black transition-transform duration-300 ease-out-quart focus-within:-translate-y-1 hover:-translate-y-1 motion-reduce:transform-none">
      <span className="relative block aspect-[4/3]">
        <Image
          src={`${project.image}?v=${imageVersion}`}
          alt=""
          fill
          sizes="(min-width: 1400px) 300px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
        />
        <span
          aria-hidden
          className="absolute bottom-3 right-3 grid size-10 scale-50 place-items-center rounded-full bg-accent text-canvas opacity-0 transition duration-300 ease-out-quart group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:scale-100 group-hover:opacity-100"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </span>
      <div className="flex-1 p-4 sm:p-5">
        <h3 className="font-display text-heading-xs text-fg">
          <SmartLink href={project.href} className="after:absolute after:inset-0 after:rounded-xl">
            {project.name}
          </SmartLink>
        </h3>
        <span className="mt-1 block text-sm text-fg-subtle sm:text-base">{project.tag}</span>
        {project.previewPassword ? (
          <span className="mt-2 block text-sm text-fg-faint">
            Password <span className="font-medium text-fg-muted">{project.previewPassword}</span>
          </span>
        ) : null}
        <span className="mt-3 hidden text-sm text-fg-faint sm:block">{project.tech.join(", ")}</span>
      </div>
    </li>
  );
}
