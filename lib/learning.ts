import "server-only";
import { ProgressStatus, SubscriptionStatus } from "@prisma/client";
import { courses, getCoursesByCategory } from "@/content/catalog";
import { prisma } from "@/lib/db";

export type LearningStats = {
  totalCourses: number;
  completedCourses: number;
  totalPercent: number;
  badgeCount: number;
  streakDays: number;
  categoryProgress: Record<string, number>;
};

export async function getLearningStats(userId?: string): Promise<LearningStats> {
  const base: LearningStats = {
    totalCourses: courses.length,
    completedCourses: 0,
    totalPercent: 0,
    badgeCount: 0,
    streakDays: 0,
    categoryProgress: {}
  };

  if (!userId) {
    return base;
  }

  const [user, completed, badges] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { streakDays: true }
    }),
    prisma.progress.findMany({
      where: {
        userId,
        status: ProgressStatus.COMPLETED,
        lessonId: null
      },
      select: {
        course: {
          select: {
            slug: true,
            categorySlug: true
          }
        }
      }
    }),
    prisma.userBadge.count({
      where: { userId }
    })
  ]);

  const completedSlugs = new Set(completed.map((item) => item.course.slug));
  const completedCourses = courses.filter((course) => completedSlugs.has(course.slug)).length;

  const categoryProgress = Object.fromEntries(
    Array.from(new Set(courses.map((course) => course.categorySlug))).map((categorySlug) => {
      const categoryCourses = getCoursesByCategory(categorySlug);
      const done = categoryCourses.filter((course) => completedSlugs.has(course.slug)).length;
      const percent = categoryCourses.length > 0 ? Math.round((done / categoryCourses.length) * 100) : 0;
      return [categorySlug, percent];
    })
  );

  return {
    ...base,
    completedCourses,
    totalPercent: base.totalCourses > 0 ? Math.round((completedCourses / base.totalCourses) * 100) : 0,
    badgeCount: badges,
    streakDays: user?.streakDays ?? 0,
    categoryProgress
  };
}

export async function getCourseCompletion(userId: string, courseSlug: string) {
  const progress = await prisma.progress.findFirst({
    where: {
      userId,
      lessonId: null,
      course: {
        slug: courseSlug
      }
    },
    select: {
      status: true,
      percent: true
    }
  });

  return {
    completed: progress?.status === ProgressStatus.COMPLETED,
    percent: progress?.percent ?? 0
  };
}

export async function getCompletedCourseSlugs(userId?: string) {
  if (!userId) {
    return [];
  }

  const completed = await prisma.progress.findMany({
    where: {
      lessonId: null,
      status: ProgressStatus.COMPLETED,
      userId
    },
    select: {
      course: {
        select: {
          slug: true
        }
      }
    }
  });

  return completed.map((item) => item.course.slug);
}

export async function userHasPremium(userId: string) {
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId,
      status: {
        in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.TRIALING]
      },
      plan: {
        slug: "premium"
      }
    },
    select: { id: true }
  });

  return Boolean(subscription);
}
