import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

const profile = {
  name: "Ala Baganne",
  role: "Full-stack developer",
  summary:
    "I help product teams launch dependable web applications that balance polished interfaces with maintainable architecture. From discovery to deployment, I focus on clear communication, accessible design, and measurable results.",
  location: "Jemmel, Monastir, Tunisia",
  email: "alabaganne9@gmail.com",
  phone: "+21650101959",
  phoneDisplay: "+216 50 101 959",
};

const highlights = [
  { label: "Years of hands-on experience", value: "5+" },
  { label: "Production launches delivered", value: "10+" },
  { label: "Time zones supported", value: "EMEA · US" },
];

export function HeroSection() {
  return (
    <section id="top" className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
      <div className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">Welcome</p>
        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
          {profile.name} · {profile.role}
        </h1>
        <p className="max-w-2xl text-lg text-[var(--muted)]">{profile.summary}</p>
        <div className="flex flex-wrap gap-3">
          <Button href="#projects">Browse recent work</Button>
          <Button href={`mailto:${profile.email}`} variant="outline">
            Email me
          </Button>
          <Button href="/Ala_Baganne_Resume.pdf" variant="subtle" download>
            Download résumé
          </Button>
        </div>
      </div>
      <aside className="grid gap-4">
        <Card>
          <CardHeader className="gap-1">
            <CardTitle>Project snapshot</CardTitle>
            <p className="text-sm text-[var(--muted)]">
              Combining product thinking with modern JavaScript frameworks to build performant experiences.
            </p>
          </CardHeader>
          <CardContent className="gap-6">
            <dl className="grid gap-4">
              {highlights.map((item) => (
                <div key={item.label} className="flex items-baseline justify-between gap-3">
                  <dt className="text-sm text-[var(--muted)]">{item.label}</dt>
                  <dd className="text-xl font-semibold text-[var(--foreground)]">{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="space-y-2 text-sm text-[var(--muted)]">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden />
                {profile.location}
              </p>
              <a className="flex items-center gap-2" href={`mailto:${profile.email}`}>
                <Mail className="h-4 w-4" aria-hidden />
                {profile.email}
              </a>
              <a className="flex items-center gap-2" href={`tel:${profile.phone}`}>
                <Phone className="h-4 w-4" aria-hidden />
                {profile.phoneDisplay}
              </a>
            </div>
          </CardContent>
        </Card>
      </aside>
    </section>
  );
}
