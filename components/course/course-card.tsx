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
  const isLocked = course.isPremium || locked;

  return (
    <Link
      className="focus-ring hp-panel hp-route-card group flex h-full min-h-[260px] flex-col rounded-sm p-5 transition duration-200 hover:-translate-y-0.5 hover:border-mint/30 hover:bg-white/[0.07]"
      href={locked ? "/account" : `/courses/${course.slug}`}
    >
      <div className="relative flex h-full flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={course.isPremium ? "amber" : "mint"}>{course.isPremium ? premiumLabel : freeLabel}</Badge>
          <Badge>{levelLabels[course.level][locale]}</Badge>
        </div>

        <div className="mt-5 flex items-start gap-3">
          <span className="hp-checkpoint">
            {isLocked ? <LockKeyhole aria-hidden className="h-5 w-5 text-amber" /> : <PlayCircle aria-hidden className="h-5 w-5 text-mint" />}
          </span>
          <div className="min-w-0">
            <p className="hp-kicker">{locale === "fr" ? "Module" : "Module"}</p>
            <h3 className="hp-wrap mt-1 text-lg font-black leading-7 text-white">{course.title[locale]}</h3>
          </div>
        </div>

        <p className="hp-wrap mt-3 flex-1 text-sm leading-6 text-slate-300">{course.summary[locale]}</p>

        <div className="mt-5 border-t border-white/10 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2">
              <Clock aria-hidden className="h-4 w-4 shrink-0 text-steel" />
              {course.estimatedMinutes} min
            </span>
            <span className="inline-flex min-w-0 items-center gap-2 font-black text-paper">
              <span className="hp-wrap">{locked ? (locale === "fr" ? "Ouvrir l'accès" : "Open access") : locale === "fr" ? "Démarrer" : "Start"}</span>
              <span aria-hidden className="h-2 w-8 rounded-full bg-[linear-gradient(90deg,#67d8bd,#c8a45f)] transition group-hover:w-11" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
