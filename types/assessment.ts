export type AssessmentAnswer = {
  optionId: string;
  questionId: string;
};

export type AssessmentQuestion = {
  id: string;
  options: {
    id: string;
    label: string;
  }[];
  prompt: string;
};

export type AssessmentReview = {
  correct: boolean;
  correctOptionId: string;
  disqualifying: boolean;
  explanation?: string;
  questionId: string;
};
