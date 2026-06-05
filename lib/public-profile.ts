import "server-only";
import { ProgressStatus } from "@prisma/client";
import { categories, courses, getCoursesByCategory } from "@/content/catalog";
import { prisma } from "@/lib/db";
import type { Locale } from "@/lib/i18n-client";

const publicUserSelect = {
  id: true,
  name: true,
  streakDays: true
} as const;

export type PublicProfileSummary = {
  id: string;
  name: string;
  streakDays: number;
  completedCourses: number;
  totalCourses: number;
  totalPercent: number;
  badgeCount: number;
};

export type PublicProfile = PublicProfileSummary & {
  badges: {
    description: string;
    icon: string;
    slug: string;
    title: string;
  }[];
  categoryProgress: {
    categorySlug: string;
    completed: number;
    courses: {
      completed: boolean;
      slug: string;
      summary: string;
      title: string;
    }[];
    percent: number;
    title: string;
    total: number;
  }[];
};

function getPublicName(name?: string | null) {
  const trimmed = name?.trim();

  return trimmed && trimmed.length > 0 ? trimmed : "Apprenant HardenPath";
}

function summarizeProgress(user: { id: string; name: string | null; streakDays: number }, completedSlugs: Set<string>, badgeCount: number): PublicProfileSummary {
  const completedCourses = courses.filter((course) => completedSlugs.has(course.slug)).length;
  const totalCourses = courses.length;

  return {
    id: user.id,
    name: getPublicName(user.name),
    streakDays: user.streakDays,
    completedCourses,
    totalCourses,
    totalPercent: totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0,
    badgeCount
  };
}

export async function searchPublicLearners(query: string): Promise<PublicProfileSummary[]> {
  const search = query.trim();

  if (search.length < 2) {
    return [];
  }

  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive"
      }
    },
    orderBy: {
      name: "asc"
    },
    select: {
      ...publicUserSelect,
      _count: {
        select: {
          userBadges: true
        }
      }
    },
    take: 12
  });

  const completedByUser = await Promise.all(
    users.map((user) =>
      prisma.progress.findMany({
        where: {
          lessonId: null,
          status: ProgressStatus.COMPLETED,
          userId: user.id
        },
        select: {
          course: {
            select: {
              slug: true
            }
          }
        }
      })
    )
  );

  return users.map((user, index) => {
    const completedSlugs = new Set(completedByUser[index].map((progress) => progress.course.slug));
    return summarizeProgress(user, completedSlugs, user._count.userBadges);
  });
}

export async function getPublicLearnerProfile(userId: string, locale: Locale): Promise<PublicProfile | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: publicUserSelect
  });

  if (!user) {
    return null;
  }

  const [completedProgress, badges] = await Promise.all([
    prisma.progress.findMany({
      where: {
        lessonId: null,
        status: ProgressStatus.COMPLETED,
        userId
      },
      select: {
        course: {
          select: {
            categorySlug: true,
            slug: true
          }
        }
      }
    }),
    prisma.userBadge.findMany({
      where: { userId },
      orderBy: {
        awardedAt: "desc"
      },
      select: {
        badge: {
          select: {
            descriptionEn: true,
            descriptionFr: true,
            icon: true,
            slug: true,
            titleEn: true,
            titleFr: true
          }
        }
      }
    })
  ]);

  const completedSlugs = new Set(completedProgress.map((progress) => progress.course.slug));
  const summary = summarizeProgress(user, completedSlugs, badges.length);

  return {
    ...summary,
    badges: badges.map(({ badge }) => ({
      description: locale === "fr" ? badge.descriptionFr : badge.descriptionEn,
      icon: badge.icon,
      slug: badge.slug,
      title: locale === "fr" ? badge.titleFr : badge.titleEn
    })),
    categoryProgress: categories.map((category) => {
      const categoryCourses = getCoursesByCategory(category.slug);
      const completed = categoryCourses.filter((course) => completedSlugs.has(course.slug)).length;

      return {
        categorySlug: category.slug,
        completed,
        courses: categoryCourses.map((course) => ({
          completed: completedSlugs.has(course.slug),
          slug: course.slug,
          summary: course.summary[locale],
          title: course.title[locale]
        })),
        percent: categoryCourses.length > 0 ? Math.round((completed / categoryCourses.length) * 100) : 0,
        title: category.title[locale],
        total: categoryCourses.length
      };
    })
  };
}
