import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getCategory } from "@/content/catalog";
import { getBeginnerExam, getBeginnerExamRequirement } from "@/content/exams";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

const attemptSchema = z.object({
  answers: z.array(z.number().int().min(0)),
  categorySlug: z.string().min(1)
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const parsed = attemptSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid exam payload." }, { status: 400 });
  }

  const category = getCategory(parsed.data.categorySlug);
  const exam = getBeginnerExam(parsed.data.categorySlug);

  if (!category || !exam) {
    return NextResponse.json({ error: "Exam is not available." }, { status: 404 });
  }

  if (parsed.data.answers.length !== exam.questions.length) {
    return NextResponse.json({ error: "All questions must be answered." }, { status: 400 });
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

  const correctAnswers = exam.questions.reduce((total, question, index) => total + (parsed.data.answers[index] === question.correctOption ? 1 : 0), 0);
  const score = Math.round((correctAnswers / exam.questions.length) * 100);
  const passed = score >= exam.passingScore;
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
      maxScore: exam.questions.length,
      passed,
      score
    },
    awardedBadge: awardedBadge?.badge ?? null
  });
}
