import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";

type AccessGateProps = {
  title: string;
  body: string;
  cta: string;
  href?: string;
};

export function AccessGate({ title, body, cta, href = "/account" }: AccessGateProps) {
  return (
    <section className="hp-shell hp-atlas-surface hp-path-card p-6 sm:p-8">
      <div aria-hidden className="hp-gridwash" />
      <div className="hp-inner">
        <div className="flex items-center gap-3">
          <span className="hp-checkpoint text-steel">
            <LockKeyhole aria-hidden className="h-5 w-5" />
          </span>
          <span className="hp-kicker hp-wrap">learner access</span>
        </div>
        <h1 className="hp-wrap mt-6 max-w-2xl text-3xl font-black text-white sm:text-4xl">{title}</h1>
        <p className="hp-wrap mt-4 max-w-2xl text-base leading-7 text-slate-300">{body}</p>
        <Link className="hp-button-primary mt-6" href={href}>
          <ShieldCheck aria-hidden className="h-4 w-4" />
          {cta}
        </Link>
      </div>
    </section>
  );
}
