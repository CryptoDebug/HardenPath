import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getCategory } from "@/content/catalog";
import { getBeginnerExam, getBeginnerExamRequirement } from "@/content/exams";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { gradeQuestions, hasCompleteAnswerSet } from "@/lib/assessment";
import { consumeUserRateLimit } from "@/lib/request-rate-limit";

const attemptSchema = z.object({
  answers: z.array(z.object({
    optionId: z.string().regex(/^o-\d+$/),
    questionId: z.string().regex(/^q-\d+$/)
  })),
  categorySlug: z.string().min(1),
  locale: z.enum(["fr", "en"]),
  writtenResponses: z.array(z.string().trim().min(120).max(4_000))
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const rateLimit = await consumeUserRateLimit("beginner-exam", session.user.id, 10, 60 * 60 * 1_000);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Too many exam attempts." }, { status: 429 });
  }

  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON." }, { status: 400 }); }
  const parsed = attemptSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid exam payload." }, { status: 400 });
  }

  const category = getCategory(parsed.data.categorySlug);
  const exam = getBeginnerExam(parsed.data.categorySlug);

  if (!category || !exam) {
    return NextResponse.json({ error: "Exam is not available." }, { status: 404 });
  }

  if (!hasCompleteAnswerSet(exam.questions.length, parsed.data.answers)) {
    return NextResponse.json({ error: "All questions must be answered." }, { status: 400 });
  }

  if (parsed.data.writtenResponses.length !== exam.tasks.length) {
    return NextResponse.json({ error: "Every written task must be completed." }, { status: 400 });
  }

  const requirement = getBeginnerExamRequirement(parsed.data.categorySlug);
  const completed = await prisma.progress.count({
    where: {
      course: {
        slug: {
          in: requirement.courseSlugs
        }
      },
      percent: 100,
      status: "COMPLETED",
      userId: session.user.id
    }
  });

  if (completed !== requirement.total) {
    return NextResponse.json({ error: "All beginner courses must be completed before taking this exam." }, { status: 403 });
  }

  const grading = gradeQuestions(exam.questions, parsed.data.answers, parsed.data.locale);
  const score = Math.round((grading.correct / grading.maxScore) * 100);
  const passed = !grading.disqualified && score >= exam.passingScore;
  const badgeSlug = `${category.slug}-bronze`;

  const badge = passed
    ? await prisma.badge.upsert({
        where: { slug: badgeSlug },
        update: {},
        create: {
          descriptionEn: `Pass the beginner ${category.title.en} exam.`,
          descriptionFr: `Réussis l'examen débutant ${category.title.fr}.`,
          icon: category.icon,
          isPremium: false,
          slug: badgeSlug,
          titleEn: `${category.title.en} bronze`,
          titleFr: `${category.title.fr} bronze`
        },
        select: {
          id: true,
          slug: true,
          titleEn: true,
          titleFr: true
        }
      })
    : null;

  const savedAttempt = await prisma.examAttempt.create({
    data: {
      answers: parsed.data.answers,
      categorySlug: category.slug,
      disqualified: grading.disqualified,
      level: "beginner",
      maxScore: grading.maxScore,
      passed,
      score,
      userId: session.user.id,
      writtenResponses: parsed.data.writtenResponses
    },
    select: { id: true }
  });

  const awardedBadge = badge
    ? await prisma.userBadge.upsert({
        where: {
          userId_badgeId: {
            badgeId: badge.id,
            userId: session.user.id
          }
        },
        update: {
          evidence: {
            categorySlug: category.slug,
            level: "beginner",
            maxScore: exam.questions.length,
            score,
            reason: "beginner_exam_passed"
          }
        },
        create: {
          badgeId: badge.id,
          evidence: {
            categorySlug: category.slug,
            level: "beginner",
            maxScore: exam.questions.length,
            score,
            reason: "beginner_exam_passed"
          },
          userId: session.user.id
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

  return NextResponse.json({
    attempt: {
      disqualified: grading.disqualified,
      id: savedAttempt.id,
      maxScore: grading.maxScore,
      passed,
      score
    },
    awardedBadge: awardedBadge?.badge ?? null,
    review: grading.results
  });
}
