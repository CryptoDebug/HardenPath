import { clsx } from "clsx";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "mint" | "amber" | "coral" | "muted";
};

export function Badge({ children, tone = "muted" }: BadgeProps) {
  const tones = {
    mint: "border-mint/40 bg-mint/12 text-mint",
    amber: "border-amber/40 bg-amber/12 text-amber",
    coral: "border-coral/40 bg-coral/12 text-coral",
    muted: "border-white/12 bg-white/7 text-slate-200"
  };

  return (
    <span className={clsx("inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold", tones[tone])}>
      {children}
    </span>
  );
}
