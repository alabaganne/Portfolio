import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";

import { SiteNavbar } from "@/components/site-navbar";

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

function Shot({ file, title, text, priority = false }) {
  const src = `/projects/internly/${file}.webp`;

  return (
    <figure>
      <a
        href={src}
        target="_blank"
        rel="noreferrer"
        className="block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_-28px_rgba(15,23,42,0.35)] transition hover:-translate-y-1"
      >
        <Image
          src={src}
          alt={`Internly ${title.toLowerCase()} screen`}
          width={2880}
          height={1800}
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority={priority}
          className="h-auto w-full"
        />
      </a>
      <figcaption className="mt-4">
        <p className="font-semibold text-slate-950">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
      </figcaption>
    </figure>
  );
}

export default function InternlyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-700">
      <SiteNavbar />

      <header className="bg-slate-50 px-5 pb-16 pt-32 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Link className="inline-flex items-center gap-2 text-sm font-semibold !text-slate-500 hover:!text-blue-600" href="/#projects">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All projects
          </Link>
          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-600 before:h-px before:w-6 before:bg-current">
                End of studies project
              </span>
              <h1 className="mt-4 font-display text-5xl font-semibold tracking-[-0.03em] text-slate-950 md:text-6xl">Internly</h1>
              <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                An internship platform with three workspaces. Students find and apply to internships, companies post roles and
                review applicants, and admins manage the whole catalog.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {tech.map((item) => (
                  <span key={item} className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start gap-3 lg:items-end">
              <a
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold !text-white transition hover:bg-blue-500"
                href="https://internly.alabaganne.com"
                target="_blank"
                rel="noreferrer"
              >
                Visit live
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <p className="text-sm text-slate-500">The login form comes filled in with a demo student account.</p>
            </div>
          </div>
          <div className="mt-12">
            <Shot file="student-dashboard" title="Student dashboard" text="Open roles, companies hiring and the status of every application at a glance." priority />
          </div>
        </div>
      </header>

      {sections.map((section, index) => (
        <section key={section.title} className={`px-5 py-16 sm:px-8 md:py-20 ${index % 2 ? "bg-slate-50" : "bg-white"}`}>
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-slate-950">{section.title}</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">{section.text}</p>
            <div className={`mt-10 grid gap-10 ${section.shots.length > 1 ? "lg:grid-cols-2" : "lg:max-w-3xl"}`}>
              {section.shots.map((shot) => (
                <Shot key={shot.file} {...shot} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <footer className="bg-[#07142b] px-5 py-16 text-center sm:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">Need a platform like this?</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold !text-white transition hover:bg-blue-500"
            href="/#contact"
          >
            <Mail className="h-4 w-4" aria-hidden />
            Get in touch
          </Link>
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold !text-white transition hover:border-blue-600 hover:bg-blue-600"
            href="/#projects"
          >
            More projects
          </Link>
        </div>
        <p className="mt-12 text-sm text-slate-500">© {new Date().getFullYear()} Ala Baganne. All rights reserved.</p>
      </footer>
    </main>
  );
}
