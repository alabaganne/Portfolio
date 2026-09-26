import Image from "next/image";

import { PageHeader } from "@/components/page-header";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Button, ButtonArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

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

const facts = [
  ["Type", "End of studies project"],
  ["Stack", tech.join(", ")],
  ["Workspaces", "Students, companies and admins"],
];

function Shot({ file, title, text, priority = false, sizes = "(min-width: 1240px) 880px, (min-width: 768px) 66vw, 100vw" }) {
  const src = `/projects/internly/${file}.webp`;

  return (
    <figure data-reveal className="group">
      <a href={src} target="_blank" rel="noreferrer" className="relative block overflow-hidden rounded-2xl bg-surface">
        <Image
          src={src}
          alt={`Internly ${title.toLowerCase()} screen`}
          width={2880}
          height={1800}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.02]"
        />
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10" />
      </a>
      <figcaption className="mt-5">
        <p className="font-medium text-fg">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-fg-muted">{text}</p>
      </figcaption>
    </figure>
  );
}

export default function InternlyPage() {
  return (
    <>
      <PageHeader
        back={{ href: "/#projects", label: "All projects" }}
        label="Case study"
        title="Internly"
        description="An internship platform with three workspaces. Students find and apply to internships, companies post roles and review applicants, and admins manage the whole catalog."
      >
        <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line motion-safe:animate-rise motion-safe:[animation-delay:240ms] sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(([label, value]) => (
            <div key={label} className="bg-canvas p-6">
              <dt className="text-sm text-fg-subtle">{label}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-fg">{value}</dd>
            </div>
          ))}
          <div className="bg-canvas p-6">
            <dt className="text-sm text-fg-subtle">Live demo</dt>
            <dd className="mt-2">
              <ArrowLink href="https://internly.alabaganne.com">
                internly.alabaganne.com
              </ArrowLink>
              <p className="mt-1 text-sm leading-relaxed text-fg-muted">The login form comes filled in with a demo student account.</p>
            </dd>
          </div>
        </dl>
      </PageHeader>

      <Container className="pb-8">
        <Shot
          file="student-dashboard"
          title="Student dashboard"
          text="Open roles, companies hiring and the status of every application at a glance."
          sizes="(min-width: 1240px) 1176px, 100vw"
          priority
        />
      </Container>

      {sections.map((section) => (
        <Section key={section.title}>
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div data-reveal className="md:col-span-4 lg:col-span-3">
              <div className="md:sticky md:top-28">
                <h2 className="text-title text-fg">{section.title}</h2>
                <p className="mt-3 leading-relaxed text-fg-muted">{section.text}</p>
              </div>
            </div>
            <div className="grid gap-14 md:col-span-8 lg:col-span-9">
              {section.shots.map((shot) => (
                <Shot key={shot.file} {...shot} />
              ))}
            </div>
          </div>
        </Section>
      ))}

      <Section>
        <div data-reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-xl text-heading text-fg">
            Need a platform <span className="text-fg-subtle">like this?</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button href="#contact" size="lg">
              Get in touch
              <ButtonArrow />
            </Button>
            <Button href="/#projects" variant="secondary" size="lg">
              More projects
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
