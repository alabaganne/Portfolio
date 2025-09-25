import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "MenuMate",
    tagline: "Digital menus for restaurants",
    description:
      "A conversion-focused platform for restaurants to publish QR menus, manage pricing in real time, and capture diner feedback.",
    impact:
      "Reduced menu update time from days to minutes while increasing upsell opportunities.",
    tech: ["Next.js", "React", "Supabase", "Tailwind CSS", "React PDF"],
    links: {
      project: "https://www.menumate.net",
    },
  },
  {
    name: "ATS Resume Builder",
    tagline: "Automated resume generation",
    description:
      "ATS-friendly resume builder with live previews, PDF export, and reusable templates for rapid iteration.",
    impact: "Helps candidates create polished resumes in minutes.",
    tech: ["Next.js", "React", "React PDF", "TypeScript"],
    links: {
      project: "https://ats-react-resume-builder.vercel.app/",
      source: "https://github.com/alabaganne/react-resume-builder",
    },
  },
  {
    name: "GoStage",
    tagline: "Internship platform for students",
    description:
      "Matchmaking portal connecting students, university staff, and company recruiters with workflows and messaging.",
    impact:
      "Streamlined internship applications with tracking dashboards and document sharing.",
    tech: ["Laravel", "Vue.js", "Tailwind CSS", "MySQL"],
    links: {
      source: "https://github.com/alabaganne/GoStage.tn",
    },
  },
  {
    name: "Atlas Learning",
    tagline: "Immersive education analytics",
    description:
      "Analytics dashboards and cohort insights for an EdTech SaaS with fine-grained permissions and guided onboarding.",
    impact:
      "Delivered actionable insights for 20k+ learners with sub-second reporting latency.",
    tech: ["Vue", "Laravel", "Inertia", "Tailwind CSS"],
    links: {
      project: null,
    },
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="space-y-10">
      <SectionHeader
        eyebrow="Projects"
        title={
          <>
            A small selection of <span className="gradient-text">recent projects</span>
          </>
        }
        description="Exploring multi-platform experiences crafted for clarity, conversion, and delight."
        className="text-center"
      />
      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project) => (
          <Card
            key={project.name}
            className="group relative overflow-hidden border-white/15 bg-[rgba(18,21,47,0.78)] p-0"
          >
            <div className="relative overflow-hidden">
              <div className="aspect-[16/10] w-full overflow-hidden bg-[radial-gradient(220px_circle_at_20%_20%,rgba(124,92,255,0.45),transparent),radial-gradient(280px_circle_at_80%_30%,rgba(34,211,238,0.3),transparent)]">
                <div className="flex h-full w-full items-center justify-center text-4xl font-semibold uppercase tracking-[0.5em] text-white/20">
                  {project.name}
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0f1126] to-transparent" aria-hidden />
            </div>
            <CardHeader className="gap-4 px-8 pt-8">
              <Badge className="w-fit bg-white/10 px-4 py-1 text-[0.6rem] tracking-[0.35em] text-slate-200">
                {project.tagline}
              </Badge>
              <CardTitle className="text-2xl text-white">{project.name}</CardTitle>
              <CardContent className="mt-0 gap-3 p-0 text-sm text-slate-200">
                <p className="leading-relaxed text-slate-300">{project.description}</p>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{project.impact}</p>
              </CardContent>
            </CardHeader>
            <CardContent className="px-8 pb-6">
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech) => (
                  <Badge key={tech} variant="subtle" className="border-white/10 bg-white/10 text-[0.65rem]">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="items-center justify-between border-t border-white/10 px-8 py-6">
              <div className="text-xs uppercase tracking-[0.35em] text-slate-400">
                {project.links?.project ? "Live product" : "Source available"}
              </div>
              <div className="flex flex-wrap gap-3">
                {project.links?.project ? (
                  <Button
                    href={project.links.project}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 text-xs font-semibold uppercase tracking-[0.3em]"
                  >
                    Check live site
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </Button>
                ) : null}
                {project.links?.source ? (
                  <Button
                    href={project.links.source}
                    target="_blank"
                    rel="noreferrer"
                    variant="outline"
                    className="px-5 text-xs font-semibold uppercase tracking-[0.3em] text-slate-100"
                  >
                    View source
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </Button>
                ) : null}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
