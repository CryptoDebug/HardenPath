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
  locked?: boolean;
};

export function CourseCard({ course, locale, freeLabel, premiumLabel, locked = false }: CourseCardProps) {
  return (
    <Link
      className="focus-ring hp-panel group flex h-full min-h-[250px] flex-col rounded-md p-5 transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]"
      href={locked ? "/account" : `/courses/${course.slug}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={course.isPremium ? "amber" : "mint"}>{course.isPremium ? premiumLabel : freeLabel}</Badge>
        <Badge>{levelLabels[course.level][locale]}</Badge>
      </div>
      <h3 className="hp-wrap mt-4 text-lg font-extrabold leading-7 text-white">{course.title[locale]}</h3>
      <p className="hp-wrap mt-2 flex-1 text-sm leading-6 text-slate-300">{course.summary[locale]}</p>
      <div className="my-5 h-px bg-white/10" />
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
        <span className="inline-flex items-center gap-2">
          <Clock aria-hidden className="h-4 w-4 shrink-0 text-steel" />
          {course.estimatedMinutes} min
        </span>
        <span className="inline-flex min-w-0 items-center gap-2 font-bold text-paper">
          {course.isPremium || locked ? <LockKeyhole aria-hidden className="h-4 w-4 shrink-0 text-amber" /> : <PlayCircle aria-hidden className="h-4 w-4 shrink-0 text-mint" />}
          <span className="hp-wrap">{locked ? (locale === "fr" ? "Accès" : "Access") : locale === "fr" ? "Démarrer" : "Start"}</span>
        </span>
      </div>
    </Link>
  );
}
