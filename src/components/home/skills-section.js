import { SectionHeader } from "@/components/section-header";
const skills = [
  "JavaScript (ES6+)",
  "TypeScript",
  "React",
  "Next.js",
  "Vue.js",
  "Laravel",
  "Node.js",
  "Express.js",
  "PHP",
  "MySQL",
  "MongoDB",
  "Supabase",
  "Tailwind CSS",
  "HTML5",
  "CSS3",
  "AWS",
  "WordPress",
  "Git & GitHub",
  "Linux",
  "Jest",
  "Cypress",
];

export function SkillsSection() {
  return (
    <section id="skills" className="space-y-8">
      <SectionHeader
        eyebrow="Skills"
        title="Technical toolkit"
        description="A snapshot of the languages, frameworks, and platforms I rely on to deliver projects."
      />
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--muted)]"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
