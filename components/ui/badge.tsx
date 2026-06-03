import { clsx } from "clsx";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "mint" | "amber" | "coral" | "muted";
};

export function Badge({ children, tone = "muted" }: BadgeProps) {
  const tones = {
    mint: "border-mint/35 bg-mint/[0.12] text-mint",
    amber: "border-amber/35 bg-amber/[0.12] text-amber",
    coral: "border-coral/35 bg-coral/[0.12] text-coral",
    muted: "border-white/10 bg-white/[0.06] text-paper"
  };

  return (
    <span className={clsx("hp-wrap inline-flex max-w-full items-center rounded-[4px] border px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.06em]", tones[tone])}>
      {children}
    </span>
  );
}
