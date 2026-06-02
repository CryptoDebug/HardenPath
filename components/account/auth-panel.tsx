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
        setMessage("Registration failed.");
        return;
      }
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    setMessage(result?.ok ? "Authenticated." : "Authentication failed.");
  }

  if (status === "authenticated") {
    return (
      <div className="rounded-md border border-white/10 bg-ink/55 p-5">
        <p className="text-sm text-slate-300">Signed in as</p>
        <p className="mt-1 text-lg font-semibold text-white">{session.user?.email}</p>
        <button
          className="focus-ring mt-5 inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/8 px-4 py-3 text-sm font-black text-white transition hover:border-coral/45 hover:bg-coral/10"
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
    <div className="rounded-md border border-white/10 bg-ink/55 p-5">
      <div className="flex gap-2">
        <button
          className={`focus-ring inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-black ${
            mode === "signin" ? "bg-paper text-ink" : "bg-white/8 text-white"
          }`}
          onClick={() => setMode("signin")}
          type="button"
        >
          <LogIn aria-hidden className="h-4 w-4" />
          {dictionary.signin}
        </button>
        <button
          className={`focus-ring inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-black ${
            mode === "register" ? "bg-amber text-ink" : "bg-white/8 text-white"
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
              className="focus-ring rounded-md border border-white/12 bg-ink/70 px-3 py-3 text-white"
              name="name"
              required
              type="text"
            />
          </label>
        ) : null}
        <label className="grid gap-2 text-sm font-semibold text-slate-200">
          {dictionary.email}
          <input
            className="focus-ring rounded-md border border-white/12 bg-ink/70 px-3 py-3 text-white"
            name="email"
            required
            type="email"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-200">
          {dictionary.password}
          <input
            className="focus-ring rounded-md border border-white/12 bg-ink/70 px-3 py-3 text-white"
            minLength={8}
            name="password"
            required
            type="password"
          />
        </label>
        <button className="hp-button-primary justify-center" type="submit">
          {mode === "signin" ? dictionary.signin : dictionary.register}
        </button>
        {message ? <p className="text-sm font-semibold text-amber">{message}</p> : null}
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
