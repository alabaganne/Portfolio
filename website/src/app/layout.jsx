import Script from "next/script";
import { Inter } from "next/font/google";

import { site } from "@/lib/site";
import "./globals.css";

// Only the personal pages use Inter; the portfolio loads Clash fonts in SiteShell.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const siteUrl = site.url;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ala Baganne | Full-Stack Software Engineer",
  description:
    "Ala Baganne is a full-stack engineer building web products with React, Next.js, TypeScript and Node.js, with PostgreSQL, Supabase and applied AI. Open to full-time engineering roles, remote or on-site.",
  keywords: [
    "Ala Baganne",
    "full-stack software engineer",
    "AI engineer",
    "Next.js developer",
    "React",
    "TypeScript",
    "PostgreSQL",
    "FastAPI",
    "Supabase",
    "Node.js",
    "SaaS developer",
    "web developer",
    "custom Shopify themes",
    "e-commerce developer",
    "landing page developer"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Ala Baganne | Full-Stack Software Engineer",
    description:
      "Case studies, experience and CV of Ala Baganne, a full-stack engineer working with React, Next.js, TypeScript, Node.js, PostgreSQL and applied AI.",
    siteName: "Ala Baganne Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ala Baganne, Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ala Baganne | Full-Stack Software Engineer",
    description:
      "Case studies, experience and CV of Ala Baganne, a full-stack engineer working with React, Next.js, TypeScript, Node.js, PostgreSQL and applied AI.",
    images: [
      {
        url: "/og-image.png",
        alt: "Ala Baganne, Full-Stack Software Engineer",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body>
        <Script id="ld-json" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ala Baganne",
              url: siteUrl,
              email: site.email,
              jobTitle: "Full-Stack Software Engineer",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Monastir",
                addressCountry: "TN",
              },
              description:
                "Full-stack software engineer with 5+ years of experience building web applications, AI systems, custom Shopify themes, e-commerce stores, and landing pages.",
              sameAs: [site.socials.linkedin, site.socials.github, site.socials.upwork],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Ala Baganne Portfolio",
              url: siteUrl,
              inLanguage: "en",
            },
          ])}
        </Script>
        {children}
      </body>
    </html>
  );
}
