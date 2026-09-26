"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 h-[76px] bg-canvas/85 backdrop-blur-[6px]">
        <Container className="flex h-full items-center justify-between motion-safe:animate-page-in">
          <Logo onClick={closeMenu} className="transition-opacity duration-250 hover:opacity-80" />

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="-mr-5 flex items-center">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group/nav relative flex px-5 py-1.5 font-display text-lg/[1.5] font-medium transition-[color,opacity] duration-250",
                        active ? "text-accent" : "text-fg hover:opacity-70",
                      )}
                    >
                      {link.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute -bottom-1 left-1/2 size-[5px] -translate-x-1/2 rounded-full transition-transform duration-250",
                          active ? "scale-100 bg-accent" : "scale-0 bg-white/50 group-hover/nav:scale-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            className="-mr-3 grid size-16 place-items-center md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="flex w-8 flex-col gap-[5px]">
              <span
                className={cn(
                  "h-1 bg-fg transition-transform duration-500 ease-in-out-quint",
                  menuOpen && "translate-y-[9px] -rotate-45",
                )}
              />
              <span
                className={cn("h-1 bg-fg transition-transform duration-200 ease-in-out-quint", menuOpen && "scale-x-0")}
              />
              <span
                className={cn(
                  "h-1 bg-fg transition-transform duration-500 ease-in-out-quint",
                  menuOpen && "-translate-y-[9px] rotate-45",
                )}
              />
            </span>
          </button>
        </Container>
      </header>

      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={cn("fixed inset-0 z-[60] md:hidden", !menuOpen && "pointer-events-none")}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close menu"
          onClick={closeMenu}
          className={cn(
            "absolute inset-0 bg-black/60 transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <nav
          aria-label="Mobile"
          className={cn(
            "relative flex h-full w-[280px] max-w-[85vw] flex-col bg-canvas/95 px-10 pb-10 pt-[25px] backdrop-blur-[6px] transition-transform duration-300 ease-out sm:px-16",
            menuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <Logo onClick={closeMenu} className="mb-12 flex h-[30px] items-center" />
          <ul>
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex py-4 pl-4 font-display text-xl font-medium",
                      active ? "text-accent" : "text-fg",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-0 top-1/2 size-[5px] -translate-y-1/2 rounded-full bg-accent",
                        !active && "hidden",
                      )}
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
