"use client";

import { CheckCircle2, Rotate3d } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

type ExerciseFlipCardProps = {
  body: string;
  locale: "fr" | "en";
  premium?: boolean;
  premiumLabel: string;
  solution?: string;
  title: string;
};

export function ExerciseFlipCard({ body, locale, premium = false, premiumLabel, solution, title }: ExerciseFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const labels = {
    fr: {
      back: "Revenir à l'exercice",
      correction: "Correction",
      fallback: "Réponse attendue : sépare les faits observés, ton hypothèse, la vérification à faire et la conclusion prudente.",
      show: "Afficher la correction"
    },
    en: {
      back: "Return to exercise",
      correction: "Correction",
      fallback: "Expected answer: separate observed facts, your hypothesis, the check to perform, and the careful conclusion.",
      show: "Show correction"
    }
  }[locale];

  return (
    <button
      aria-label={isFlipped ? `${labels.back} ${title}` : `${labels.show} ${title}`}
      aria-pressed={isFlipped}
      className="focus-ring group block h-full min-h-[320px] w-full rounded-sm text-left [perspective:1200px]"
      onClick={() => setIsFlipped((current) => !current)}
      type="button"
    >
      <span
        className={`relative block h-full min-h-[320px] transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <span className="hp-panel hp-route-card absolute inset-0 flex flex-col overflow-y-auto rounded-sm p-5 [backface-visibility:hidden]">
          <span className="relative flex flex-wrap items-center justify-between gap-3">
            <span className="min-w-0">
              <span className="hp-wrap block text-base font-black text-white">{title}</span>
            </span>
            <span className="flex shrink-0 items-center gap-2">
              {premium ? <Badge tone="amber">{premiumLabel}</Badge> : null}
              <Rotate3d aria-hidden className="h-5 w-5 text-steel transition group-hover:text-mint" />
            </span>
          </span>
          <span className="hp-wrap relative mt-4 block flex-1 text-sm leading-6 text-slate-300">{body}</span>
          <span aria-hidden className="relative mt-5 h-2 w-12 rounded-full bg-[linear-gradient(90deg,#67d8bd,#c8a45f)]" />
        </span>

        <span className="hp-panel hp-path-card absolute inset-0 flex flex-col overflow-y-auto rounded-sm border-mint/25 p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="relative flex items-start justify-between gap-3">
            <span className="min-w-0">
              <span className="hp-kicker">{labels.correction}</span>
              <span className="hp-wrap mt-2 block text-base font-black text-white">{title}</span>
            </span>
            <span className="hp-checkpoint">
              <CheckCircle2 aria-hidden className="h-5 w-5 text-mint" />
            </span>
          </span>
          <span className="hp-wrap relative mt-4 block flex-1 text-sm leading-6 text-slate-200">
            {solution ?? labels.fallback}
          </span>
          <span aria-hidden className="relative mt-5 h-2 w-12 rounded-full bg-[linear-gradient(90deg,#67d8bd,#c8a45f)]" />
        </span>
      </span>
    </button>
  );
}
