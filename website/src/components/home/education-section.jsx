import { SectionHeader } from "@/components/section-header";
import { Award, Calendar } from "lucide-react";

const education = [
  {
    period: "Sep 2021 — Jun 2024",
    degree: "Engineer's Degree, Software Engineering",
    school: "ISSAT Sousse — Institut Supérieur des Sciences Appliquées et de Technologie",
    notes:
      "Selected as one of the top Computer Science students to join the competitive engineering program. Curriculum emphasized advanced software architecture, backend system design, and industry-standard practices.",
  },
  {
    period: "2018 — Jul 2021",
    degree: "Bachelor's Degree, Computer Science",
    school: "ISSAT Sousse",
    notes:
      "Ranked among the top 5 students out of 90, earning direct admission to the Software Engineering degree program. End-of-studies project: Internly, a full-stack internship platform.",
  },
];

const certifications = [
  { name: "CCNA: Introduction to Networks", issuer: "Cisco · 2022" },
  { name: "MTA: Introduction to Programming Using Python", issuer: "Microsoft · 2021" },
  { name: "MTA: Database Fundamentals", issuer: "Microsoft · 2021" },
  { name: "MTA: Programming Using JavaScript", issuer: "Microsoft · 2019" },
  { name: "MTA: Programming Using HTML and CSS", issuer: "Microsoft · 2019" },
];

export function EducationSection() {
  return (
    <section id="education" className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="05 · Education & Certifications"
          title="Formal training in software engineering."
          description="Top-of-class admission to the competitive Software Engineering track at ISSAT Sousse, with a foundation in fundamentals and modern practice."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.35fr_1fr]">
          <ol className="space-y-4">
            {education.map((item) => (
              <li key={`${item.school}-${item.degree}`} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-slate-500">
                  <Calendar className="h-3.5 w-3.5" aria-hidden />
                  {item.period}
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-slate-950">{item.degree}</h3>
                <p className="mt-1 text-sm font-semibold text-blue-700">{item.school}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.notes}</p>
              </li>
            ))}
          </ol>
          <div className="space-y-4">
            {certifications.map((certification) => (
              <div key={certification.name} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-5">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-slate-50 text-blue-600">
                  <Award className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-950">{certification.name}</h3>
                  <p className="mt-0.5 text-xs text-slate-500">{certification.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
