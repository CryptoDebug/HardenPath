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
    <section className="hp-shell rounded-md p-6 sm:p-8">
      <div className="hp-inner">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-md border border-amber/35 bg-amber/10 text-amber">
            <LockKeyhole aria-hidden className="h-5 w-5" />
          </span>
          <span className="hp-kicker">restricted learning area</span>
        </div>
        <h1 className="mt-6 max-w-2xl text-3xl font-black text-white sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{body}</p>
        <Link className="hp-button-primary mt-6" href={href}>
          <ShieldCheck aria-hidden className="h-4 w-4" />
          {cta}
        </Link>
      </div>
    </section>
  );
}
