type ProgressBarProps = {
  value: number;
  label?: string;
};

export function ProgressBar({ value, label }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div aria-label={label} aria-valuemax={100} aria-valuemin={0} aria-valuenow={clamped} role="progressbar">
      <div className="h-2.5 overflow-hidden rounded-sm border border-white/10 bg-black/30">
        <div
          className="h-full rounded-sm bg-[linear-gradient(90deg,#67d8bd,#c8a45f)] transition-all duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
