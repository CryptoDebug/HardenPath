import { PasswordResetPanel } from "@/components/account/password-reset-panel";
import { getLocale } from "@/lib/i18n";

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const locale = await getLocale();
  const { token } = await searchParams;

  return (
    <div className="hp-page-shell max-w-2xl">
      <section className="hp-shell hp-path-card p-6 sm:p-8">
        <div className="hp-inner">
          <p className="hp-kicker">HardenPath</p>
          <h1 className="mt-3 text-3xl font-black text-white">{token ? (locale === "fr" ? "Nouveau mot de passe" : "New password") : locale === "fr" ? "Mot de passe oublié" : "Forgot password"}</h1>
          <PasswordResetPanel locale={locale} token={token} />
        </div>
      </section>
    </div>
  );
}
