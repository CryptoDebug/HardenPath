import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getCourse } from "@/content/catalog";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

const attemptSchema = z.object({
  answers: z.array(z.number().int().min(0)),
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

  if (parsed.data.answers.length !== questions.length) {
    return NextResponse.json({ error: "All questions must be answered." }, { status: 400 });
  }

  const score = questions.reduce((total, question, index) => total + (parsed.data.answers[index] === question.correctOption ? 1 : 0), 0);
  const maxScore = questions.length;
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

  return NextResponse.json({ attempt });
}
