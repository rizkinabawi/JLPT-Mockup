import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { Exam, ExamResult, UserAnswer } from "../types/exam";
import { calculateResults } from "../lib/examStore";
import { motion } from "framer-motion";
import {
  Trophy,
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Minus,
} from "lucide-react";

interface ResultsPageProps {
  exams: Exam[];
}

export default function ResultsPage({ exams }: ResultsPageProps) {
  const params = useParams<{ level: string; examNumber: string }>();
  const [location, navigate] = useLocation();
  const [result, setResult] = useState<ExamResult | null>(null);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const exam = exams.find(
    (e) => e.level === params.level && e.exam_number === Number(params.examNumber)
  );

  useEffect(() => {
    const state = (history.state as any)?.result
      ? history.state
      : window.history.state;
    if (state?.result) {
      setResult(state.result);
      setAnswers(state.answers || {});
    } else if (exam) {
      const fakeResult = calculateResults(exam, {}, 0);
      setResult(fakeResult);
    }
  }, [exam]);

  if (!exam || !result) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-white/50 mb-4">Results not found</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-indigo-600 rounded-xl text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-amber-400";
    return "text-red-400";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "from-emerald-600 to-teal-600";
    if (score >= 60) return "from-amber-600 to-orange-600";
    return "from-red-600 to-rose-600";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return "Excellent! Outstanding performance.";
    if (score >= 60) return "Good effort! Keep practicing.";
    if (score >= 40) return "Keep studying, you're making progress!";
    return "More practice needed. Don't give up!";
  };

  const getPassStatus = (score: number) => {
    return score >= 60;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#0a0a0f]/95 backdrop-blur border-b border-white/5 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors text-white/60"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <p className="text-xs text-white/40">Exam Results</p>
            <h1 className="text-sm font-bold text-white">
              JLPT {exam.level} — Exam #{exam.exam_number}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Score Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white/[0.03] border border-white/8 rounded-3xl p-8 mb-6 overflow-hidden text-center"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${getScoreBg(result.score)} opacity-10`} />

          <div className={`relative w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br ${getScoreBg(result.score)} flex items-center justify-center shadow-2xl`}>
            <div className="text-center">
              <p className="text-4xl font-black text-white">{result.score}%</p>
            </div>
          </div>

          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm font-bold mb-4 ${
            getPassStatus(result.score)
              ? "bg-emerald-900/50 text-emerald-300"
              : "bg-red-900/50 text-red-300"
          }`}>
            {getPassStatus(result.score) ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            {getPassStatus(result.score) ? "PASSED" : "NEEDS IMPROVEMENT"}
          </div>

          <p className="text-white/60 text-sm">{getScoreMessage(result.score)}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/5 rounded-2xl p-4">
              <div className="flex items-center justify-center gap-1.5 text-white/40 text-xs mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> Correct
              </div>
              <p className="text-2xl font-bold text-emerald-400">{result.correctAnswers}</p>
              <p className="text-xs text-white/30">of {result.totalQuestions}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4">
              <div className="flex items-center justify-center gap-1.5 text-white/40 text-xs mb-2">
                <XCircle className="w-3.5 h-3.5" /> Wrong
              </div>
              <p className="text-2xl font-bold text-red-400">
                {result.answeredQuestions - result.correctAnswers}
              </p>
              <p className="text-xs text-white/30">answered</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4">
              <div className="flex items-center justify-center gap-1.5 text-white/40 text-xs mb-2">
                <Clock className="w-3.5 h-3.5" /> Time
              </div>
              <p className="text-xl font-bold text-white">{formatTime(result.timeTaken)}</p>
              <p className="text-xs text-white/30">total</p>
            </div>
          </div>
        </motion.div>

        {/* Section Results */}
        <h2 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4">
          Section Breakdown
        </h2>

        <div className="space-y-3 mb-8">
          {result.sectionResults.map((sr) => {
            const section = exam.sections.find((s) => s.section === sr.sectionId);
            const isExpanded = expandedSection === sr.sectionId;

            return (
              <motion.div
                key={sr.sectionId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedSection(isExpanded ? null : sr.sectionId)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sm font-bold text-white/60 shrink-0">
                    {sr.sectionId}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium text-white truncate">{sr.sectionName}</p>
                    <p className="text-xs text-white/40">
                      {sr.correctAnswers}/{sr.totalQuestions} correct
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-lg font-bold ${getScoreColor(sr.score)}`}>
                      {sr.score}%
                    </span>
                    <div className="w-4 h-4 text-white/30">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Score bar */}
                <div className="px-4 pb-3">
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${getScoreBg(sr.score)} transition-all`}
                      style={{ width: `${sr.score}%` }}
                    />
                  </div>
                </div>

                {/* Expanded: Question Review */}
                {isExpanded && section && (
                  <div className="border-t border-white/5 p-4 space-y-4 max-h-96 overflow-y-auto">
                    {section.questions.map((q) => {
                      const key = `${section.section}-${q.number}`;
                      const answer = answers[key];
                      const selected = answer?.selectedAnswer;
                      const isCorrect = answer?.isCorrect;
                      const unanswered = !selected;

                      return (
                        <div key={q.number} className={`rounded-xl p-3 border ${
                          unanswered
                            ? "border-white/5 bg-white/[0.02]"
                            : isCorrect
                            ? "border-emerald-900/50 bg-emerald-950/20"
                            : "border-red-900/50 bg-red-950/20"
                        }`}>
                          <div className="flex items-start gap-2 mb-2">
                            {unanswered ? (
                              <Minus className="w-4 h-4 text-white/30 mt-0.5 shrink-0" />
                            ) : isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                            )}
                            <p className="text-sm text-white/80 leading-relaxed" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                              {q.question}
                            </p>
                          </div>
                          <div className="ml-6 space-y-1">
                            {Object.entries(q.choices).map(([k, v]) => {
                              const isSelected = selected === k;
                              const isCorrectChoice = q.correct_answer === k;
                              return (
                                <div
                                  key={k}
                                  className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 ${
                                    isCorrectChoice
                                      ? "bg-emerald-900/40 text-emerald-300"
                                      : isSelected && !isCorrectChoice
                                      ? "bg-red-900/40 text-red-300"
                                      : "text-white/30"
                                  }`}
                                  style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
                                >
                                  <span className="font-bold shrink-0">{k}.</span>
                                  <span>{v}</span>
                                  {isCorrectChoice && <CheckCircle2 className="w-3 h-3 ml-auto shrink-0" />}
                                  {isSelected && !isCorrectChoice && <XCircle className="w-3 h-3 ml-auto shrink-0" />}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/exam/${exam.level}/${exam.exam_number}`)}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 text-white/70 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Exam
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Trophy className="w-4 h-4" />
            Back to Exams
          </button>
        </div>
      </div>
    </div>
  );
}
