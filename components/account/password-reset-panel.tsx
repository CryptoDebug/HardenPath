"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n-client";

export function PasswordResetPanel({ locale, token }: { locale: Locale; token?: string }) {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const copy = locale === "fr"
    ? { email: "Adresse email", password: "Nouveau mot de passe", request: "Envoyer le lien", reset: "Changer le mot de passe", sent: "Si ce compte existe, un lien vient d’être envoyé.", done: "Mot de passe modifié. Tu peux te reconnecter.", rule: "12 caractères minimum, avec au moins une lettre et un chiffre." }
    : { email: "Email address", password: "New password", request: "Send reset link", reset: "Change password", sent: "If this account exists, a link has been sent.", done: "Password changed. You can sign in again.", rule: "At least 12 characters, including a letter and a number." };

  async function submit(formData: FormData) {
    setPending(true);
    setMessage("");
    const response = token
      ? await fetch("/api/account/reset-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: String(formData.get("password")), token }) })
      : await fetch("/api/account/request-password-reset", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: String(formData.get("email")) }) });
    setPending(false);
    setMessage(response.ok ? (token ? copy.done : copy.sent) : locale === "fr" ? "La demande a échoué." : "The request failed.");
  }

  return (
    <form action={submit} className="mt-6 grid gap-4">
      {token ? <label className="grid gap-2 text-sm font-bold text-slate-200">{copy.password}<input className="focus-ring rounded-sm border border-white/10 bg-black/20 px-3 py-3 text-white" minLength={12} name="password" required type="password" /><span className="text-xs text-steel">{copy.rule}</span></label> : <label className="grid gap-2 text-sm font-bold text-slate-200">{copy.email}<input className="focus-ring rounded-sm border border-white/10 bg-black/20 px-3 py-3 text-white" name="email" required type="email" /></label>}
      <button className="hp-button-primary justify-center" disabled={pending} type="submit">{pending ? "…" : token ? copy.reset : copy.request}</button>
      {message ? <p aria-live="polite" className="rounded-sm border border-white/10 p-3 text-sm text-slate-200">{message}</p> : null}
      <Link className="text-sm font-bold text-mint" href="/account">← {locale === "fr" ? "Retour au compte" : "Back to account"}</Link>
    </form>
  );
}
