"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
type Props = {
  emailVerified: boolean;
  initialHandle: string;
  initialPublic: boolean;
  copy: AccountSettingsCopy;
};

export type AccountSettingsCopy = {
  danger: string; delete: string; deleteHelp: string; handle: string; password: string; newPassword: string;
  privacy: string; privacyHelp: string; save: string; security: string; change: string; verify: string; verified: string;
  saved: string; genericError: string; emailSent: string; emailUnavailable: string;
};

export function AccountSettings({ copy, emailVerified, initialHandle, initialPublic }: Props) {
  const [feedback, setFeedback] = useState("");

  async function updateProfile(formData: FormData) {
    const response = await fetch("/api/account/profile", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicHandle: String(formData.get("publicHandle")), publicProfileEnabled: formData.get("publicProfileEnabled") === "on" })
    });
    setFeedback(response.ok ? copy.saved : (await response.json().catch(() => null))?.error ?? copy.genericError);
  }

  async function changePassword(formData: FormData) {
    const response = await fetch("/api/account/password", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: String(formData.get("currentPassword")), newPassword: String(formData.get("newPassword")) })
    });
    if (response.ok) {
      await signOut({ callbackUrl: "/account" });
      return;
    }
    setFeedback((await response.json().catch(() => null))?.error ?? copy.genericError);
  }

  async function deleteAccount(formData: FormData) {
    const response = await fetch("/api/account/delete", {
      method: "DELETE", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ confirmation: String(formData.get("confirmation")), password: String(formData.get("password")) })
    });
    if (response.ok) {
      await signOut({ callbackUrl: "/" });
      return;
    }
    setFeedback((await response.json().catch(() => null))?.error ?? copy.genericError);
  }

  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-3">
      <form action={updateProfile} className="hp-panel rounded-sm p-5">
        <h2 className="text-xl font-black text-white">{copy.privacy}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">{copy.privacyHelp}</p>
        <label className="mt-4 grid gap-2 text-sm font-bold text-slate-200">{copy.handle}<input className="focus-ring rounded-sm border border-white/10 bg-black/20 px-3 py-3 text-white" defaultValue={initialHandle} maxLength={32} name="publicHandle" pattern="[A-Za-z0-9_-]+" /></label>
        <label className="mt-4 flex items-center gap-3 text-sm font-bold text-slate-200"><input defaultChecked={initialPublic} name="publicProfileEnabled" type="checkbox" />{copy.privacy}</label>
        <button className="hp-button-primary mt-5" type="submit">{copy.save}</button>
      </form>

      <form action={changePassword} className="hp-panel rounded-sm p-5">
        <h2 className="text-xl font-black text-white">{copy.security}</h2>
        <label className="mt-4 grid gap-2 text-sm font-bold text-slate-200">{copy.password}<input className="focus-ring rounded-sm border border-white/10 bg-black/20 px-3 py-3 text-white" name="currentPassword" required type="password" /></label>
        <label className="mt-4 grid gap-2 text-sm font-bold text-slate-200">{copy.newPassword}<input className="focus-ring rounded-sm border border-white/10 bg-black/20 px-3 py-3 text-white" minLength={12} name="newPassword" required type="password" /></label>
        <button className="hp-button-primary mt-5" type="submit">{copy.change}</button>
        <button className="hp-button-secondary mt-3" disabled={emailVerified} onClick={async () => { const response = await fetch("/api/account/resend-verification", { method: "POST" }); setFeedback(response.ok ? copy.emailSent : copy.emailUnavailable); }} type="button">{emailVerified ? copy.verified : copy.verify}</button>
      </form>

      <form action={deleteAccount} className="rounded-sm border border-coral/30 bg-coral/[0.05] p-5">
        <h2 className="text-xl font-black text-coral">{copy.danger}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">{copy.deleteHelp}</p>
        <input aria-label="DELETE" className="focus-ring mt-4 w-full rounded-sm border border-white/10 bg-black/20 px-3 py-3 text-white" name="confirmation" pattern="DELETE" placeholder="DELETE" required />
        <input aria-label={copy.password} className="focus-ring mt-3 w-full rounded-sm border border-white/10 bg-black/20 px-3 py-3 text-white" name="password" placeholder={copy.password} required type="password" />
        <button className="mt-5 rounded-sm bg-coral px-4 py-3 text-sm font-black text-ink" type="submit">{copy.delete}</button>
      </form>
      {feedback ? <p aria-live="polite" className="lg:col-span-3 rounded-sm border border-white/10 p-3 text-sm text-slate-200">{feedback}</p> : null}
    </section>
  );
}
