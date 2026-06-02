import Link from "next/link";
import { Award, BookOpenCheck, ChevronRight, Flame, LockKeyhole, Map, ShieldCheck } from "lucide-react";
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
  const pathSteps =
    locale === "fr"
      ? ["Cadre", "Fondations", "Laboratoire", "Validation", "Badge"]
      : ["Scope", "Foundations", "Lab", "Validation", "Badge"];
  const platformItems =
    locale === "fr"
      ? [
          "Parcours structurés par domaine et niveau",
          "Exercices guidés dans des environnements autorisés",
          "Jalons, badges et validations pour mesurer la maîtrise"
        ]
      : [
          "Structured paths by domain and level",
          "Guided practice in authorized environments",
          "Milestones, badges, and validations to measure mastery"
        ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
        <div className="hp-shell rounded-md p-6 sm:p-8">
          <div className="hp-inner">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="mint">{dictionary.home.eyebrow}</Badge>
              <span className="hp-kicker">paths / labs / validation</span>
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl">
              {dictionary.home.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{dictionary.home.body}</p>
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
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-paper">
                  <Map aria-hidden className="h-4 w-4 text-mint" />
                  {locale === "fr" ? "Carte de progression" : "Progression map"}
                </div>
                <span className="text-xs font-bold text-steel">
                  {stats.completedCourses}/{stats.totalCourses} {locale === "fr" ? "modules validés" : "modules validated"}
                </span>
              </div>
              <div className="relative grid gap-3 sm:grid-cols-5">
                {pathSteps.map((step, index) => {
                  const isDone = session ? index < Math.min(stats.completedCourses, pathSteps.length) : false;
                  return (
                    <div className={`hp-node ${isDone ? "hp-node-done" : "hp-node-locked"}`} key={step}>
                      <span className="block text-[10px] text-steel">0{index + 1}</span>
                      <span className="mt-1 block">{step}</span>
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

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {platformItems.map((item, index) => (
          <div className="hp-panel rounded-md p-5" key={item}>
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-steel">0{index + 1}</span>
            <p className="mt-3 text-base font-black leading-6 text-white">{item}</p>
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
          <div className="hp-panel rounded-md p-5" key={item.label}>
            <div className="flex items-center justify-between">
              <item.icon aria-hidden className="h-6 w-6 text-steel" />
              <ShieldCheck aria-hidden className="h-4 w-4 text-mint/70" />
            </div>
            <p className="mt-4 text-2xl font-black text-white">{item.value}</p>
            <p className="mt-1 text-sm text-slate-300">{item.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
