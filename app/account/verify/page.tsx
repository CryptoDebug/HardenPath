import { EmailVerificationPanel } from "@/components/account/email-verification-panel";
import { getLocale } from "@/lib/i18n";

export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const locale = await getLocale();
  const { token } = await searchParams;

  return (
    <div className="hp-page-shell max-w-3xl">
      <section className="hp-shell hp-path-card p-6 sm:p-8">
        <div className="hp-inner">
          <p className="hp-kicker">HardenPath</p>
          <h1 className="mt-3 text-3xl font-black text-white">{locale === "fr" ? "Vérification de l’email" : "Email verification"}</h1>
          <EmailVerificationPanel locale={locale} token={token} />
        </div>
      </section>
    </div>
  );
}
