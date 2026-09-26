"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Fades [data-reveal] elements in as they scroll into view. Elements are only hidden
// once this runs, so the page reads fine without JavaScript, and anything already on
// screen stays put.
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-reveal-state", "shown");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => {
      const state = element.getAttribute("data-reveal-state");
      if (state === "shown") return;
      if (!state) {
        if (element.getBoundingClientRect().top < window.innerHeight) return;
        element.setAttribute("data-reveal-state", "hidden");
      }
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
