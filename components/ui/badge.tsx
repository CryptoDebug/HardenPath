import { clsx } from "clsx";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "mint" | "amber" | "coral" | "muted";
};

export function Badge({ children, tone = "muted" }: BadgeProps) {
  const tones = {
    mint: "border-mint/35 bg-mint/10 text-mint",
    amber: "border-amber/35 bg-amber/10 text-amber",
    coral: "border-coral/35 bg-coral/10 text-coral",
    muted: "border-white/10 bg-white/5 text-steel"
  };

  return (
    <span className={clsx("inline-flex items-center rounded-[4px] border px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.16em]", tones[tone])}>
      {children}
    </span>
  );
}
