import { Award, ChartNoAxesColumnIncreasing, CreditCard } from "lucide-react";
import { AuthPanel } from "@/components/account/auth-panel";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getDictionary, getLocale } from "@/lib/i18n";

export default async function AccountPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h1 className="text-4xl font-bold text-white">{dictionary.account.title}</h1>
          <p className="mt-4 text-base leading-7 text-slate-300">{dictionary.account.body}</p>
          <div className="mt-6">
            <AuthPanel dictionary={dictionary.account} />
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-lg border border-white/10 bg-white/8 p-5 shadow-soft">
            <ChartNoAxesColumnIncreasing aria-hidden className="h-6 w-6 text-mint" />
            <h2 className="mt-4 text-xl font-semibold text-white">Learning state</h2>
            <div className="mt-5 space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-200">
                  <span>Network</span>
                  <span>42%</span>
                </div>
                <ProgressBar value={42} />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-200">
                  <span>Web Security</span>
                  <span>28%</span>
                </div>
                <ProgressBar value={28} />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/7 p-5">
              <Award aria-hidden className="h-6 w-6 text-amber" />
              <h2 className="mt-4 text-xl font-semibold text-white">Badges</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {locale === "fr" ? "Les badges gagnés seront persistés dans userBadges." : "Earned badges will be persisted in userBadges."}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/7 p-5">
              <CreditCard aria-hidden className="h-6 w-6 text-coral" />
              <h2 className="mt-4 text-xl font-semibold text-white">Freemium</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {locale === "fr" ? "Les plans et abonnements sont prêts en base." : "Plans and subscriptions are ready in the database."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
