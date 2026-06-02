import Link from "next/link";
import { Clock, LockKeyhole, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Course, Level } from "@/content/catalog";
import type { Locale } from "@/lib/i18n-client";

const levelLabels: Record<Level, Record<Locale, string>> = {
  beginner: { fr: "Débutant", en: "Beginner" },
  intermediate: { fr: "Intermédiaire", en: "Intermediate" },
  advanced: { fr: "Avancé", en: "Advanced" }
};

type CourseCardProps = {
  course: Course;
  locale: Locale;
  freeLabel: string;
  premiumLabel: string;
};

export function CourseCard({ course, locale, freeLabel, premiumLabel }: CourseCardProps) {
  return (
    <Link
      className="focus-ring group flex h-full flex-col rounded-lg border border-white/10 bg-panel/80 p-5 transition hover:-translate-y-0.5 hover:border-amber/45 hover:bg-white/9"
      href={`/courses/${course.slug}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={course.isPremium ? "amber" : "mint"}>{course.isPremium ? premiumLabel : freeLabel}</Badge>
        <Badge>{levelLabels[course.level][locale]}</Badge>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{course.title[locale]}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-300">{course.summary[locale]}</p>
      <div className="mt-5 flex items-center justify-between text-sm text-slate-300">
        <span className="inline-flex items-center gap-2">
          <Clock aria-hidden className="h-4 w-4 text-mint" />
          {course.estimatedMinutes} min
        </span>
        <span className="inline-flex items-center gap-2 font-semibold text-white">
          {course.isPremium ? <LockKeyhole aria-hidden className="h-4 w-4 text-amber" /> : <PlayCircle aria-hidden className="h-4 w-4 text-mint" />}
          Start
        </span>
      </div>
    </Link>
  );
}
