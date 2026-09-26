import { PageHeader } from "@/components/page-header";
import { SplitSection } from "@/components/ui/section";
import { SmartLink } from "@/components/ui/smart-link";
import { site, socialLinks } from "@/lib/site";

export const metadata = {
  title: "Contact | Ala Baganne — Full-Stack Software Engineer",
  description:
    "Get in touch with Ala Baganne about full-time roles, contracts or freelance projects by email, phone, LinkedIn, GitHub or Upwork.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Ala Baganne",
    description: "Email, phone and profiles of Ala Baganne, full-stack software engineer.",
    type: "website",
    url: "/contact",
  },
};

const contactLinks = [
  { href: `mailto:${site.email}`, label: site.email },
  { href: site.phone.href, label: site.phone.label },
  { href: site.resume, label: "Resume (PDF)" },
];

function LinkList({ links }) {
  return (
    <ul>
      {links.map((link) => (
        <li key={link.href} data-reveal className="mb-12 border-b border-line pb-12 last:mb-0 last:border-0 last:pb-0">
          <SmartLink href={link.href} className="font-display text-title text-fg transition-opacity duration-250 hover:opacity-80">
            {link.label}
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Reach out and <br />
            <span className="text-accent">say hi</span>
          </>
        }
        description={
          <>
            I’m open to <span className="whitespace-nowrap">full-time</span> roles,{" "}
            <span className="whitespace-nowrap">part-time</span> contracts and freelance projects. Tell me about your
            team or your project, or just say hi.
          </>
        }
      />
      <SplitSection label="Contact">
        <LinkList links={contactLinks} />
      </SplitSection>
      <SplitSection label="Connect">
        <LinkList links={socialLinks} />
      </SplitSection>
    </>
  );
}
