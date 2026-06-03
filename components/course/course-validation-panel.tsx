"use client";

import { useCallback, useState } from "react";
import { QuizPreview } from "@/components/course/quiz-preview";
import { CompleteLessonButton } from "@/components/progress/complete-lesson-button";
import type { QuizQuestion } from "@/content/catalog";
import type { Locale } from "@/lib/i18n-client";

type CourseValidationPanelProps = {
  completeLabel: string;
  courseSlug: string;
  initialCompleted: boolean;
  initialQuizPassed: boolean;
  locale: Locale;
  questions: QuizQuestion[];
};

export function CourseValidationPanel({
  completeLabel,
  courseSlug,
  initialCompleted,
  initialQuizPassed,
  locale,
  questions
}: CourseValidationPanelProps) {
  const [quizPassed, setQuizPassed] = useState(initialQuizPassed);
  const lockedCopy =
    locale === "fr"
      ? "Obtiens 3/3 au QCM de validation pour débloquer la validation du module."
      : "Score 3/3 on the validation quiz to unlock module completion.";

  const handlePassedChange = useCallback(
    (passed: boolean) => {
      setQuizPassed((current) => current || passed || initialQuizPassed);
    },
    [initialQuizPassed]
  );

  return (
    <>
      <section className="mt-8">
        <h2 className="hp-wrap text-2xl font-black text-white">{locale === "fr" ? "QCM de validation" : "Validation quiz"}</h2>
        <div className="mt-4">
          <QuizPreview
            courseSlug={courseSlug}
            initialPassed={initialQuizPassed}
            locale={locale}
            onPassedChange={handlePassedChange}
            questions={questions}
          />
        </div>
      </section>

      <div className="mt-8">
        <CompleteLessonButton
          courseSlug={courseSlug}
          disabled={!quizPassed}
          disabledReason={lockedCopy}
          initialCompleted={initialCompleted}
          label={completeLabel}
          locale={locale}
        />
      </div>
    </>
  );
}
