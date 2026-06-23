"use client";

import { CheckCircle2, ClipboardCheck, RotateCcw, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { BeginnerExam } from "@/content/exams";
import type { Locale } from "@/lib/i18n-client";
import type { AssessmentQuestion, AssessmentReview } from "@/types/assessment";

type PublicExam = Omit<BeginnerExam, "questions"> & {
  questions: AssessmentQuestion[];
};

type BeginnerExamPanelProps = {
  exam: PublicExam;
  locale: Locale;
};

type ExamResult = {
  awardedBadge?: { titleEn: string; titleFr: string } | null;
  disqualified: boolean;
  passed: boolean;
  review: Record<string, AssessmentReview>;
  score: number;
};

const MIN_WRITTEN_LENGTH = 120;

export function BeginnerExamPanel({ exam, locale }: BeginnerExamPanelProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [writtenResponses, setWrittenResponses] = useState<Record<number, string>>({});
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);
  const answeredCount = Object.keys(answers).length;
  const writtenComplete = exam.tasks.every((_, index) => (writtenResponses[index]?.trim().length ?? 0) >= MIN_WRITTEN_LENGTH);
  const complete = answeredCount === exam.questions.length && writtenComplete;

  const copy = {
    fr: {
      answered: "questions répondues",
      autoFail: "Les choix explicitement destructifs ou hors périmètre provoquent un échec automatique.",
      badge: "Badge bronze enregistré",
      disqualified: "Échec automatique : une action éliminatoire a été sélectionnée.",
      minLength: `Réponse argumentée obligatoire, ${MIN_WRITTEN_LENGTH} caractères minimum.`,
      pass: "Examen réussi",
      reset: "Recommencer",
      score: "Score QCM",
      saving: "Correction...",
      serverError: "Impossible d'enregistrer l'examen pour le moment.",
      submit: "Soumettre l'examen",
      tasks: "Tâches écrites obligatoires",
      threshold: "Seuil recommandé",
      todo: "Réponds à toutes les questions et complète les deux productions écrites.",
      tryAgain: "À retravailler"
    },
    en: {
      answered: "answered questions",
      autoFail: "Explicitly destructive or out-of-scope choices trigger an automatic fail.",
      badge: "Bronze badge saved",
      disqualified: "Automatic fail: a disqualifying action was selected.",
      minLength: `A reasoned response is required, at least ${MIN_WRITTEN_LENGTH} characters.`,
      pass: "Exam passed",
      reset: "Reset",
      score: "Quiz score",
      saving: "Grading...",
      serverError: "Unable to save the exam right now.",
      submit: "Submit exam",
      tasks: "Required written tasks",
      threshold: "Recommended threshold",
      todo: "Answer every question and complete both written submissions.",
      tryAgain: "Needs review"
    }
  }[locale];

  async function handleSubmit() {
    if (!complete || isSaving) return;

    setError("");
    setIsSaving(true);

    try {
      const response = await fetch("/api/exams/beginner/attempt", {
        body: JSON.stringify({
          answers: exam.questions.map((question) => ({ questionId: question.id, optionId: answers[question.id] })),
          categorySlug: exam.categorySlug,
          locale,
          writtenResponses: exam.tasks.map((_, index) => writtenResponses[index].trim())
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST"
      });

      if (!response.ok) throw new Error("Exam attempt failed.");

      const payload = (await response.json()) as {
        attempt: { disqualified: boolean; passed: boolean; score: number };
        awardedBadge?: { titleEn: string; titleFr: string } | null;
        review?: AssessmentReview[];
      };

      setResult({
        awardedBadge: payload.awardedBadge ?? null,
        disqualified: payload.attempt.disqualified,
        passed: payload.attempt.passed,
        review: Object.fromEntries((payload.review ?? []).map((item) => [item.questionId, item])),
        score: payload.attempt.score
      });
    } catch {
      setError(copy.serverError);
    } finally {
      setIsSaving(false);
    }
  }

  function reset() {
    setAnswers({});
    setWrittenResponses({});
    setError("");
    setResult(null);
  }

  return (
    <div className="space-y-6">
      <section className="hp-panel rounded-sm p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="hp-kicker">{copy.score}</p>
            <p className="mt-2 text-3xl font-black text-white">{result ? `${result.score}%` : `${answeredCount}/${exam.questions.length}`}</p>
          </div>
          <Badge tone={result ? (result.passed ? "mint" : "amber") : "wood"}>
            {result ? (result.passed ? copy.pass : copy.tryAgain) : `${answeredCount}/${exam.questions.length} ${copy.answered}`}
          </Badge>
        </div>
        <div className="mt-4">
          <ProgressBar value={result ? result.score : Math.round((answeredCount / exam.questions.length) * 100)} label={copy.score} />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="hp-button-primary disabled:cursor-not-allowed disabled:opacity-55" disabled={!complete || isSaving} onClick={handleSubmit} type="button">
            <ClipboardCheck aria-hidden className="h-4 w-4" />
            {isSaving ? copy.saving : copy.submit}
          </button>
          <button className="hp-button-secondary" onClick={reset} type="button">
            <RotateCcw aria-hidden className="h-4 w-4" />
            {copy.reset}
          </button>
        </div>
        {!complete ? <p className="hp-wrap mt-3 text-sm font-bold text-amber">{copy.todo}</p> : null}
        {error ? <p className="hp-wrap mt-3 text-sm font-bold text-coral">{error}</p> : null}
        {result?.disqualified ? <p className="hp-wrap mt-3 text-sm font-bold text-coral">{copy.disqualified}</p> : null}
        {result?.awardedBadge ? (
          <p className="hp-wrap mt-3 rounded-sm border border-mint/30 bg-mint/[0.08] p-3 text-sm font-black text-mint">
            {copy.badge}: {locale === "fr" ? result.awardedBadge.titleFr : result.awardedBadge.titleEn}
          </p>
        ) : null}
      </section>

      <section className="space-y-4">
        {exam.questions.map((question, questionIndex) => {
          const selected = answers[question.id];
          const review = result?.review[question.id];

          return (
            <article className="hp-panel rounded-sm p-5" key={question.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="hp-kicker">{String(questionIndex + 1).padStart(2, "0")}</p>
                  <h2 className="hp-wrap mt-2 text-lg font-black text-white">{question.prompt}</h2>
                </div>
                {review ? <Badge tone={review.correct ? "mint" : "amber"}>{review.correct ? "OK" : locale === "fr" ? "À revoir" : "Review"}</Badge> : null}
              </div>
              <div className="mt-4 grid gap-2">
                {question.options.map((option) => {
                  const checked = selected === option.id;
                  const correct = review?.correctOptionId === option.id;
                  const wrong = Boolean(review && checked && !review.correct);

                  return (
                    <label className={`focus-within:outline-mint flex cursor-pointer items-start gap-3 rounded-sm border p-3 text-sm font-bold leading-6 transition ${correct ? "border-mint/45 bg-mint/[0.1] text-mint" : wrong ? "border-coral/45 bg-coral/[0.1] text-coral" : checked ? "border-white/25 bg-white/[0.08] text-white" : "border-white/10 bg-white/[0.045] text-slate-200 hover:bg-white/[0.08]"}`} key={option.id}>
                      <input checked={checked} className="mt-1 h-4 w-4 shrink-0 accent-mint" name={`question-${questionIndex}`} onChange={() => { setAnswers((current) => ({ ...current, [question.id]: option.id })); setResult(null); }} type="radio" />
                      <span className="hp-wrap min-w-0">{option.label}</span>
                    </label>
                  );
                })}
              </div>
              {review?.explanation ? <p className="hp-wrap mt-4 rounded-sm border border-white/10 bg-black/20 p-3 text-sm leading-6 text-slate-300">{review.explanation}</p> : null}
            </article>
          );
        })}
      </section>

      <section className="hp-shell hp-path-card p-5">
        <div className="hp-inner">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="wood">{copy.tasks}</Badge>
            <Badge tone="amber">{copy.threshold} {exam.passingScore}%</Badge>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {exam.tasks.map((task, index) => (
              <article className="hp-panel rounded-sm p-4" key={task.title.fr}>
                <h2 className="hp-wrap text-lg font-black text-white">{task.title[locale]}</h2>
                <p className="hp-wrap mt-3 text-sm leading-6 text-slate-300">{task.prompt[locale]}</p>
                <textarea className="focus-ring mt-4 min-h-40 w-full rounded-sm border border-white/10 bg-black/25 p-3 text-sm leading-6 text-white" maxLength={4000} onChange={(event) => { setWrittenResponses((current) => ({ ...current, [index]: event.target.value })); setResult(null); }} value={writtenResponses[index] ?? ""} />
                <p className="mt-2 text-xs font-bold text-steel">{writtenResponses[index]?.trim().length ?? 0}/4000 — {copy.minLength}</p>
                <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                  {task.rubric[locale].map((item) => <li className="flex gap-2 text-sm leading-6 text-slate-300" key={item}><CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-mint" /><span>{item}</span></li>)}
                </ul>
              </article>
            ))}
          </div>
          <p className="hp-wrap mt-5 flex gap-3 rounded-sm border border-amber/30 bg-amber/[0.08] p-4 text-sm font-bold leading-6 text-amber">
            <ShieldAlert aria-hidden className="mt-0.5 h-5 w-5 shrink-0" /><span>{copy.autoFail}</span>
          </p>
        </div>
      </section>
    </div>
  );
}
