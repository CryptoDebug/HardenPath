ALTER TABLE "User" ADD COLUMN "lastLearningAt" TIMESTAMP(3);

DROP INDEX "Progress_userId_courseId_lessonId_key";
CREATE UNIQUE INDEX "Progress_userId_courseId_lessonId_key"
ON "Progress"("userId", "courseId", "lessonId") NULLS NOT DISTINCT;

CREATE TABLE "RateLimitBucket" (
    "key" VARCHAR(128) NOT NULL,
    "count" INTEGER NOT NULL,
    "resetAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "RateLimitBucket_pkey" PRIMARY KEY ("key")
);

CREATE INDEX "RateLimitBucket_resetAt_idx" ON "RateLimitBucket"("resetAt");
CREATE INDEX "Subscription_userId_status_currentPeriodEnd_idx"
ON "Subscription"("userId", "status", "currentPeriodEnd");
