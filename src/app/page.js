import {
  ContactSection,
  ExperienceSection,
  HeroSection,
  ProjectsSection,
  ServicesSection,
  SkillsSection,
} from "@/components/home";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function Home() {
  return (
    <main className="pb-16 text-[var(--foreground)]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-12 md:px-10 lg:px-16">
        <header className="flex flex-col gap-6 border-b border-[var(--border)] pb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="text-xl font-semibold tracking-tight">
              Ala Baganne
            </Link>
            <p className="text-sm text-[var(--muted)]">Full-stack developer specialising in reliable web products.</p>
          </div>
          <nav aria-label="Primary" className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
            <Button href="#contact" size="sm">
              Let's talk
            </Button>
          </nav>
        </header>
        <div className="mt-16 flex flex-col gap-24">
          <HeroSection />
          <ServicesSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </div>
        <footer className="mt-24 border-t border-[var(--border)] pt-8 text-sm text-[var(--muted)]">
          <p>© {new Date().getFullYear()} Ala Baganne. Built with accessibility and performance in mind.</p>
        </footer>
      </div>
    </main>
  );
}
