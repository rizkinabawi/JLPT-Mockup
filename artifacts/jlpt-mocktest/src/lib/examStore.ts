import { Exam, UserAnswer, ExamResult, SectionResult } from "../types/exam";

const STORAGE_KEY = "jlpt_exams";
const PROGRESS_KEY = "jlpt_progress";

export function saveExams(exams: Exam[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(exams));
}

export function loadExams(): Exam[] | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function saveProgress(
  examKey: string,
  answers: Record<string, UserAnswer>
): void {
  const allProgress = loadAllProgress();
  allProgress[examKey] = answers;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress));
}

export function loadProgress(
  examKey: string
): Record<string, UserAnswer> | null {
  const allProgress = loadAllProgress();
  return allProgress[examKey] || null;
}

export function clearProgress(examKey: string): void {
  const allProgress = loadAllProgress();
  delete allProgress[examKey];
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress));
}

function loadAllProgress(): Record<string, Record<string, UserAnswer>> {
  const stored = localStorage.getItem(PROGRESS_KEY);
  if (!stored) return {};
  try {
    return JSON.parse(stored);
  } catch {
    return {};
  }
}

export function calculateResults(
  exam: Exam,
  answers: Record<string, UserAnswer>,
  timeTaken: number
): ExamResult {
  let totalCorrect = 0;
  let totalAnswered = 0;

  const sectionResults: SectionResult[] = exam.sections.map((section) => {
    let sectionCorrect = 0;
    let sectionAnswered = 0;

    section.questions.forEach((q) => {
      const key = `${section.section}-${q.number}`;
      const answer = answers[key];
      if (answer && answer.selectedAnswer !== null) {
        sectionAnswered++;
        totalAnswered++;
        if (answer.isCorrect) {
          sectionCorrect++;
          totalCorrect++;
        }
      }
    });

    return {
      sectionId: section.section,
      sectionName: section.section_name,
      totalQuestions: section.total_questions,
      correctAnswers: sectionCorrect,
      score: section.total_questions > 0
        ? Math.round((sectionCorrect / section.total_questions) * 100)
        : 0,
    };
  });

  return {
    totalQuestions: exam.total_questions,
    answeredQuestions: totalAnswered,
    correctAnswers: totalCorrect,
    score: exam.total_questions > 0
      ? Math.round((totalCorrect / exam.total_questions) * 100)
      : 0,
    sectionResults,
    timeTaken,
  };
}
