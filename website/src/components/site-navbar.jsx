import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#education", label: "Education" },
  { href: "/blog", label: "Blog" },
];

export function SiteNavbar() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/#top" className="flex items-center gap-3 font-display font-semibold tracking-[-0.01em] text-white">
          <Image src="/ab-logo.png" alt="Ala Baganne personal brand logo" width={52} height={41} className="h-10 w-auto" priority />
        </Link>
        <ul className="hidden items-center gap-6 text-sm font-medium text-slate-300 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link className="transition hover:text-white" href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold !text-white transition hover:bg-blue-500"
          href="/#contact"
        >
          Get in touch
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </nav>
  );
}
