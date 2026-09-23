import { SectionHeader } from "@/components/section-header";
import { Card } from "@/components/ui/card";
import { LayoutTemplate, ShoppingCart, Workflow } from "lucide-react";

const services = [
  {
    title: "Advanced Web Applications",
    description:
      "Deliver complex, data-heavy apps with robust business logic, real-time UX, and scalable backends.",
    icon: Workflow,
  },
  {
    title: "Custom Ecommerce Platforms",
    description:
      "Craft tailored storefronts with custom catalogs, checkout flows, and integrations beyond off-the-shelf themes.",
    icon: ShoppingCart,
  },
  {
    title: "WordPress Experience Sites",
    description:
      "Design and build WordPress themes and blocks that stay fast, secure, and simple for teams to update.",
    icon: LayoutTemplate,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="space-y-8">
      <SectionHeader
        eyebrow="SERVICES"
        title="How I can help"
        description="End-to-end delivery for startups and teams that need polished apps, ecommerce experiences, and WordPress builds."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {services.map(({ title, description, icon: Icon }) => (
          <Card key={title} className="h-full border-white/10 bg-white/[0.04] p-6">
            <div className="flex h-full flex-col gap-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-400/10 text-sky-400">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm text-slate-300">{description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
