import { SectionHeader } from "@/components/section-header";
import { Bot, Cloud, Code, Database, Layers, TestTube2 } from "lucide-react";

const skillCategories = [
  {
    name: "AI & Modern Stack",
    icon: Bot,
    description:
      "LLM integration, RAG systems, vector databases, document processing pipelines.",
    skills: ["LLM Integration", "RAG Systems", "DSPy", "OpenAI API", "Vertex AI", "Vector DBs", "OCR", "Apache Tika", "AI Agents"],
  },
  {
    name: "Frontend & Storefronts",
    icon: Layers,
    description:
      "Responsive applications, custom Shopify themes, e-commerce stores, and landing pages.",
    skills: ["React.js", "Next.js", "TypeScript", "Shopify", "Custom Themes", "WordPress", "Vue.js", "AngularJS", "Tailwind CSS", "Shadcn UI", "React Native"],
  },
  {
    name: "Backend & Databases",
    icon: Database,
    description:
      "Scalable APIs, async pipelines, well-modeled relational and vector data.",
    skills: ["Node.js", "NestJS", "Express.js", "FastAPI", "Laravel", "PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    name: "Cloud & DevOps",
    icon: Cloud,
    description:
      "Production deployments, CI/CD, background processing, monitoring.",
    skills: ["AWS", "GCP Cloud Run", "Pub/Sub", "Cloud Tasks", "Docker", "Linux", "Supabase", "Vercel"],
  },
  {
    name: "Testing & Practices",
    icon: TestTube2,
    description:
      "Automated test suites, code review, API design, and Agile delivery.",
    skills: ["Jest", "Cypress", "Mocha", "Supertest", "Karma", "Protractor", "Agile/Scrum", "Git"],
  },
  {
    name: "Languages",
    icon: Code,
    description:
      "Strong typed and dynamic languages across the full stack.",
    skills: ["JavaScript", "TypeScript", "Python", "PHP", "SQL", "HTML5", "CSS3", "C"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="04 · Skills"
          title="Full-stack, end to end."
          description="Hands-on across the modern web stack, from typed frontends to async pipelines on managed cloud."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map(({ name, icon: Icon, description, skills }) => (
            <div key={name} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-blue-100">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-display text-lg font-semibold tracking-tight text-slate-950">{name}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
