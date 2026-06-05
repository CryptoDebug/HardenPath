"use client";

import { CheckCircle2, ClipboardCheck, RotateCcw, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { BeginnerExam } from "@/content/exams";
import type { Locale } from "@/lib/i18n-client";

type BeginnerExamPanelProps = {
  exam: BeginnerExam;
  locale: Locale;
};

export function BeginnerExamPanel({ exam, locale }: BeginnerExamPanelProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [result, setResult] = useState<{ awardedBadge?: { titleEn: string; titleFr: string } | null; passed: boolean; score: number } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    const correct = exam.questions.filter((question, index) => answers[index] === question.correctOption).length;
    return Math.round((correct / exam.questions.length) * 100);
  }, [answers, exam.questions]);

  const answeredCount = Object.keys(answers).length;
  const complete = answeredCount === exam.questions.length;
  const gradedScore = result?.score ?? score;
  const passed = submitted && (result?.passed ?? score >= exam.passingScore);

  const copy = {
    fr: {
      answered: "questions répondues",
      autoFail: "Échec automatique si une réponse choisit une action hors périmètre, destructive ou non documentée.",
      badge: "Badge bronze enregistré",
      pass: "Examen réussi",
      reset: "Recommencer",
      score: "Score QCM",
      saving: "Correction...",
      serverError: "Impossible d'enregistrer l'examen pour le moment.",
      submit: "Corriger l'examen",
      tasks: "Tâches écrites à faire",
      threshold: "Seuil recommandé",
      todo: "Complète toutes les questions pour corriger.",
      tryAgain: "À retravailler"
    },
    en: {
      answered: "answered questions",
      autoFail: "Automatic fail if an answer chooses an out-of-scope, destructive, or undocumented action.",
      badge: "Bronze badge saved",
      pass: "Exam passed",
      reset: "Reset",
      score: "Quiz score",
      saving: "Grading...",
      serverError: "Unable to save the exam right now.",
      submit: "Grade exam",
      tasks: "Written tasks to complete",
      threshold: "Recommended threshold",
      todo: "Answer every question to grade.",
      tryAgain: "Needs review"
    }
  }[locale];

  async function handleSubmit() {
    if (!complete || isSaving) {
      return;
    }

    setError("");
    setIsSaving(true);

    try {
      const answerList = exam.questions.map((_, index) => answers[index]);
      const response = await fetch("/api/exams/beginner/attempt", {
        body: JSON.stringify({
          answers: answerList,
          categorySlug: exam.categorySlug
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      });

      if (!response.ok) {
        throw new Error("Exam attempt failed.");
      }

      const payload = (await response.json()) as {
        attempt?: { passed: boolean; score: number };
        awardedBadge?: { titleEn: string; titleFr: string } | null;
      };

      setResult({
        awardedBadge: payload.awardedBadge ?? null,
        passed: Boolean(payload.attempt?.passed),
        score: payload.attempt?.score ?? score
      });
      setSubmitted(true);
    } catch {
      setError(copy.serverError);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="hp-panel rounded-sm p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="hp-kicker">{copy.score}</p>
            <p className="mt-2 text-3xl font-black text-white">{submitted ? `${gradedScore}%` : `${answeredCount}/${exam.questions.length}`}</p>
          </div>
          <Badge tone={submitted ? (passed ? "mint" : "amber") : "wood"}>
            {submitted ? (passed ? copy.pass : copy.tryAgain) : `${answeredCount}/${exam.questions.length} ${copy.answered}`}
          </Badge>
        </div>
        <div className="mt-4">
          <ProgressBar value={submitted ? gradedScore : Math.round((answeredCount / exam.questions.length) * 100)} label={copy.score} />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="hp-button-primary disabled:cursor-not-allowed disabled:opacity-55" disabled={!complete || isSaving} onClick={handleSubmit} type="button">
            <ClipboardCheck aria-hidden className="h-4 w-4" />
            {isSaving ? copy.saving : copy.submit}
          </button>
          <button
            className="hp-button-secondary"
            onClick={() => {
              setAnswers({});
              setError("");
              setResult(null);
              setSubmitted(false);
            }}
            type="button"
          >
            <RotateCcw aria-hidden className="h-4 w-4" />
            {copy.reset}
          </button>
        </div>
        {!complete ? <p className="hp-wrap mt-3 text-sm font-bold text-amber">{copy.todo}</p> : null}
        {error ? <p className="hp-wrap mt-3 text-sm font-bold text-amber">{error}</p> : null}
        {result?.awardedBadge ? (
          <p className="hp-wrap mt-3 rounded-sm border border-mint/30 bg-mint/[0.08] p-3 text-sm font-black text-mint">
            {copy.badge} : {locale === "fr" ? result.awardedBadge.titleFr : result.awardedBadge.titleEn}
          </p>
        ) : null}
      </section>

      <section className="space-y-4">
        {exam.questions.map((question, questionIndex) => {
          const selected = answers[questionIndex];
          const isCorrect = selected === question.correctOption;

          return (
            <article className="hp-panel rounded-sm p-5" key={question.question.fr}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="hp-kicker">{String(questionIndex + 1).padStart(2, "0")}</p>
                  <h2 className="hp-wrap mt-2 text-lg font-black text-white">{question.question[locale]}</h2>
                </div>
                {submitted && selected !== undefined ? <Badge tone={isCorrect ? "mint" : "amber"}>{isCorrect ? "OK" : locale === "fr" ? "À revoir" : "Review"}</Badge> : null}
              </div>

              <div className="mt-4 grid gap-2">
                {question.options[locale].map((option, optionIndex) => {
                  const checked = selected === optionIndex;
                  const correct = submitted && optionIndex === question.correctOption;
                  const wrong = submitted && checked && optionIndex !== question.correctOption;

                  return (
                    <label
                      className={`focus-within:outline-mint flex cursor-pointer items-start gap-3 rounded-sm border p-3 text-sm font-bold leading-6 transition ${
                        correct
                          ? "border-mint/45 bg-mint/[0.1] text-mint"
                          : wrong
                            ? "border-amber/45 bg-amber/[0.1] text-amber"
                            : checked
                              ? "border-white/25 bg-white/[0.08] text-white"
                              : "border-white/10 bg-white/[0.045] text-slate-200 hover:bg-white/[0.08]"
                      }`}
                      key={option}
                    >
                      <input
                        checked={checked}
                        className="mt-1 h-4 w-4 shrink-0 accent-mint"
                        name={`question-${questionIndex}`}
                        onChange={() => {
                          setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }));
                          setError("");
                          setResult(null);
                          setSubmitted(false);
                        }}
                        type="radio"
                      />
                      <span className="hp-wrap min-w-0">{option}</span>
                    </label>
                  );
                })}
              </div>

              {submitted ? <p className="hp-wrap mt-4 rounded-sm border border-white/10 bg-black/20 p-3 text-sm leading-6 text-slate-300">{question.explanation[locale]}</p> : null}
            </article>
          );
        })}
      </section>

      <section className="hp-shell hp-path-card p-5">
        <div className="hp-inner">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="wood">{copy.tasks}</Badge>
            <Badge tone="amber">
              {copy.threshold} {exam.passingScore}%
            </Badge>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {exam.tasks.map((task) => (
              <article className="hp-panel rounded-sm p-4" key={task.title.fr}>
                <h2 className="hp-wrap text-lg font-black text-white">{task.title[locale]}</h2>
                <p className="hp-wrap mt-3 text-sm leading-6 text-slate-300">{task.prompt[locale]}</p>
                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="hp-kicker">{locale === "fr" ? "Grille attendue" : "Expected rubric"}</p>
                  <ul className="mt-3 space-y-2">
                    {task.rubric[locale].map((item) => (
                      <li className="flex gap-2 text-sm leading-6 text-slate-300" key={item}>
                        <CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                        <span className="hp-wrap min-w-0">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <p className="hp-wrap mt-5 flex gap-3 rounded-sm border border-amber/30 bg-amber/[0.08] p-4 text-sm font-bold leading-6 text-amber">
            <ShieldAlert aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{copy.autoFail}</span>
          </p>
        </div>
      </section>
    </div>
  );
}
