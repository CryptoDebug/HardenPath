import assert from "node:assert/strict";
import test from "node:test";
import { courses } from "../content/catalog";
import { beginnerExams } from "../content/exams";
import { gradeQuestions, hasCompleteAnswerSet, presentCourseQuestions, presentExamQuestions } from "../lib/assessment";

test("course quizzes never expose the canonical answer and vary its displayed position", () => {
  const course = courses[0];
  const positions = new Set<number>();

  for (let seed = 0; seed < 20; seed += 1) {
    const presented = presentCourseQuestions(course.quiz.fr, String(seed));
    positions.add(presented[0].options.findIndex((option) => option.id === "o-1"));
    assert.equal("correctOption" in presented[0], false);
  }

  assert.ok(positions.size > 1);
});

test("exam presentations stay bilingual and do not expose grading data", () => {
  const exam = beginnerExams[0];
  const french = presentExamQuestions(exam.questions, "fr", "fr-seed");
  const english = presentExamQuestions(exam.questions, "en", "en-seed");

  assert.equal(french.length, exam.questions.length);
  assert.notEqual(french[0].prompt, english[0].prompt);
  assert.equal("correctOption" in french[0], false);
});

test("server grading detects correct, incomplete, and disqualifying submissions", () => {
  const questions = [
    { correctOption: 1, disqualifyingOptions: [2] },
    { correctOption: 0 }
  ];
  const answers = [
    { questionId: "q-1", optionId: "o-3" },
    { questionId: "q-2", optionId: "o-1" }
  ];
  const result = gradeQuestions(questions, answers);

  assert.equal(result.correct, 1);
  assert.equal(result.disqualified, true);
  assert.equal(hasCompleteAnswerSet(2, answers), true);
  assert.equal(hasCompleteAnswerSet(2, answers.slice(0, 1)), false);
});

test("all catalog quizzes have aligned bilingual shapes and valid answer indexes", () => {
  for (const course of courses) {
    assert.equal(course.quiz.fr.length, course.quiz.en.length, course.slug);

    for (const locale of ["fr", "en"] as const) {
      for (const question of course.quiz[locale]) {
        assert.ok(question.options.length >= 2, `${course.slug}:${locale}`);
        assert.ok(question.correctOption >= 0 && question.correctOption < question.options.length, `${course.slug}:${locale}`);
      }
    }
  }
});
