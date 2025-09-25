import Script from "next/script";
import "./globals.css";

const siteUrl = "https://alabaganne.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ala Baganne | Software Engineer, Full-Stack Web Developer",
  description:
    "Portfolio for Ala Baganne, a web developer with 5+ years of experience delivering full-stack web applications, highlighting projects, skills, and ways to connect.",
  keywords: [
    "Ala Baganne",
    "web developer",
    "full-stack engineer",
    "React",
    "Vue",
    "Laravel",
    "Node.js",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Ala Baganne | Software Engineer, Full-Stack Web Developer",
    description:
      "Explore Ala Baganne's full-stack portfolio, featuring shipped projects, technical skills, and ways to collaborate.",
    siteName: "Ala Baganne Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ala Baganne | Software Engineer, Full-Stack Web Developer",
    description:
      "Explore Ala Baganne's full-stack portfolio, featuring shipped projects, technical skills, and ways to collaborate.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[--background] text-[--foreground] antialiased">
        <Script id="ld-json" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Ala Baganne',
            url: siteUrl,
            jobTitle: 'Full-Stack Web Developer',
            description:
              'Full-stack web developer with 5+ years of experience building reliable applications across healthcare, real estate, and education.',
            sameAs: [
              'https://www.linkedin.com/in/alabaganne/',
              'https://github.com/alabaganne',
              'mailto:alabaganne9@gmail.com',
            ],
          })}
        </Script>
        {children}
      </body>
    </html>
  );
}
