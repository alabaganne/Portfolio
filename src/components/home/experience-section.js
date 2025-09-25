import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const experiences = [
  {
    company: "Retain Health",
    role: "Software Engineer",
    period: "July 2021 - Present",
    location: "Boston, MA (Remote)",
    summary:
      "Developing core healthcare platform features across AngularJS, Express.js, Bootstrap, and MySQL.",
    achievements: [
      "Introduced Jest and Cypress suites covering unit, integration, and end-to-end workflows.",
      "Partnered with QA and UX to release patient-facing experiences that align with clinical requirements.",
      "Optimised database queries and API responses to maintain snappy dashboards at scale.",
    ],
    tech: ["AngularJS", "Express.js", "Bootstrap", "MySQL", "Jest", "Cypress"],
  },
  {
    company: "Realinflo",
    role: "Full Stack Web Developer Intern",
    period: "Feb 2021 - May 2021",
    location: "Hong Kong (Remote)",
    summary:
      "Built a Vue.js (Quasar) admin dashboard backed by Feathers.js services for real-estate intelligence.",
    achievements: [
      "Implemented REST integrations and optimised data fetching for large listing datasets.",
      "Coordinated roadmap updates with leadership to prioritise weekly releases.",
      "Shipped reporting features that accelerated enterprise onboarding.",
    ],
    tech: ["Vue.js", "Quasar", "Feathers.js", "Node.js", "REST APIs", "MySQL"],
  },
  {
    company: "Satoripop",
    role: "Full Stack Web Developer Intern",
    period: "July 2020 - Sept 2020",
    location: "Sousse, Tunisia",
    summary:
      "Delivered an employee management platform with a Vue.js frontend and Laravel backend services.",
    achievements: [
      "Converted PSD designs into responsive layouts with Bootstrap components.",
      "Documented backend endpoints using Swagger for smoother team collaboration.",
      "Implemented authentication and role-based access to secure HR data.",
    ],
    tech: ["Vue.js", "Laravel", "Bootstrap", "Swagger", "MySQL"],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="space-y-8">
      <SectionHeader
        eyebrow="Experience"
        title="Recent roles"
        description="Delivering dependable features across healthcare, real estate, and HR platforms."
      />
      <div className="space-y-6">
        {experiences.map((role) => (
          <Card key={`${role.company}-${role.period}`}>
            <CardHeader className="gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-2xl">{role.role}</CardTitle>
                  <p className="text-sm text-[var(--muted)]">{role.company} · {role.location}</p>
                </div>
                <p className="text-sm font-medium text-[var(--accent)]">{role.period}</p>
              </div>
            </CardHeader>
            <CardContent className="gap-4">
              <p className="text-base text-[var(--foreground)]">{role.summary}</p>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                {role.achievements.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm font-medium text-[var(--muted)]">
                Tools: <span className="font-normal">{role.tech.join(", ")}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
