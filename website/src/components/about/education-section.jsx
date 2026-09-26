import { SplitSection } from "@/components/ui/section";

const education = [
  {
    degree: "Engineering degree, Software Engineering",
    school: "ISSAT Sousse",
    period: "Sep 2021 – Jun 2024",
    notes:
      "Picked among the top computer science students for the engineering program, with a focus on software architecture, back-end design and industry practice.",
  },
  {
    degree: "Bachelor's degree, Computer Science",
    school: "ISSAT Sousse",
    period: "2018 – Jul 2021",
    notes:
      "Ranked in the top 5 of 90 students, which earned direct entry to the engineering program. Final-year project: Internly, a full-stack internship platform.",
  },
];

const certifications = [
  { name: "CCNA: Introduction to Networks", issuer: "Cisco, 2022" },
  { name: "MTA: Introduction to Programming Using Python", issuer: "Microsoft, 2021" },
  { name: "MTA: Database Fundamentals", issuer: "Microsoft, 2021" },
  { name: "MTA: Programming Using JavaScript", issuer: "Microsoft, 2019" },
  { name: "MTA: Programming Using HTML and CSS", issuer: "Microsoft, 2019" },
];

export function EducationSection() {
  return (
    <>
      <SplitSection id="education" label="Education">
        <ol>
          {education.map((item) => (
            <li key={item.degree} data-reveal className="mb-12 border-b border-line pb-12 last:mb-0 last:border-0 last:pb-0">
              <h3 className="text-title text-fg">{item.degree}</h3>
              <p className="font-display text-title text-fg-subtle">{item.school}</p>
              <p className="mt-4 text-body text-fg-subtle">{item.period}</p>
              <p className="mt-6 text-body text-fg-muted">{item.notes}</p>
            </li>
          ))}
        </ol>
      </SplitSection>

      <SplitSection label="Certifications">
        <ul data-reveal className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {certifications.map((certification) => (
            <li key={certification.name}>
              <p className="font-display text-heading-xs text-fg">{certification.name}</p>
              <p className="mt-1 text-base text-fg-subtle">{certification.issuer}</p>
            </li>
          ))}
        </ul>
      </SplitSection>
    </>
  );
}
