CREATE TABLE "ExamAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categorySlug" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "maxScore" INTEGER NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "disqualified" BOOLEAN NOT NULL DEFAULT false,
    "answers" JSONB NOT NULL,
    "writtenResponses" JSONB NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ExamAttempt_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ExamAttempt_userId_categorySlug_completedAt_idx"
ON "ExamAttempt"("userId", "categorySlug", "completedAt");

ALTER TABLE "ExamAttempt" ADD CONSTRAINT "ExamAttempt_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
