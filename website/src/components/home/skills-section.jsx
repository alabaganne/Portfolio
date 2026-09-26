import { SplitSection } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag";

const skills = [
  {
    name: "AI features",
    text: "I add AI to real products: document pipelines, search over your own files with cited answers, and agents that call LLM APIs.",
    tools: ["OpenAI API", "Vertex AI", "DSPy", "RAG", "Vector databases", "OCR", "AI agents"],
  },
  {
    name: "Front end & online stores",
    text: "Fast, responsive interfaces in React and Next.js, custom Shopify themes, WordPress stores and landing pages that load quickly and rank well.",
    tools: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Vue.js", "AngularJS", "React Native", "Shopify", "WordPress"],
  },
  {
    name: "Back end & data",
    text: "APIs, background jobs and databases that hold up in production, with clean data models and clear API docs.",
    tools: ["Node.js", "NestJS", "Express.js", "FastAPI", "Laravel", "Python", "PHP", "PostgreSQL", "MySQL", "MongoDB", "Supabase"],
  },
  {
    name: "Cloud & testing",
    text: "Deploys, queues and automated tests, so releases stay calm and bugs show up before users see them.",
    tools: ["AWS", "Google Cloud", "Docker", "Linux", "Vercel", "Jest", "Cypress", "Git", "Scrum"],
  },
];

export function SkillsSection() {
  return (
    <SplitSection id="skills" label="Skills" divider={false}>
      <ul>
        {skills.map((skill) => (
          <li key={skill.name} data-reveal className="mb-12 border-b border-line pb-12 last:mb-0 last:border-0 last:pb-0">
            <h3 className="text-title text-fg">{skill.name}</h3>
            <p className="mt-6 text-body text-fg-muted">{skill.text}</p>
            <TagList items={skill.tools} className="mt-6" />
          </li>
        ))}
      </ul>
    </SplitSection>
  );
}
