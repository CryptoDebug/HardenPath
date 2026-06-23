import type { QuizQuestion } from "@/content/catalog";
import type { ExamQuestion } from "@/content/exams";
import type { Locale } from "@/lib/i18n-client";

export type SubmittedAnswer = {
  optionId: string;
  questionId: string;
};

export type PublicQuestion = {
  id: string;
  options: {
    id: string;
    label: string;
  }[];
  prompt: string;
};

export type GradedQuestion = {
  correct: boolean;
  correctOptionId: string;
  disqualifying: boolean;
  explanation?: string;
  questionId: string;
};

function hashSeed(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function shuffle<T>(items: T[], seed: string) {
  const output = [...items];
  let state = hashSeed(seed) || 1;

  for (let index = output.length - 1; index > 0; index -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const target = state % (index + 1);
    [output[index], output[target]] = [output[target], output[index]];
  }

  return output;
}

function questionId(index: number) {
  return `q-${index + 1}`;
}

function optionId(index: number) {
  return `o-${index + 1}`;
}

export function presentCourseQuestions(questions: QuizQuestion[], seed: string): PublicQuestion[] {
  return questions.map((question, questionIndex) => ({
    id: questionId(questionIndex),
    options: shuffle(
      question.options.map((label, optionIndex) => ({ id: optionId(optionIndex), label })),
      `${seed}:${questionIndex}`
    ),
    prompt: question.question
  }));
}

export function presentExamQuestions(questions: ExamQuestion[], locale: Locale, seed: string): PublicQuestion[] {
  return questions.map((question, questionIndex) => ({
    id: questionId(questionIndex),
    options: shuffle(
      question.options[locale].map((label, optionIndex) => ({ id: optionId(optionIndex), label })),
      `${seed}:${questionIndex}`
    ),
    prompt: question.question[locale]
  }));
}

export function gradeQuestions(
  questions: Array<{ correctOption: number; disqualifyingOptions?: number[]; explanation?: Record<Locale, string> }>,
  answers: SubmittedAnswer[],
  locale?: Locale
) {
  const answerMap = new Map(answers.map((answer) => [answer.questionId, answer.optionId]));
  const results: GradedQuestion[] = questions.map((question, index) => {
    const id = questionId(index);
    const selectedOption = answerMap.get(id);
    const selectedIndex = selectedOption?.startsWith("o-") ? Number(selectedOption.slice(2)) - 1 : -1;

    return {
      correct: selectedIndex === question.correctOption,
      correctOptionId: optionId(question.correctOption),
      disqualifying: question.disqualifyingOptions?.includes(selectedIndex) ?? false,
      explanation: locale && question.explanation ? question.explanation[locale] : undefined,
      questionId: id
    };
  });
  const correct = results.filter((result) => result.correct).length;

  return {
    correct,
    disqualified: results.some((result) => result.disqualifying),
    maxScore: questions.length,
    results
  };
}

export function hasCompleteAnswerSet(questionCount: number, answers: SubmittedAnswer[]) {
  if (answers.length !== questionCount) {
    return false;
  }

  const questionIds = new Set(answers.map((answer) => answer.questionId));
  return Array.from({ length: questionCount }, (_, index) => questionId(index)).every((id) => questionIds.has(id));
}
