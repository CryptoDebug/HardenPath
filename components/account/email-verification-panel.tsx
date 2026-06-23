"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/i18n-client";

export function EmailVerificationPanel({ locale, token }: { locale: Locale; token?: string }) {
  const [state, setState] = useState<"idle" | "pending" | "verified" | "error">("idle");
  const copy = locale === "fr"
    ? { confirm: "Confirmer mon adresse", error: "Ce lien est invalide ou expiré.", intro: "Confirme explicitement ton adresse pour activer la vérification.", verified: "Email vérifié. Ton compte est prêt.", account: "Ouvrir mon compte" }
    : { confirm: "Confirm my address", error: "This link is invalid or expired.", intro: "Explicitly confirm your address to complete verification.", verified: "Email verified. Your account is ready.", account: "Open my account" };

  async function verify() {
    if (!token) { setState("error"); return; }
    setState("pending");
    const response = await fetch("/api/account/verify-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token }) });
    setState(response.ok ? "verified" : "error");
  }

  return (
    <div className="mt-4">
      <p className="text-slate-300">{state === "verified" ? copy.verified : state === "error" ? copy.error : copy.intro}</p>
      {state === "verified" ? <Link className="hp-button-primary mt-6" href="/account">{copy.account}</Link> : <button className="hp-button-primary mt-6" disabled={state === "pending"} onClick={verify} type="button">{state === "pending" ? "…" : copy.confirm}</button>}
    </div>
  );
}
