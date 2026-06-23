import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getCourse } from "@/content/catalog";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { gradeQuestions, hasCompleteAnswerSet } from "@/lib/assessment";
import { userHasPremium } from "@/lib/learning";

const attemptSchema = z.object({
  answers: z.array(z.object({
    optionId: z.string().regex(/^o-\d+$/),
    questionId: z.string().regex(/^q-\d+$/)
  })),
  courseSlug: z.string().min(1)
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const parsed = attemptSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid quiz payload." }, { status: 400 });
  }

  const catalogCourse = getCourse(parsed.data.courseSlug);

  if (!catalogCourse) {
    return NextResponse.json({ error: "Course is not available." }, { status: 404 });
  }

  if (catalogCourse.isPremium && !(await userHasPremium(session.user.id))) {
    return NextResponse.json({ error: "A premium subscription is required." }, { status: 403 });
  }

  const quiz = await prisma.quiz.findFirst({
    where: {
      course: {
        slug: parsed.data.courseSlug
      },
      slug: "validation"
    },
    select: {
      id: true
    }
  });

  if (!quiz) {
    return NextResponse.json({ error: "Quiz is not available yet." }, { status: 404 });
  }

  const questions = catalogCourse.quiz.fr;

  if (!hasCompleteAnswerSet(questions.length, parsed.data.answers)) {
    return NextResponse.json({ error: "All questions must be answered." }, { status: 400 });
  }

  const grading = gradeQuestions(questions, parsed.data.answers);
  const score = grading.correct;
  const maxScore = grading.maxScore;
  const passed = score === maxScore;

  const attempt = await prisma.quizAttempt.create({
    data: {
      answers: parsed.data.answers,
      maxScore,
      passed,
      quizId: quiz.id,
      score,
      userId: session.user.id
    },
    select: {
      id: true,
      maxScore: true,
      passed: true,
      score: true
    }
  });

  return NextResponse.json({ attempt, review: grading.results });
}
