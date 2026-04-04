import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useParams } from "wouter";
import { Exam, Question, Section, UserAnswer } from "../types/exam";
import { saveProgress, loadProgress, clearProgress, calculateResults } from "../lib/examStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  X,
  Send,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";

interface ExamPageProps {
  exams: Exam[];
}

export default function ExamPage({ exams }: ExamPageProps) {
  const params = useParams<{ level: string; examNumber: string }>();
  const [, navigate] = useLocation();

  const exam = exams.find(
    (e) => e.level === params.level && e.exam_number === Number(params.examNumber)
  );

  const examKey = `${params.level}-${params.examNumber}`;

  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showSectionNav, setShowSectionNav] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!exam) return;
    const saved = loadProgress(examKey);
    if (saved) setAnswers(saved);
    timerRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [exam, examKey]);

  useEffect(() => {
    if (!exam) return;
    saveProgress(examKey, answers);
  }, [answers, exam, examKey]);

  if (!exam) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Exam not found</h2>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-indigo-600 rounded-xl text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const currentSection = exam.sections[currentSectionIdx];
  const currentQuestion = currentSection?.questions[currentQuestionIdx];
  const questionKey = `${currentSection?.section}-${currentQuestion?.number}`;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const getTotalAnswered = () => Object.keys(answers).length;
  const getTotalQuestions = () => exam.total_questions;

  const getAnswerForKey = (key: string) => answers[key]?.selectedAnswer || null;

  const handleSelectAnswer = (choice: string) => {
    if (!currentSection || !currentQuestion) return;
    const isCorrect = choice === currentQuestion.correct_answer;
    setAnswers((prev) => ({
      ...prev,
      [questionKey]: {
        questionNumber: currentQuestion.number,
        sectionId: currentSection.section,
        selectedAnswer: choice,
        isCorrect,
      },
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < currentSection.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else if (currentSectionIdx < exam.sections.length - 1) {
      setCurrentSectionIdx(currentSectionIdx + 1);
      setCurrentQuestionIdx(0);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    } else if (currentSectionIdx > 0) {
      const prevSection = exam.sections[currentSectionIdx - 1];
      setCurrentSectionIdx(currentSectionIdx - 1);
      setCurrentQuestionIdx(prevSection.questions.length - 1);
    }
  };

  const toggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(questionKey)) next.delete(questionKey);
      else next.add(questionKey);
      return next;
    });
  };

  const handleSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const result = calculateResults(exam, answers, timeTaken);
    clearProgress(examKey);
    navigate(`/results/${exam.level}/${exam.exam_number}`, {
      state: { result, answers },
    });
  };

  const isFirst = currentSectionIdx === 0 && currentQuestionIdx === 0;
  const isLast =
    currentSectionIdx === exam.sections.length - 1 &&
    currentQuestionIdx === currentSection.questions.length - 1;

  const progressPercent = (getTotalAnswered() / getTotalQuestions()) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-[#0a0a0f]/95 backdrop-blur border-b border-white/5 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors text-white/60 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded-lg">
                {exam.level} — Exam #{exam.exam_number}
              </span>
              <span className="text-xs text-white/30 truncate hidden sm:block">
                {currentSection.section_name}
              </span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-sm font-mono font-bold text-white/60">
              <Clock className="w-4 h-4" />
              <span>{formatTime(elapsedTime)}</span>
            </div>
            <div className="text-xs text-white/40">
              {getTotalAnswered()}/{getTotalQuestions()}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 max-w-4xl mx-auto w-full px-4 py-6 gap-6">
        {/* Main Question Area */}
        <div className="flex-1 min-w-0">
          {/* Section indicator */}
          <div className="flex items-center gap-2 mb-4">
            {exam.sections.map((s, idx) => (
              <button
                key={s.section}
                onClick={() => { setCurrentSectionIdx(idx); setCurrentQuestionIdx(0); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  idx === currentSectionIdx
                    ? "bg-indigo-600 text-white"
                    : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70"
                }`}
              >
                Section {s.section}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={questionKey}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.15 }}
            >
              {/* Question Card */}
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 mb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-sm font-bold text-white">
                      {currentQuestion?.number}
                    </span>
                    <span className="text-xs text-white/30">
                      Question {currentQuestionIdx + 1} of {currentSection.questions.length}
                    </span>
                  </div>
                  <button
                    onClick={toggleFlag}
                    className={`p-2 rounded-xl transition-colors ${
                      flagged.has(questionKey)
                        ? "text-amber-400 bg-amber-950/30"
                        : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    {flagged.has(questionKey) ? (
                      <BookmarkCheck className="w-5 h-5" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <p className="text-white text-xl leading-relaxed font-medium mb-2" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                  {currentQuestion?.question}
                </p>
              </div>

              {/* Answer Choices */}
              <div className="space-y-3">
                {currentQuestion &&
                  Object.entries(currentQuestion.choices).map(([key, value]) => {
                    const selected = getAnswerForKey(questionKey) === key;
                    return (
                      <button
                        key={key}
                        onClick={() => handleSelectAnswer(key)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                          selected
                            ? "border-indigo-500 bg-indigo-950/60 text-white"
                            : "border-white/8 bg-white/[0.02] text-white/70 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                            selected
                              ? "bg-indigo-500 text-white"
                              : "bg-white/10 text-white/50"
                          }`}
                        >
                          {key}
                        </div>
                        <span className="text-lg" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                          {value}
                        </span>
                        {selected && (
                          <CheckCircle2 className="w-5 h-5 text-indigo-400 ml-auto shrink-0" />
                        )}
                      </button>
                    );
                  })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrev}
              disabled={isFirst}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {isLast ? (
              <button
                onClick={() => setShowSubmitModal(true)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-sm shadow-lg shadow-indigo-900/30 hover:opacity-90 transition-opacity"
              >
                <Flag className="w-4 h-4" />
                Submit Exam
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-500 transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Question Navigator Sidebar */}
        <div className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 bg-white/[0.03] border border-white/8 rounded-2xl p-4">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">
              Progress
            </h3>

            {exam.sections.map((section, sIdx) => (
              <div key={section.section} className="mb-4">
                <p className="text-xs text-white/30 mb-2 truncate">{section.section_name.split("—")[0].trim()}</p>
                <div className="flex flex-wrap gap-1.5">
                  {section.questions.map((q, qIdx) => {
                    const key = `${section.section}-${q.number}`;
                    const answered = !!answers[key]?.selectedAnswer;
                    const isActive = sIdx === currentSectionIdx && qIdx === currentQuestionIdx;
                    const isFlagged = flagged.has(key);

                    return (
                      <button
                        key={q.number}
                        onClick={() => {
                          setCurrentSectionIdx(sIdx);
                          setCurrentQuestionIdx(qIdx);
                        }}
                        className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                          isActive
                            ? "bg-indigo-500 text-white ring-2 ring-indigo-400 ring-offset-1 ring-offset-[#0a0a0f]"
                            : answered
                            ? "bg-indigo-900/60 text-indigo-300"
                            : isFlagged
                            ? "bg-amber-900/60 text-amber-300"
                            : "bg-white/5 text-white/30 hover:bg-white/10"
                        }`}
                      >
                        {q.number}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="pt-3 border-t border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-white/30">
                <div className="w-3 h-3 rounded bg-indigo-900/60 border border-indigo-700" />
                Answered
              </div>
              <div className="flex items-center gap-2 text-xs text-white/30">
                <div className="w-3 h-3 rounded bg-amber-900/60 border border-amber-700" />
                Flagged
              </div>
              <div className="flex items-center gap-2 text-xs text-white/30">
                <div className="w-3 h-3 rounded bg-white/5 border border-white/10" />
                Unanswered
              </div>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Submit Exam
            </button>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      <AnimatePresence>
        {showSubmitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#141420] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            >
              <button
                onClick={() => setShowSubmitModal(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Submit Exam?</h2>
                <p className="text-white/50 text-sm">
                  You've answered{" "}
                  <strong className="text-white">{getTotalAnswered()}</strong> of{" "}
                  <strong className="text-white">{getTotalQuestions()}</strong> questions.
                </p>
                {getTotalAnswered() < getTotalQuestions() && (
                  <div className="mt-3 flex items-center gap-2 text-amber-400 text-sm bg-amber-950/30 rounded-xl p-3">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>
                      {getTotalQuestions() - getTotalAnswered()} questions unanswered
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 text-white/60 text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Continue
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
