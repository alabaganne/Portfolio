import { ArrowLinkList } from "@/components/ui/arrow-link";
import { BulletList } from "@/components/ui/bullet-list";

// One job in the home page's Experience section: summary, details and tech. Content lives in src/content/experience.js.
export function ExperienceItem({ job }) {
  return (
    <li data-reveal className="border-b border-line py-10 first:pt-0 last:border-0 last:pb-0 md:py-12">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-title text-fg">{job.company}</h3>
        <p className="text-base text-fg-subtle">{job.period}</p>
      </div>
      <p className="mt-1 font-display text-heading-xs text-fg-subtle">
        {job.role}
        <span className="mx-2 text-fg-faint">/</span>
        {job.engagement}, {job.place}
      </p>
      <p className="mt-5 text-body text-fg-muted">{job.summary}</p>
      {job.points ? <BulletList items={job.points} className="mt-5" /> : null}
      <p className="mt-5 text-base text-fg-faint">{job.tech.join(", ")}</p>
      {job.links ? <ArrowLinkList links={job.links} className="mt-5" /> : null}
    </li>
  );
}
