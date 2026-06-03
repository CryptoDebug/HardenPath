import { CheckCircle2, ExternalLink, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { CourseValidationPanel } from "@/components/course/course-validation-panel";
import { ExerciseFlipCard } from "@/components/course/exercise-flip-card";
import { AccessGate } from "@/components/ui/access-gate";
import { Badge } from "@/components/ui/badge";
import { courses, getCategory, getCourse } from "@/content/catalog";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getDictionary, getLocale } from "@/lib/i18n";
import { getCourseCompletion, userHasPremium } from "@/lib/learning";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const session = await getServerSession(authOptions);
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    notFound();
  }

  const category = getCategory(course.categorySlug);
  const completion = session?.user?.id ? await getCourseCompletion(session.user.id, course.slug) : { completed: false, percent: 0 };
  const hasPremium = session?.user?.id ? await userHasPremium(session.user.id) : false;
  const passedAttempts = session?.user?.id
    ? await prisma.quizAttempt.findMany({
        where: {
          passed: true,
          quiz: {
            course: {
              slug: course.slug
            },
            slug: "validation"
          },
          userId: session.user.id
        },
        select: {
          maxScore: true,
          score: true
        }
      })
    : [];
  const initialQuizPassed = passedAttempts.some((attempt) => attempt.score === attempt.maxScore);

  if (!session?.user?.id) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 lg:px-8">
        <AccessGate
          body={
            locale === "fr"
              ? "Les cours, exercices, QCM et validations demandent un compte afin de suivre ton parcours et tes jalons."
              : "Courses, exercises, quizzes, and validations require an account so your path and milestones can follow you."
          }
          cta={dictionary.account.signin}
          title={locale === "fr" ? "Connexion requise pour ouvrir ce cours" : "Sign in required to open this course"}
        />
      </div>
    );
  }

  if (course.isPremium && !hasPremium) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 lg:px-8">
        <AccessGate
          body={
            locale === "fr"
              ? "Ce module fait partie des validations avancées. Reviens-y quand ton niveau d'accès le permet."
              : "This module belongs to advanced validations. Return when your access level allows it."
          }
          cta={dictionary.account.title}
          title={locale === "fr" ? "Validation avancée verrouillée" : "Advanced validation locked"}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 lg:px-8">
      <article className="hp-shell hp-atlas-surface hp-path-card p-6 sm:p-8">
        <div aria-hidden className="hp-gridwash" />
        <div className="hp-inner">
          <div className="flex flex-wrap items-center gap-2">
            {category ? <Badge tone={category.color}>{category.title[locale]}</Badge> : null}
            <Badge tone={course.isPremium ? "amber" : "mint"}>{course.isPremium ? dictionary.home.premium : dictionary.home.free}</Badge>
            <Badge>{course.estimatedMinutes} min</Badge>
          </div>
          <h1 className="hp-wrap mt-5 text-4xl font-black leading-tight text-white">{course.title[locale]}</h1>
          <p className="hp-wrap mt-4 text-lg leading-8 text-slate-300">{course.summary[locale]}</p>
          {course.isPremium ? (
            <div className="hp-wrap mt-6 flex items-start gap-3 rounded-md border border-amber/30 bg-amber/[0.09] p-4 text-sm leading-6 text-amber">
              <LockKeyhole aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
              <span className="min-w-0">{dictionary.course.premiumNotice}</span>
            </div>
          ) : null}

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <section className="hp-ledger rounded-sm p-5">
              <h2 className="hp-wrap text-lg font-black text-white">{dictionary.course.objectives}</h2>
              <ul className="mt-4 space-y-3">
                {course.objectives[locale].map((item) => (
                  <li className="flex gap-3 text-sm leading-6 text-slate-300" key={item}>
                    <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-mint" />
                    <span className="hp-wrap min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="hp-ledger rounded-sm p-5">
              <h2 className="hp-wrap text-lg font-black text-white">{dictionary.course.prerequisites}</h2>
              <ul className="mt-4 space-y-3">
                {course.prerequisites[locale].map((item) => (
                  <li className="hp-wrap text-sm leading-6 text-slate-300" key={`${item.label}-${item.courseSlug ?? "plain"}`}>
                    {item.courseSlug ? (
                      <Link
                        className="focus-ring inline-flex max-w-full items-center gap-2 rounded-sm text-slate-100 underline decoration-mint/45 underline-offset-4 transition hover:text-mint"
                        href={`/courses/${item.courseSlug}`}
                      >
                        <span className="hp-wrap min-w-0">{item.label}</span>
                      </Link>
                    ) : (
                      item.label
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="mt-8">
            <h2 className="hp-wrap text-2xl font-black text-white">{dictionary.course.content}</h2>
            <div className="mt-4 space-y-4">
              {course.sections[locale].map((section, index) => (
                <div className="hp-route-step" key={section.title}>
                  <span className="hp-checkpoint">0{index + 1}</span>
                  <div className="hp-panel rounded-sm p-5">
                  <h3 className="hp-wrap text-lg font-black text-white">{section.title}</h3>
                  <p className="hp-wrap mt-2 text-sm leading-7 text-slate-300">{section.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="hp-wrap text-2xl font-black text-white">{dictionary.course.exercises}</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {course.exercises[locale].map((exercise) => (
                <ExerciseFlipCard
                  body={exercise.body}
                  key={exercise.title}
                  locale={locale}
                  premium={exercise.premium}
                  premiumLabel={dictionary.home.premium}
                  solution={exercise.solution}
                  title={exercise.title}
                />
              ))}
            </div>
          </section>

          <CourseValidationPanel
            completeLabel={dictionary.course.complete}
            courseSlug={course.slug}
            initialCompleted={completion.completed}
            initialQuizPassed={initialQuizPassed}
            locale={locale}
            questions={course.quiz[locale]}
          />

          <section className="mt-8">
            <h2 className="hp-wrap text-2xl font-black text-white">{dictionary.course.resources}</h2>
            <div className="mt-4 grid gap-3">
              {course.resources[locale].map((resource) => (
                <a
                  className="focus-ring inline-flex items-center justify-between gap-3 rounded-sm border border-white/10 bg-white/[0.055] p-4 text-sm font-black text-slate-100 transition hover:border-mint/40 hover:bg-mint/10"
                  href={resource.url}
                  key={resource.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="hp-wrap min-w-0">{resource.label}</span>
                  <ExternalLink aria-hidden className="h-4 w-4 shrink-0 text-mint" />
                </a>
              ))}
            </div>
          </section>

        </div>
      </article>
    </div>
  );
}
