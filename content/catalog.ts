import type { Locale } from "@/lib/i18n-client";
import categoriesData from "@/content/categories.json";
import network from "@/content/courses/network.json";
import hardwareInfrastructure from "@/content/courses/hardware-infrastructure.json";
import opsec from "@/content/courses/opsec.json";
import webSecurity from "@/content/courses/web-security.json";
import linux from "@/content/courses/linux.json";
import cryptography from "@/content/courses/cryptography.json";
import forensics from "@/content/courses/forensics.json";
import blueTeam from "@/content/courses/blue-team.json";
import ethicalRedTeam from "@/content/courses/ethical-red-team.json";
import ctfLabs from "@/content/courses/ctf-labs.json";

export type Level = "beginner" | "intermediate" | "advanced";

export type Category = {
  slug: string;
  icon: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  color: "mint" | "amber" | "coral";
};

export type Prerequisite = {
  label: string;
  courseSlug?: string;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correctOption: number;
};

export type Course = {
  slug: string;
  categorySlug: string;
  level: Level;
  isPremium: boolean;
  estimatedMinutes: number;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  objectives: Record<Locale, string[]>;
  prerequisites: Record<Locale, Prerequisite[]>;
  sections: Record<Locale, { title: string; body: string }[]>;
  resources: Record<Locale, { label: string; url: string }[]>;
  exercises: Record<Locale, { title: string; body: string; premium?: boolean; solution?: string }[]>;
  quiz: Record<Locale, QuizQuestion[]>;
};

export const categories = categoriesData as Category[];
export const courses = [
  ...network,
  ...hardwareInfrastructure,
  ...opsec,
  ...webSecurity,
  ...linux,
  ...cryptography,
  ...forensics,
  ...blueTeam,
  ...ethicalRedTeam,
  ...ctfLabs
] as Course[];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function getCoursesByCategory(categorySlug: string) {
  return courses.filter((course) => course.categorySlug === categorySlug);
}
