import { CheckCircle2, ExternalLink, LockKeyhole } from "lucide-react";
import { notFound } from "next/navigation";
import { QuizPreview } from "@/components/course/quiz-preview";
import { CompleteLessonButton } from "@/components/progress/complete-lesson-button";
import { Badge } from "@/components/ui/badge";
import { courses, getCategory, getCourse } from "@/content/catalog";
import { getDictionary, getLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    notFound();
  }

  const category = getCategory(course.categorySlug);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <article className="rounded-lg border border-white/10 bg-white/8 p-6 shadow-soft sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          {category ? <Badge tone={category.color}>{category.title[locale]}</Badge> : null}
          <Badge tone={course.isPremium ? "amber" : "mint"}>{course.isPremium ? dictionary.home.premium : dictionary.home.free}</Badge>
        </div>
        <h1 className="mt-5 text-4xl font-bold leading-tight text-white">{course.title[locale]}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">{course.summary[locale]}</p>
        {course.isPremium ? (
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-amber/35 bg-amber/10 p-4 text-sm leading-6 text-amber">
            <LockKeyhole aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
            {dictionary.course.premiumNotice}
          </div>
        ) : null}

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <section className="rounded-lg border border-white/10 bg-ink/45 p-5">
            <h2 className="text-lg font-semibold text-white">{dictionary.course.objectives}</h2>
            <ul className="mt-4 space-y-3">
              {course.objectives[locale].map((item) => (
                <li className="flex gap-3 text-sm leading-6 text-slate-300" key={item}>
                  <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-mint" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-lg border border-white/10 bg-ink/45 p-5">
            <h2 className="text-lg font-semibold text-white">{dictionary.course.prerequisites}</h2>
            <ul className="mt-4 space-y-3">
              {course.prerequisites[locale].map((item) => (
                <li className="text-sm leading-6 text-slate-300" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-white">{dictionary.course.content}</h2>
          <div className="mt-4 space-y-4">
            {course.sections[locale].map((section) => (
              <div className="rounded-lg border border-white/10 bg-white/6 p-5" key={section.title}>
                <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{section.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-white">{dictionary.course.exercises}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {course.exercises[locale].map((exercise) => (
              <div className="rounded-lg border border-white/10 bg-white/6 p-5" key={exercise.title}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold text-white">{exercise.title}</h3>
                  {exercise.premium ? <Badge tone="amber">{dictionary.home.premium}</Badge> : null}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{exercise.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-white">{dictionary.course.quiz}</h2>
          <div className="mt-4">
            <QuizPreview questions={course.quiz[locale]} />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-white">{dictionary.course.resources}</h2>
          <div className="mt-4 grid gap-3">
            {course.resources[locale].map((resource) => (
              <a
                className="focus-ring inline-flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/6 p-4 text-sm font-semibold text-slate-100 transition hover:border-mint/40 hover:bg-mint/10"
                href={resource.url}
                key={resource.url}
                rel="noreferrer"
                target="_blank"
              >
                {resource.label}
                <ExternalLink aria-hidden className="h-4 w-4 text-mint" />
              </a>
            ))}
          </div>
        </section>

        <div className="mt-8">
          <CompleteLessonButton label={dictionary.course.complete} />
        </div>
      </article>
    </div>
  );
}
