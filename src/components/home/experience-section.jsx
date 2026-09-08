import { SectionHeader } from "@/components/section-header";
import { ExternalLink } from "lucide-react";

const experiences = [
  {
    role: "Software Engineer",
    company: "Retain Health, Inc.",
    type: "Part-time contract",
    location: "Boston, MA",
    mode: "Remote",
    period: "Aug 2021 — Present",
    summary:
      "Healthcare platform with 25,000+ users focused on Alzheimer's prevention through personalized lifestyle interventions.",
    achievements: [
      "Core contributor to RetainYourBrain, building and maintaining production features since August 2021.",
      "Built core features full-stack on AngularJS, Express.js, Next.js, Node.js, TypeScript and MySQL.",
      "Designed a dynamic form system with complex conditional logic powering personalized routines and topic recommendations.",
      "Created reusable AngularJS services with dependency injection to reduce redundant API calls and improve frontend performance.",
      "Introduced automated testing with Jest, Cypress, Mocha, Supertest, Karma, Protractor, plus GA4/GTM analytics.",
    ],
    tech: ["AngularJS", "Express.js", "React Native", "TypeScript", "MySQL", "AWS", "Google Analytics"],
    links: [{ label: "RetainYourBrain", href: "https://retainyourbrain.com", domain: "retainyourbrain.com" }],
  },
  {
    role: "Full-Stack & AI Engineer",
    company: "Wequity",
    type: "Part-time contract",
    location: "Brussels, Belgium",
    mode: "Remote",
    period: "Oct 2025 — May 2026",
    summary:
      "Legal tech company building AI-powered tools for law firms and notaries across Belgium and the Netherlands.",
    achievements: [
      "Built full-stack features for NORA, an AI-powered legal document processing platform handling English, French, and Dutch documents on React, FastAPI, and Supabase.",
      "Built a Smart Processing module that learns document transformation patterns from example pairs using LLM APIs and DSPy.",
      "Developed a RAG-based Knowledge Base where users query uploaded legal documents and get AI-generated answers with source citations.",
      "Integrated DeepL API for legal document translation across English, French and Dutch.",
      "Designed background task architecture using Google Cloud Tasks and Pub/Sub for async document processing.",
    ],
    tech: ["React", "FastAPI", "Supabase", "GCP", "Vertex AI", "LLM Integration", "OpenAI API", "DSPy", "BigQuery", "DeepL"],
    // links: [{ label: "NORA platform", href: "https://app.nora.legal", domain: "app.nora.legal" }],
  },
  {
    role: "Freelance Web Developer",
    company: "Upwork (Top Rated)",
    type: "Self-employed",
    location: "Worldwide",
    mode: "Remote",
    period: "Aug 2024 - Present",
    summary:
      "Top Rated freelancer with a 100% Job Success Score, building web applications, custom Shopify themes, e-commerce stores, and landing pages for individuals and businesses.",
    achievements: [
      "Completed seven Upwork contracts, each rated five stars.",
      "Built the Martinez Auto Detail booking system with dynamic pricing and secure card storage.",
      "Developed Socialura for a client, a WordPress website with Stripe checkout for digital service sales.",
    ],
    tech: ["Next.js", "React", "Node.js", "Tailwind", "Supabase", "Shopify", "WordPress", "Stripe", "Square"],
    links: [
      {
        label: "Upwork profile",
        href: "https://www.upwork.com/freelancers/~018064bc5b1d8ca3ce",
        domain: "Top Rated · 100% JSS",
      },
      { label: "Socialura", href: "http://socialura.alabaganne.com", domain: "socialura.alabaganne.com" },
    ],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "satoripop",
    type: "Internship",
    location: "Sousse, Tunisia",
    mode: "Hybrid",
    period: "Jul 2023 — Aug 2023",
    summary: "Built a Google Meet-style video meeting platform independently during the internship.",
    achievements: [
      "Built video meeting platform with authentication, meeting creation, scheduling, protected pages, and Jitsi-powered calls.",
      "Delivered both frontend and backend independently with React, TypeScript, Express.js and MySQL.",
    ],
    tech: ["React", "TypeScript", "Node.js", "Express.js", "MySQL", "Jitsi SDK"],
    links: [{ label: "Meet platform", href: "http://jitsi.alabaganne.com", domain: "jitsi.alabaganne.com" }],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "Realinflo",
    type: "Internship",
    location: "Hong Kong SAR",
    mode: "Remote",
    period: "Feb 2021 — May 2021",
    summary:
      "Built an admin dashboard for a real estate intelligence platform, working directly with the CTO via weekly milestones.",
    achievements: [
      "Built an admin dashboard with Vue.js and Node.js to manage and visualize property data.",
      "Delivered enhanced data visualization and reporting through weekly milestone reviews with the CTO.",
    ],
    tech: ["Vue.js", "Quasar", "Node.js", "Feathers.js", "MongoDB", "SCSS"],
  },
  {
    role: "Web Development Intern",
    company: "satoripop",
    type: "Internship",
    location: "Sousse, Tunisia",
    mode: "Hybrid",
    period: "Jul 2020 — Aug 2020",
    summary:
      "Designed and developed a web application to manage company employees and converted a PSD landing page design into a fully responsive site.",
    achievements: [
      "Built Satoripop RH, a Vue.js and Laravel HR platform with role-based dashboards for managers, HR, project managers and employees.",
      "Documented backend API endpoints using Swagger/OpenAPI for clean handoff and future contributors.",
      "Converted a PSD landing-page design into a responsive e-commerce front-end with hand-written HTML, CSS and JavaScript.",
    ],
    tech: ["Vue.js", "Laravel", "MySQL", "Bootstrap", "HTML", "CSS", "JavaScript"],
    links: [
      { label: "Satoripop RH", href: "http://hr-management.alabaganne.com", domain: "hr-management.alabaganne.com" },
      { label: "Eyedeal landing page", href: "http://ecommerce.alabaganne.com", domain: "ecommerce.alabaganne.com" },
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="relative overflow-hidden bg-[#0b1c3a] py-20 text-slate-300 md:py-28">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(180deg,#000_0%,transparent_72%)]"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          dark
          eyebrow="02 · Experience"
          title="Experience with international teams and clients."
          description="Five years of continuous shipping through long-term contracts, freelance wins, and product-led work for distributed teams."
        />
        <ol className="relative mt-14 space-y-10 md:before:absolute md:before:bottom-2 md:before:left-[18px] md:before:top-2 md:before:w-px md:before:bg-gradient-to-b md:before:from-transparent md:before:via-blue-900 md:before:to-transparent">
          {experiences.map((role) => (
            <li key={`${role.company}-${role.period}`} className="relative md:pl-14">
              <span
                className={
                  "absolute left-[11px] top-2 hidden h-4 w-4 rounded-full border-2 border-blue-500 bg-blue-500 shadow-[0_0_0_4px_rgba(37,99,235,0.15)] after:absolute after:-inset-2 after:animate-ping after:rounded-full after:bg-blue-500 after:opacity-25 md:block"
                }
              />
              <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-blue-300/40 hover:bg-white/[0.05] md:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-white">{role.role}</h3>
                  <span className="font-mono text-xs text-slate-400">{role.period}</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm font-medium text-blue-200">
                  <span>{role.company}</span>
                  <span className="text-slate-600">·</span>
                  <span>{role.type}</span>
                  <span className="text-slate-600">·</span>
                  <span>{role.location}</span>
                  <span className="text-slate-600">·</span>
                  <span>{role.mode}</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-300">{role.summary}</p>
                <ul className="mt-4 grid gap-2">
                  {role.achievements.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-7 text-slate-300">
                      <span className="mt-3 h-px w-2 flex-none bg-blue-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {role.links?.length ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {role.links.map((link) => (
                      <a
                        key={link.href}
                        className="inline-flex items-center gap-2 rounded-xl border border-blue-300/20 bg-blue-300/10 px-3.5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-blue-300/50 hover:bg-blue-300/15"
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                        <span>{link.label}</span>
                        <span className="border-l border-blue-300/30 pl-2 font-mono text-xs font-normal text-blue-200">
                          {link.domain}
                        </span>
                      </a>
                    ))}
                  </div>
                ) : null}
                <div className="mt-5 flex flex-wrap gap-2">
                  {role.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-blue-300/20 bg-blue-300/10 px-3 py-1 font-mono text-xs text-blue-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
