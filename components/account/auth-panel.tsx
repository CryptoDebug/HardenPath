"use client";

import { signIn, signOut, useSession, SessionProvider } from "next-auth/react";
import { useState } from "react";
import { LogIn, LogOut, UserPlus } from "lucide-react";

type AccountDictionary = {
  email: string;
  password: string;
  name: string;
  signin: string;
  register: string;
  signout: string;
  localAuth: string;
};

type AuthPanelProps = {
  dictionary: AccountDictionary;
};

function AuthForms({ dictionary }: AuthPanelProps) {
  const { data: session, status } = useSession();
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setMessage("");
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    if (mode === "register") {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name")),
          email,
          password
        })
      });

      if (!response.ok) {
        setMessage("Account creation failed.");
        return;
      }
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    setMessage(result?.ok ? "Session active." : "Access failed.");
  }

  if (status === "authenticated") {
    return (
      <div className="hp-ledger rounded-sm p-5">
        <p className="hp-kicker">session active</p>
        <p className="hp-wrap mt-1 text-lg font-semibold text-white">{session.user?.email}</p>
        <button
          className="focus-ring mt-5 inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/[0.07] px-4 py-3 text-sm font-black text-white transition hover:border-steel/40 hover:bg-white/10"
          onClick={() => signOut({ callbackUrl: "/account" })}
          type="button"
        >
          <LogOut aria-hidden className="h-4 w-4" />
          {dictionary.signout}
        </button>
      </div>
    );
  }

  return (
    <div className="hp-ledger rounded-sm p-5">
      <div className="flex flex-wrap gap-2">
        <button
          className={`focus-ring inline-flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-black ${
            mode === "signin" ? "bg-mint text-ink" : "bg-white/[0.08] text-white"
          }`}
          onClick={() => setMode("signin")}
          type="button"
        >
          <LogIn aria-hidden className="h-4 w-4" />
          {dictionary.signin}
        </button>
        <button
          className={`focus-ring inline-flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-black ${
            mode === "register" ? "bg-amber text-ink" : "bg-white/[0.08] text-white"
          }`}
          onClick={() => setMode("register")}
          type="button"
        >
          <UserPlus aria-hidden className="h-4 w-4" />
          {dictionary.register}
        </button>
      </div>

      <form action={handleSubmit} className="mt-5 grid gap-4">
        {mode === "register" ? (
          <label className="grid gap-2 text-sm font-semibold text-slate-200">
            {dictionary.name}
            <input
              className="focus-ring rounded-sm border border-white/10 bg-black/20 px-3 py-3 text-white"
              name="name"
              required
              type="text"
            />
          </label>
        ) : null}
        <label className="grid gap-2 text-sm font-semibold text-slate-200">
          {dictionary.email}
          <input
            className="focus-ring rounded-sm border border-white/10 bg-black/20 px-3 py-3 text-white"
            name="email"
            required
            type="email"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-200">
          {dictionary.password}
          <input
            className="focus-ring rounded-sm border border-white/10 bg-black/20 px-3 py-3 text-white"
            minLength={8}
            name="password"
            required
            type="password"
          />
        </label>
        <button className="hp-button-primary justify-center" type="submit">
          {mode === "signin" ? dictionary.signin : dictionary.register}
        </button>
        {message ? <p className="hp-wrap text-sm font-semibold text-amber">{message}</p> : null}
      </form>
    </div>
  );
}

export function AuthPanel({ dictionary }: AuthPanelProps) {
  return (
    <SessionProvider>
      <AuthForms dictionary={dictionary} />
    </SessionProvider>
  );
}
