import assert from "node:assert/strict";
import test from "node:test";
import { Prisma, PrismaClient, ProgressStatus } from "@prisma/client";
import { consumeRateLimit } from "../../lib/request-rate-limit";

const prisma = new PrismaClient();

test.after(async () => prisma.$disconnect());

test("database enforces one course-level progress row", async () => {
  const course = await prisma.course.findFirstOrThrow();
  const user = await prisma.user.create({ data: { email: `integration-${Date.now()}@example.test` } });

  try {
    await prisma.progress.create({ data: { courseId: course.id, lessonId: null, percent: 100, status: ProgressStatus.COMPLETED, userId: user.id } });
    await assert.rejects(
      prisma.progress.create({ data: { courseId: course.id, lessonId: null, percent: 100, status: ProgressStatus.COMPLETED, userId: user.id } }),
      (error) => error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002"
    );
  } finally {
    await prisma.user.delete({ where: { id: user.id } });
  }
});

test("rate limits persist across calls", async () => {
  const key = `integration:${Date.now()}`;
  assert.equal((await consumeRateLimit(key, 2, 60_000)).allowed, true);
  assert.equal((await consumeRateLimit(key, 2, 60_000)).allowed, true);
  assert.equal((await consumeRateLimit(key, 2, 60_000)).allowed, false);
});
