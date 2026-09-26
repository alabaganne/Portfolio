"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button, ButtonArrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { navLinks, site, socialLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const isActive = (href) => href === "/blog" && pathname.startsWith("/blog");
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500",
          menuOpen
            ? "border-line bg-canvas"
            : scrolled
              ? "border-line bg-canvas/75 backdrop-blur-xl"
              : "border-transparent",
        )}
      >
        <Container className="flex h-[72px] items-center justify-between gap-6">
          <Link
            href="/"
            onClick={closeMenu}
            className="text-base font-medium tracking-[-0.02em] text-fg transition-colors hover:text-fg-muted"
          >
            {site.name}
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-sm transition-colors hover:text-fg",
                      isActive(link.href) ? "text-fg" : "text-fg-muted",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button href="#contact" size="sm">
                Get in touch
                <ButtonArrow />
              </Button>
            </div>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-line-strong md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className="relative block h-2.5 w-4">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-fg transition-transform duration-300",
                    menuOpen && "translate-y-[4.25px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-[1.5px] w-full rounded-full bg-fg transition-transform duration-300",
                    menuOpen && "-translate-y-[4.25px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </Container>
      </header>

      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-canvas pt-[72px] transition-opacity duration-300 md:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <Container className="flex flex-1 flex-col justify-between overflow-y-auto pb-10 pt-8">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-line border-y border-line">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-baseline gap-4 py-4 text-4xl font-medium tracking-[-0.04em] text-fg"
                  >
                    <span className="text-sm tracking-normal text-fg-subtle tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-10 space-y-5">
            <Button href="#contact" size="lg" className="w-full" onClick={closeMenu}>
              Get in touch
              <ButtonArrow />
            </Button>
            <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 text-sm text-fg-muted">
              <a href={`mailto:${site.email}`} className="hover:text-fg">
                {site.email}
              </a>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="hover:text-fg">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
