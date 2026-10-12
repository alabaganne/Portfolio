import { Container } from "@/components/ui/container";
import { SplitSection } from "@/components/ui/section";

// Keep these in line with the resume and the Upwork profile. The years include part-time and freelance work.
const stats = [
  { value: "5+", label: "Years building software, mostly part-time and freelance" },
  { value: "30K+", label: "Users on RetainYourBrain, which I contribute to" },
  { value: "100%", label: "Job Success on Upwork, with seven five-star reviews" },
  { value: "10+", label: "Projects with a live site or demo" },
];

const approach = [
  {
    title: "End to end",
    text: "I’m comfortable owning a feature from the data model and API to the interface and the deploy. On my own products I do all of it, including the server setup, backups and emails.",
  },
  {
    title: "Tests where mistakes cost the most",
    text: "I test the code that handles money, permissions and data access first. KartaTunisie’s pricing, orders and permissions have 298 unit tests, MenuMate has a script that checks one restaurant can’t reach another’s data, and at Retain Health I introduced automated testing.",
  },
  {
    title: "Used to distributed teams",
    text: "Since 2021 I’ve worked remotely with teams based in Boston, Brussels and Hong Kong.",
  },
];

// The jobs and products are covered by the Experience and Selected work sections above, so the bio stays short.
export function AboutSection() {
  return (
    <>
      <SplitSection id="about" label="About">
        <p data-reveal className="text-lead text-fg">
          I build web products end to end, from the database and API to the interface, and I add AI features where they
          help.
        </p>
        <p data-reveal className="mt-8 text-body text-fg-muted">
          Most of my experience has been part-time contract and freelance work, some of it alongside my engineering
          studies. I’m now looking for a full-time engineering role, remote or on-site.
        </p>
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

      <SplitSection label="How I work" divider={false}>
        <ul>
          {approach.map((item) => (
            <li
              key={item.title}
              data-reveal
              className="mb-12 border-b border-line pb-12 last:mb-0 last:border-0 last:pb-0"
            >
              <h3 className="text-title text-fg">{item.title}</h3>
              <p className="mt-4 text-body text-fg-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </SplitSection>
    </>
  );
}
