import { RevealObserver } from "@/components/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";

// Dark portfolio frame shared by the home page, blog, project pages and 404.
export function SiteShell({ children }) {
  return (
    <div id="top" className="site-shell min-h-screen bg-canvas text-fg">
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-fg px-4 py-2 text-sm font-medium text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteNavbar />
      <main id="main">{children}</main>
      <SiteFooter />
      <RevealObserver />
    </div>
  );
}
