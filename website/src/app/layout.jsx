import Script from "next/script";
import { Inter } from "next/font/google";

import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = site.url;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ala Baganne | Full-Stack Software Engineer",
  description:
    "Ala Baganne builds full-stack applications, AI features, custom Shopify themes, e-commerce stores, and landing pages for individuals and businesses.",
  keywords: [
    "Ala Baganne",
    "full-stack software engineer",
    "AI engineer",
    "Next.js developer",
    "React",
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
      "Explore Ala Baganne's web applications, SaaS products, AI work, e-commerce stores, and landing pages. Custom Shopify theme development available.",
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
      "Explore Ala Baganne's web applications, SaaS products, AI work, e-commerce stores, and landing pages. Custom Shopify theme development available.",
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
