import { TagList } from "@/components/ui/tag";
import { Section, SectionHeading } from "@/components/ui/section";

const services = [
  {
    title: "Web applications & SaaS",
    description:
      "Full-stack products from database to deployment: dashboards, booking systems, internal tools and SaaS products.",
    tags: ["Next.js", "React", "Node.js", "Supabase", "PostgreSQL"],
  },
  {
    title: "AI features & integrations",
    description:
      "LLM features built into your product: RAG knowledge bases, document processing pipelines and translation workflows.",
    tags: ["OpenAI API", "Vertex AI", "DSPy", "RAG", "FastAPI"],
  },
  {
    title: "Shopify themes & e-commerce",
    description:
      "Custom Shopify themes and online stores with product catalogs, variants, search, cart and payment integrations.",
    tags: ["Shopify", "Liquid", "Stripe", "Square"],
  },
  {
    title: "Landing pages & websites",
    description:
      "Fast, responsive and SEO-ready websites for businesses and individuals, in one language or several.",
    tags: ["Next.js", "Tailwind", "WordPress", "Resend"],
  },
];

export function ServicesSection() {
  return (
    <Section id="services">
      <SectionHeading
        label="Services"
        title={
          <>
            What I can build <span className="text-fg-subtle">for you.</span>
          </>
        }
        description="Web and application development, AI integration, custom Shopify themes, e-commerce, landing pages, database work, mobile apps and custom software."
      />
      <ol className="mt-14 divide-y divide-line border-t border-line md:mt-20">
        {services.map((service, index) => (
          <li
            key={service.title}
            data-reveal
            className="group grid gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-10"
          >
            <span className="text-sm tabular-nums text-fg-subtle md:col-span-4 md:pt-1.5 lg:col-span-3">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-title text-fg transition-transform duration-500 ease-out-expo md:col-span-8 lg:col-span-5 lg:group-hover:translate-x-1.5">
              {service.title}
            </h3>
            <div className="md:col-span-8 md:col-start-5 lg:col-span-4 lg:col-start-9">
              <p className="leading-relaxed text-fg-muted">{service.description}</p>
              <TagList items={service.tags} className="mt-5" />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
