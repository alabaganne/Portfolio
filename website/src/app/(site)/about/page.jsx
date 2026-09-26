import { BiographySection, EducationSection, ExperienceSection } from "@/components/about";
import { PageHeader } from "@/components/page-header";

export const metadata = {
  title: "About | Ala Baganne — Full-Stack Software Engineer",
  description:
    "Experience, education and background of Ala Baganne, a full-stack software engineer in Monastir, Tunisia, with 5+ years building web apps, online stores and AI features.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Ala Baganne",
    description:
      "Experience, education and background of Ala Baganne, a full-stack software engineer with 5+ years building web apps, online stores and AI features.",
    type: "profile",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Get to know <br />
            <span className="text-accent">Ala</span>
          </>
        }
      />
      <BiographySection />
      <ExperienceSection />
      <EducationSection />
    </>
  );
}
