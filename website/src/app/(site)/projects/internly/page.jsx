import Image from "next/image";

import { CaseStudy, caseStudyMetadata } from "@/components/case-study";
import { Section, SectionLabel } from "@/components/ui/section";
import { getFeaturedProject } from "@/content/projects";

const project = getFeaturedProject("internly");

export const metadata = caseStudyMetadata(project);

const sections = [
  {
    title: "For students",
    text: "Find roles, save the good ones, apply, and follow every application in one place.",
    shots: [
      {
        file: "student-dashboard",
        title: "Dashboard",
        text: "Open roles, companies hiring and the status of every application.",
        wide: true,
      },
      {
        file: "student-internships",
        title: "Browse internships",
        text: "Search, field tabs and filters by field, city and company.",
      },
      {
        file: "student-internship-detail",
        title: "Internship details",
        text: "Role, skills, deadline and the company's contact card.",
      },
      {
        file: "student-applications",
        title: "Application tracking",
        text: "Every application with its status, from submitted to offer.",
      },
      { file: "student-messages", title: "Messages", text: "Chat with companies about an application." },
    ],
  },
  {
    title: "For companies",
    text: "Post roles and review who applied.",
    shots: [{ file: "company-applications", title: "Applicants", text: "The hiring pipeline, grouped by status." }],
  },
  {
    title: "For admins",
    text: "Admins get extra tools to run the platform.",
    shots: [
      {
        file: "admin-students",
        title: "Students",
        text: "Every student profile, with quick access to profiles and messages.",
      },
      {
        file: "admin-fields",
        title: "Fields of study",
        text: "Manage the fields that internships and students are sorted by.",
      },
    ],
  },
  {
    title: "Public pages",
    text: "What visitors see before they sign in.",
    shots: [
      { file: "landing", title: "Landing page", text: "Open roles, companies hiring and a clear way in." },
      { file: "login", title: "Log in", text: "Split layout with the student demo account filled in." },
    ],
  },
];

function Shot({ file, title, text, sizes = "(min-width: 1400px) 600px, (min-width: 768px) 50vw, 100vw", className }) {
  const src = `/projects/internly/${file}.webp`;

  return (
    <figure data-reveal className={className}>
      <a href={src} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-xl bg-surface">
        <Image
          src={src}
          alt={`Internly ${title.toLowerCase()} screen`}
          width={2880}
          height={1800}
          sizes={sizes}
          className="h-auto w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]"
        />
        <span className="sr-only"> (full-size image, opens in a new tab)</span>
      </a>
      <figcaption className="mt-5">
        <p className="font-display text-xl font-medium text-fg">{title}</p>
        <p className="mt-1 text-base text-fg-subtle">{text}</p>
      </figcaption>
    </figure>
  );
}

export default function InternlyPage() {
  return (
    <CaseStudy project={project}>
      <Section id="screenshots" padding="pt-16 pb-4 md:pt-24">
        <SectionLabel>Screenshots</SectionLabel>
      </Section>
      {sections.map((section) => (
        <Section key={section.title} divider={false} padding="py-12 md:py-16">
          <div className="grid items-baseline gap-8 md:grid-cols-2 md:gap-10">
            <h3 className="text-title text-fg">{section.title}</h3>
            <p data-reveal className="text-body text-fg-muted">
              {section.text}
            </p>
          </div>
          <div className="mt-10 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {section.shots.map(({ wide, ...shot }) => {
              const full = wide || section.shots.length === 1;
              return (
                <Shot
                  key={shot.file}
                  {...shot}
                  className={full ? "md:col-span-2" : undefined}
                  sizes={full ? "(min-width: 1400px) 1240px, 100vw" : undefined}
                />
              );
            })}
          </div>
        </Section>
      ))}
    </CaseStudy>
  );
}
