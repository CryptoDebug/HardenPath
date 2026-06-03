"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import type { Locale } from "@/lib/i18n-client";

type CompleteLessonButtonProps = {
  label: string;
  courseSlug: string;
  disabled?: boolean;
  disabledReason?: string;
  initialCompleted: boolean;
  locale: Locale;
};

const copy = {
  fr: {
    completed: "Terminé",
    error: "Validation indisponible.",
    locked: "Obtiens 3/3 au QCM pour valider ce module.",
    saving: "Validation..."
  },
  en: {
    completed: "Completed",
    error: "Validation unavailable.",
    locked: "Score 3/3 on the quiz to validate this module.",
    saving: "Saving..."
  }
} satisfies Record<Locale, Record<string, string>>;

export function CompleteLessonButton({ label, courseSlug, disabled = false, disabledReason, initialCompleted, locale }: CompleteLessonButtonProps) {
  const [done, setDone] = useState(initialCompleted);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const labels = copy[locale];

  async function completeCourse() {
    setIsSaving(true);
    setError("");

    const response = await fetch("/api/progress/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseSlug })
    });

    setIsSaving(false);

    if (!response.ok) {
      setError(labels.error);
      return;
    }

    setDone(true);
  }

  return (
    <div>
      <button
        className="hp-button-primary disabled:cursor-not-allowed disabled:bg-steel/50 disabled:text-ink/70"
        disabled={done || isSaving || disabled}
        onClick={completeCourse}
        type="button"
      >
        <CheckCircle2 aria-hidden className="h-4 w-4" />
        {done ? labels.completed : isSaving ? labels.saving : label}
      </button>
      {!done && disabled ? <p className="hp-wrap mt-3 text-sm font-bold text-amber">{disabledReason ?? labels.locked}</p> : null}
      {error ? <p className="mt-3 text-sm font-bold text-coral">{error}</p> : null}
    </div>
  );
}
