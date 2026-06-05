import { Award, CheckCircle2, LockKeyhole, Route, Timer } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { BeginnerExamPanel } from "@/components/exam/beginner-exam-panel";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getCategory } from "@/content/catalog";
import { getBeginnerExam, getBeginnerExamRequirement, getBeginnerExamStaticParams } from "@/content/exams";
import { authOptions } from "@/lib/auth";
import { getLocale } from "@/lib/i18n";
import { getCompletedCourseSlugs } from "@/lib/learning";

type BeginnerExamPageProps = {
  params: Promise<{
    categorySlug: string;
  }>;
};

export function generateStaticParams() {
  return getBeginnerExamStaticParams();
}

export default async function BeginnerExamPage({ params }: BeginnerExamPageProps) {
  const locale = await getLocale();
  const session = await getServerSession(authOptions);
  const { categorySlug } = await params;
  const category = getCategory(categorySlug);
  const exam = getBeginnerExam(categorySlug);

  if (!category || !exam) {
    notFound();
  }

  const requirement = getBeginnerExamRequirement(categorySlug);
  const completedSlugs = await getCompletedCourseSlugs(session?.user?.id);
  const completed = requirement.courseSlugs.filter((slug) => completedSlugs.includes(slug)).length;
  const completionPercent = requirement.total > 0 ? Math.round((completed / requirement.total) * 100) : 0;
  const unlocked = Boolean(session?.user?.id) && completed === requirement.total;

  const copy = {
    fr: {
      back: "Retour au parcours",
      locked: "Examen verrouillé",
      lockedBody: "Valide tous les cours débutants de ce parcours avant de passer l'examen.",
      signin: "Connecte-toi pour suivre tes validations et déverrouiller cet examen.",
      ready: "Examen disponible",
      requirement: "Pré-requis",
      scenario: "Scénario",
      starter: "Badge bronze",
      threshold: "Seuil conseillé",
      validated: "cours débutants validés"
    },
    en: {
      back: "Back to path",
      locked: "Exam locked",
      lockedBody: "Validate every beginner course in this path before taking the exam.",
      signin: "Sign in to track validations and unlock this exam.",
      ready: "Exam available",
      requirement: "Requirement",
      scenario: "Scenario",
      starter: "Bronze badge",
      threshold: "Recommended threshold",
      validated: "beginner courses validated"
    }
  }[locale];

  return (
    <div className="hp-page-shell">
      <section className="hp-shell hp-atlas-surface hp-path-card p-6 sm:p-8">
        <div aria-hidden className="hp-gridwash" />
        <div className="hp-inner grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={unlocked ? "mint" : "amber"}>{unlocked ? copy.ready : copy.locked}</Badge>
              <Badge tone="wood">{copy.starter}</Badge>
              <span className="hp-brand-chip">
                <Timer aria-hidden className="h-3.5 w-3.5 text-mint" />
                {exam.durationMinutes} min
              </span>
            </div>
            <h1 className="hp-wrap mt-5 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl">{exam.title[locale]}</h1>
            <p className="hp-wrap mt-4 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{exam.scenario[locale]}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="hp-button-secondary" href={`/categories/${category.slug}?level=beginner`}>
                <Route aria-hidden className="h-4 w-4" />
                {copy.back}
              </Link>
            </div>
          </div>

          <div className="hp-ledger rounded-sm p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="hp-kicker">{copy.requirement}</p>
                <p className="mt-2 text-3xl font-black text-white">
                  {completed}/{requirement.total}
                </p>
                <p className="hp-wrap mt-1 text-sm font-bold text-steel">{copy.validated}</p>
              </div>
              <span className="hp-checkpoint h-14 w-14">
                {unlocked ? <CheckCircle2 aria-hidden className="h-7 w-7 text-mint" /> : <LockKeyhole aria-hidden className="h-7 w-7 text-amber" />}
              </span>
            </div>
            <div className="mt-4">
              <ProgressBar value={completionPercent} label={copy.requirement} />
            </div>
            <p className="hp-wrap mt-4 text-sm font-bold text-slate-300">
              {copy.threshold} : {exam.passingScore}%
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        {!session?.user?.id ? (
          <div className="hp-panel rounded-sm p-5">
            <p className="hp-wrap flex gap-3 text-sm font-bold leading-6 text-amber">
              <LockKeyhole aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
              <span>{copy.signin}</span>
            </p>
          </div>
        ) : !unlocked ? (
          <div className="hp-panel rounded-sm p-5">
            <p className="hp-wrap flex gap-3 text-sm font-bold leading-6 text-amber">
              <LockKeyhole aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
              <span>{copy.lockedBody}</span>
            </p>
          </div>
        ) : (
          <BeginnerExamPanel exam={exam} locale={locale} />
        )}
      </section>

      <section className="mt-8 hp-panel rounded-sm p-5">
        <div className="flex items-start gap-3">
          <Award aria-hidden className="mt-1 h-5 w-5 shrink-0 text-wood" />
          <div>
            <h2 className="hp-wrap text-lg font-black text-white">{copy.scenario}</h2>
            <p className="hp-wrap mt-2 text-sm leading-6 text-slate-300">{exam.scenario[locale]}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
