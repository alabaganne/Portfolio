import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { sectionPadding } from "@/components/ui/section";

// Opening block for inner pages: a big centered title, then the intro below a divider.
export function PageHeader({ back, title, description, children }) {
  return (
    <header>
      <Container>
        <div className={`${sectionPadding} text-center`}>
          {back ? (
            <ArrowLink href={back.href} direction="left" tone="muted" className="mb-10 md:mb-12">
              {back.label}
            </ArrowLink>
          ) : null}
          <h1 className="mx-auto max-w-[900px] text-balance text-display uppercase text-fg">{title}</h1>
        </div>
        {description || children ? (
          <div className={`${sectionPadding} border-t border-line text-center`}>
            {description ? <p className="mx-auto max-w-[700px] text-balance font-display text-title text-fg-muted">{description}</p> : null}
            {children}
          </div>
        ) : null}
      </Container>
    </header>
  );
}
