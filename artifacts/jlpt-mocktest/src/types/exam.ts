export interface Choice {
  [key: string]: string;
}

export interface Question {
  number: number;
  question: string;
  choices: Choice;
  correct_answer: string;
  correct_text: string;
}

export interface Section {
  section: string;
  section_name: string;
  url?: string;
  title?: string;
  total_questions: number;
  questions: Question[];
}

export interface Exam {
  level: string;
  exam_number: number;
  total_questions: number;
  sections: Section[];
}

export interface UserAnswer {
  questionNumber: number;
  sectionId: string;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
}

export interface ExamResult {
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  score: number;
  sectionResults: SectionResult[];
  timeTaken: number;
}

export interface SectionResult {
  sectionId: string;
  sectionName: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
}
