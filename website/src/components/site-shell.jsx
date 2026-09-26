import { RevealObserver } from "@/components/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";

// Loaded from Fontshare because their license forbids sharing the font files in a public repo.
const fonts = [
  "https://api.fontshare.com/v2/css?f[]=clash-display@500,600&display=swap",
  "https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500&display=swap",
];

// Dark portfolio frame shared by the home page, blog, project pages and 404.
export function SiteShell({ children }) {
  return (
    <div id="top" className="site-shell min-h-screen bg-canvas text-fg">
      <link rel="preconnect" href="https://api.fontshare.com" />
      <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
      {fonts.map((href) => (
        <link key={href} rel="stylesheet" href={href} precedence="default" />
      ))}
      <a
        href="#main"
        className="sr-only z-[110] rounded-md bg-accent px-4 py-2 font-display text-sm font-medium uppercase tracking-[1px] text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100] hidden origin-top bg-[#181817] motion-safe:block motion-safe:animate-cover print:hidden"
      />
      <SiteNavbar />
      <main id="main">{children}</main>
      <SiteFooter />
      <RevealObserver />
    </div>
  );
}
