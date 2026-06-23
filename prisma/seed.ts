import { PrismaClient, CourseLevel, ContentVisibility } from "@prisma/client";
import { categories, courses } from "../content/catalog";

const prisma = new PrismaClient();

const levelMap = {
  beginner: CourseLevel.BEGINNER,
  intermediate: CourseLevel.INTERMEDIATE,
  advanced: CourseLevel.ADVANCED
};

async function main() {
  await prisma.plan.upsert({
    where: { slug: "free" },
    update: {
      nameFr: "Gratuit",
      nameEn: "Free",
      priceCents: 0,
      currency: "EUR",
      features: ["free_courses", "basic_badges", "community_content"]
    },
    create: {
      slug: "free",
      nameFr: "Gratuit",
      nameEn: "Free",
      priceCents: 0,
      features: ["free_courses", "basic_badges", "community_content"]
    }
  });

  await prisma.plan.upsert({
    where: { slug: "premium" },
    update: {
      nameFr: "Premium",
      nameEn: "Premium",
      priceCents: 900,
      currency: "EUR",
      features: ["premium_courses", "premium_exercises", "advanced_badges", "certificates"]
    },
    create: {
      slug: "premium",
      nameFr: "Premium",
      nameEn: "Premium",
      priceCents: 900,
      features: ["premium_courses", "premium_exercises", "advanced_badges", "certificates"]
    }
  });

  for (const category of categories) {
    await prisma.badge.upsert({
      where: { slug: `${category.slug}-starter` },
      update: {},
      create: {
        slug: `${category.slug}-starter`,
        titleFr: `${category.title.fr} starter`,
        titleEn: `${category.title.en} starter`,
        descriptionFr: `Termine ton premier module ${category.title.fr}.`,
        descriptionEn: `Complete your first ${category.title.en} module.`,
        icon: category.icon,
        isPremium: false
      }
    });

    await prisma.badge.upsert({
      where: { slug: `${category.slug}-bronze` },
      update: {
        descriptionEn: `Pass the beginner ${category.title.en} exam.`,
        descriptionFr: `Réussis l'examen débutant ${category.title.fr}.`,
        icon: category.icon,
        titleEn: `${category.title.en} bronze`,
        titleFr: `${category.title.fr} bronze`
      },
      create: {
        slug: `${category.slug}-bronze`,
        titleFr: `${category.title.fr} bronze`,
        titleEn: `${category.title.en} bronze`,
        descriptionFr: `Réussis l'examen débutant ${category.title.fr}.`,
        descriptionEn: `Pass the beginner ${category.title.en} exam.`,
        icon: category.icon,
        isPremium: false
      }
    });
  }

  await prisma.course.updateMany({
    where: { slug: { notIn: courses.map((course) => course.slug) } },
    data: { published: false }
  });

  for (const course of courses) {
    const createdCourse = await prisma.course.upsert({
      where: { slug: course.slug },
      update: {
        categorySlug: course.categorySlug,
        level: levelMap[course.level],
        titleFr: course.title.fr,
        titleEn: course.title.en,
        summaryFr: course.summary.fr,
        summaryEn: course.summary.en,
        visibility: course.isPremium ? ContentVisibility.PREMIUM : ContentVisibility.PUBLIC,
        isPremium: course.isPremium,
        requiredPlan: course.isPremium ? "premium" : "free",
        published: true,
        contentPathFr: `content/courses/${course.categorySlug}.json#${course.slug}`,
        contentPathEn: `content/courses/${course.categorySlug}.json#${course.slug}`
      },
      create: {
        slug: course.slug,
        categorySlug: course.categorySlug,
        level: levelMap[course.level],
        titleFr: course.title.fr,
        titleEn: course.title.en,
        summaryFr: course.summary.fr,
        summaryEn: course.summary.en,
        visibility: course.isPremium ? ContentVisibility.PREMIUM : ContentVisibility.PUBLIC,
        isPremium: course.isPremium,
        requiredPlan: course.isPremium ? "premium" : "free",
        published: true,
        contentPathFr: `content/courses/${course.categorySlug}.json#${course.slug}`,
        contentPathEn: `content/courses/${course.categorySlug}.json#${course.slug}`
      }
    });

    await prisma.lesson.upsert({
      where: { courseId_slug: { courseId: createdCourse.id, slug: "overview" } },
      update: {
        titleFr: course.title.fr,
        titleEn: course.title.en,
        visibility: course.isPremium ? ContentVisibility.PREMIUM : ContentVisibility.PUBLIC,
        isPremium: course.isPremium,
        contentPathFr: `content/courses/${course.categorySlug}.json#${course.slug}`,
        contentPathEn: `content/courses/${course.categorySlug}.json#${course.slug}`
      },
      create: {
        courseId: createdCourse.id,
        slug: "overview",
        order: 1,
        titleFr: course.title.fr,
        titleEn: course.title.en,
        visibility: course.isPremium ? ContentVisibility.PREMIUM : ContentVisibility.PUBLIC,
        isPremium: course.isPremium,
        contentPathFr: `content/courses/${course.categorySlug}.json#${course.slug}`,
        contentPathEn: `content/courses/${course.categorySlug}.json#${course.slug}`
      }
    });

    await prisma.quiz.upsert({
      where: { courseId_slug: { courseId: createdCourse.id, slug: "validation" } },
      update: {
        titleFr: "Validation",
        titleEn: "Validation",
        isPremium: course.isPremium,
        questions: course.quiz,
        passingScore: 100
      },
      create: {
        courseId: createdCourse.id,
        slug: "validation",
        titleFr: "Validation",
        titleEn: "Validation",
        isPremium: course.isPremium,
        passingScore: 100,
        questions: course.quiz
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
