"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

type CompleteLessonButtonProps = {
  label: string;
  courseSlug: string;
  initialCompleted: boolean;
};

export function CompleteLessonButton({ label, courseSlug, initialCompleted }: CompleteLessonButtonProps) {
  const [done, setDone] = useState(initialCompleted);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

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
      setError("Progress could not be saved.");
      return;
    }

    setDone(true);
  }

  return (
    <div>
    <button
      className="hp-button-primary disabled:cursor-default disabled:bg-paper/65"
      disabled={done || isSaving}
      onClick={completeCourse}
      type="button"
    >
      <CheckCircle2 aria-hidden className="h-4 w-4" />
      {done ? "Completed" : isSaving ? "Saving..." : label}
    </button>
    {error ? <p className="mt-3 text-sm font-bold text-coral">{error}</p> : null}
    </div>
  );
}
