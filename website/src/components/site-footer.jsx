import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ArrowLink } from "@/components/ui/arrow-link";
import { Button, ButtonArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { footerLinks, site, socialLinks } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer id="contact" className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[560px] bg-[radial-gradient(55%_60%_at_50%_100%,rgba(91,140,255,0.12),transparent_70%)]"
      />
      <Container>
        <div className="border-t border-line pt-24 md:pt-32">
          <div data-reveal>
            <Eyebrow>Contact</Eyebrow>
            <h2 className="mt-8 text-[clamp(3rem,0.9rem+8.4vw,8.5rem)] font-medium leading-[0.92] tracking-[-0.055em] text-fg">
              Let&apos;s build
              <br />
              something <span className="text-fg-subtle">real.</span>
            </h2>
          </div>

          <div data-reveal className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-8">
            <p className="text-lg leading-relaxed text-fg-muted md:col-span-6 lg:col-span-5">
              I work with individuals and businesses on Shopify themes, e-commerce, landing pages, and full-stack
              applications. I&apos;m open to freelance projects, part-time contracts, and full-time roles. Email me about
              your project or opportunity.
            </p>
            <div className="md:col-span-6 lg:col-span-6 lg:col-start-7">
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex max-w-full items-center gap-3 text-[clamp(1.375rem,0.9rem+1.9vw,2.5rem)] font-medium tracking-[-0.03em] text-fg"
              >
                <span className="truncate bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 ease-out-expo group-hover:bg-[length:100%_1px]">
                  {site.email}
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="size-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:size-8"
                />
              </a>
              <div className="mt-8 flex flex-wrap gap-2">
                <Button href={site.phone.href} variant="secondary" size="sm">
                  {site.phone.label}
                </Button>
                {socialLinks.map((link) => (
                  <Button key={link.href} href={link.href} variant="secondary" size="sm">
                    {link.label}
                    <ButtonArrow />
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-24 flex flex-col gap-6 border-t border-line py-8 text-sm text-fg-subtle md:mt-32 lg:flex-row lg:items-center lg:justify-between">
            <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-fg">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <ArrowLink href="#top" direction="up" tone="subtle">
              Back to top
            </ArrowLink>
          </div>
        </div>
      </Container>
    </footer>
  );
}
