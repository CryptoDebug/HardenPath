import { Award, ChartNoAxesColumnIncreasing, CreditCard } from "lucide-react";
import { getServerSession } from "next-auth";
import { AuthPanel } from "@/components/account/auth-panel";
import { ProgressBar } from "@/components/ui/progress-bar";
import { authOptions } from "@/lib/auth";
import { getDictionary, getLocale } from "@/lib/i18n";
import { getLearningStats } from "@/lib/learning";

export default async function AccountPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const session = await getServerSession(authOptions);
  const stats = await getLearningStats(session?.user?.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="hp-shell rounded-md p-6">
          <div className="hp-inner">
            <p className="hp-kicker">{dictionary.account.localAuth}</p>
            <h1 className="mt-3 text-4xl font-black text-white">{dictionary.account.title}</h1>
            <p className="mt-4 text-base leading-7 text-slate-300">{dictionary.account.body}</p>
            <div className="mt-6">
              <AuthPanel dictionary={dictionary.account} />
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="hp-panel rounded-md p-5">
            <ChartNoAxesColumnIncreasing aria-hidden className="h-6 w-6 text-mint" />
            <h2 className="mt-4 text-xl font-black text-white">Learning state</h2>
            {session ? (
              <div className="mt-5 space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-200">
                    <span>{locale === "fr" ? "Progression globale" : "Overall progress"}</span>
                    <span>{stats.totalPercent}%</span>
                  </div>
                  <ProgressBar value={stats.totalPercent} />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-200">
                    <span>{locale === "fr" ? "Modules terminés" : "Completed modules"}</span>
                    <span>
                      {stats.completedCourses}/{stats.totalCourses}
                    </span>
                  </div>
                  <ProgressBar value={stats.totalCourses > 0 ? Math.round((stats.completedCourses / stats.totalCourses) * 100) : 0} />
                </div>
              </div>
            ) : (
              <p className="mt-5 rounded-md border border-white/10 bg-ink/55 p-4 text-sm leading-6 text-slate-300">
                {locale === "fr"
                  ? "Aucune donnée de progression n'est affichée tant que tu n'es pas connecté."
                  : "No progress data is displayed until you are signed in."}
              </p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="hp-panel rounded-md p-5">
              <Award aria-hidden className="h-6 w-6 text-amber" />
              <h2 className="mt-4 text-xl font-black text-white">Badges</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {session
                  ? locale === "fr"
                    ? `${stats.badgeCount} badge(s) débloqué(s).`
                    : `${stats.badgeCount} badge(s) unlocked.`
                  : locale === "fr"
                    ? "Connecte-toi pour débloquer des badges."
                    : "Sign in to unlock badges."}
              </p>
            </div>
            <div className="hp-panel rounded-md p-5">
              <CreditCard aria-hidden className="h-6 w-6 text-coral" />
              <h2 className="mt-4 text-xl font-black text-white">Freemium</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {locale === "fr"
                  ? "Les plans et abonnements sont prêts en base, sans valeur fictive affichée."
                  : "Plans and subscriptions are ready in the database, with no fake value displayed."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
