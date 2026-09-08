import { ArrowUpRight, Download, Mail, MapPin, MonitorSmartphone } from "lucide-react";

const profile = {
  location: "Monastir, Tunisia",
  summary:
    "I build full-stack applications, AI features, custom Shopify themes, e-commerce stores, and landing pages for individuals and businesses. 5+ years delivering software for international clients.",
  email: "alabaganne9@gmail.com",
  website: "alabaganne.com",
};

const stats = [
  { value: "5+", label: "Years of experience" },
  { value: "25K+", label: "Users on a platform I help build" },
  { value: "100%", label: "Upwork job success" },
  { value: "10+", label: "Production projects" },
];

export function HeroSection() {
  return (
    <section id="top" className="relative isolate min-h-[92svh] overflow-hidden bg-[#07142b] text-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#050e22_0%,#0b1c3a_52%,#0a224a_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] opacity-70 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)]"
      />
      <div className="mx-auto flex min-h-[92svh] w-full max-w-6xl flex-col items-center justify-center px-5 pb-24 pt-36 text-center sm:px-8">
        {/* Availability badge - hidden for now, keep for later
        <p className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-sm text-slate-300 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_0_4px_rgba(34,197,94,0.18)]" />
          Available for new opportunities · Remote-first
        </p>
        */}
        <h1 className="mt-8 max-w-5xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-6xl sm:leading-[1.02] lg:text-7xl">
          Full-Stack engineer building{" "}
          <span className="bg-gradient-to-r from-blue-300 via-blue-200 to-white bg-clip-text text-transparent">
            web apps, online stores
          </span>{" "}
          & AI systems.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          {profile.summary}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm text-slate-400">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" aria-hidden />
            {profile.location}
          </span>
          <a className="inline-flex items-center gap-2 transition hover:text-white" href={`mailto:${profile.email}`}>
            <Mail className="h-4 w-4" aria-hidden />
            {profile.email}
          </a>
          <span className="inline-flex items-center gap-2">
            <MonitorSmartphone className="h-4 w-4" aria-hidden />
            {profile.website}
          </span>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            className="inline-flex h-12 items-center gap-2 rounded-full bg-blue-600 px-6 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.6)] transition hover:-translate-y-0.5 hover:bg-blue-700"
            href="#projects"
          >
            See my work
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-6 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/[0.14]"
            href="#contact"
          >
            Discuss a project
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-6 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/[0.14]"
            href="/Ala_Baganne_Resume.pdf"
            download
          >
            <Download className="h-4 w-4" aria-hidden />
            Resume
          </a>
        </div>
        <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left backdrop-blur">
              <div className="font-display text-3xl font-semibold tracking-tight text-white">{stat.value}</div>
              <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-slate-400 md:flex">
        scroll
        <span className="h-9 w-px origin-top animate-[hero-scroll-line_2.4s_ease-in-out_infinite] bg-gradient-to-b from-transparent to-slate-300 motion-reduce:animate-none" />
      </div>
      <style>{`
        @keyframes hero-scroll-line {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
