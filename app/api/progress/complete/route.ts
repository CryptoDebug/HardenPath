import { Prisma, ProgressStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { userHasPremium } from "@/lib/learning";
import { consumeUserRateLimit } from "@/lib/request-rate-limit";
import { nextStreak } from "@/lib/streak";

const completeSchema = z.object({
  courseSlug: z.string().min(1)
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }
  const userId = session.user.id;

  const rateLimit = await consumeUserRateLimit("progress", userId, 30, 10 * 60 * 1_000);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Too many progress requests." }, { status: 429 });
  }

  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON." }, { status: 400 }); }
  const parsed = completeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid progress payload." }, { status: 400 });
  }

  const course = await prisma.course.findUnique({
    where: { slug: parsed.data.courseSlug },
    select: { categorySlug: true, id: true, isPremium: true, slug: true }
  });

  if (!course) {
    return NextResponse.json({ error: "Course is not available yet." }, { status: 404 });
  }

  if (course.isPremium && !(await userHasPremium(userId))) {
    return NextResponse.json({ error: "A premium subscription is required." }, { status: 403 });
  }

  const passedAttempts = await prisma.quizAttempt.findMany({
    where: {
      passed: true,
      userId,
      quiz: {
        courseId: course.id,
        slug: "validation"
      }
    },
    select: {
      maxScore: true,
      score: true
    }
  });
  const hasPerfectQuiz = passedAttempts.some((attempt) => attempt.score === attempt.maxScore);

  if (!hasPerfectQuiz) {
    return NextResponse.json({ error: "A perfect validation quiz score is required before completing this module." }, { status: 403 });
  }

  const completedAt = new Date();
  const progress = await prisma.$transaction(
    async (transaction) => {
      const previous = await transaction.progress.findFirst({
        where: { courseId: course.id, lessonId: null, userId },
        select: { status: true }
      });
      const rows = await transaction.$queryRaw<Array<{ percent: number; status: ProgressStatus }>>`
        INSERT INTO "Progress" ("id", "userId", "courseId", "lessonId", "status", "percent", "completedAt", "updatedAt")
        VALUES (${crypto.randomUUID()}, ${userId}, ${course.id}, NULL, 'COMPLETED'::"ProgressStatus", 100, ${completedAt}, ${completedAt})
        ON CONFLICT ("userId", "courseId", "lessonId") DO UPDATE SET
          "status" = 'COMPLETED'::"ProgressStatus",
          "percent" = 100,
          "completedAt" = EXCLUDED."completedAt",
          "updatedAt" = EXCLUDED."updatedAt"
        RETURNING "percent", "status"
      `;

      if (previous?.status !== ProgressStatus.COMPLETED) {
        const user = await transaction.user.findUniqueOrThrow({
          where: { id: userId },
          select: { lastLearningAt: true, streakDays: true }
        });
        await transaction.user.update({
          where: { id: userId },
          data: {
            lastLearningAt: completedAt,
            streakDays: nextStreak(user.streakDays, user.lastLearningAt, completedAt)
          }
        });
      }

      return rows[0];
    },
    { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
  );

  const starterBadge = await prisma.badge.findUnique({
    where: { slug: `${course.categorySlug}-starter` },
    select: { id: true, slug: true, titleEn: true, titleFr: true }
  });

  const awardedBadge = starterBadge
    ? await prisma.userBadge.upsert({
        where: {
          userId_badgeId: {
            badgeId: starterBadge.id,
            userId
          }
        },
        update: {},
        create: {
          badgeId: starterBadge.id,
          evidence: {
            courseSlug: course.slug,
            reason: "first_category_module_completed"
          },
          userId
        },
        select: {
          badge: {
            select: {
              slug: true,
              titleEn: true,
              titleFr: true
            }
          }
        }
      })
    : null;

  return NextResponse.json({ awardedBadge: awardedBadge?.badge ?? null, progress });
}
