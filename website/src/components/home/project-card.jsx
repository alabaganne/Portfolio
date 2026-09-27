import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { SmartLink } from "@/components/ui/smart-link";

// Irene-style work card: the mockup on black, then the project name and tagline.
export function ProjectCard({ project, hidden = false }) {
  return (
    <SmartLink
      href={project.href}
      tabIndex={hidden ? -1 : undefined}
      draggable={false}
      className="group flex w-[80vw] max-w-[26rem] shrink-0 flex-col overflow-hidden rounded-xl bg-black transition-transform duration-300 ease-out-quart hover:-translate-y-1 active:scale-[0.99] md:w-[30rem] md:max-w-none lg:w-[37.5rem]"
    >
      <span className="relative block aspect-[4/3]">
        <Image
          src={`${project.image}?v=20260927-2`}
          alt={`${project.name} demo`}
          fill
          draggable={false}
          sizes="(min-width: 1024px) 600px, (min-width: 768px) 480px, 80vw"
          className="object-cover"
        />
        <span
          aria-hidden
          className="absolute bottom-4 right-4 grid size-12 scale-50 place-items-center rounded-full bg-accent text-canvas opacity-0 transition duration-300 ease-out-quart group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
        >
          <ArrowUpRight className="size-5" />
        </span>
      </span>
      <span className="block flex-1 p-5 sm:p-6">
        <span className="block font-display text-heading-sm text-fg">{project.name}</span>
        <span className="block font-display text-heading-sm text-fg-subtle">{project.tag}</span>
        {project.previewPassword ? (
          <span className="mt-2 block text-sm text-fg-faint">
            Password <span className="font-medium text-fg-muted">{project.previewPassword}</span>
          </span>
        ) : null}
      </span>
    </SmartLink>
  );
}
