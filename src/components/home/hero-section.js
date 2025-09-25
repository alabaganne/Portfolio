import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, Download, Mail, MapPin, Phone } from "lucide-react";

const profile = {
  name: "Ala Baganne",
  role: "Full-Stack Developer",
  experience: "5+ Years Shipping Products",
  location: "Jemmel, Monastir, Tunisia",
  headline: "Transforming concepts into seamless user experiences.",
  summary:
    "Hi! I'm Ala Baganne, a Next.js developer helping teams craft high-impact web experiences across time zones. I partner with product and design to launch resilient apps with confident hand-offs.",
  email: "alabaganne9@gmail.com",
  phone: "+21650101959",
  phoneDisplay: "+216 50 101 959",
};

const stats = [
  {
    value: "5+",
    label: "Years building digital products",
    detail: "From concept to launch across SaaS, healthcare, and EdTech.",
  },
  {
    value: "10+",
    label: "Production launches",
    detail: "Full-stack shipping with performance budgets baked in.",
  },
  {
    value: "E2E",
    label: "Product partnership",
    detail: "Strategy, implementation, testing, and documentation.",
  },
];

const heroHighlights = [
  {
    title: "Always in sync",
    description:
      "Working across EMEA and US time zones with async updates and transparent progress logs.",
    icon: <MapPin className="h-5 w-5 text-sky-200" aria-hidden />,
    footer: profile.location,
  },
  {
    title: "My tech stack",
    description: "React · Next.js · Vue · Laravel · Node.js · Tailwind",
    accent: "Refined for accessible, performant UI delivery.",
  },
];

export function HeroSection() {
  return (
    <section className="relative grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div className="space-y-9">
        <Badge className="w-fit bg-gradient-to-r from-[#5b5ee6]/40 to-[#3ec5ff]/30 px-5 py-2 text-[0.6rem] uppercase tracking-[0.4em] text-slate-200">
          Dynamic Web Magic with Next.js
        </Badge>
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Transforming concepts into <span className="gradient-text">seamless user experiences</span>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {profile.summary}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button
            href="#projects"
            className="px-7 text-sm font-semibold uppercase tracking-[0.3em]"
          >
            See my work
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Button>
          <Button
            href={`mailto:${profile.email}`}
            variant="outline"
            className="px-7 text-sm font-semibold uppercase tracking-[0.3em] text-slate-100"
          >
            Contact me
            <Mail className="h-4 w-4" aria-hidden />
          </Button>
          <Button
            href="/Ala_Baganne_Resume.pdf"
            variant="ghost"
            className="px-7 text-sm font-semibold uppercase tracking-[0.3em] text-slate-200"
            download
          >
            Download resume
            <Download className="h-4 w-4" aria-hidden />
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-white/15 bg-gradient-to-br from-white/10 via-transparent to-transparent p-6">
              <CardHeader className="mb-2 gap-1">
                <CardTitle className="text-3xl font-semibold text-white">
                  {stat.value}
                </CardTitle>
                <CardDescription className="text-slate-300">
                  {stat.label}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-slate-300">
                {stat.detail}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="grid gap-6">
        <Card className="relative overflow-hidden border-white/20 bg-[radial-gradient(circle_at_top,_rgba(124,92,255,0.35),_rgba(15,12,45,0.8))] p-0">
          <div className="absolute inset-0 bg-[radial-gradient(400px_circle_at_20%_20%,rgba(59,130,246,0.3),transparent)]" aria-hidden />
          <CardHeader className="relative z-10 gap-3 p-8">
            <Badge variant="subtle" className="w-fit bg-white/10 text-[0.6rem] tracking-[0.35em] text-slate-200">
              Featured project
            </Badge>
            <CardTitle className="text-3xl font-semibold text-white">
              MenuMate Platform
            </CardTitle>
            <CardDescription className="max-w-sm text-base text-slate-200">
              Intuitive QR-powered menus with a focus on delightful experience design and measurable business outcomes.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 p-0">
            <div className="flex items-center justify-between border-t border-white/10 px-8 py-6 text-sm text-slate-200">
              <span>Crafted with React · Supabase · Tailwind</span>
              <Button
                href="#projects"
                size="sm"
                variant="outline"
                className="border-white/20 bg-white/10 px-4 text-xs font-semibold uppercase tracking-[0.3em] text-white"
              >
                View Case Study
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-6 sm:grid-cols-2">
          {heroHighlights.map((highlight) => (
            <Card key={highlight.title} className="border-white/15 bg-white/[0.04] p-6">
              <CardHeader className="mb-2 gap-2">
                <div className="flex items-center gap-3">
                  {highlight.icon ? (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10">
                      {highlight.icon}
                    </span>
                  ) : null}
                  <CardTitle className="text-lg text-white">
                    {highlight.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-slate-300">
                <p>{highlight.description}</p>
                {highlight.footer ? (
                  <p className="mt-4 text-xs uppercase tracking-[0.3em] text-slate-400">
                    {highlight.footer}
                  </p>
                ) : null}
                {highlight.accent ? (
                  <p className="mt-4 text-xs uppercase tracking-[0.3em] text-slate-300">
                    {highlight.accent}
                  </p>
                ) : null}
              </CardContent>
            </Card>
          ))}
          <Card className="border-white/15 bg-white/[0.04] p-6">
            <CardHeader className="mb-2 gap-2">
              <CardTitle className="text-lg text-white">Direct line</CardTitle>
              <CardDescription className="text-slate-300">
                Reach out for collaboration opportunities or remote contracts.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm text-slate-200">
              <a className="inline-flex items-center gap-2 text-slate-200" href={`mailto:${profile.email}`}>
                <Mail className="h-4 w-4" aria-hidden />
                {profile.email}
              </a>
              <a className="inline-flex items-center gap-2 text-slate-200" href={`tel:${profile.phone}`}>
                <Phone className="h-4 w-4" aria-hidden />
                {profile.phoneDisplay}
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
