import { Bot, Cloud, Code, Database, Layers, TestTube2 } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag";

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
    <Section id="skills">
      <SectionHeading
        label="Skills"
        title={
          <>
            Full-stack, <span className="text-fg-subtle">end to end.</span>
          </>
        }
        description="Hands-on across the modern web stack, from typed frontends to async pipelines on managed cloud."
      />
      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-20 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map(({ name, icon: Icon, description, skills }, index) => (
          <div
            key={name}
            data-reveal
            style={{ "--reveal-delay": `${(index % 3) * 100}ms` }}
            className="flex flex-col bg-canvas p-7 md:p-8"
          >
            <Icon className="size-5 text-fg-subtle" aria-hidden />
            <h3 className="mt-8 text-lg font-medium tracking-[-0.02em] text-fg">{name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{description}</p>
            <TagList items={skills} className="mt-6" />
          </div>
        ))}
      </div>
    </Section>
  );
}
