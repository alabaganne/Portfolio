import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { site } from "@/lib/site";

const paragraphs = [
  <>
    I&apos;m a <strong>Full-Stack Software Engineer</strong> with 5+ years of professional experience. I build SaaS products and AI applications, design custom Shopify themes, and create e-commerce stores and landing pages for individuals and businesses. I work across frontend, backend, integrations, and deployment.
  </>,
  <>
    I work part-time at <strong>Retain Health</strong>, contributing to RetainYourBrain, a digital health platform with <strong>25,000+ users</strong>. From October 2025 to May 2026, I also worked part-time at <strong>Wequity</strong> on NORA, an AI-powered legal document automation platform built with FastAPI, Supabase, GCP, and Vertex AI.
  </>,
  <>
    On the side, I run my own products. <strong>MenuMate</strong> is a SaaS I designed, built and launched for restaurants to manage digital menus, QR codes, and real-time orders. I&apos;m <strong>Top Rated on Upwork</strong> with a 100% Job Success Score.
  </>,
];

const details = [
  ["Based in", site.location],
  ["Experience", "5+ years"],
  ["Work mode", "Remote · Worldwide"],
  // ["Status", "● Available"],
  ["Languages", "EN · FR · AR"],
];

export function AboutSection() {
  return (
    <Section id="about">
      <SectionHeading
        label="About"
        title={
          <>
            I build software that <span className="text-fg-subtle">holds up in production.</span>
          </>
        }
        description="From custom storefronts and personal websites to SaaS products and AI workflows, I turn requirements into working software."
      />
      <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-8">
        <div
          data-reveal
          className="space-y-6 text-lg leading-relaxed text-fg-muted md:col-span-8 md:col-start-5 lg:col-span-5 lg:col-start-4 [&_strong]:font-medium [&_strong]:text-fg"
        >
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <aside data-reveal className="md:col-span-8 md:col-start-5 lg:col-span-4 lg:col-start-9" style={{ "--reveal-delay": "120ms" }}>
          <dl className="divide-y divide-line border-y border-line text-sm">
            {details.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6 py-4">
                <dt className="text-fg-subtle">{label}</dt>
                <dd className={label === "Status" ? "font-medium text-green-400" : "text-right text-fg"}>{value}</dd>
              </div>
            ))}
            <div className="flex justify-between gap-6 py-4">
              <dt className="text-fg-subtle">Upwork</dt>
              <dd className="text-right">
                <a
                  className="text-fg underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-accent"
                  href={site.socials.upwork}
                  target="_blank"
                  rel="noreferrer"
                >
                  Top Rated · 100% JSS ↗
                </a>
              </dd>
            </div>
          </dl>
          <Button href={`mailto:${site.email}`} variant="secondary" className="mt-6 w-full">
            <Mail aria-hidden />
            {site.email}
          </Button>
        </aside>
      </div>
    </Section>
  );
}
