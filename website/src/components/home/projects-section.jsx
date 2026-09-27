import { ProjectMarquee } from "@/components/home/project-marquee";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section";

// Projects alternate between the two rows, so keep the strongest ones near the top.
const projects = [
  {
    name: "MenuMate",
    tag: "Digital menus for restaurants",
    href: "https://menumate.net",
    image: "/projects/menumate-demo.png",
    tech: ["Next.js", "React", "Tailwind", "Supabase", "PostgreSQL"],
  },
  {
    name: "Karta",
    tag: "Gift card store",
    href: "https://karta.alabaganne.com",
    image: "/projects/karta-demo.png",
    tech: ["Next.js", "TypeScript", "Tailwind", "MySQL", "Drizzle"],
  },
  {
    name: "PromptStream",
    tag: "AI dictation for Mac & Linux",
    href: "https://promptstream.alabaganne.com",
    image: "/projects/promptstream-demo.png",
    tech: ["Electron", "React", "TypeScript", "Next.js", "Supabase"],
  },
  {
    name: "BackupMaster",
    tag: "iPhone backups on macOS",
    href: "https://backupmaster.alabaganne.com",
    image: "/projects/backupmaster-demo.png",
    tech: ["Swift", "SwiftUI", "libimobiledevice", "Next.js", "SQLite"],
  },
  {
    name: "EXODIA Store",
    tag: "Custom Shopify theme",
    href: "https://exodia-preview.myshopify.com/",
    previewPassword: "paglow",
    image: "/projects/exodia-demo.png",
    tech: ["Shopify", "Liquid", "JavaScript", "CSS"],
  },
  {
    name: "Internly",
    tag: "Internship platform",
    href: "/projects/internly",
    image: "/projects/internly-demo.png",
    tech: ["Laravel", "Vue.js", "Inertia.js", "MySQL", "Pusher"],
  },
  {
    name: "ABSoft",
    tag: "Agency website",
    href: "https://absoft.alabaganne.com",
    image: "/projects/absoft-demo.png",
    tech: ["Next.js", "React", "TypeScript", "CSS Modules", "Resend"],
  },
  {
    name: "Taroura Arena",
    tag: "Gym & karate club website",
    href: "https://taroura-arena.alabaganne.com/",
    image: "/projects/taroura-arena-demo.png",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    name: "Martinez Auto Detail",
    tag: "Booking system",
    href: "https://booking.martinezautodetailwa.com/",
    image: "/projects/martinez-demo.png",
    tech: ["Next.js", "React", "Tailwind", "Square API"],
  },
  {
    name: "Satoripop RH",
    tag: "HR platform",
    href: "http://hr-management.alabaganne.com",
    image: "/projects/satoripop-rh-demo.png",
    tech: ["Vue.js", "Laravel", "MySQL", "Bootstrap", "Swagger"],
  },
  {
    name: "LeBonBureau",
    tag: "Office furniture store",
    href: "https://lebonbureau.alabaganne.com",
    image: "/projects/lebonbureau-demo.png",
    tech: ["Next.js", "Medusa", "TypeScript", "Tailwind"],
  },
  {
    name: "Socialura",
    tag: "WordPress Store with Stripe checkout",
    href: "http://socialura.alabaganne.com",
    image: "/projects/socialura-demo.png",
    tech: ["WordPress", "CSS", "Stripe", "Custom UI"],
  },
  {
    name: "Meet",
    tag: "Video meeting app",
    href: "http://jitsi.alabaganne.com",
    image: "/projects/meet-demo.png",
    tech: ["React", "TypeScript", "Node.js", "Express.js", "MySQL", "Jitsi SDK"],
  },
  {
    name: "Resume Studio",
    tag: "Résumés with PDF & Word export",
    href: "https://react-resume-studio.vercel.app",
    image: "/projects/resume-studio-demo.png",
    tech: ["Next.js", "TypeScript", "Tailwind", "jsPDF", "docx"],
  },
  {
    name: "Eyedeal",
    tag: "Store landing page",
    href: "http://ecommerce.alabaganne.com",
    image: "/projects/eyedeal-demo.png",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
  },
];

const rows = [0, 1].map((row) => projects.filter((_, index) => index % 2 === row));

export function ProjectsSection() {
  return (
    <section id="projects" className="rounded-3xl bg-surface">
      <Container>
        <div data-reveal className="grid items-baseline gap-3 pt-16 md:grid-cols-2 md:gap-10 md:pt-24 lg:pt-36">
          <SectionLabel>Selected work</SectionLabel>
          <p className="font-display text-heading-xs text-fg-faint md:justify-self-end">2020—2026</p>
        </div>
      </Container>
      <div data-reveal className="mt-10 grid gap-2 pb-16 md:mt-12 md:gap-6 md:pb-24 lg:pb-36">
        <ProjectMarquee projects={rows[0]} />
        <ProjectMarquee projects={rows[1]} reverse />
      </div>
    </section>
  );
}
