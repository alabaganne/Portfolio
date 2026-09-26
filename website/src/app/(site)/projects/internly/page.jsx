import Image from "next/image";

import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Section, sectionPadding, SectionLabel } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag";

export const metadata = {
  title: "Internly screenshots | Ala Baganne",
  description:
    "Screenshots of Internly, an internship platform built with Laravel, Vue.js and Inertia.js: student, company and admin workspaces.",
  alternates: {
    canonical: "/projects/internly",
  },
  openGraph: {
    title: "Internly — internship platform",
    description: "Student, company and admin workspaces of Internly, built with Laravel, Vue.js and Inertia.js.",
    type: "website",
    url: "/projects/internly",
    images: ["/projects/internly-demo.png"],
  },
};

const tech = ["Laravel", "Vue.js", "Inertia.js", "MySQL", "Pusher"];

const sections = [
  {
    title: "For students",
    text: "Find roles, save the good ones, apply, and follow every application in one place.",
    shots: [
      { file: "student-internships", title: "Browse internships", text: "Search, field tabs and filters by field, city and company." },
      { file: "student-internship-detail", title: "Internship details", text: "Role, skills, deadline and the company's contact card." },
      { file: "student-applications", title: "Application tracking", text: "Every application with its status, from submitted to offer." },
      { file: "student-messages", title: "Messages", text: "Chat with companies about an application." },
    ],
  },
  {
    title: "For companies",
    text: "Post roles and review who applied.",
    shots: [
      { file: "company-applications", title: "Applicants", text: "The hiring pipeline, grouped by status." },
    ],
  },
  {
    title: "For admins",
    text: "Admins get extra tools to run the platform.",
    shots: [
      { file: "admin-students", title: "Students", text: "Every student profile, with quick access to profiles and messages." },
      { file: "admin-fields", title: "Fields of study", text: "Manage the fields that internships and students are sorted by." },
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

function Shot({ file, title, text, priority = false, sizes = "(min-width: 1400px) 600px, (min-width: 768px) 50vw, 100vw", className }) {
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
          priority={priority}
          className="h-auto w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]"
        />
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
    <>
      <header>
        <Container>
          <div className={sectionPadding}>
            <ArrowLink href="/#projects" direction="left" tone="muted">
              All projects
            </ArrowLink>
            <h1 className="mt-10 text-display uppercase text-fg md:mt-12">Internly</h1>
            <TagList items={["End of studies project", ...tech]} className="mt-8" />
          </div>
        </Container>
      </header>

      <Container>
        <Shot
          file="student-dashboard"
          title="Student dashboard"
          text="Open roles, companies hiring and the status of every application at a glance."
          sizes="(min-width: 1400px) 1240px, 100vw"
          priority
        />
      </Container>

      <Section divider={false}>
        <div className="grid items-baseline gap-8 md:grid-cols-2 md:gap-10">
          <SectionLabel>Overview</SectionLabel>
          <div data-reveal>
            <p className="text-lead text-fg">
              An internship platform with three workspaces: students find and apply to internships, companies post
              roles and review applicants, and admins run the whole catalog.
            </p>
            <p className="mt-6 text-body text-fg-muted">
              It includes messaging, saved roles and application tracking. The live demo&apos;s login form comes filled
              in with a demo student account.
            </p>
            <ArrowLink href="https://internly.alabaganne.com" className="mt-8">
              internly.alabaganne.com
            </ArrowLink>
          </div>
        </div>
      </Section>

      {sections.map((section) => (
        <Section key={section.title}>
          <div className="grid items-baseline gap-8 md:grid-cols-2 md:gap-10">
            <SectionLabel>{section.title}</SectionLabel>
            <p data-reveal className="text-body text-fg-muted">
              {section.text}
            </p>
          </div>
          <div className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {section.shots.map((shot) => (
              <Shot
                key={shot.file}
                {...shot}
                className={section.shots.length === 1 ? "md:col-span-2" : undefined}
                sizes={section.shots.length === 1 ? "(min-width: 1400px) 1240px, 100vw" : undefined}
              />
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}
