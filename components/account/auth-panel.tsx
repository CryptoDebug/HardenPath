"use client";

import { signIn, signOut, useSession, SessionProvider } from "next-auth/react";
import { useState } from "react";
import { LogIn, LogOut, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type AccountDictionary = {
  email: string;
  password: string;
  name: string;
  signin: string;
  register: string;
  signout: string;
  localAuth: string;
  signinTitle: string;
  signinBody: string;
  registerTitle: string;
  registerBody: string;
  submitting: string;
  sessionActive: string;
  databaseUnavailable: string;
  invalidCredentials: string;
  tooManyAttempts: string;
  accountExists: string;
  genericError: string;
  forgotPassword: string;
  passwordRule: string;
  verificationSent: string;
};

type AuthPanelProps = {
  dictionary: AccountDictionary;
};

type DatabaseState = "available" | "unavailable" | "unknown";

function AuthForms({ dictionary }: AuthPanelProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [feedback, setFeedback] = useState<{ message: string; tone: "error" | "success" } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function changeMode(nextMode: "signin" | "register") {
    setMode(nextMode);
    setFeedback(null);
  }

  async function getDatabaseState(): Promise<DatabaseState> {
    try {
      const response = await fetch("/api/health/database", {
        cache: "no-store"
      });

      if (response.ok) {
        return "available";
      }

      return response.status === 503 ? "unavailable" : "unknown";
    } catch {
      return "unknown";
    }
  }

  async function handleSubmit(formData: FormData) {
    setFeedback(null);
    setIsSubmitting(true);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    try {
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
        const payload = (await response.json().catch(() => null)) as { code?: string; verificationRequired?: boolean; verificationSent?: boolean } | null;

        if (!response.ok) {
          const message =
            payload?.code === "RATE_LIMITED"
              ? dictionary.tooManyAttempts
              : payload?.code === "ACCOUNT_EXISTS"
              ? dictionary.accountExists
              : payload?.code === "DATABASE_UNAVAILABLE"
                ? dictionary.databaseUnavailable
                : dictionary.genericError;
          setFeedback({ message, tone: "error" });
          return;
        }

        if (payload?.verificationRequired || payload?.verificationSent) {
          setFeedback({ message: dictionary.verificationSent, tone: "success" });
          return;
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      });

      if (!result?.ok) {
        if (result?.status === 429) {
          setFeedback({ message: dictionary.tooManyAttempts, tone: "error" });
          return;
        }

        const databaseState = await getDatabaseState();
        const message =
          databaseState === "available"
            ? dictionary.invalidCredentials
            : databaseState === "unavailable"
              ? dictionary.databaseUnavailable
              : dictionary.genericError;
        setFeedback({ message, tone: "error" });
        return;
      }

      setFeedback({ message: dictionary.sessionActive, tone: "success" });
      router.refresh();
    } catch {
      const databaseState = await getDatabaseState();
      setFeedback({ message: databaseState === "unavailable" ? dictionary.databaseUnavailable : dictionary.genericError, tone: "error" });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status === "authenticated") {
    return (
      <div className="hp-ledger rounded-sm p-5">
        <p className="hp-kicker">{dictionary.sessionActive}</p>
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
      <div aria-label={dictionary.localAuth} className="grid grid-cols-2 gap-2" role="tablist">
        <button
          aria-selected={mode === "signin"}
          className={`focus-ring inline-flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-black ${
            mode === "signin" ? "bg-mint text-ink" : "bg-white/[0.08] text-white"
          }`}
          disabled={isSubmitting}
          onClick={() => changeMode("signin")}
          role="tab"
          type="button"
        >
          <LogIn aria-hidden className="h-4 w-4" />
          {dictionary.signin}
        </button>
        <button
          aria-selected={mode === "register"}
          className={`focus-ring inline-flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-black ${
            mode === "register" ? "bg-amber text-ink" : "bg-white/[0.08] text-white"
          }`}
          disabled={isSubmitting}
          onClick={() => changeMode("register")}
          role="tab"
          type="button"
        >
          <UserPlus aria-hidden className="h-4 w-4" />
          {dictionary.register}
        </button>
      </div>

      <div className="mt-5 border-b border-white/10 pb-4">
        <h2 className="hp-wrap text-xl font-black text-white">{mode === "signin" ? dictionary.signinTitle : dictionary.registerTitle}</h2>
        <p className="hp-wrap mt-2 text-sm leading-6 text-slate-300">{mode === "signin" ? dictionary.signinBody : dictionary.registerBody}</p>
      </div>

      <form action={handleSubmit} className="mt-4 grid gap-4">
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
            minLength={mode === "register" ? 12 : 8}
            name="password"
            required
            type="password"
          />
        </label>
        {mode === "register" ? <p className="-mt-2 text-xs font-bold text-steel">{dictionary.passwordRule}</p> : null}
        {mode === "signin" ? <Link className="-mt-2 text-sm font-bold text-mint hover:text-white" href="/account/reset-password">{dictionary.forgotPassword}</Link> : null}
        <button className="hp-button-primary justify-center disabled:cursor-wait disabled:opacity-60" disabled={isSubmitting} type="submit">
          {isSubmitting ? dictionary.submitting : mode === "signin" ? dictionary.signin : dictionary.register}
        </button>
        {feedback ? (
          <p
            aria-live="polite"
            className={`hp-wrap rounded-sm border p-3 text-sm font-semibold ${
              feedback.tone === "success" ? "border-mint/30 bg-mint/[0.08] text-mint" : "border-amber/30 bg-amber/[0.08] text-amber"
            }`}
          >
            {feedback.message}
          </p>
        ) : null}
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
