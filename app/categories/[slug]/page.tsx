import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { CourseBrowser } from "@/components/course/course-browser";
import { LevelFilter } from "@/components/course/level-filter";
import { Badge } from "@/components/ui/badge";
import { categories, getCategory, getCoursesByCategory, type Level } from "@/content/catalog";
import { getBeginnerExam, getBeginnerExamRequirement } from "@/content/exams";
import { authOptions } from "@/lib/auth";
import { getDictionary, getLocale } from "@/lib/i18n";
import { getCompletedCourseSlugs } from "@/lib/learning";
import { Award, LockKeyhole } from "lucide-react";
import Link from "next/link";

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
  const completedSlugs = await getCompletedCourseSlugs(session?.user?.id);
  const beginnerExam = getBeginnerExam(category.slug);
  const beginnerRequirement = getBeginnerExamRequirement(category.slug);
  const completedBeginnerCourses = beginnerRequirement.courseSlugs.filter((courseSlug) => completedSlugs.includes(courseSlug)).length;
  const beginnerExamUnlocked = Boolean(session?.user?.id) && completedBeginnerCourses === beginnerRequirement.total;

  return (
    <div className="hp-page-shell">
      <section className="hp-shell hp-atlas-surface hp-path-card p-6 sm:p-8">
        <div aria-hidden className="hp-gridwash" />
        <div className="hp-inner">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={category.color}>{dictionary.category.modules}</Badge>
            <Badge>{categoryCourses.length} modules</Badge>
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
          {beginnerExam ? (
            <div className="mt-5 rounded-sm border border-white/10 bg-white/[0.055] p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={beginnerExamUnlocked ? "mint" : "amber"}>{beginnerExamUnlocked ? (locale === "fr" ? "Déverrouillé" : "Unlocked") : locale === "fr" ? "Examen verrouillé" : "Exam locked"}</Badge>
                    <Badge tone="wood">{locale === "fr" ? "Débutant" : "Beginner"}</Badge>
                  </div>
                  <h2 className="hp-wrap mt-3 text-lg font-black text-white">{beginnerExam.title[locale]}</h2>
                  <p className="hp-wrap mt-1 text-sm leading-6 text-slate-300">
                    {completedBeginnerCourses}/{beginnerRequirement.total} {locale === "fr" ? "cours débutants validés" : "beginner courses validated"}
                  </p>
                </div>
                <Link className={beginnerExamUnlocked ? "hp-button-primary" : "hp-button-secondary"} href={`/exams/${category.slug}/beginner`}>
                  {beginnerExamUnlocked ? <Award aria-hidden className="h-4 w-4" /> : <LockKeyhole aria-hidden className="h-4 w-4" />}
                  {locale === "fr" ? "Voir l'examen" : "View exam"}
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <CourseBrowser
        completedSlugs={completedSlugs}
        courses={categoryCourses}
        freeLabel={dictionary.home.free}
        locale={locale}
        locked={!session}
        premiumLabel={dictionary.home.premium}
      />
    </div>
  );
}
