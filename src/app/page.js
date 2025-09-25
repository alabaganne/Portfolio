import {
  AboutSection,
  ContactSection,
  EducationSection,
  ExperienceSection,
  HeroSection,
  LanguagesSection,
  ProjectsSection,
  ServicesSection,
  SkillsSection,
} from "@/components/home";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#languages", label: "Languages" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden pb-24 text-slate-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(480px_circle_at_15%_20%,rgba(124,92,255,0.35),transparent),radial-gradient(460px_circle_at_85%_15%,rgba(45,212,191,0.18),transparent)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 pt-12 md:px-10 lg:px-16">
        <header className="flex flex-col gap-8 pb-12 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg font-semibold text-white shadow-[0_12px_40px_-18px_rgba(129,140,248,0.75)]">
              AB
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300">
                Portfolio 2025
              </p>
              <p className="text-base font-medium text-white/90">
                Ala Baganne · Full-Stack Developer
              </p>
            </div>
          </div>
          <nav
            aria-label="Primary"
            className="flex flex-wrap items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm backdrop-blur-lg md:px-6"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="rounded-full px-4 py-2 text-slate-200 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
            <Button
              href="#contact"
              size="sm"
              className="whitespace-nowrap bg-gradient-to-r from-[#6b63ff] to-[#22d3ee] px-5 text-xs font-semibold uppercase tracking-[0.25em]"
            >
              Let's talk
            </Button>
          </nav>
        </header>
        <div className="flex flex-col gap-24">
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ServicesSection />
          <ProjectsSection />
          <SkillsSection />
          <LanguagesSection />
          <EducationSection />
          <ContactSection />
        </div>
        <footer className="mt-24 border-t border-white/10 py-10 text-sm text-slate-500">
          <p>
            Crafted with curiosity and care · © {new Date().getFullYear()} Ala Baganne
          </p>
        </footer>
      </div>
    </main>
  );
}
