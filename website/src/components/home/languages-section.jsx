import { SectionHeader } from "@/components/section-header";
import { Card } from "@/components/ui/card";
import { BookOpen, Globe, MessageCircle } from "lucide-react";

const languages = [
  { name: "English", level: "Fluent", icon: MessageCircle },
  { name: "Arabic", level: "Native", icon: BookOpen },
  { name: "French", level: "Intermediate", icon: Globe },
];

export function LanguagesSection() {
  return (
    <section id="languages" className="space-y-8">
      <SectionHeader
        eyebrow="LANGUAGES"
        title="Spoken languages"
        description="Comfortable collaborating across English, Arabic, and French-speaking teams."
      />
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {languages.map(({ name, level, icon: Icon }) => (
          <Card
            key={name}
            className="flex flex-col items-center gap-3 border-white/10 bg-white/[0.04] p-4 text-center text-sm text-slate-200"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-400/10 text-sky-400">
              <Icon className="h-6 w-6" aria-hidden />
            </span>
            <div className="text-base font-semibold text-white">{name}</div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{level}</div>
          </Card>
        ))}
      </div>
    </section>
  );
}
