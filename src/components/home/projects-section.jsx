"use client";

import { SectionHeader } from "@/components/section-header";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

// Set `topPick: true` on a project to feature it under the Top Picks filter.
const projects = [
  {
    name: "MenuMate",
    domain: "menumate.net",
    href: "https://menumate.net",
    category: ["Web", "SaaS"],
    topPick: true,
    badge: "SaaS Founder",
    tag: "Live",
    description:
      "SaaS platform that lets restaurants create digital menus, generate QR codes, and accept real-time orders from a single dashboard. SEO-optimized and multilingual.",
    tech: ["Next.js", "React", "Tailwind", "Supabase", "PostgreSQL"],
    accent: "#1d4ed8",
    image: "/projects/menumate-demo.png",
  },
  {
    name: "Martinez Auto Detail",
    domain: "booking.martinezautodetailwa.com",
    href: "https://booking.martinezautodetailwa.com/",
    category: ["Web", "Freelance"],
    badge: "Freelance",
    tag: "Booking system",
    description:
      "Custom booking system with service selection, dynamic pricing, date/time picking, Square-powered card storage for no-show protection, and an owner dashboard.",
    tech: ["Next.js", "React", "Tailwind", "Square API"],
    accent: "#0f172a",
    image: "/projects/martinez-demo.png",
  },
  {
    name: "LeBonBureau",
    domain: "lebonbureau.alabaganne.com",
    href: "https://lebonbureau.alabaganne.com",
    image: "/projects/lebonbureau-demo.jpg",
    category: ["Web", "Founder"],
    badge: "Founder",
    tag: "E-commerce store",
    description:
      "A polished, modern e-commerce storefront for an office-furniture brand, with a refined responsive design, product catalog, admin dashboard, and Supabase-backed storage.",
    tech: ["Next.js", "React", "TypeScript", "Supabase"],
    accent: "#0f766e",
  },
  // {
  //   name: "Global Deals",
  //   domain: "global-deals.vercel.app",
  //   href: "https://global-deals.vercel.app",
  //   category: ["Web", "Freelance"],
  //   badge: "Freelance",
  //   tag: "3D Globe",
  //   description:
  //     "Interactive 3D globe with event markers, clustering, event linking with curved Bezier visualizations, admin panel, and authentication.",
  //   tech: ["React 18", "Mapbox GL", "Supabase", "Tiptap", "Tailwind v4"],
  //   accent: "#1e40af",
  //   image: "/projects/global-deals-demo.png",
  // },
  {
    name: "Internly",
    domain: "internly.alabaganne.com",
    href: "http://internly.alabaganne.com",
    category: ["Web", "Academic"],
    topPick: true,
    badge: "Academic",
    tag: "End of studies project",
    description:
      "Internship platform where students discover and apply to internships and companies post opportunities, with real-time notifications, tracking, and dashboards.",
    tech: ["Laravel", "Vue.js", "Inertia.js", "MySQL", "Pusher"],
    accent: "#1d4ed8",
    image: "/projects/internly-demo.png",
  },
  {
    name: "Satoripop RH",
    domain: "hr-management.alabaganne.com",
    href: "http://hr-management.alabaganne.com",
    category: ["Web", "Internship"],
    topPick: true,
    badge: "Internship · satoripop",
    tag: "HR platform",
    description:
      "Human resources management platform with role-based dashboards for managers, HR, project managers, and employees, built during my 2020 internship.",
    tech: ["Vue.js", "Laravel", "MySQL", "Bootstrap", "Swagger"],
    accent: "#1d4ed8",
    image: "/projects/satoripop-rh-demo.png",
  },
  {
    name: "Socialura",
    domain: "socialura.alabaganne.com",
    href: "http://socialura.alabaganne.com",
    category: ["Web", "Freelance"],
    topPick: true,
    badge: "Freelance · Upwork",
    tag: "E-commerce",
    description:
      "Built for an Upwork client, a modern, performance-optimized platform for selling digital social services with clean responsive UI/UX and Stripe payment integration.",
    tech: ["WordPress", "CSS", "Stripe", "Custom UI"],
    accent: "#0ea5e9",
    image: "/projects/socialura-demo.png",
  },
  {
    name: "Meet — Video Conferencing",
    domain: "jitsi.alabaganne.com",
    href: "http://jitsi.alabaganne.com",
    category: ["Web", "Internship"],
    badge: "Internship · satoripop",
    tag: "Built solo",
    description:
      "A Google Meet-style video meeting app built independently during my 2023 internship at satoripop with authentication, scheduling, protected pages, and Jitsi-powered calls.",
    tech: ["React", "TypeScript", "Node.js", "Express.js", "MySQL", "Jitsi SDK"],
    accent: "#2563eb",
    image: "/projects/meet-demo.png",
  },
  {
    name: "ATS Resume Builder",
    domain: "ats-react-resume-builder.vercel.app",
    href: "https://ats-react-resume-builder.vercel.app",
    category: ["Web"],
    badge: "Open",
    tag: "PDF export",
    description:
      "Resume builder with structured templates, real-time preview, and one-click PDF export.",
    tech: ["Next.js", "React", "Tailwind", "jsPDF"],
    accent: "#2563eb",
    image: "/projects/ats-resume-builder-demo.png",
  },
  {
    name: "Eyedeal — E-commerce UI",
    domain: "ecommerce.alabaganne.com",
    href: "http://ecommerce.alabaganne.com",
    category: ["Web", "Internship"],
    badge: "Internship · satoripop",
    tag: "PSD → responsive",
    description:
      "Client-side e-commerce landing page built from a PSD design with responsive layout, product sections, cart visuals, and interactive design elements.",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    accent: "#0ea5e9",
    image: "/projects/eyedeal-demo.png",
  },
];

