"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/content/catalog";

type QuizPreviewProps = {
  questions: QuizQuestion[];
};

export function QuizPreview({ questions }: QuizPreviewProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const score = questions.reduce((total, question, index) => total + (answers[index] === question.correctOption ? 1 : 0), 0);

  return (
    <div className="space-y-5">
      {questions.map((question, index) => (
        <fieldset className="rounded-md border border-white/10 bg-ink/55 p-4" key={question.question}>
          <legend className="px-1 text-sm font-black text-white">{question.question}</legend>
          <div className="mt-3 grid gap-2">
            {question.options.map((option, optionIndex) => (
              <label
                className="flex cursor-pointer items-center gap-3 rounded-md border border-white/10 bg-white/6 px-3 py-2 text-sm text-slate-200 transition hover:border-mint/35"
                key={option}
              >
                <input
                  checked={answers[index] === optionIndex}
                  className="h-4 w-4 accent-teal-300"
                  name={`question-${index}`}
                  onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))}
                  type="radio"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <p className="text-sm font-black uppercase tracking-[0.14em] text-mint">
        Score: {score}/{questions.length}
      </p>
    </div>
  );
}
