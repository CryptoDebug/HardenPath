import { ProgressStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

const completeSchema = z.object({
  courseSlug: z.string().min(1)
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const parsed = completeSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid progress payload." }, { status: 400 });
  }

  const course = await prisma.course.findUnique({
    where: { slug: parsed.data.courseSlug },
    select: { id: true }
  });

  if (!course) {
    return NextResponse.json({ error: "Course is not seeded in the database." }, { status: 404 });
  }

  const existing = await prisma.progress.findFirst({
    where: {
      userId: session.user.id,
      courseId: course.id,
      lessonId: null
    },
    select: { id: true }
  });

  const progress = existing
    ? await prisma.progress.update({
        where: { id: existing.id },
        data: {
          status: ProgressStatus.COMPLETED,
          percent: 100,
          completedAt: new Date()
        },
        select: {
          percent: true,
          status: true
        }
      })
    : await prisma.progress.create({
        data: {
          userId: session.user.id,
          courseId: course.id,
          lessonId: null,
          status: ProgressStatus.COMPLETED,
          percent: 100,
          completedAt: new Date()
        },
        select: {
          percent: true,
          status: true
        }
      });

  return NextResponse.json({ progress });
}
