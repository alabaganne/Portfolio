import { SectionHeader } from "@/components/section-header";
import { Mail } from "lucide-react";

const paragraphs = [
  <>
    I&apos;m a <strong>Full-Stack Software Engineer</strong> with 5+ years of professional experience. I build SaaS products and AI applications, design custom Shopify themes, and create e-commerce stores and landing pages for individuals and businesses. I work across frontend, backend, integrations, and deployment.
  </>,
  <>
    I work part-time at <strong>Retain Health</strong>, contributing to RetainYourBrain, a digital health platform with <strong>25,000+ users</strong>. From October 2025 to May 2026, I also worked part-time at <strong>Wequity</strong> on NORA, an AI-powered legal document automation platform built with FastAPI, Supabase, GCP, and Vertex AI.
  </>,
  <>
    On the side, I run my own products. <strong>MenuMate</strong> is a SaaS I designed, built and launched for restaurants to manage digital menus, QR codes, and real-time orders. I&apos;m <strong>Top Rated on Upwork</strong> with a 100% Job Success Score.
  </>,
];

const services = [
  "Web Development",
  "Application Development",
  "AI Integration",
  "Custom Shopify Themes",
  "E-commerce",
  "Landing Pages",
  "Database Development",
  "Mobile Apps",
  "Custom Software",
];

const details = [
  ["Based in", "Monastir, Tunisia"],
  ["Experience", "5+ years"],
  ["Work mode", "Remote · Worldwide"],
  // ["Status", "● Available"],
  ["Languages", "EN · FR · AR"],
];

export function AboutSection() {
  return (
    <section id="about" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="01 · About me"
          title={
            <>
              I build software that <span className="text-blue-600">holds up</span> in production.
            </>
          }
          description="From custom storefronts and personal websites to SaaS products and AI workflows, I turn requirements into working software."
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <div className="space-y-5 text-[1.05rem] leading-8 text-slate-600">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="[&_strong]:font-semibold [&_strong]:text-slate-950">
                {paragraph}
              </p>
            ))}
            <div className="flex flex-wrap gap-2 pt-3">
              {services.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
          <aside>
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-7">
              <div className="divide-y divide-dashed divide-slate-200">
                {details.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-5 py-3.5 text-sm">
                    <span className="text-slate-500">{label}</span>
                    <span className={label === "Status" ? "font-semibold text-green-600" : "text-right font-semibold text-slate-950"}>
                      {value}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between gap-5 py-3.5 text-sm">
                  <span className="text-slate-500">Upwork</span>
                  <a
                    className="text-right font-semibold text-blue-600 hover:underline"
                    href="https://www.upwork.com/freelancers/~018064bc5b1d8ca3ce"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Top Rated · 100% JSS ↗
                  </a>
                </div>
              </div>
              <a
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-blue-600"
                href="mailto:alabaganne9@gmail.com"
              >
                <Mail className="h-4 w-4" aria-hidden />
                alabaganne9@gmail.com
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
