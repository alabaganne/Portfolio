import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { SmartLink } from "@/components/ui/smart-link";
import { footerLinks, site, socialLinks } from "@/lib/site";

const contactLinks = [
  { href: `mailto:${site.email}`, label: "Email" },
  { href: site.phone.href, label: site.phone.label },
  { href: site.resume, label: "Resume (PDF)" },
];

function FooterList({ label, links }) {
  return (
    <nav aria-label={label}>
      <ul className="grid gap-4">
        {links.map((link) => (
          <li key={link.href}>
            <SmartLink href={link.href} className="font-medium text-fg transition-opacity duration-250 hover:opacity-80">
              {link.label}
            </SmartLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="motion-safe:animate-page-in">
      <Container>
        <div
          data-reveal
          className="-mx-6 bg-surface px-6 py-16 text-center sm:mx-0 sm:rounded-xl sm:px-10 md:px-20 md:py-24 lg:py-36"
        >
          <h2 className="text-display uppercase text-fg">Let’s work together</h2>
          <p className="mt-10 font-display text-[clamp(1.25rem,5.4vw,4rem)] font-medium uppercase leading-[1.1] tracking-[0.015em] text-accent [overflow-wrap:anywhere] md:mt-12">
            <span aria-hidden>• </span>
            <a href={`mailto:${site.email}`} className="transition-opacity duration-250 hover:opacity-80">
              {site.email}
            </a>
          </p>
          <p className="mx-auto mt-8 max-w-[34rem] text-balance text-body text-fg-muted">
            Have a project or question? I’d be glad to hear from you.
          </p>
        </div>

        <div className="py-16 md:py-24 lg:py-36">
          <div className="grid gap-10 sm:grid-cols-3 lg:grid-cols-[3fr_1fr_1fr_1fr]">
            <div className="sm:col-span-3 lg:col-span-1">
              <Logo />
            </div>
            <FooterList label="Site" links={footerLinks} />
            <FooterList label="Social" links={socialLinks} />
            <FooterList label="Contact" links={contactLinks} />
          </div>
          <div className="mt-16 flex flex-wrap gap-x-12 gap-y-4 text-sm font-medium text-fg-faint">
            <p>
              © {new Date().getFullYear()} <span className="text-fg-muted">{site.name}</span>
            </p>
            <p>{site.location}</p>
            <a href="#top" className="text-fg-muted transition-opacity duration-250 hover:opacity-80">
              Back to top
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
