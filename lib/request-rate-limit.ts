import { createHash } from "node:crypto";
import { prisma } from "@/lib/db";

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
};

function protectedKey(key: string) {
  return createHash("sha256").update(key).digest("hex");
}

export async function consumeRateLimit(key: string, limit: number, windowMs: number): Promise<RateLimitResult> {
  const now = new Date();
  const resetAt = new Date(now.getTime() + windowMs);
  const bucketKey = protectedKey(key);
  const buckets = await prisma.$queryRaw<Array<{ count: number; resetAt: Date }>>`
    INSERT INTO "RateLimitBucket" ("key", "count", "resetAt", "updatedAt")
    VALUES (${bucketKey}, 1, ${resetAt}, ${now})
    ON CONFLICT ("key") DO UPDATE SET
      "count" = CASE
        WHEN "RateLimitBucket"."resetAt" <= ${now} THEN 1
        ELSE "RateLimitBucket"."count" + 1
      END,
      "resetAt" = CASE
        WHEN "RateLimitBucket"."resetAt" <= ${now} THEN ${resetAt}
        ELSE "RateLimitBucket"."resetAt"
      END,
      "updatedAt" = ${now}
    RETURNING "count", "resetAt"
  `;
  const bucket = buckets[0];

  if (Math.random() < 0.01) {
    void prisma.rateLimitBucket.deleteMany({ where: { resetAt: { lt: now } } }).catch(() => undefined);
  }

  return {
    allowed: bucket.count <= limit,
    limit,
    remaining: Math.max(0, limit - bucket.count),
    resetAt: bucket.resetAt.getTime()
  };
}

export async function consumeUserRateLimit(scope: string, userId: string, limit: number, windowMs: number) {
  return consumeRateLimit(`${scope}:user:${userId}`, limit, windowMs);
}
