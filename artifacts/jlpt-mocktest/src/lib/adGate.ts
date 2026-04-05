const UNLOCK_KEY = "jlpt_unlocked_exams";

export function isFreeExam(examNumber: number): boolean {
  return examNumber === 1;
}

export function isExamUnlocked(level: string, examNumber: number): boolean {
  if (isFreeExam(examNumber)) return true;
  const stored = localStorage.getItem(UNLOCK_KEY);
  if (!stored) return false;
  const unlocked: string[] = JSON.parse(stored);
  return unlocked.includes(`${level}-${examNumber}`);
}

export function unlockExam(level: string, examNumber: number): void {
  const stored = localStorage.getItem(UNLOCK_KEY);
  const unlocked: string[] = stored ? JSON.parse(stored) : [];
  const key = `${level}-${examNumber}`;
  if (!unlocked.includes(key)) {
    unlocked.push(key);
    localStorage.setItem(UNLOCK_KEY, JSON.stringify(unlocked));
  }
}
