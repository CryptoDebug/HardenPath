type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
};

const globalForRateLimit = globalThis as unknown as {
  hardenPathRateLimitBuckets?: Map<string, RateLimitBucket>;
};

const buckets = globalForRateLimit.hardenPathRateLimitBuckets ?? new Map<string, RateLimitBucket>();

if (process.env.NODE_ENV !== "production") {
  globalForRateLimit.hardenPathRateLimitBuckets = buckets;
}

export function consumeRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);
  const bucket = !existing || existing.resetAt <= now ? { count: 0, resetAt: now + windowMs } : existing;

  bucket.count += 1;
  buckets.set(key, bucket);

  if (buckets.size > 5_000) {
    for (const [bucketKey, value] of buckets) {
      if (value.resetAt <= now) {
        buckets.delete(bucketKey);
      }
    }
  }

  return {
    allowed: bucket.count <= limit,
    limit,
    remaining: Math.max(0, limit - bucket.count),
    resetAt: bucket.resetAt
  };
}
