import { Section, SectionHeading } from "@/components/ui/section";

const education = [
  {
    period: "Sep 2021 — Jun 2024",
    degree: "Engineer's Degree, Software Engineering",
    school: "ISSAT Sousse — Institut Supérieur des Sciences Appliquées et de Technologie",
    notes:
      "Selected as one of the top Computer Science students to join the competitive engineering program. Curriculum emphasized advanced software architecture, backend system design, and industry-standard practices.",
  },
  {
    period: "2018 — Jul 2021",
    degree: "Bachelor's Degree, Computer Science",
    school: "ISSAT Sousse",
    notes:
      "Ranked among the top 5 students out of 90, earning direct admission to the Software Engineering degree program. End-of-studies project: Internly, a full-stack internship platform.",
  },
];

const certifications = [
  { name: "CCNA: Introduction to Networks", issuer: "Cisco · 2022" },
  { name: "MTA: Introduction to Programming Using Python", issuer: "Microsoft · 2021" },
  { name: "MTA: Database Fundamentals", issuer: "Microsoft · 2021" },
  { name: "MTA: Programming Using JavaScript", issuer: "Microsoft · 2019" },
  { name: "MTA: Programming Using HTML and CSS", issuer: "Microsoft · 2019" },
];

export function EducationSection() {
  return (
    <Section id="education">
      <SectionHeading
        label="Education"
        title={
          <>
            Formal training in <span className="text-fg-subtle">software engineering.</span>
          </>
        }
        description="Top-of-class admission to the competitive Software Engineering track at ISSAT Sousse, with a foundation in fundamentals and modern practice."
      />
      <ol className="mt-14 divide-y divide-line border-t border-line md:mt-20">
        {education.map((item) => (
          <li
            key={`${item.school}-${item.degree}`}
            data-reveal
            className="grid gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-12"
          >
            <p className="text-sm tabular-nums text-fg-subtle md:col-span-4 md:pt-1.5 lg:col-span-3">{item.period}</p>
            <div className="md:col-span-8 lg:col-span-9">
              <h3 className="text-title text-fg">{item.degree}</h3>
              <p className="mt-2 text-sm font-medium text-fg-muted">{item.school}</p>
              <p className="mt-4 max-w-3xl leading-relaxed text-fg-muted">{item.notes}</p>
            </div>
          </li>
        ))}
      </ol>

      <div data-reveal className="mt-20 grid gap-6 md:grid-cols-12 md:gap-8">
        <h3 className="text-sm font-medium text-fg-muted md:col-span-4 md:pt-4 lg:col-span-3">Certifications</h3>
        <ul className="divide-y divide-line border-y border-line md:col-span-8 lg:col-span-9">
          {certifications.map((certification) => (
            <li key={certification.name} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <span className="text-fg">{certification.name}</span>
              <span className="shrink-0 text-sm text-fg-subtle">{certification.issuer}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
