import Link from "next/link";
import Image from "next/image";
import {
  Award,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  Flame,
  LockKeyhole,
  Map,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { getServerSession } from "next-auth";
import { CategoryCard } from "@/components/course/category-card";
import { LearningPulse } from "@/components/progress/learning-pulse";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { categories, courses, getCoursesByCategory } from "@/content/catalog";
import { authOptions } from "@/lib/auth";
import { getDictionary, getLocale } from "@/lib/i18n";
import { getLearningStats } from "@/lib/learning";

export default async function HomePage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const session = await getServerSession(authOptions);
  const stats = await getLearningStats(session?.user?.id);
  const completedSteps = session ? Math.min(stats.completedCourses, 5) : 0;
  const pathSteps =
    locale === "fr"
      ? ["Cadre", "Fondations", "Pratique", "Validation", "Badge"]
      : ["Scope", "Foundations", "Practice", "Validation", "Badge"];
  const platformItems =
    locale === "fr"
      ? [
          "Des parcours courts, ordonnés par niveau",
          "Des exercices cadrés pour progresser sans flou",
          "Des badges et validations pour voir l'avancée"
        ]
      : [
          "Short paths organized by level",
          "Scoped exercises that keep progress clear",
          "Badges and validations that make progress visible"
        ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
        <div className="hp-shell rounded-md p-6 sm:p-8">
          <div aria-hidden className="hp-atlas-hero">
            <Image alt="" fill priority sizes="(min-width: 1024px) 760px, 100vw" src="/brand/hardenpath-atlas.png" />
          </div>
          <div className="hp-inner">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="mint">{dictionary.home.eyebrow}</Badge>
              <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-bold text-paper">
                <Sparkles aria-hidden className="h-3.5 w-3.5 text-amber" />
                {locale === "fr" ? "Progression visible" : "Visible progress"}
              </span>
            </div>
            <h1 className="hp-wrap mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {dictionary.home.title}
            </h1>
            <p className="hp-wrap mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{dictionary.home.body}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="hp-button-primary" href="/categories/network">
                <BookOpenCheck aria-hidden className="h-4 w-4" />
                {dictionary.home.continue}
              </Link>
              <Link className="hp-button-secondary" href="/ethics">
                <ChevronRight aria-hidden className="h-4 w-4" />
                {dictionary.home.ethics}
              </Link>
            </div>

            <div className="hp-skill-map mt-8 rounded-md p-4">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-2 text-sm font-extrabold text-paper">
                  <Map aria-hidden className="h-4 w-4 shrink-0 text-mint" />
                  <span className="hp-wrap">{locale === "fr" ? "Carte de progression" : "Progression map"}</span>
                </div>
                <span className="hp-wrap text-xs font-bold text-steel">
                  {stats.completedCourses}/{stats.totalCourses} {locale === "fr" ? "modules validés" : "modules validated"}
                </span>
              </div>
              <div className="relative grid gap-3 sm:grid-cols-5">
                {pathSteps.map((step, index) => {
                  const isDone = index < completedSteps;
                  return (
                    <div className={`hp-node ${isDone ? "hp-node-done" : "hp-node-locked"}`} key={step}>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] text-steel">0{index + 1}</span>
                        {isDone ? <CheckCircle2 aria-hidden className="h-4 w-4 text-mint" /> : null}
                      </div>
                      <span className="mt-2 block">{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <LearningPulse
          badgeCount={stats.badgeCount}
          completedCourses={stats.completedCourses}
          isAuthenticated={Boolean(session)}
          locale={locale}
          streakDays={stats.streakDays}
          totalCourses={stats.totalCourses}
          totalPercent={stats.totalPercent}
        />
      </section>

      <section className="hp-route-rail mt-10 grid gap-4 md:grid-cols-3">
        {platformItems.map((item, index) => (
          <div className="hp-panel hp-panel-accent rounded-md p-5" key={item}>
            <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <span className="hp-checkpoint">
                0{index + 1}
              </span>
              <CheckCircle2 aria-hidden className="h-5 w-5 text-amber" />
            </div>
            <p className="hp-wrap mt-4 text-base font-extrabold leading-6 text-white">{item}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-12" id="categories">
        <SectionHeading
          title={dictionary.home.categories}
          body={
            locale === "fr"
              ? "Choisis un parcours, travaille les modules par niveau, puis valide les compétences dans des exercices cadrés."
              : "Choose a path, work through modules by level, then validate skills through scoped exercises."
          }
        />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <CategoryCard
              category={category}
              cta={dictionary.home.viewCategory}
              index={index}
              key={category.slug}
              locale={locale}
              locked={!session}
              moduleCount={getCoursesByCategory(category.slug).length}
              progress={session ? stats.categoryProgress[category.slug] ?? 0 : undefined}
            />
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          { icon: Award, value: String(categories.length), label: dictionary.home.categories },
          { icon: Flame, value: String(courses.length), label: locale === "fr" ? "Modules disponibles" : "Available modules" },
          { icon: LockKeyhole, value: String(stats.completedCourses), label: locale === "fr" ? "Modules validés" : "Validated modules" }
        ].map((item) => (
          <div className="hp-panel hp-panel-accent rounded-md p-5" key={item.label}>
            <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <item.icon aria-hidden className="h-6 w-6 text-paper" />
              <ShieldCheck aria-hidden className="h-4 w-4 text-mint/70" />
            </div>
            <p className="hp-wrap mt-4 text-2xl font-extrabold text-white">{item.value}</p>
            <p className="hp-wrap mt-1 text-sm text-slate-300">{item.label}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
