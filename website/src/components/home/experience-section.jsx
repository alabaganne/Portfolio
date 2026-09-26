import { ArrowLink } from "@/components/ui/arrow-link";
import { Section, SectionHeading } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag";

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
    <Section id="experience">
      <SectionHeading
        label="Experience"
        title={
          <>
            Experience with international <span className="text-fg-subtle">teams and clients.</span>
          </>
        }
        description="Five years of continuous shipping through long-term contracts, freelance wins, and product-led work for distributed teams."
      />
      <ol className="mt-14 divide-y divide-line border-t border-line md:mt-20">
        {experiences.map((role) => (
          <li
            key={`${role.company}-${role.period}`}
            data-reveal
            className="grid gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-14"
          >
            <div className="md:col-span-4 lg:col-span-3">
              <p className="text-sm tabular-nums text-fg-subtle">{role.period}</p>
              <p className="mt-3 font-medium text-fg">{role.company}</p>
              <p className="mt-1 text-sm leading-relaxed text-fg-subtle">
                {role.type} · {role.location} · {role.mode}
              </p>
            </div>
            <div className="md:col-span-8 lg:col-span-9">
              <h3 className="text-title text-fg">{role.role}</h3>
              <p className="mt-4 max-w-3xl leading-relaxed text-fg-muted">{role.summary}</p>
              <ul className="mt-6 max-w-3xl space-y-3">
                {role.achievements.map((item) => (
                  <li key={item} className="flex gap-4 text-[15px] leading-relaxed text-fg-muted">
                    <span aria-hidden className="mt-[0.8em] h-px w-3 flex-none bg-fg-subtle" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {role.links?.length ? (
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {role.links.map((link) => (
                    <ArrowLink key={link.href} href={link.href}>
                      {link.label}
                      <span className="ml-2 font-normal text-fg-subtle">{link.domain}</span>
                    </ArrowLink>
                  ))}
                </div>
              ) : null}
              <TagList items={role.tech} className="mt-6" />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
