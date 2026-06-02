"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

type CompleteLessonButtonProps = {
  label: string;
};

export function CompleteLessonButton({ label }: CompleteLessonButtonProps) {
  const [done, setDone] = useState(false);

  return (
    <button
      className="hp-button-primary disabled:cursor-default disabled:bg-paper/65"
      disabled={done}
      onClick={() => setDone(true)}
      type="button"
    >
      <CheckCircle2 aria-hidden className="h-4 w-4" />
      {done ? "Completed" : label}
    </button>
  );
}
