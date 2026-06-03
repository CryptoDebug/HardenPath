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
            <h1 className="hp-wrap mt-3 text-4xl font-extrabold leading-tight text-white">{dictionary.account.title}</h1>
            <p className="hp-wrap mt-4 text-base leading-7 text-slate-300">{dictionary.account.body}</p>
            <div className="mt-6">
              <AuthPanel dictionary={dictionary.account} />
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="hp-panel rounded-md p-5">
            <ChartNoAxesColumnIncreasing aria-hidden className="h-6 w-6 text-mint" />
            <h2 className="hp-wrap mt-4 text-xl font-extrabold text-white">{locale === "fr" ? "État d'entraînement" : "Training state"}</h2>
            {session ? (
              <div className="mt-5 space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm font-semibold text-slate-200">
                    <span className="hp-wrap">{locale === "fr" ? "Maîtrise globale" : "Overall mastery"}</span>
                    <span>{stats.totalPercent}%</span>
                  </div>
                  <ProgressBar value={stats.totalPercent} />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm font-semibold text-slate-200">
                    <span className="hp-wrap">{locale === "fr" ? "Modules validés" : "Validated modules"}</span>
                    <span>
                      {stats.completedCourses}/{stats.totalCourses}
                    </span>
                  </div>
                  <ProgressBar value={stats.totalCourses > 0 ? Math.round((stats.completedCourses / stats.totalCourses) * 100) : 0} />
                </div>
              </div>
            ) : (
              <p className="hp-wrap mt-5 rounded-md border border-white/10 bg-white/[0.055] p-4 text-sm leading-6 text-slate-300">
                {locale === "fr"
                  ? "Connecte-toi pour afficher tes jalons, validations et badges."
                  : "Sign in to display milestones, validations, and badges."}
              </p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="hp-panel rounded-md p-5">
              <Award aria-hidden className="h-6 w-6 text-amber" />
              <h2 className="hp-wrap mt-4 text-xl font-extrabold text-white">Badges</h2>
              <p className="hp-wrap mt-2 text-sm leading-6 text-slate-300">
                {session
                  ? locale === "fr"
                    ? `${stats.badgeCount} badge(s) débloqué(s).`
                    : `${stats.badgeCount} badge(s) unlocked.`
                  : locale === "fr"
                    ? "Valide des modules pour débloquer des badges."
                    : "Validate modules to unlock badges."}
              </p>
            </div>
            <div className="hp-panel rounded-md p-5">
              <CreditCard aria-hidden className="h-6 w-6 text-steel" />
              <h2 className="hp-wrap mt-4 text-xl font-extrabold text-white">{locale === "fr" ? "Niveaux d'accès" : "Access levels"}</h2>
              <p className="hp-wrap mt-2 text-sm leading-6 text-slate-300">
                {locale === "fr"
                  ? "Des parcours gratuits et des validations avancées peuvent être distingués selon le niveau d'accès."
                  : "Free paths and advanced validations can be separated by access level."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
