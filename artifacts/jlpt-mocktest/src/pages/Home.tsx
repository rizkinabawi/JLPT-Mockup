import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Exam } from "../types/exam";
import { saveExams, loadExams } from "../lib/examStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Upload,
  Play,
  ChevronRight,
  FileJson,
  Award,
  Clock,
  Target,
  Layers,
  PlusCircle,
  Info,
  X,
  CheckCircle2,
} from "lucide-react";

interface HomeProps {
  exams: Exam[];
  onExamsLoaded: (exams: Exam[]) => void;
}

const LEVEL_COLORS: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  N1: { bg: "from-red-950 to-red-900", text: "text-red-300", border: "border-red-800", badge: "bg-red-800/80 text-red-200" },
  N2: { bg: "from-orange-950 to-orange-900", text: "text-orange-300", border: "border-orange-800", badge: "bg-orange-800/80 text-orange-200" },
  N3: { bg: "from-indigo-950 to-indigo-900", text: "text-indigo-300", border: "border-indigo-800", badge: "bg-indigo-800/80 text-indigo-200" },
  N4: { bg: "from-emerald-950 to-emerald-900", text: "text-emerald-300", border: "border-emerald-800", badge: "bg-emerald-800/80 text-emerald-200" },
  N5: { bg: "from-teal-950 to-teal-900", text: "text-teal-300", border: "border-teal-800", badge: "bg-teal-800/80 text-teal-200" },
};

