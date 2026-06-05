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
    update: {},
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
    update: {},
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
        published: true
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
        contentPathFr: `content/courses/fr/${course.slug}.mdx`,
        contentPathEn: `content/courses/en/${course.slug}.mdx`
      }
    });

    await prisma.lesson.upsert({
      where: { courseId_slug: { courseId: createdCourse.id, slug: "overview" } },
      update: {
        titleFr: course.title.fr,
        titleEn: course.title.en,
        visibility: course.isPremium ? ContentVisibility.PREMIUM : ContentVisibility.PUBLIC,
        isPremium: course.isPremium
      },
      create: {
        courseId: createdCourse.id,
        slug: "overview",
        order: 1,
        titleFr: course.title.fr,
        titleEn: course.title.en,
        visibility: course.isPremium ? ContentVisibility.PREMIUM : ContentVisibility.PUBLIC,
        isPremium: course.isPremium,
        contentPathFr: `content/courses/fr/${course.slug}.mdx`,
        contentPathEn: `content/courses/en/${course.slug}.mdx`
      }
    });

    await prisma.quiz.upsert({
      where: { courseId_slug: { courseId: createdCourse.id, slug: "validation" } },
      update: {
        titleFr: "Validation",
        titleEn: "Validation",
        isPremium: course.isPremium,
        questions: course.quiz
      },
      create: {
        courseId: createdCourse.id,
        slug: "validation",
        titleFr: "Validation",
        titleEn: "Validation",
        isPremium: course.isPremium,
        passingScore: 70,
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
