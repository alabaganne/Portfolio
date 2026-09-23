import {
  AboutSection,
  ContactSection,
  EducationSection,
  ExperienceSection,
  HeroSection,
  ProjectsSection,
  SkillsSection,
} from "@/components/home";
import { SiteNavbar } from "@/components/site-navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-700">
      <SiteNavbar />

      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </main>
  );
}
