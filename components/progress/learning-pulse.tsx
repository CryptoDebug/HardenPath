import { Award, CheckCircle2, Flame, Target } from "lucide-react";
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
      title: "Progression",
      body: "Connecte-toi pour suivre tes jalons et badges.",
      authenticatedBody: "Tes jalons actifs et validations.",
      global: "Maîtrise globale",
      level: "Niveau",
      next: "Prochain badge",
      streak: "Série",
      badges: "Badges",
      target: "Modules"
    },
    en: {
      title: "Progression",
      body: "Sign in to follow milestones and badges.",
      authenticatedBody: "Your active milestones and validations.",
      global: "Overall mastery",
      level: "Level",
      next: "Next badge",
      streak: "Streak",
      badges: "Badges",
      target: "Modules"
    }
  }[locale];
  const level = Math.max(1, Math.min(5, Math.floor(totalPercent / 20) + 1));
  const nextBadgePercent = Math.min(100, level * 20);
  const nextBadgeCopy =
    totalPercent >= 100 ? (locale === "fr" ? "Parcours validé" : "Path validated") : `${nextBadgePercent}%`;

  return (
    <aside className="hp-shell rounded-md p-5">
      <div className="hp-inner">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="hp-kicker">{labels.title}</p>
            <h2 className="hp-wrap mt-2 text-xl font-extrabold leading-7 text-white">
              {isAuthenticated ? labels.authenticatedBody : labels.body}
            </h2>
          </div>
          <div
            aria-hidden
            className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-white/10"
            style={{ background: `conic-gradient(#67d8bd ${totalPercent}%, rgba(255,255,255,0.08) 0)` }}
          >
            <div className="grid h-14 w-14 place-items-center rounded-full bg-[#171b20] text-lg font-black text-white">
              {totalPercent}%
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-200">
            <span className="hp-wrap">{labels.global}</span>
            <span>{totalPercent}%</span>
          </div>
          <ProgressBar value={totalPercent} label={labels.global} />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-md border border-white/10 bg-white/[0.055] p-3">
            <CheckCircle2 aria-hidden className="h-5 w-5 text-mint" />
            <p className="mt-3 text-xl font-bold text-white">{level}</p>
            <p className="hp-wrap text-xs text-slate-400">{labels.level}</p>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.055] p-3">
            <Award aria-hidden className="h-5 w-5 text-amber" />
            <p className="mt-3 text-xl font-bold text-white">{badgeCount}</p>
            <p className="hp-wrap text-xs text-slate-400">{labels.badges}</p>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.055] p-3">
            <Target aria-hidden className="h-5 w-5 text-mint" />
            <p className="mt-3 text-xl font-bold text-white">
              {completedCourses}/{totalCourses}
            </p>
            <p className="hp-wrap text-xs text-slate-400">{labels.target}</p>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.055] p-3">
            <Flame aria-hidden className="h-5 w-5 text-coral" />
            <p className="mt-3 text-xl font-bold text-white">{streakDays}</p>
            <p className="hp-wrap text-xs text-slate-400">{labels.streak}</p>
          </div>
        </div>

        <div className="hp-wrap mt-4 rounded-md border border-amber/20 bg-amber/[0.08] px-3 py-2 text-sm font-semibold text-amber">
          <span className="text-paper/80">{labels.next}: </span>
          {nextBadgeCopy}
        </div>
      </div>
    </aside>
  );
}
