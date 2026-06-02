import Link from "next/link";
import { Award, BookOpenCheck, ChevronRight, LockKeyhole, Sparkles } from "lucide-react";
import { CategoryCard } from "@/components/course/category-card";
import { CourseCard } from "@/components/course/course-card";
import { LearningPulse } from "@/components/progress/learning-pulse";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { categories, courses, getCoursesByCategory } from "@/content/catalog";
import { getDictionary, getLocale } from "@/lib/i18n";

export default async function HomePage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-lg border border-white/10 bg-white/8 p-6 shadow-soft sm:p-8">
          <Badge tone="mint">{dictionary.home.eyebrow}</Badge>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            {dictionary.home.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{dictionary.home.body}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              className="focus-ring inline-flex items-center gap-2 rounded-md bg-mint px-4 py-3 text-sm font-bold text-ink transition hover:bg-teal-200"
              href="/categories/network"
            >
              <BookOpenCheck aria-hidden className="h-4 w-4" />
              {dictionary.home.continue}
            </Link>
            <Link
              className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/7 px-4 py-3 text-sm font-bold text-white transition hover:border-amber/45 hover:bg-amber/10"
              href="/ethics"
            >
              <ChevronRight aria-hidden className="h-4 w-4" />
              {dictionary.home.ethics}
            </Link>
          </div>
        </div>
        <LearningPulse locale={locale} />
      </section>

      <section className="mt-10">
        <SectionHeading eyebrow={dictionary.home.featured} title={dictionary.home.continue} />
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {featuredCourses.map((course) => (
            <CourseCard
              course={course}
              freeLabel={dictionary.home.free}
              key={course.slug}
              locale={locale}
              premiumLabel={dictionary.home.premium}
            />
          ))}
        </div>
      </section>

      <section className="mt-12" id="categories">
        <SectionHeading title={dictionary.home.categories} body={locale === "fr" ? "Choisis une zone, filtre par niveau, puis valide ta progression avec des preuves de lab." : "Choose an area, filter by level, then validate progress with lab evidence."} />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <CategoryCard
              category={category}
              cta={dictionary.home.viewCategory}
              key={category.slug}
              locale={locale}
              moduleCount={getCoursesByCategory(category.slug).length}
              progress={[42, 15, 9, 28, 18, 5, 11, 33, 4, 22][index]}
            />
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          { icon: Award, value: "10", label: dictionary.home.badges, tone: "amber" as const },
          { icon: Sparkles, value: "3", label: dictionary.home.weekly, tone: "mint" as const },
          { icon: LockKeyhole, value: "Freemium", label: dictionary.home.premium, tone: "coral" as const }
        ].map((item) => (
          <div className="rounded-lg border border-white/10 bg-white/7 p-5" key={item.label}>
            <item.icon aria-hidden className="h-6 w-6 text-mint" />
            <p className="mt-4 text-2xl font-bold text-white">{item.value}</p>
            <p className="mt-1 text-sm text-slate-300">{item.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
