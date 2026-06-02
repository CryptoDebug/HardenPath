import { Award, Flame, Target } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { Locale } from "@/lib/i18n-client";

type LearningPulseProps = {
  locale: Locale;
  totalPercent: number;
  completedCourses: number;
  totalCourses: number;
  badgeCount: number;
  streakDays: number;
  isAuthenticated: boolean;
};

export function LearningPulse({
  locale,
  totalPercent,
  completedCourses,
  totalCourses,
  badgeCount,
  streakDays,
  isAuthenticated
}: LearningPulseProps) {
  const labels = {
    fr: {
      title: "Tableau de progression",
      body: "Connecte-toi pour suivre une progression stockée en base.",
      authenticatedBody: "Progression réelle liée à ton compte.",
      global: "Progression globale",
      streak: "Série",
      badges: "Badges",
      target: "Modules"
    },
    en: {
      title: "Progress board",
      body: "Sign in to track progress stored in the database.",
      authenticatedBody: "Real progress linked to your account.",
      global: "Overall progress",
      streak: "Streak",
      badges: "Badges",
      target: "Modules"
    }
  }[locale];

  return (
    <aside className="hp-shell rounded-md p-5">
      <div className="hp-inner">
        <p className="hp-kicker">live dossier</p>
        <h2 className="mt-2 text-lg font-black text-white">{labels.title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">{isAuthenticated ? labels.authenticatedBody : labels.body}</p>
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-200">
            <span>{labels.global}</span>
            <span>{totalPercent}%</span>
          </div>
          <ProgressBar value={totalPercent} label={labels.global} />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-md border border-white/10 bg-ink/55 p-3">
            <Flame aria-hidden className="h-5 w-5 text-coral" />
            <p className="mt-3 text-xl font-bold text-white">{streakDays}</p>
            <p className="text-xs text-slate-400">{labels.streak}</p>
          </div>
          <div className="rounded-md border border-white/10 bg-ink/55 p-3">
            <Award aria-hidden className="h-5 w-5 text-amber" />
            <p className="mt-3 text-xl font-bold text-white">{badgeCount}</p>
            <p className="text-xs text-slate-400">{labels.badges}</p>
          </div>
          <div className="rounded-md border border-white/10 bg-ink/55 p-3">
            <Target aria-hidden className="h-5 w-5 text-mint" />
            <p className="mt-3 text-xl font-bold text-white">
              {completedCourses}/{totalCourses}
            </p>
            <p className="text-xs text-slate-400">{labels.target}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