function ProjectThumb({ project }) {
  const accent = project.accent || "#2563eb";
  const id = project.name.replace(/\W/g, "");

  return (
    <div className="relative aspect-[4/3] overflow-hidden border-b border-slate-200 bg-slate-50">
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.name} demo`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      ) : (
        <svg className="block h-full w-full" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id={`grid-${id}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke={accent} strokeWidth="0.5" strokeOpacity="0.08" />
            </pattern>
            <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={accent} stopOpacity="0.04" />
              <stop offset="1" stopColor={accent} stopOpacity="0.12" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill={`url(#bg-${id})`} />
          <rect width="400" height="240" fill={`url(#grid-${id})`} />
          <rect x="78" y="58" width="244" height="124" rx="12" fill="#fff" stroke={accent} strokeWidth="1.5" strokeOpacity=".5" />
          <rect x="98" y="82" width="112" height="8" rx="4" fill={accent} fillOpacity=".35" />
          <rect x="98" y="102" width="78" height="6" rx="3" fill={accent} fillOpacity=".16" />
          <rect x="98" y="130" width="70" height="30" rx="5" fill={accent} fillOpacity=".1" />
          <rect x="180" y="130" width="58" height="30" rx="5" fill={accent} fillOpacity=".16" />
          <rect x="250" y="130" width="52" height="30" rx="5" fill={accent} fillOpacity=".1" />
        </svg>
      )}
      <span
        className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.05em] text-white"
        style={{ background: accent }}
      >
        {project.badge}
      </span>
    </div>
  );
}

const TOP_PICKS = "Top Picks";

function matchesFilter(project, filter) {
  if (filter === "All") return true;
  if (filter === TOP_PICKS) return Boolean(project.topPick);
  return project.category.includes(filter);
}

export function ProjectsSection() {
  const categories = useMemo(
    () => [TOP_PICKS, "All", ...Array.from(new Set(projects.flatMap((project) => project.category)))],
    []
  );
  const [filter, setFilter] = useState(TOP_PICKS);
  const visible = projects.filter((project) => matchesFilter(project, filter));

  return (
    <section id="projects" className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="03 · Projects"
          title="Selected work, shipped."
          description="Selected freelance, founder, internship, and academic work across SaaS, e-commerce, and web applications."
        />
        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={
                "rounded-full border px-4 py-2 text-sm font-semibold transition " +
                (filter === category
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-600 hover:text-blue-600")
              }
              type="button"
              onClick={() => setFilter(category)}
            >
              {category}
              {category !== "All" ? (
                <span className="ml-1.5 text-xs opacity-60">
                  {projects.filter((project) => matchesFilter(project, category)).length}
                </span>
              ) : null}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-7 lg:grid-cols-2">
          {visible.map((project) => (
            <article
              key={project.name}
              className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-blue-100"
            >
              <ProjectThumb project={project} />
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-slate-950">
                    {project.href ? (
                      <a className="transition hover:text-blue-600" href={project.href} target="_blank" rel="noreferrer">
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.08em] text-slate-500">{project.tag}</p>
                </div>
                <p className="text-sm leading-7 text-slate-600">{project.description}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-4 text-sm">
                  <span className="font-mono text-xs uppercase tracking-[0.08em] text-slate-500">{project.category.join(" / ")}</span>
                  {project.href ? (
                    <a
                      className="inline-flex items-center gap-1.5 font-semibold !text-blue-600 hover:underline"
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit live
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-slate-500">private client work</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
