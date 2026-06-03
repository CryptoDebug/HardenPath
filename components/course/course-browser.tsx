"use client";

import { CheckCircle2, CircleDashed, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { CourseCard } from "@/components/course/course-card";
import type { Course } from "@/content/catalog";
import type { Locale } from "@/lib/i18n-client";

type CompletionFilter = "all" | "todo" | "done";

type CourseBrowserProps = {
  completedSlugs: string[];
  courses: Course[];
  freeLabel: string;
  locale: Locale;
  locked: boolean;
  premiumLabel: string;
};

const labels = {
  fr: {
    all: "Tous",
    done: "Terminés",
    empty: "Aucun cours ne correspond à ces filtres.",
    search: "Rechercher un cours",
    searchPlaceholder: "Titre, description, compétence...",
    todo: "Non terminés"
  },
  en: {
    all: "All",
    done: "Completed",
    empty: "No course matches these filters.",
    search: "Search courses",
    searchPlaceholder: "Title, description, skill...",
    todo: "Not completed"
  }
} satisfies Record<Locale, Record<string, string>>;

export function CourseBrowser({ completedSlugs, courses, freeLabel, locale, locked, premiumLabel }: CourseBrowserProps) {
  const [query, setQuery] = useState("");
  const [completionFilter, setCompletionFilter] = useState<CompletionFilter>("all");
  const completed = useMemo(() => new Set(completedSlugs), [completedSlugs]);
  const copy = labels[locale];

  const filteredCourses = courses.filter((course) => {
    const isCompleted = completed.has(course.slug);
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const searchableText = `${course.title[locale]} ${course.summary[locale]}`.toLocaleLowerCase();
    const matchesQuery = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);
    const matchesCompletion =
      completionFilter === "all" || (completionFilter === "done" && isCompleted) || (completionFilter === "todo" && !isCompleted);

    return matchesQuery && matchesCompletion;
  });

  const filters: Array<{ icon: typeof CircleDashed; value: CompletionFilter; label: string }> = [
    { icon: CircleDashed, value: "all", label: copy.all },
    { icon: CircleDashed, value: "todo", label: copy.todo },
    { icon: CheckCircle2, value: "done", label: copy.done }
  ];

  return (
    <section className="mt-8">
      <div className="hp-ledger rounded-sm p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="relative block">
            <span className="sr-only">{copy.search}</span>
            <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel" />
            <input
              className="focus-ring hp-wrap min-h-11 w-full rounded-sm border border-white/10 bg-black/25 px-10 py-3 text-sm font-bold text-white placeholder:text-steel"
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.searchPlaceholder}
              type="search"
              value={query}
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const Icon = filter.icon;
              const isActive = completionFilter === filter.value;

              return (
                <button
                  className={`focus-ring inline-flex min-h-11 items-center gap-2 rounded-sm border px-3 py-2 text-sm font-black transition ${
                    isActive ? "border-mint/50 bg-mint/[0.15] text-mint" : "border-white/10 bg-white/[0.055] text-slate-200 hover:border-white/25 hover:bg-white/10"
                  }`}
                  key={filter.value}
                  onClick={() => setCompletionFilter(filter.value)}
                  type="button"
                >
                  <Icon aria-hidden className="h-4 w-4" />
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard
              completed={completed.has(course.slug)}
              course={course}
              freeLabel={freeLabel}
              key={course.slug}
              locale={locale}
              locked={locked}
              premiumLabel={premiumLabel}
            />
          ))}
        </div>
      ) : (
        <div className="hp-panel mt-4 rounded-sm p-5">
          <p className="hp-wrap text-sm font-bold text-slate-300">{copy.empty}</p>
        </div>
      )}
    </section>
  );
}
