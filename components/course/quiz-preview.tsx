"use client";

import { CheckCircle2, Circle, ListChecks, RotateCcw, Target, XCircle } from "lucide-react";
import { useState } from "react";
import type { QuizQuestion } from "@/content/catalog";
import type { Locale } from "@/lib/i18n-client";

type QuizPreviewProps = {
  locale: Locale;
  questions: QuizQuestion[];
};

const copy = {
  fr: {
    answered: "réponses",
    correct: "validées",
    drill: "Drill de validation",
    feedbackCorrect: "Validé",
    feedbackWrong: "À revoir",
    reset: "Réinitialiser",
    score: "Score",
    select: "Choisir cette réponse",
    statusComplete: "Validation terminée",
    statusProgress: "Validation en cours"
  },
  en: {
    answered: "answers",
    correct: "validated",
    drill: "Validation drill",
    feedbackCorrect: "Validated",
    feedbackWrong: "Review",
    reset: "Reset",
    score: "Score",
    select: "Choose this answer",
    statusComplete: "Validation complete",
    statusProgress: "Validation in progress"
  }
} satisfies Record<Locale, Record<string, string>>;

export function QuizPreview({ locale, questions }: QuizPreviewProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const score = questions.reduce((total, question, index) => total + (answers[index] === question.correctOption ? 1 : 0), 0);
  const answeredCount = Object.keys(answers).length;
  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;
  const isComplete = answeredCount === questions.length;
  const labels = copy[locale];

  return (
    <div className="overflow-hidden rounded-md border border-white/10 bg-[#191e24]">
      <div className="border-b border-white/10 bg-white/[0.045] p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-md border border-mint/25 bg-mint/10 text-mint">
              <Target aria-hidden className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="hp-wrap text-xs font-extrabold uppercase tracking-[0.06em] text-steel">{labels.drill}</p>
              <h3 className="hp-wrap mt-1 text-lg font-extrabold text-white">{isComplete ? labels.statusComplete : labels.statusProgress}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-md border border-white/10 bg-black/20 px-3 py-2 text-right">
              <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.06em] text-steel">{labels.score}</p>
              <p className="font-black text-white">
                {score}/{questions.length}
              </p>
            </div>
            <button
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.055] text-steel transition hover:border-mint/30 hover:text-white"
              onClick={() => setAnswers({})}
              type="button"
            >
              <span className="sr-only">{labels.reset}</span>
              <RotateCcw aria-hidden className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/35">
          <div className="h-full rounded-full bg-mint transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-2 flex items-center justify-between gap-3 text-xs font-bold text-steel">
          <span>
            {answeredCount}/{questions.length} {labels.answered}
          </span>
          <span>
            {score} {labels.correct}
          </span>
        </div>
      </div>

      <div className="grid gap-0 divide-y divide-white/10">
      {questions.map((question, index) => (
        <fieldset className="p-4 sm:p-5" key={question.question}>
          <legend className="float-left w-full">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 rounded border border-white/10 bg-white/[0.055] px-2 py-1 font-mono text-[0.7rem] font-bold text-steel">
                Q{String(index + 1).padStart(2, "0")}
              </span>
              <span className="hp-wrap min-w-0 text-base font-extrabold leading-6 text-white">{question.question}</span>
            </div>
          </legend>
          <div className="clear-both mt-4 grid gap-2">
            {question.options.map((option, optionIndex) => (
              <QuizOption
                checked={answers[index] === optionIndex}
                correct={question.correctOption === optionIndex}
                key={option}
                name={`question-${index}`}
                onSelect={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))}
                option={option}
                revealed={answers[index] !== undefined}
                selectLabel={labels.select}
                wrong={answers[index] === optionIndex && answers[index] !== question.correctOption}
              />
            ))}
          </div>
          {answers[index] !== undefined ? (
            <div className="mt-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em]">
              {answers[index] === question.correctOption ? (
                <>
                  <CheckCircle2 aria-hidden className="h-4 w-4 text-mint" />
                  <span className="text-mint">{labels.feedbackCorrect}</span>
                </>
              ) : (
                <>
                  <XCircle aria-hidden className="h-4 w-4 text-coral" />
                  <span className="text-coral">{labels.feedbackWrong}</span>
                </>
              )}
            </div>
          ) : null}
        </fieldset>
      ))}
      </div>

      {isComplete ? (
        <div className="border-t border-white/10 bg-mint/[0.06] p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <ListChecks aria-hidden className="h-5 w-5 text-mint" />
            <p className="text-sm font-black text-white">
              {labels.score}: {score}/{questions.length}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

type QuizOptionProps = {
  checked: boolean;
  correct: boolean;
  name: string;
  onSelect: () => void;
  option: string;
  revealed: boolean;
  selectLabel: string;
  wrong: boolean;
};

function QuizOption({ checked, correct, name, onSelect, option, revealed, selectLabel, wrong }: QuizOptionProps) {
  const stateClass = checked
    ? wrong
      ? "border-coral/45 bg-coral/10 text-white"
      : "border-mint/45 bg-mint/10 text-white"
    : revealed && correct
      ? "border-mint/25 bg-mint/[0.06] text-slate-100"
      : "border-white/10 bg-white/[0.045] text-slate-300 hover:border-steel hover:bg-white/[0.065]";

  return (
    <label className={`flex cursor-pointer items-center gap-3 rounded-md border px-3 py-3 text-sm transition ${stateClass}`}>
      <input checked={checked} className="sr-only" name={name} onChange={onSelect} type="radio" />
      <span aria-hidden className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-current/35">
        {checked ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
      </span>
      <span className="hp-wrap min-w-0 leading-6">{option}</span>
      <span className="sr-only">{selectLabel}</span>
    </label>
  );
}
