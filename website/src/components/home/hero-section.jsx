import { Download, Mail, MapPin } from "lucide-react";

import { Button, ButtonArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Glow } from "@/components/ui/glow";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const summary =
  "I build full-stack applications, AI features, custom Shopify themes, e-commerce stores, and landing pages for individuals and businesses. 5+ years delivering software for international clients.";

const stats = [
  { value: "5+", label: "Years of experience" },
  { value: "25K+", label: "Users on a platform I help build" },
  { value: "100%", label: "Upwork job success" },
  { value: "10+", label: "Production projects" },
];

// Dividers for a 2 × 2 grid on small screens and a single row of four on large ones.
const statBorders = [
  "pr-6",
  "border-l pl-6 lg:pl-8",
  "border-t pr-6 lg:border-l lg:border-t-0 lg:pl-8",
  "border-l border-t pl-6 lg:border-t-0 lg:pl-8",
];

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <Glow />
      <Container className="pb-8 pt-36 md:pt-48">
        <p className="flex items-center gap-2.5 text-sm font-medium text-fg-muted motion-safe:animate-rise">
          <span aria-hidden className="size-1.5 rounded-full bg-accent" />
          {site.name} · {site.role}
        </p>

        <h1
          id="hero-title"
          className="mt-8 max-w-[18ch] text-balance text-display text-fg motion-safe:animate-rise motion-safe:[animation-delay:80ms]"
        >
          <span className="text-fg-subtle">Full-Stack engineer building</span> web apps, online stores &amp; AI
          systems.
        </h1>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:items-end md:gap-8">
          <div className="motion-safe:animate-rise motion-safe:[animation-delay:160ms] md:col-span-7 lg:col-span-6">
            <p className="max-w-xl text-lg leading-relaxed text-fg-muted md:text-xl">{summary}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-subtle">
              <li className="inline-flex items-center gap-2">
                <MapPin className="size-4" aria-hidden />
                {site.location}
              </li>
              <li>
                <a className="inline-flex items-center gap-2 transition-colors hover:text-fg" href={`mailto:${site.email}`}>
                  <Mail className="size-4" aria-hidden />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-3 motion-safe:animate-rise motion-safe:[animation-delay:240ms] md:col-span-5 md:justify-end lg:col-span-6">
            <Button href="#projects" size="lg">
              See my work
              <ButtonArrow />
            </Button>
            <Button href="#contact" variant="secondary" size="lg">
              Discuss a project
            </Button>
            <Button href={site.resume} variant="secondary" size="lg" download>
              <Download aria-hidden />
              Resume
            </Button>
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 border-t border-line motion-safe:animate-rise motion-safe:[animation-delay:320ms] md:mt-28 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className={cn("flex flex-col-reverse gap-3 border-line py-8", statBorders[index])}>
              <dt className="text-sm leading-snug text-fg-muted">{stat.label}</dt>
              <dd className="text-[clamp(2.25rem,1.6rem+2.2vw,3.5rem)] font-medium leading-none tracking-[-0.045em] text-fg">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
