import { SectionHeader } from '@/components/section-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';

const education = [
        {
                school: 'Higher Institute of Applied Science and Technology of Sousse',
                degree: 'Engineering Degree in Software Engineering',
                period: 'June 2024',
                featured: true,
                notes: [
                        {
                                label: 'Capstone Leadership',
                                description:
                                        'Directed a full-stack delivery initiative from research through launch while facilitating Agile ceremonies for a cross-functional team.',
                        },
                ],
        },
        {
                school: 'Higher Institute of Applied Science and Technology of Sousse',
                degree: 'Bachelor of Science in Computer Science',
                period: 'June 2021',
                featured: true,
                notes: [
                        {
                                label: 'Industry Impact',
                                description: 'Delivered internship management tooling adopted by local partners.',
                        },
                        {
                                label: 'Academic Merit',
                                description:
                                        'Graduated among the top students and qualified for advanced engineering studies.',
                        },
                ],
        },
        {
                school: 'High School of Jemmal',
                degree: 'High School Diploma - Experimental Science',
                period: 'June 2018',
                notes: [
                        {
                                label: 'Focus',
                                description: 'Built a foundation in analytical thinking and collaboration.',
                        },
                ],
        },
        {
                school: 'Microsoft Technology Associate Certifications',
                degree: 'Web & Programming Track',
                period: '2019 – 2021',
                notes: [
                        {
                                label: 'Completed Exams',
                                description:
                                        'HTML and CSS, JavaScript, Python, and Database Fundamentals credentials.',
                        },
                ],
        },
        {
                school: 'Cisco Certified Network Associate (CCNA)',
                degree: 'Networking Foundations',
                period: '2022',
                notes: [
                        {
                                label: 'Pathway Progress',
                                description:
                                        'Completed the Introduction to Networks module within the CCNA certification sequence.',
                        },
                ],
        },
];

export function EducationSection() {
	return (
		<section id="education" className="space-y-8">
			<SectionHeader
				eyebrow="EDUCATION"
				title="Education & certifications"
				description="Academic foundations and professional credentials that inform my engineering approach."
			/>
                        <ol className="grid gap-6 md:grid-cols-2">
                                {education.map((item) => (
                                        <li
                                                key={`${item.school}-${item.degree}-${item.period}`}
                                                className={cn('h-full', item.featured && 'md:col-span-2')}
                                        >
                                                <div>
                                                        <Card
                                                                className={cn(
                                                                        'relative flex h-full flex-col overflow-hidden border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgba(148,163,184,0.08)] transition hover:border-sky-400/40 hover:bg-white/[0.06]',
                                                                        item.featured &&
                                                                                'border-sky-400/60 bg-sky-400/15 shadow-[0_0_0_1px_rgba(56,189,248,0.45)] hover:border-sky-400/70 hover:bg-sky-400/20'
                                                                )}
                                                        >
                                                                <CardHeader
                                                                        className={cn(
                                                                                'flex-1 space-y-3',
                                                                                item.notes.length === 0 && '!mb-0'
                                                                        )}
                                                                >
                                                                        <CardTitle
                                                                                className={cn(
                                                                                        'text-base font-semibold leading-tight text-white',
                                                                                        item.featured && 'text-lg'
                                                                                )}
                                                                        >
                                                                                {item.school}
                                                                        </CardTitle>
                                                                        <span className="w-fit inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-sky-100">
                                                                                <Calendar className="h-3 w-3" aria-hidden />
                                                                                {item.period}
                                                                        </span>
                                                                        <CardDescription
                                                                                className={cn(
                                                                                        'text-sm text-slate-300',
                                                                                        item.featured && 'text-base text-slate-100'
                                                                                )}
                                                                        >
                                                                                {item.degree}
                                                                        </CardDescription>
                                                                </CardHeader>
                                                                {item.notes && item.notes.length > 0 ? (
                                                                        <CardContent
                                                                                className={cn(
                                                                                        'text-xs text-slate-200',
                                                                                        item.featured && 'text-sm text-slate-100'
                                                                                )}
                                                                        >
                                                                                <ul className="space-y-1.5">
                                                                                        {item.notes.map((note, noteIndex) => (
                                                                                                <li key={noteIndex} className="flex gap-2 leading-relaxed">
                                                                                                        <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-sky-400/80" />
                                                                                                        <div className="flex flex-wrap gap-x-1">
                                                                                                                {typeof note === 'string' ? (
                                                                                                                        <span>{note}</span>
                                                                                                                ) : (
                                                                                                                        <>
                                                                                                                                {note.label ? (
                                                                                                                                        <span className="font-semibold text-sky-100">
                                                                                                                                                {note.label}:
                                                                                                                                        </span>
                                                                                                                                ) : null}
                                                                                                                                <span>{note.description}</span>
                                                                                                                        </>
                                                                                                                )}
                                                                                                        </div>
                                                                                                </li>
                                                                                        ))}
                                                                                </ul>
                                                                        </CardContent>
								) : null}
							</Card>
						</div>
					</li>
				))}
			</ol>
		</section>
	);
}
