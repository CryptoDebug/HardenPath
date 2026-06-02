import { notFound } from "next/navigation";
import { CourseCard } from "@/components/course/course-card";
import { LevelFilter } from "@/components/course/level-filter";
import { Badge } from "@/components/ui/badge";
import { categories, getCategory, getCoursesByCategory, type Level } from "@/content/catalog";
import { getDictionary, getLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ level?: string }>;
};

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const { slug } = await params;
  const query = searchParams ? await searchParams : {};
  const category = getCategory(slug);

  if (!category) {
    notFound();
  }

  const activeLevel = ["beginner", "intermediate", "advanced"].includes(query.level ?? "")
    ? (query.level as Level)
    : "all";

  const categoryCourses = getCoursesByCategory(category.slug).filter((course) => activeLevel === "all" || course.level === activeLevel);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-lg border border-white/10 bg-white/8 p-6 shadow-soft sm:p-8">
        <Badge tone={category.color}>{dictionary.category.modules}</Badge>
        <h1 className="mt-5 text-4xl font-bold text-white">{category.title[locale]}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{category.description[locale]}</p>
        <div className="mt-7">
          <p className="mb-3 text-sm font-semibold text-slate-200">{dictionary.category.levelFilter}</p>
          <LevelFilter active={activeLevel} basePath={`/categories/${category.slug}`} locale={locale} />
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categoryCourses.map((course) => (
          <CourseCard
            course={course}
            freeLabel={dictionary.home.free}
            key={course.slug}
            locale={locale}
            premiumLabel={dictionary.home.premium}
          />
        ))}
      </section>
    </div>
  );
}
