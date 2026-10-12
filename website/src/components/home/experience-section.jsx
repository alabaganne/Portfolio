import { ExperienceItem } from "@/components/experience-item";
import { SplitSection } from "@/components/ui/section";
import { experiences } from "@/content/experience";

export function ExperienceSection() {
  return (
    <SplitSection id="experience" label="Experience" padding="pt-12 pb-16 md:pt-16 md:pb-24 lg:pb-32">
      <p data-reveal className="text-body text-fg-muted">
        Professional experience building product features and applied AI systems.
      </p>
      <ol className="mt-10">
        {experiences.map((job) => (
          <ExperienceItem key={`${job.company}-${job.period}`} job={job} />
        ))}
      </ol>
    </SplitSection>
  );
}
