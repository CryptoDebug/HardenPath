import { Award, CheckCircle2, Flame, LockKeyhole, Route, Search, UserRound } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getLocale } from "@/lib/i18n";
import { getPublicLearnerProfile } from "@/lib/public-profile";

type ProfilePageProps = {
  params: Promise<{
    userId: string;
  }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const locale = await getLocale();
  const { userId } = await params;
  const profile = await getPublicLearnerProfile(userId, locale);

  if (!profile) {
    notFound();
  }

  const copy = {
    fr: {
      directory: "Retour recherche",
      title: "Profil public",
      body: "Cette page affiche seulement les jalons publics HardenPath : pseudo, progression, badges et streak. Aucune donnée personnelle n'est publiée.",
      progress: "Progression globale",
      completed: "Modules validés",
      badges: "Badges",
      streak: "Streak",
      paths: "Progression par parcours",
      earnedBadges: "Badges débloqués",
      noBadges: "Aucun badge débloqué pour l'instant.",
      done: "Terminé",
      todo: "À faire",
      privacy: "Profil public limité",
      privacyBody: "Email, image, comptes liés, sessions et informations personnelles restent invisibles.",
      openCourse: "Ouvrir"
    },
    en: {
      directory: "Back to search",
      title: "Public profile",
      body: "This page shows only public HardenPath milestones: nickname, progress, badges, and streak. No personal data is published.",
      progress: "Overall progress",
      completed: "Validated modules",
      badges: "Badges",
      streak: "Streak",
      paths: "Progress by path",
      earnedBadges: "Unlocked badges",
      noBadges: "No badge unlocked yet.",
      done: "Done",
      todo: "To do",
      privacy: "Limited public profile",
      privacyBody: "Email, image, linked accounts, sessions, and personal information remain hidden.",
      openCourse: "Open"
    }
  }[locale];

  return (
    <div className="hp-page-shell">
      <section className="hp-shell hp-atlas-surface hp-path-card p-6 sm:p-8">
        <div aria-hidden className="hp-gridwash" />
        <div className="hp-inner grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="mint">{copy.title}</Badge>
              <span className="hp-brand-chip">
                <LockKeyhole aria-hidden className="h-3.5 w-3.5 text-mint" />
                {copy.privacy}
              </span>
            </div>
            <div className="mt-5 flex items-center gap-4">
              <span className="hp-checkpoint h-16 w-16">
                <UserRound aria-hidden className="h-8 w-8 text-mint" />
              </span>
              <div className="min-w-0">
                <h1 className="hp-wrap text-4xl font-black leading-tight text-white sm:text-5xl">{profile.name}</h1>
                <p className="hp-wrap mt-2 text-sm leading-6 text-slate-300">{copy.body}</p>
              </div>
            </div>
            <div className="mt-7">
              <Link className="hp-button-secondary" href="/profiles">
                <Search aria-hidden className="h-4 w-4" />
                {copy.directory}
              </Link>
            </div>
          </div>

          <div className="hp-ledger rounded-sm p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="hp-kicker">{copy.progress}</p>
                <p className="mt-2 text-4xl font-black text-white">{profile.totalPercent}%</p>
              </div>
              <span className="hp-checkpoint h-14 w-14">
                <Route aria-hidden className="h-7 w-7 text-mint" />
              </span>
            </div>
            <div className="mt-4">
              <ProgressBar value={profile.totalPercent} label={copy.progress} />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { icon: CheckCircle2, label: copy.completed, value: `${profile.completedCourses}/${profile.totalCourses}`, tone: "text-mint" },
          { icon: Award, label: copy.badges, value: profile.badgeCount, tone: "text-amber" },
          { icon: Flame, label: copy.streak, value: profile.streakDays, tone: "text-coral" }
        ].map((item) => (
          <div className="hp-panel hp-route-card rounded-sm p-5" key={item.label}>
            <item.icon aria-hidden className={`h-6 w-6 ${item.tone}`} />
            <p className="mt-4 text-3xl font-black text-white">{item.value}</p>
            <p className="hp-wrap mt-1 text-sm font-bold text-steel">{item.label}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <h2 className="hp-wrap text-2xl font-black text-white">{copy.paths}</h2>
          <div className="mt-4 space-y-4">
            {profile.categoryProgress.map((category) => (
              <article className="hp-panel rounded-sm p-5" key={category.categorySlug}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="hp-wrap text-xl font-black text-white">{category.title}</h3>
                    <p className="hp-wrap mt-1 text-sm font-bold text-steel">
                      {category.completed}/{category.total} {locale === "fr" ? "modules validés" : "validated modules"}
                    </p>
                  </div>
                  <Badge tone={category.percent > 0 ? "mint" : "amber"}>{category.percent}%</Badge>
                </div>
                <div className="mt-4">
                  <ProgressBar value={category.percent} label={category.title} />
                </div>
                <div className="mt-4 grid gap-2">
                  {category.courses.map((course) => (
                    <div
                      className="flex min-w-0 flex-col gap-3 rounded-sm border border-white/10 bg-white/[0.045] p-3 sm:flex-row sm:items-center sm:justify-between"
                      key={course.slug}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          {course.completed ? (
                            <CheckCircle2 aria-hidden className="h-4 w-4 shrink-0 text-mint" />
                          ) : (
                            <span aria-hidden className="h-4 w-4 shrink-0 rounded-sm border border-white/15 bg-black/20" />
                          )}
                          <p className="hp-wrap min-w-0 text-sm font-black text-white">{course.title}</p>
                        </div>
                        <p className="hp-wrap mt-1 text-xs leading-5 text-steel">{course.summary}</p>
                      </div>
                      <Link className="focus-ring inline-flex shrink-0 items-center justify-center rounded-sm border border-white/10 px-3 py-2 text-xs font-black text-slate-100 hover:bg-white/[0.08]" href={`/courses/${course.slug}`}>
                        {course.completed ? copy.done : copy.todo}
                      </Link>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="hp-shell hp-path-card p-5">
            <div className="hp-inner">
              <h2 className="hp-wrap text-2xl font-black text-white">{copy.earnedBadges}</h2>
              <div className="mt-4 space-y-3">
                {profile.badges.length > 0 ? (
                  profile.badges.map((badge) => (
                    <div className="hp-panel rounded-sm p-4" key={badge.slug}>
                      <div className="flex items-start gap-3">
                        <span className="hp-checkpoint">
                          <Award aria-hidden className="h-5 w-5 text-amber" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="hp-wrap text-base font-black text-white">{badge.title}</h3>
                          <p className="hp-wrap mt-1 text-sm leading-6 text-slate-300">{badge.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="hp-wrap rounded-sm border border-white/10 bg-white/[0.055] p-4 text-sm leading-6 text-slate-300">{copy.noBadges}</p>
                )}
              </div>
            </div>
          </div>

          <div className="hp-panel rounded-sm p-5">
            <h2 className="hp-wrap text-lg font-black text-white">{copy.privacy}</h2>
            <p className="hp-wrap mt-2 text-sm leading-6 text-slate-300">{copy.privacyBody}</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
