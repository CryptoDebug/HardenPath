import { Award, Flame, Target } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { Locale } from "@/lib/i18n-client";

type LearningPulseProps = {
  locale: Locale;
};

export function LearningPulse({ locale }: LearningPulseProps) {
  const labels = {
    fr: {
      title: "Tableau de progression",
      body: "Vue démo reliée au futur modèle utilisateur.",
      global: "Progression globale",
      streak: "Série",
      badges: "Badges",
      target: "Objectif"
    },
    en: {
      title: "Progress board",
      body: "Demo view wired for the future user model.",
      global: "Overall progress",
      streak: "Streak",
      badges: "Badges",
      target: "Target"
    }
  }[locale];

  return (
    <aside className="rounded-lg border border-white/10 bg-panel/85 p-5 shadow-soft">
      <h2 className="text-lg font-semibold text-white">{labels.title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">{labels.body}</p>
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between text-sm font-semibold text-slate-200">
          <span>{labels.global}</span>
          <span>28%</span>
        </div>
        <ProgressBar value={28} label={labels.global} />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-md border border-white/10 bg-white/6 p-3">
          <Flame aria-hidden className="h-5 w-5 text-coral" />
          <p className="mt-3 text-xl font-bold text-white">4</p>
          <p className="text-xs text-slate-400">{labels.streak}</p>
        </div>
        <div className="rounded-md border border-white/10 bg-white/6 p-3">
          <Award aria-hidden className="h-5 w-5 text-amber" />
          <p className="mt-3 text-xl font-bold text-white">3</p>
          <p className="text-xs text-slate-400">{labels.badges}</p>
        </div>
        <div className="rounded-md border border-white/10 bg-white/6 p-3">
          <Target aria-hidden className="h-5 w-5 text-mint" />
          <p className="mt-3 text-xl font-bold text-white">2/5</p>
          <p className="text-xs text-slate-400">{labels.target}</p>
        </div>
      </div>
    </aside>
  );
}
