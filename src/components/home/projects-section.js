import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
        title="Selected work"
        description="Examples of products and platforms I have helped launch or grow."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.name}>
            <CardHeader className="gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
                {project.tagline}
              </span>
              <CardTitle className="text-2xl">{project.name}</CardTitle>
              <p className="text-sm text-[var(--muted)]">{project.description}</p>
            </CardHeader>
            <CardContent className="gap-4">
              <p className="text-sm text-[var(--muted)]">{project.impact}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[var(--border)] bg-slate-50 px-3 py-1 text-xs font-medium text-[var(--muted)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <span className="text-sm text-[var(--muted)]">
                {project.links?.project ? "Live product" : "Open source"}
              </span>
              <div className="flex flex-wrap gap-2">
                {project.links?.project ? (
                  <Button href={project.links.project} target="_blank" rel="noreferrer">
                    Visit site
                  </Button>
                ) : null}
                {project.links?.source ? (
                  <Button href={project.links.source} target="_blank" rel="noreferrer" variant="outline">
                    View code
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
