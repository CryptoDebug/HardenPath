type ProgressBarProps = {
  value: number;
  label?: string;
};

export function ProgressBar({ value, label }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div aria-label={label} aria-valuemax={100} aria-valuemin={0} aria-valuenow={clamped} role="progressbar">
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-mint via-amber to-coral transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
