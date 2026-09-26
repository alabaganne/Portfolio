import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Glow } from "@/components/ui/glow";
import { Eyebrow } from "@/components/ui/section";

// Opening block for inner pages: optional back link, label, large title and intro.
export function PageHeader({ back, label, title, description, children }) {
  return (
    <header className="relative isolate overflow-hidden">
      <Glow />
      <Container className="pb-16 pt-32 md:pb-20 md:pt-44">
        {back ? (
          <div className="mb-12 motion-safe:animate-rise">
            <ArrowLink href={back.href} direction="left" tone="muted">
              {back.label}
            </ArrowLink>
          </div>
        ) : null}
        {label ? <Eyebrow className="motion-safe:animate-rise">{label}</Eyebrow> : null}
        <h1 className="mt-6 max-w-5xl text-balance text-display text-fg motion-safe:animate-rise motion-safe:[animation-delay:80ms]">
          {title}
        </h1>
        {description ? (
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg-muted motion-safe:animate-rise motion-safe:[animation-delay:160ms] md:text-xl">
            {description}
          </p>
        ) : null}
        {children}
      </Container>
    </header>
  );
}
