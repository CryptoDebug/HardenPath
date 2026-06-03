import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  Compass,
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
          "Des modules courts, ordonnés par niveau",
          "Des exercices cadrés pour progresser sans flou",
          "Des validations qui transforment l'effort en preuve"
        ]
      : [
          "Short modules organized by level",
          "Scoped exercises that keep progress clear",
          "Validations that turn effort into proof"
        ];

  return (
    <div className="hp-page-shell">
      <section className="hp-hero-grid">
        <div className="hp-shell hp-path-card p-6 sm:p-8">
          <div aria-hidden className="hp-atlas-hero">
            <Image alt="" fill priority sizes="(min-width: 1024px) 760px, 100vw" src="/brand/hardenpath-atlas.png" />
          </div>
          <div aria-hidden className="hp-gridwash" />
          <div className="hp-inner">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="mint">{dictionary.home.eyebrow}</Badge>
              <span className="hp-brand-chip">
                <Sparkles aria-hidden className="h-3.5 w-3.5 text-amber" />
                Pathline OS
              </span>
            </div>
            <h1 className="hp-wrap mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl">
              {dictionary.home.title}
            </h1>
            <p className="hp-wrap mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{dictionary.home.body}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="hp-button-primary" href="/categories/network">
                <BookOpenCheck aria-hidden className="h-4 w-4" />
                {dictionary.home.continue}
              </Link>
              <Link className="hp-button-secondary" href="/badges">
                <Award aria-hidden className="h-4 w-4" />
                Badges
              </Link>
              <Link className="hp-button-secondary" href="/ethics">
                <ChevronRight aria-hidden className="h-4 w-4" />
                {dictionary.home.ethics}
              </Link>
            </div>

            <div className="hp-skill-map hp-ledger mt-8 rounded-sm p-4">
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

      <section className="mt-10 grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="hp-shell hp-path-card p-5">
          <div className="hp-inner">
            <span className="hp-brand-chip">
              <Compass aria-hidden className="h-3.5 w-3.5 text-mint" />
              {locale === "fr" ? "Méthode HardenPath" : "HardenPath method"}
            </span>
            <h2 className="hp-wrap mt-4 text-2xl font-black leading-8 text-white">
              {locale === "fr" ? "Un parcours qui se voit, se valide, se reprend." : "A route you can see, validate, and resume."}
            </h2>
            <p className="hp-wrap mt-3 text-sm leading-7 text-slate-300">
              {locale === "fr"
                ? "Chaque parcours avance par jalons courts : comprendre, pratiquer, confirmer. La progression devient une preuve, pas une promesse."
                : "Each path moves through short milestones: understand, practice, confirm. Progress becomes proof, not a promise."}
            </p>
          </div>
        </div>
        <div className="hp-route-rail grid gap-4 md:grid-cols-3">
          {platformItems.map((item, index) => (
            <div className="hp-panel hp-route-card rounded-sm p-5" key={item}>
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <span className="hp-checkpoint">0{index + 1}</span>
                  <CheckCircle2 aria-hidden className="h-5 w-5 text-amber" />
                </div>
                <p className="hp-wrap mt-4 text-base font-black leading-6 text-white">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12" id="categories">
        <div className="hp-ledger rounded-sm p-5 sm:p-6">
          <SectionHeading
            title={dictionary.home.categories}
            body={
              locale === "fr"
                ? "Choisis un parcours, travaille les modules par niveau, puis valide les compétences dans des exercices cadrés."
                : "Choose a path, work through modules by level, then validate skills through scoped exercises."
            }
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          { icon: Award, value: String(categories.length), label: dictionary.home.categories },
          { icon: Flame, value: String(courses.length), label: locale === "fr" ? "Modules disponibles" : "Available modules" },
          { icon: LockKeyhole, value: String(stats.completedCourses), label: locale === "fr" ? "Modules validés" : "Validated modules" }
        ].map((item) => (
          <div className="hp-panel hp-path-card rounded-sm p-5" key={item.label}>
            <div className="relative">
              <div className="flex items-center justify-between gap-3">
                <item.icon aria-hidden className="h-6 w-6 text-paper" />
                <ShieldCheck aria-hidden className="h-4 w-4 text-mint/70" />
              </div>
              <p className="hp-wrap mt-4 text-2xl font-black text-white">{item.value}</p>
              <p className="hp-wrap mt-1 text-sm text-slate-300">{item.label}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
