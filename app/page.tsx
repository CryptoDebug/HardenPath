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
  const pathSteps = locale === "fr"
    ? ["Cadre éthique", "Fondations", "Lab contrôlé", "Validation", "Badge"]
    : ["Ethical scope", "Foundations", "Controlled lab", "Validation", "Badge"];
  const platformItems = locale === "fr"
    ? [
        "Cours structurés par domaine cyber",
        "Exercices et QCM dans des labs autorisés",
        "Progression, badges et freemium stockés en base"
      ]
    : [
        "Structured courses by cybersecurity domain",
        "Exercises and quizzes in authorized labs",
        "Progress, badges, and freemium state stored in the database"
      ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="hp-shell rounded-md p-6 sm:p-8">
          <div className="hp-inner">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="mint">{dictionary.home.eyebrow}</Badge>
              <span className="hp-kicker">open source / self-hosted</span>
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

            <div className="mt-8 rounded-md border border-white/10 bg-ink/45 p-4">
              <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-paper">
                <Map aria-hidden className="h-4 w-4 text-mint" />
                {locale === "fr" ? "Parcours actif" : "Active path"}
              </div>
              <div className="grid gap-3 sm:grid-cols-5">
                {pathSteps.map((step, index) => (
                  <div className="relative rounded-[4px] border border-white/10 bg-white/6 p-3" key={step}>
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-mint">0{index + 1}</span>
                    <p className="mt-2 text-sm font-bold leading-5 text-white">{step}</p>
                    {index < 3 ? <div className="mt-3 h-1 rounded-[2px] bg-mint/55" /> : <div className="mt-3 h-1 rounded-[2px] bg-white/10" />}
                  </div>
                ))}
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
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-mint">0{index + 1}</span>
            <p className="mt-3 text-base font-black leading-6 text-white">{item}</p>
          </div>
        ))}
      </section>

      <section className="mt-12" id="categories">
        <SectionHeading title={dictionary.home.categories} body={locale === "fr" ? "Aperçu des domaines disponibles. Les cours détaillés et validations demandent un compte afin de stocker une progression réelle." : "Overview of available domains. Detailed lessons and validations require an account so progress can be stored for real."} />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <CategoryCard
              category={category}
              cta={dictionary.home.viewCategory}
              key={category.slug}
              locale={locale}
              moduleCount={getCoursesByCategory(category.slug).length}
              progress={session ? stats.categoryProgress[category.slug] ?? 0 : undefined}
              index={index}
              locked={!session}
            />
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          { icon: Award, value: String(categories.length), label: dictionary.home.categories },
          { icon: Flame, value: String(courses.length), label: locale === "fr" ? "Modules disponibles" : "Available modules" },
          { icon: LockKeyhole, value: String(stats.completedCourses), label: locale === "fr" ? "Modules terminés" : "Completed modules" }
        ].map((item) => (
          <div className="hp-panel rounded-md p-5" key={item.label}>
            <div className="flex items-center justify-between">
              <item.icon aria-hidden className="h-6 w-6 text-mint" />
              <ShieldCheck aria-hidden className="h-4 w-4 text-paper/45" />
            </div>
            <p className="mt-4 text-2xl font-black text-white">{item.value}</p>
            <p className="mt-1 text-sm text-slate-300">{item.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
