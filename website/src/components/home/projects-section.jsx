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
  },
  {
    name: "Karta",
    tag: "Gift card store",
    href: "https://karta.alabaganne.com",
    image: "/projects/karta-demo.png",
  },
  {
    name: "PromptStream",
    tag: "AI dictation for Mac & Linux",
    href: "https://promptstream.alabaganne.com",
    image: "/projects/promptstream-demo.png",
  },
  {
    name: "BackupMaster",
    tag: "iPhone backups on macOS",
    href: "https://backupmaster.alabaganne.com",
    image: "/projects/backupmaster-demo.png",
  },
  {
    name: "EXODIA Store",
    tag: "Custom Shopify theme",
    href: "https://exodia-preview.myshopify.com/",
    previewPassword: "paglow",
    image: "/projects/exodia-demo.png",
  },
  {
    name: "Internly",
    tag: "Internship platform",
    href: "/projects/internly",
    image: "/projects/internly-demo.png",
  },
  {
    name: "ABSoft",
    tag: "Agency website",
    href: "https://absoft.alabaganne.com",
    image: "/projects/absoft-demo.png",
  },
  {
    name: "Taroura Arena",
    tag: "Gym & karate club website",
    href: "https://taroura-arena.alabaganne.com/",
    image: "/projects/taroura-arena-demo.png",
  },
  {
    name: "Martinez Auto Detail",
    tag: "Booking system",
    href: "https://booking.martinezautodetailwa.com/",
    image: "/projects/martinez-demo.png",
  },
  {
    name: "Satoripop RH",
    tag: "HR platform",
    href: "http://hr-management.alabaganne.com",
    image: "/projects/satoripop-rh-demo.png",
  },
  {
    name: "LeBonBureau",
    tag: "Office furniture store",
    href: "https://lebonbureau.alabaganne.com",
    image: "/projects/lebonbureau-demo.png",
  },
  {
    name: "Socialura",
    tag: "WordPress Store with Stripe checkout",
    href: "http://socialura.alabaganne.com",
    image: "/projects/socialura-demo.png",
  },
  {
    name: "Meet",
    tag: "Video meeting app",
    href: "http://jitsi.alabaganne.com",
    image: "/projects/meet-demo.png",
  },
  {
    name: "ATS Resume Builder",
    tag: "Resumes with PDF export",
    href: "https://ats-react-resume-builder.vercel.app",
    image: "/projects/ats-resume-builder-demo.png",
  },
  {
    name: "Eyedeal",
    tag: "Store landing page",
    href: "http://ecommerce.alabaganne.com",
    image: "/projects/eyedeal-demo.png",
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
