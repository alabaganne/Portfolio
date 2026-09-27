import { ArrowLink } from "@/components/ui/arrow-link";
import { SplitSection } from "@/components/ui/section";

const experiences = [
  {
    company: "Retain Health",
    role: "Software Engineer",
    period: "Aug 2021 – today",
    place: "Part-time contract, remote (Boston, US)",
    summary:
      "I help build RetainYourBrain, a brain health platform with 25,000+ users. I ship features across the whole stack, built the form engine behind its personal routines, and set up automated tests and analytics.",
    tech: ["AngularJS", "Express.js", "Next.js", "TypeScript", "MySQL", "AWS"],
    links: [{ label: "retainyourbrain.com", href: "https://retainyourbrain.com" }],
  },
  {
    company: "Upwork",
    role: "Freelance Web Developer",
    period: "Aug 2024 – today",
    place: "Self-employed, remote",
    summary:
      "Top Rated with a 100% Job Success Score. Seven contracts, all rated five stars: booking systems, Shopify themes, online stores with Stripe and landing pages.",
    tech: ["Next.js", "React", "Node.js", "Supabase", "Shopify", "WordPress", "Stripe"],
    links: [{ label: "Upwork profile", href: "https://www.upwork.com/freelancers/~018064bc5b1d8ca3ce" }],
  },
  {
    company: "Wequity",
    role: "Full-Stack & AI Engineer",
    period: "Oct 2025 – May 2026",
    place: "Part-time contract, remote (Brussels, Belgium)",
    summary:
      "I built full-stack features for NORA, an AI platform that processes legal documents in English, French and Dutch: a knowledge base that answers questions with sources, a module that learns edits from example documents, and DeepL translation.",
    tech: ["React", "FastAPI", "Supabase", "GCP", "Vertex AI", "OpenAI API", "DSPy"],
  },
  {
    company: "Satoripop",
    role: "Full-Stack Developer Intern",
    period: "Jul 2023 – Aug 2023",
    place: "Internship, Sousse, Tunisia",
    summary:
      "I built a Google Meet-style video meeting app on my own, front end and back end: sign-in, meeting scheduling, protected pages and calls powered by Jitsi.",
    tech: ["React", "TypeScript", "Express.js", "MySQL", "Jitsi"],
    links: [{ label: "jitsi.alabaganne.com", href: "http://jitsi.alabaganne.com" }],
  },
  {
    company: "Realinflo",
    role: "Full-Stack Developer Intern",
    period: "Feb 2021 – May 2021",
    place: "Internship, remote (Hong Kong)",
    summary:
      "I built an admin dashboard to manage and chart property data for a real estate platform, shipping in weekly milestones with the CTO.",
    tech: ["Vue.js", "Quasar", "Node.js", "Feathers.js", "MongoDB"],
  },
  {
    company: "Satoripop",
    role: "Web Development Intern",
    period: "Jul 2020 – Aug 2020",
    place: "Internship, Sousse, Tunisia",
    summary:
      "I built an HR platform with separate dashboards for managers, HR, project managers and employees, documented its API, and turned a PSD design into a responsive landing page.",
    tech: ["Vue.js", "Laravel", "MySQL", "Bootstrap"],
    links: [{ label: "hr-management.alabaganne.com", href: "http://hr-management.alabaganne.com" }],
  },
];

export function ExperienceSection() {
  return (
    <SplitSection id="experience" label="Experience" divider={false}>
      <ol>
        {experiences.map((job) => (
          <li
            key={`${job.company}-${job.period}`}
            data-reveal
            className="mb-12 border-b border-line pb-12 last:mb-0 last:border-0 last:pb-0"
          >
            <h3 className="text-title text-fg">{job.company}</h3>
            <p className="font-display text-title text-fg-subtle">{job.role}</p>
            <p className="mt-4 text-body text-fg-subtle">
              {job.period} <span className="mx-2 text-fg-faint">/</span> {job.place}
            </p>
            <p className="mt-6 text-body text-fg-muted">{job.summary}</p>
            <p className="mt-5 text-base text-fg-faint">{job.tech.join(", ")}</p>
            {job.links ? (
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                {job.links.map((link) => (
                  <ArrowLink key={link.href} href={link.href}>
                    {link.label}
                  </ArrowLink>
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </SplitSection>
  );
}
