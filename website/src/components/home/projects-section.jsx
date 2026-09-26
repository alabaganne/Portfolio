"use client";

import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/home/project-card";
import { FilterPills } from "@/components/ui/filter-pills";
import { Section, SectionHeading } from "@/components/ui/section";

// Set `topPick: true` on a project to feature it under the Top Picks filter.
const projects = [
  {
    name: "MenuMate",
    domain: "menumate.net",
    href: "https://menumate.net",
    category: ["Web", "SaaS"],
    topPick: true,
    badge: "SaaS",
    tag: "Live",
    description:
      "SaaS platform that lets restaurants create digital menus, generate QR codes, and accept real-time orders from a single dashboard. SEO-optimized and multilingual.",
    tech: ["Next.js", "React", "Tailwind", "Supabase", "PostgreSQL"],
    accent: "#1d4ed8",
    image: "/projects/menumate-demo.png",
  },
  {
    name: "Karta",
    domain: "karta.alabaganne.com",
    href: "https://karta.alabaganne.com",
    category: ["Web"],
    topPick: true,
    badge: "E-commerce",
    tag: "Gift card store",
    description:
      "Online store for gaming and streaming gift cards in Tunisia, where most people can't pay online with an international card. Buyers pay in dinars by D17, bank transfer or cash, and get their code by email. French, English and Arabic.",
    tech: ["Next.js", "TypeScript", "Tailwind", "MySQL", "Drizzle"],
    accent: "#e32a35",
    image: "/projects/karta-demo.png",
  },
  {
    name: "PromptStream",
    domain: "promptstream.alabaganne.com",
    href: "https://promptstream.alabaganne.com",
    category: ["Desktop", "SaaS"],
    topPick: true,
    badge: "Desktop",
    tag: "AI dictation for macOS & Linux",
    description:
      "System-wide AI dictation app that turns speech into clean text and pastes it into the active app. Includes configurable shortcuts, a personal dictionary, multilingual transcription, and searchable local history.",
    tech: ["Electron", "React", "TypeScript", "Next.js", "Supabase"],
    accent: "#b45309",
    image: "/projects/promptstream-demo.png",
  },
  {
    name: "BackupMaster",
    domain: "backupmaster.alabaganne.com",
    href: "https://backupmaster.alabaganne.com",
    category: ["Desktop"],
    topPick: true,
    badge: "macOS",
    tag: "Native macOS app",
    description:
      "Native macOS app for backing up iPhone photos and videos over USB or local Wi-Fi. Copies only missing files, retries interrupted transfers, organizes media by date or device, and includes a local photo and video gallery.",
    tech: ["Swift", "SwiftUI", "libimobiledevice", "Next.js", "SQLite"],
    accent: "#15803d",
    image: "/projects/backupmaster-demo.png",
  },
  {
    name: "EXODIA Store",
    domain: "exodia-preview.myshopify.com",
    href: "https://exodia-preview.myshopify.com/",
    linkLabel: "View preview",
    previewPassword: "paglow",
    category: ["Web"],
    topPick: true,
    badge: "Shopify",
    tag: "Custom Shopify theme",
    description:
      "I designed and developed a custom Shopify theme for exodiatn.com, a Tunisian clothing brand. The storefront includes responsive Streetwear and Techwear collections, product variants, search, and cart interactions, with French content and pricing in Tunisian dinars.",
    tech: ["Shopify", "Liquid", "JavaScript", "CSS"],
    accent: "#c2410c",
    image: "/projects/exodia-demo.png",
  },
  {
    name: "ABSoft",
    domain: "absoft.alabaganne.com",
    href: "https://absoft.alabaganne.com",
    category: ["Web"],
    topPick: true,
    badge: "Agency",
    tag: "Digital agency website",
    description:
      "Website I built to run my web and mobile agency for Tunisian businesses. French and English versions, a page per service with prices and FAQs, a contact form that sends email through Resend, WhatsApp contact, and share images drawn at build time.",
    tech: ["Next.js", "React", "TypeScript", "CSS Modules", "Resend"],
    accent: "#4334a8",
    image: "/projects/absoft-demo.png",
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
    category: ["Web"],
    badge: "E-commerce",
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
    href: "https://internly.alabaganne.com",
    details: "/projects/internly",
    category: ["Web", "Academic"],
    topPick: true,
    badge: "Academic",
    tag: "End of studies project",
    description:
      "Internship platform where students find and apply to internships, companies post roles and review applicants, and admins manage students, companies, fields and skills. Includes messaging, saved roles and application tracking.",
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
    name: "Taroura Arena",
    domain: "taroura-arena.alabaganne.com",
    href: "https://taroura-arena.alabaganne.com/",
    category: ["Web", "Freelance"],
    topPick: true,
    badge: "Freelance",
    tag: "Gym & karate club website",
    description:
      "Website for Taroura Arena, a gym and karate club in Jemmal, Tunisia. Full-screen video hero, training programmes, weekly class schedule, pricing plans, and trial-session booking by form or WhatsApp. French content, mobile-first.",
    tech: ["HTML", "CSS", "JavaScript"],
    accent: "#e10600",
    image: "/projects/taroura-arena-demo.png",
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
  const [filterChanged, setFilterChanged] = useState(false);
  const visible = projects.filter((project) => matchesFilter(project, filter));

  const selectFilter = (category) => {
    setFilter(category);
    setFilterChanged(true);
  };

  return (
    <Section id="projects" divider={false} padding="pb-20 pt-16 md:pb-28 md:pt-24">
      <SectionHeading
        label="Work"
        title={
          <>
            Selected work, <span className="text-fg-subtle">shipped.</span>
          </>
        }
        description="Selected freelance, internship, and academic work across SaaS, e-commerce, and web applications."
      >
        <FilterPills
          className="mt-10"
          label="Filter projects"
          options={categories.map((category) => ({
            value: category,
            count: category === "All" ? undefined : projects.filter((project) => matchesFilter(project, category)).length,
          }))}
          value={filter}
          onChange={selectFilter}
        />
      </SectionHeading>

      <div key={filter} className="mt-14 grid gap-x-8 gap-y-16 md:mt-20 md:grid-cols-2 md:gap-y-20">
        {visible.map((project, index) => (
          <div
            key={project.name}
            data-reveal={filterChanged ? undefined : ""}
            style={filterChanged ? { animationDelay: `${Math.min(index, 5) * 60}ms` } : { "--reveal-delay": `${(index % 2) * 120}ms` }}
            className={filterChanged ? "motion-safe:animate-rise" : undefined}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </Section>
  );
}
