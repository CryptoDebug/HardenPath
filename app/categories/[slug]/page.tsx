import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { CourseCard } from "@/components/course/course-card";
import { LevelFilter } from "@/components/course/level-filter";
import { Badge } from "@/components/ui/badge";
import { categories, getCategory, getCoursesByCategory, type Level } from "@/content/catalog";
import { authOptions } from "@/lib/auth";
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
  const session = await getServerSession(authOptions);
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
    <div className="hp-page-shell">
      <section className="hp-shell hp-atlas-surface hp-path-card p-6 sm:p-8">
        <div aria-hidden className="hp-gridwash" />
        <div className="hp-inner">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={category.color}>{dictionary.category.modules}</Badge>
            <span className="hp-brand-chip">Sector / {category.slug}</span>
          </div>
          <h1 className="hp-wrap mt-5 text-4xl font-black leading-tight text-white">{category.title[locale]}</h1>
          <p className="hp-wrap mt-4 max-w-3xl text-base leading-7 text-slate-300">{category.description[locale]}</p>
          {!session ? (
            <p className="hp-wrap mt-4 max-w-3xl rounded-md border border-amber/30 bg-amber/[0.09] p-4 text-sm font-bold leading-6 text-amber">
              {locale === "fr"
                ? "Connecte-toi pour ouvrir les modules, valider les jalons et reprendre ton parcours."
                : "Sign in to open modules, validate milestones, and resume your path."}
            </p>
          ) : null}
          <div className="hp-ledger mt-7 rounded-sm p-4">
            <p className="hp-kicker mb-3">{dictionary.category.levelFilter}</p>
            <LevelFilter active={activeLevel} basePath={`/categories/${category.slug}`} locale={locale} />
          </div>
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
            locked={!session}
          />
        ))}
      </section>
    </div>
  );
}
