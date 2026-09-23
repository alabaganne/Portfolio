import { BriefcaseBusiness, Github, Linkedin, Mail, Phone } from "lucide-react";

const contactLinks = [
  {
    href: "mailto:alabaganne9@gmail.com",
    label: "alabaganne9@gmail.com",
    Icon: Mail,
    primary: true,
  },
  {
    href: "tel:+21650101959",
    label: "+216 50 101 959",
    Icon: Phone,
  },
  {
    href: "https://www.linkedin.com/in/alabaganne/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  {
    href: "https://github.com/alabaganne",
    label: "GitHub",
    Icon: Github,
  },
  {
    href: "https://www.upwork.com/freelancers/~018064bc5b1d8ca3ce",
    label: "Upwork",
    Icon: BriefcaseBusiness,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#07142b] text-center text-slate-300">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(600px_300px_at_50%_0%,rgba(37,99,235,0.35),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-blue-300 before:h-px before:w-7 before:bg-current after:h-px after:w-7 after:bg-current">
          Get in touch
        </span>
        <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em] text-white md:text-6xl">
          Let&apos;s build something real.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
          {/* I&apos;m open to senior full-stack roles, AI-product work, and select freelance engagements. The fastest way to reach me is email. */}
          I work with individuals and businesses on Shopify themes, e-commerce, landing pages, and full-stack applications. I&apos;m open to freelance projects, part-time contracts, and full-time roles. Email me about your project or opportunity.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {contactLinks.map(({ href, label, Icon, primary }) => (
            <a
              key={href}
              className={
                "inline-flex h-12 items-center gap-2 rounded-full border px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 " +
                (primary
                  ? "border-blue-600 bg-blue-600 hover:bg-blue-700"
                  : "border-white/15 bg-white/[0.04] hover:border-blue-600 hover:bg-blue-600")
              }
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </a>
          ))}
        </div>
        <footer className="mt-16 border-t border-white/10 pt-7 text-sm font-medium text-slate-500">
          <span>© {new Date().getFullYear()} Ala Baganne. All rights reserved.</span>
        </footer>
      </div>
    </section>
  );
}
