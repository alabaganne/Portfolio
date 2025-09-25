import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

const contactLinks = [
  {
    label: "Email",
    href: "mailto:alabaganne9@gmail.com",
    description: "alabaganne9@gmail.com",
    Icon: Mail,
  },
  {
    label: "Phone",
    href: "tel:+21650101959",
    description: "+216 50 101 959",
    Icon: Phone,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alabaganne/",
    description: "linkedin.com/in/alabaganne",
    Icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/alabaganne",
    description: "github.com/alabaganne",
    Icon: Github,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="space-y-8">
      <SectionHeader
        eyebrow="Contact"
        title="Let’s collaborate"
        description="Open to full-stack roles, freelance engagements, and conversations about building sustainable products."
      />
      <Card>
        <CardContent className="gap-6 text-[var(--muted)]">
          <p>
            Share a short brief about your idea or request a copy of my résumé. I respond to every message within two business days.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {contactLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-white p-4 transition hover:border-[var(--accent)] hover:shadow-md"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                  <link.Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                    {link.label}
                  </span>
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {link.description}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
