import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export const sectionPadding = "py-16 md:py-24 lg:py-36";

export function Section({ id, divider = true, padding = sectionPadding, className, children, ...props }) {
  return (
    <section id={id} className={className} {...props}>
      <Container>
        <div className={cn(padding, divider && "border-t border-line")}>{children}</div>
      </Container>
    </section>
  );
}

// "• About": the yellow-dot heading that names each section.
export function SectionLabel({ as: Heading = "h2", className, children }) {
  return (
    <Heading className={cn("text-label text-fg", className)}>
      <span aria-hidden className="mr-3 text-accent">
        •
      </span>
      {children}
    </Heading>
  );
}

// Label on the left half, content on the right: the layout most sections share.
export function SplitSection({ id, label, divider, className, children }) {
  return (
    <Section id={id} divider={divider} className={className}>
      <div className="grid items-baseline gap-8 md:grid-cols-2 md:gap-10">
        <SectionLabel>{label}</SectionLabel>
        <div>{children}</div>
      </div>
    </Section>
  );
}
