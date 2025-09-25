import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Product-ready web apps",
    description:
      "From scoping to deployment, I plan and build full-stack applications that stay maintainable as your roadmap grows.",
    points: ["Responsive, accessible interfaces", "Robust APIs and testing", "Deployment pipelines and monitoring"],
  },
  {
    title: "Ecommerce experiences",
    description:
      "Custom storefronts and checkout flows tailored to your catalogue, integrations, and analytics needs.",
    points: ["Headless or traditional builds", "Conversion-focused UX", "Inventory and payment integrations"],
  },
  {
    title: "Content-driven sites",
    description:
      "Marketing and editorial sites powered by WordPress or modern CMS solutions, optimised for speed and SEO.",
    points: ["Reusable blocks and themes", "Author-friendly editing", "Performance and schema best practices"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="space-y-8">
      <SectionHeader
        eyebrow="Services"
        title="Ways I partner with teams"
        description="Practical engagements that combine strategy, design empathy, and dependable engineering."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map(({ title, description, points }) => (
          <Card key={title}>
            <CardHeader className="gap-3">
              <CardTitle className="text-xl">{title}</CardTitle>
              <p className="text-sm text-[var(--muted)]">{description}</p>
            </CardHeader>
            <CardContent className="gap-2">
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
