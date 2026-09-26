import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function Section({ id, divider = true, padding = "py-20 md:py-28", className, children, ...props }) {
  return (
    <section id={id} className={className} {...props}>
      <Container>
        <div className={cn(padding, divider && "border-t border-line")}>{children}</div>
      </Container>
    </section>
  );
}

export function Eyebrow({ as: Component = "p", className, children }) {
  return (
    <Component className={cn("flex items-center gap-2.5 text-sm font-medium text-fg-muted", className)}>
      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      {children}
    </Component>
  );
}

// Label in the left column, heading and intro in the right: the layout every home section shares.
export function SectionHeading({ label, title, description, children, className, as: Heading = "h2" }) {
  return (
    <div data-reveal className={cn("grid gap-6 md:grid-cols-12 md:gap-8", className)}>
      <div className="md:col-span-4 md:pt-3 lg:col-span-3">
        <Eyebrow>{label}</Eyebrow>
      </div>
      <div className="md:col-span-8 lg:col-span-9">
        <Heading className="max-w-4xl text-balance text-heading text-fg">{title}</Heading>
        {description ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">{description}</p> : null}
        {children}
      </div>
    </div>
  );
}