export default function Home({ exams, onExamsLoaded }: HomeProps) {
  const [, navigate] = useLocation();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [uploadMessage, setUploadMessage] = useState("");
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  const levels = ["all", ...Array.from(new Set(exams.map((e) => e.level))).sort()];

  const filteredExams = selectedLevel === "all"
    ? exams
    : exams.filter((e) => e.level === selectedLevel);

  const handleFileUpload = async (file: File) => {
    if (!file.name.endsWith(".json")) {
      setUploadStatus("error");
      setUploadMessage("Please upload a valid JSON file.");
      return;
    }

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const newExams: Exam[] = Array.isArray(parsed) ? parsed : [parsed];

      if (!newExams.every((e) => e.level && e.sections && Array.isArray(e.sections))) {
        throw new Error("Invalid exam format");
      }

      const merged = [...exams];
      newExams.forEach((ne) => {
        const exists = merged.findIndex(
          (e) => e.level === ne.level && e.exam_number === ne.exam_number
        );
        if (exists >= 0) {
          merged[exists] = ne;
        } else {
          merged.push(ne);
        }
      });

      saveExams(merged);
      onExamsLoaded(merged);
      setUploadStatus("success");
      setUploadMessage(`Added ${newExams.length} exam(s) successfully!`);
      setTimeout(() => {
        setUploadStatus("idle");
        setShowUploadPanel(false);
      }, 2500);
    } catch {
      setUploadStatus("error");
      setUploadMessage("Invalid JSON format. Please check your file.");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
    e.target.value = "";
  };

  const getLevelColor = (level: string) => {
    return LEVEL_COLORS[level] || LEVEL_COLORS["N3"];
  };

  const groupedExams = filteredExams.reduce<Record<string, Exam[]>>((acc, exam) => {
    if (!acc[exam.level]) acc[exam.level] = [];
    acc[exam.level].push(exam);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero Header */}
      <header className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-[#0a0a0f] to-purple-950/20" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-900/50">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">JLPT Practice</h1>
                <p className="text-sm text-white/40 mt-0.5">Japanese Language Proficiency Test</p>
              </div>
            </div>
            <button
              onClick={() => setShowUploadPanel(!showUploadPanel)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-colors px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-indigo-900/30"
            >
              <PlusCircle className="w-4 h-4" />
              Add Exam JSON
            </button>
          </div>

          {/* Stats Row */}
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 text-white/40 text-xs mb-1">
                <Layers className="w-3.5 h-3.5" /> Exams
              </div>
              <p className="text-2xl font-bold text-white">{exams.length}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 text-white/40 text-xs mb-1">
                <Target className="w-3.5 h-3.5" /> Questions
              </div>
              <p className="text-2xl font-bold text-white">
                {exams.reduce((s, e) => s + e.total_questions, 0)}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 text-white/40 text-xs mb-1">
                <Award className="w-3.5 h-3.5" /> Levels
              </div>
              <p className="text-2xl font-bold text-white">
                {new Set(exams.map((e) => e.level)).size}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Upload Panel */}
      <AnimatePresence>
        {showUploadPanel && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-white/5 bg-indigo-950/20"
          >
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Upload className="w-5 h-5 text-indigo-400" />
                  Add Exam Questions via JSON
                </h2>
                <button
                  onClick={() => setShowUploadPanel(false)}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  isDragging
                    ? "border-indigo-400 bg-indigo-950/40"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <FileJson className={`w-10 h-10 mx-auto mb-3 ${isDragging ? "text-indigo-400" : "text-white/30"}`} />
                <p className="text-white/70 font-medium mb-1">
                  Drag & drop your JSON file here
                </p>
                <p className="text-white/30 text-sm mb-4">
                  or click to browse your files
                </p>
                <label className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 transition-colors px-4 py-2 rounded-xl text-sm font-medium cursor-pointer">
                  <Upload className="w-4 h-4" />
                  Browse Files
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                </label>

                {uploadStatus !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 flex items-center justify-center gap-2 text-sm font-medium ${
                      uploadStatus === "success" ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {uploadStatus === "success" ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                    {uploadMessage}
                  </motion.div>
                )}
              </div>

              <div className="mt-4 flex items-start gap-2 text-xs text-white/30 bg-white/5 rounded-xl p-3">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-indigo-400/60" />
                <p>
                  JSON must follow the JLPT exam format with <code className="text-indigo-400">level</code>,{" "}
                  <code className="text-indigo-400">exam_number</code>, <code className="text-indigo-400">sections</code>, and{" "}
                  <code className="text-indigo-400">questions</code> fields. Duplicate exams (same level + number) will be replaced.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Level Filter */}
        {exams.length > 0 && (
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedLevel === level
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/30"
                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"
                }`}
              >
                {level === "all" ? "All Levels" : level}
              </button>
            ))}
          </div>
        )}

        {/* Exam Grid */}
        {exams.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-900/60 to-purple-900/40 flex items-center justify-center mb-6 border border-white/10">
              <BookOpen className="w-10 h-10 text-indigo-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Loading Exams...</h2>
            <p className="text-white/40 text-sm max-w-sm">
              Please wait while we load the exam data.
            </p>
          </motion.div>
        ) : (
          Object.entries(groupedExams).map(([level, levelExams]) => {
            const colors = getLevelColor(level);
            return (
              <div key={level} className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`px-3 py-1 rounded-lg text-xs font-bold tracking-wider ${colors.badge}`}>
                    {level}
                  </div>
                  <h2 className="text-lg font-semibold text-white/80">
                    JLPT {level}
                  </h2>
                  <div className="h-px flex-1 bg-white/5" />
                  <span className="text-white/30 text-sm">{levelExams.length} exam{levelExams.length !== 1 ? "s" : ""}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {levelExams.map((exam, idx) => {
                    const colors = getLevelColor(exam.level);
                    return (
                      <motion.div
                        key={`${exam.level}-${exam.exam_number}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <button
                          onClick={() =>
                            navigate(`/exam/${exam.level}/${exam.exam_number}`)
                          }
                          className={`w-full text-left bg-gradient-to-br ${colors.bg} rounded-2xl p-5 border ${colors.border} hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg group`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wider ${colors.badge}`}>
                              {exam.level}
                            </div>
                            <ChevronRight className={`w-4 h-4 ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity`} />
                          </div>

                          <h3 className="text-white font-bold text-lg mb-1">
                            Exam #{exam.exam_number}
                          </h3>
                          <p className={`text-sm ${colors.text} mb-4`}>
                            {exam.sections.length} sections
                          </p>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-black/20 rounded-xl p-2.5">
                              <div className="flex items-center gap-1.5 mb-1">
                                <Target className={`w-3 h-3 ${colors.text}`} />
                                <span className="text-white/40 text-xs">Questions</span>
                              </div>
                              <p className="text-white font-bold text-sm">{exam.total_questions}</p>
                            </div>
                            <div className="bg-black/20 rounded-xl p-2.5">
                              <div className="flex items-center gap-1.5 mb-1">
                                <Clock className={`w-3 h-3 ${colors.text}`} />
                                <span className="text-white/40 text-xs">Est. Time</span>
                              </div>
                              <p className="text-white font-bold text-sm">
                                ~{Math.round(exam.total_questions * 1.5)} min
                              </p>
                            </div>
                          </div>

                          <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${colors.text}`}>
                            <Play className="w-4 h-4" />
                            Start Exam
                          </div>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </main>
    </div>
  );
}
