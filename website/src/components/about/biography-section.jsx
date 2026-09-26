import { Container } from "@/components/ui/container";
import { SplitSection } from "@/components/ui/section";
import { site } from "@/lib/site";

const facts = [
  ["Based in", site.location],
  ["Works", "Remote, worldwide"],
  ["Speaks", "English, French, Arabic"],
  ["Freelance", "Top Rated on Upwork", site.socials.upwork],
];

const stats = [
  { value: "5+", label: "Years building software" },
  { value: "25K+", label: "Users on a platform I help build" },
  { value: "100%", label: "Job success on Upwork" },
  { value: "10+", label: "Projects live in production" },
];

export function BiographySection() {
  return (
    <>
      <SplitSection label="Biography">
        <p data-reveal className="text-lead text-fg">
          I&apos;m a full-stack software engineer who likes turning rough ideas into software people use every day.
        </p>
        <div data-reveal className="mt-8 space-y-6 text-body text-fg-muted">
          <p>
            Since 2021 I&apos;ve worked part-time at Retain Health on RetainYourBrain, a brain health platform with
            25,000+ users. Until May 2026 I also worked on NORA at Wequity, an AI platform that helps law firms and
            notaries process legal documents.
          </p>
          <p>
            On the side I build my own products, like MenuMate, a SaaS I designed, built and launched so restaurants
            can run digital menus, QR codes and orders. I&apos;m also Top Rated on Upwork, where I build stores,
            booking systems and landing pages for clients.
          </p>
        </div>
        <dl data-reveal className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {facts.map(([label, value, href]) => (
            <div key={label}>
              <dt className="text-base text-fg-subtle">{label}</dt>
              <dd className="mt-1 font-display text-heading-xs text-fg">
                {href ? (
                  <a href={href} target="_blank" rel="noreferrer" className="transition-opacity duration-250 hover:opacity-80">
                    {value} ↗
                  </a>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </SplitSection>

      <Container>
        <dl
          data-reveal
          className="grid grid-cols-2 gap-x-6 gap-y-12 rounded-xl bg-surface px-6 py-12 sm:px-10 md:px-16 md:py-20 lg:grid-cols-4 lg:gap-x-10"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse justify-end gap-3">
              <dt className="text-body text-fg-subtle">{stat.label}</dt>
              <dd className="font-display text-heading text-fg">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </>
  );
}
