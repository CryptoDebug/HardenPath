const ONE_DAY = 24 * 60 * 60 * 1_000;

function utcDay(value: Date) {
  return Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate());
}

export function nextStreak(current: number, lastLearningAt: Date | null, now: Date) {
  if (!lastLearningAt) return 1;

  const elapsedDays = Math.round((utcDay(now) - utcDay(lastLearningAt)) / ONE_DAY);
  if (elapsedDays <= 0) return current;
  if (elapsedDays === 1) return current + 1;
  return 1;
}
