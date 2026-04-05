import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { Exam } from "../types/exam";
import { motion } from "framer-motion";
import { useTheme } from "../lib/themeContext";
import { isExamUnlocked, isFreeExam, unlockExam } from "../lib/adGate";
import AdGateModal from "../components/AdGateModal";
import { LogoFull, LogoMark } from "../components/NihonGoLogo";
import {
  Play,
  ChevronRight,
  Target,
  Clock,
  Layers,
  Award,
  CheckCircle2,
  Star,
  Users,
  TrendingUp,
  Shield,
  Zap,
  FileText,
  ChevronDown,
  Sun,
  Moon,
  Lock,
  Tv2,
} from "lucide-react";

interface HomeProps {
  exams: Exam[];
}

const LEVEL_META: Record<string, {
  bg: string;
  bgLight: string;
  glow: string;
  badge: string;
  badgeLight: string;
  badgeText: string;
  badgeTextLight: string;
  border: string;
  borderLight: string;
  desc: string;
  difficulty: string;
}> = {
  N1: {
    bg: "dark:from-rose-950/80 dark:to-red-950/60",
    bgLight: "from-rose-50 to-red-50",
    glow: "shadow-rose-900/30",
    badge: "dark:bg-rose-800/80 dark:text-rose-200",
    badgeLight: "bg-rose-100 text-rose-700",
    badgeText: "dark:text-rose-300",
    badgeTextLight: "text-rose-600",
    border: "dark:border-rose-900/60",
    borderLight: "border-rose-200",
    desc: "Level tertinggi, menguasai bahasa Jepang secara mendalam",
    difficulty: "Sangat Sulit",
  },
  N2: {
    bg: "dark:from-orange-950/80 dark:to-amber-950/60",
    bgLight: "from-orange-50 to-amber-50",
    glow: "shadow-orange-900/30",
    badge: "dark:bg-orange-800/80 dark:text-orange-200",
    badgeLight: "bg-orange-100 text-orange-700",
    badgeText: "dark:text-orange-300",
    badgeTextLight: "text-orange-600",
    border: "dark:border-orange-900/60",
    borderLight: "border-orange-200",
    desc: "Memahami bahasa Jepang digunakan dalam situasi sehari-hari",
    difficulty: "Sulit",
  },
  N3: {
    bg: "dark:from-indigo-950/80 dark:to-violet-950/60",
    bgLight: "from-indigo-50 to-violet-50",
    glow: "shadow-indigo-900/30",
    badge: "dark:bg-indigo-800/80 dark:text-indigo-200",
    badgeLight: "bg-indigo-100 text-indigo-700",
    badgeText: "dark:text-indigo-300",
    badgeTextLight: "text-indigo-600",
    border: "dark:border-indigo-900/60",
    borderLight: "border-indigo-200",
    desc: "Kemampuan memahami bahasa Jepang hingga tingkat tertentu",
    difficulty: "Menengah",
  },
  N4: {
    bg: "dark:from-emerald-950/80 dark:to-teal-950/60",
    bgLight: "from-emerald-50 to-teal-50",
    glow: "shadow-emerald-900/30",
    badge: "dark:bg-emerald-800/80 dark:text-emerald-200",
    badgeLight: "bg-emerald-100 text-emerald-700",
    badgeText: "dark:text-emerald-300",
    badgeTextLight: "text-emerald-600",
    border: "dark:border-emerald-900/60",
    borderLight: "border-emerald-200",
    desc: "Memahami bahasa Jepang dasar yang digunakan sehari-hari",
    difficulty: "Mudah",
  },
  N5: {
    bg: "dark:from-teal-950/80 dark:to-cyan-950/60",
    bgLight: "from-teal-50 to-cyan-50",
    glow: "shadow-teal-900/30",
    badge: "dark:bg-teal-800/80 dark:text-teal-200",
    badgeLight: "bg-teal-100 text-teal-700",
    badgeText: "dark:text-teal-300",
    badgeTextLight: "text-teal-600",
    border: "dark:border-teal-900/60",
    borderLight: "border-teal-200",
    desc: "Memahami bahasa Jepang dasar tingkat pemula",
    difficulty: "Pemula",
  },
};

const FEATURES = [
  {
    icon: FileText,
    title: "Soal Autentik",
    desc: "Soal-soal diadaptasi dari ujian JLPT resmi, memastikan kamu berlatih dengan materi yang akurat.",
    color: "text-indigo-500",
    bg: "bg-indigo-100 dark:bg-indigo-950/40",
  },
  {
    icon: Target,
    title: "Analisis Hasil Detail",
    desc: "Lihat skor per-seksi dan review jawaban benar/salah setelah mengerjakan ujian.",
    color: "text-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-950/40",
  },
  {
    icon: Clock,
    title: "Timer Real-time",
    desc: "Berlatih dengan timer seperti ujian nyata agar terbiasa mengatur waktu dengan baik.",
    color: "text-amber-600",
    bg: "bg-amber-100 dark:bg-amber-950/40",
  },
  {
    icon: Zap,
    title: "Progress Tersimpan",
    desc: "Jawaban tersimpan otomatis, tidak perlu khawatir kehilangan progress jika keluar.",
    color: "text-purple-600",
    bg: "bg-purple-100 dark:bg-purple-950/40",
  },
  {
    icon: Shield,
    title: "Multi-Level N1–N5",
    desc: "Tersedia soal untuk semua level JLPT dari N5 (pemula) hingga N1 (mahir).",
    color: "text-rose-600",
    bg: "bg-rose-100 dark:bg-rose-950/40",
  },
  {
    icon: TrendingUp,
    title: "Review Mendalam",
    desc: "Pelajari setiap soal secara detail termasuk pilihan yang benar dan salah.",
    color: "text-cyan-600",
    bg: "bg-cyan-100 dark:bg-cyan-950/40",
  },
];

const STATS = [
  { value: "10,000+", label: "Pengguna Aktif", icon: Users },
  { value: "99%", label: "Akurasi Soal", icon: CheckCircle2 },
  { value: "N1–N5", label: "Semua Level", icon: Award },
  { value: "Gratis", label: "Selamanya", icon: Star },
];

const TESTIMONIALS = [
  {
    name: "Rizki Pratama",
    role: "Mahasiswa Sastra Jepang",
    text: "Platform ini sangat membantu persiapan ujian JLPT N3 saya. Interface-nya bersih dan soalnya lengkap!",
    score: "N3 — 172/180",
  },
  {
    name: "Siti Nurhaliza",
    role: "Karyawan Perusahaan Jepang",
    text: "Berhasil lulus N2 setelah 3 bulan latihan rutin di sini. Fitur review jawaban sangat membantu identifikasi kelemahan.",
    score: "N2 — 145/180",
  },
  {
    name: "Budi Santoso",
    role: "Guru Bahasa Jepang",
    text: "Saya rekomendasikan platform ini ke semua murid saya. Kualitas soalnya setara dengan ujian resmi JLPT.",
    score: "N1 — 160/180",
  },
];

const FAQ = [
  {
    q: "Apakah soal di sini sama dengan ujian JLPT resmi?",
    a: "Soal-soal disini diadaptasi dari ujian JLPT resmi dan mencakup semua format pertanyaan yang muncul dalam ujian sebenarnya, termasuk kosakata, tata bahasa, dan pemahaman bacaan.",
  },
  {
    q: "Berapa lama waktu yang disarankan untuk berlatih per hari?",
    a: "Kami merekomendasikan minimal 30-60 menit per hari untuk hasil optimal. Konsistensi jauh lebih penting daripada durasi belajar yang panjang namun tidak rutin.",
  },
  {
    q: "Apakah ada batasan jumlah percobaan ujian?",
    a: "Tidak ada batasan! Kamu bisa mengerjakan ujian yang sama berkali-kali untuk mengukur peningkatan kemampuanmu dari waktu ke waktu.",
  },
  {
    q: "Level mana yang cocok untuk pemula?",
    a: "Untuk pemula, disarankan mulai dari level N5 atau N4. Level tersebut mencakup kosakata dan tata bahasa dasar yang menjadi fondasi untuk level yang lebih tinggi.",
  },
];

function BannerAd({ slot, className = "" }: { slot: string; className?: string }) {
  return (
    <div className={`w-full flex items-center justify-center ${className}`}>
      <div className="w-full max-w-4xl mx-auto px-6">
        <div className="w-full h-[90px] bg-gray-100 dark:bg-white/5 border border-dashed border-gray-300 dark:border-white/10 rounded-xl flex items-center justify-center">
          <span className="text-xs text-gray-400 dark:text-white/25 select-none">
            Advertisement — {slot}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Home({ exams }: HomeProps) {
  const [, navigate] = useLocation();
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [pendingExam, setPendingExam] = useState<{ level: string; examNumber: number } | null>(null);
  const examRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  const levels = ["all", ...Array.from(new Set(exams.map((e) => e.level))).sort()];

  const filteredExams = selectedLevel === "all"
    ? exams
    : exams.filter((e) => e.level === selectedLevel);

  const groupedExams = filteredExams.reduce<Record<string, Exam[]>>((acc, exam) => {
    if (!acc[exam.level]) acc[exam.level] = [];
    acc[exam.level].push(exam);
    return acc;
  }, {});

  const totalQuestions = exams.reduce((s, e) => s + e.total_questions, 0);
  const totalLevels = new Set(exams.map((e) => e.level)).size;

  const scrollToExams = () => {
    examRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleExamClick = (level: string, examNumber: number) => {
    if (isExamUnlocked(level, examNumber)) {
      navigate(`/exam/${level}/${examNumber}`);
    } else {
      setPendingExam({ level, examNumber });
    }
  };

  const handleAdWatched = () => {
    if (!pendingExam) return;
    unlockExam(pendingExam.level, pendingExam.examNumber);
    navigate(`/exam/${pendingExam.level}/${pendingExam.examNumber}`);
    setPendingExam(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#07070f] text-gray-900 dark:text-white overflow-x-hidden transition-colors duration-300">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#07070f]/90 backdrop-blur-xl border-b border-gray-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <LogoFull size="md" />

          <div className="hidden md:flex items-center gap-7 text-sm text-gray-500 dark:text-white/50">
            <button onClick={scrollToExams} className="hover:text-gray-900 dark:hover:text-white transition-colors">Mulai Ujian</button>
            <a href="#fitur" className="hover:text-gray-900 dark:hover:text-white transition-colors">Fitur</a>
            <a href="#faq" className="hover:text-gray-900 dark:hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/8 border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/15 transition-colors"
              aria-label="Toggle tema"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>
            <button
              onClick={scrollToExams}
              className="bg-indigo-600 hover:bg-indigo-500 transition-colors px-4 py-2 rounded-xl text-sm font-semibold text-white"
            >
              Mulai Sekarang
            </button>
          </div>
        </div>
      </nav>

      {/* ── TOP BANNER AD ── */}
      <div className="pt-16">
        <BannerAd slot="banner-top" className="py-3" />
      </div>

      {/* ── HERO ── */}
      <section className="relative pt-10 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.10),transparent)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/50 rounded-full px-4 py-1.5 text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              Platform Latihan JLPT #1 Terpercaya
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white leading-tight tracking-tight mb-6">
              Kuasai Bahasa Jepang{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Lebih Cepat
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 dark:text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
              Berlatih ujian JLPT dengan soal-soal autentik untuk semua level N1–N5.
              Analisis hasil mendalam, timer real-time, dan ribuan soal siap pakai.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={scrollToExams}
                className="group flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all px-8 py-4 rounded-2xl text-base font-bold text-white shadow-xl shadow-indigo-500/25"
              >
                <Play className="w-5 h-5" />
                Mulai Ujian Gratis
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#fitur"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/8 rounded-2xl p-4 text-center shadow-sm"
              >
                <stat.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                <p className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="fitur" className="py-24 px-6 bg-white dark:bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-indigo-600 dark:text-indigo-400 text-sm font-bold tracking-widest uppercase mb-3">Kenapa Pilih Kami</p>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              Semua yang Kamu Butuhkan untuk Lulus JLPT
            </h2>
            <p className="text-gray-400 dark:text-white/40 max-w-xl mx-auto">
              Dirancang khusus untuk pelajar bahasa Jepang yang ingin lulus JLPT dengan nilai terbaik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/8 rounded-2xl p-6 hover:border-indigo-300 dark:hover:border-white/15 transition-colors group"
              >
                <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-white/40 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXAM LIST ── */}
      <section ref={examRef} id="ujian" className="py-24 px-6 bg-gray-100/50 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-indigo-600 dark:text-indigo-400 text-sm font-bold tracking-widest uppercase mb-3">Bank Soal</p>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Pilih Level & Mulai Berlatih</h2>
            <p className="text-gray-500 dark:text-white/40 max-w-xl mx-auto">
              Tersedia {exams.length} paket ujian dengan {totalQuestions.toLocaleString()} soal untuk {totalLevels} level berbeda.
            </p>
          </div>

          {/* Level Filter */}
          <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  selectedLevel === level
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                    : "bg-white dark:bg-white/5 text-gray-500 dark:text-white/50 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-800 dark:hover:text-white/80 border border-gray-200 dark:border-white/5"
                }`}
              >
                {level === "all" ? "Semua Level" : `JLPT ${level}`}
              </button>
            ))}
          </div>

          {/* Exams Grid */}
          {Object.keys(groupedExams).length === 0 ? (
            <div className="text-center py-20 text-gray-400 dark:text-white/30 flex flex-col items-center gap-4">
              <LogoMark size="lg" />
              <p>Memuat soal ujian...</p>
            </div>
          ) : (
            Object.entries(groupedExams)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([level, levelExams]) => {
                const meta = LEVEL_META[level] || LEVEL_META["N3"];
                return (
                  <div key={level} className="mb-12">
                    <div className="flex items-center gap-3 mb-5">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold tracking-wider ${meta.badgeLight} ${meta.badge}`}>
                        {level}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">JLPT {level}</h3>
                      <p className={`text-sm hidden sm:block ${meta.badgeTextLight} ${meta.badgeText}`}>— {meta.desc}</p>
                      <div className="h-px flex-1 bg-gray-200 dark:bg-white/5" />
                      <span className="text-gray-400 dark:text-white/25 text-xs">{levelExams.length} ujian</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {levelExams.map((exam, idx) => {
                        const free = isFreeExam(exam.exam_number);
                        const unlocked = isExamUnlocked(exam.level, exam.exam_number);
                        return (
                          <motion.div
                            key={`${exam.level}-${exam.exam_number}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <button
                              onClick={() => handleExamClick(exam.level, exam.exam_number)}
                              className={`w-full text-left bg-gradient-to-br ${meta.bgLight} ${meta.bg} rounded-2xl p-5 border ${meta.borderLight} ${meta.border} hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md group relative overflow-hidden`}
                            >
                              {/* Lock overlay for locked exams */}
                              {!free && !unlocked && (
                                <div className="absolute inset-0 bg-black/30 dark:bg-black/50 rounded-2xl backdrop-blur-[1px] z-10 flex flex-col items-center justify-center gap-2">
                                  <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center">
                                    <Lock className="w-5 h-5 text-white/80" />
                                  </div>
                                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-400/30">
                                    <Tv2 className="w-3 h-3 text-yellow-400" />
                                    <span className="text-yellow-400 text-xs font-bold">Tonton Iklan</span>
                                  </div>
                                </div>
                              )}

                              <div className="flex items-start justify-between mb-4">
                                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${meta.badgeLight} ${meta.badge}`}>
                                  {exam.level}
                                </span>
                                {/* FREE / UNLOCKED / LOCKED badge */}
                                {free ? (
                                  <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-emerald-100 dark:bg-emerald-400/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-400/20">
                                    GRATIS
                                  </span>
                                ) : unlocked ? (
                                  <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-indigo-100 dark:bg-indigo-400/15 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-400/20">
                                    ✓ Terbuka
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-yellow-100 dark:bg-yellow-400/10 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-400/20">
                                    🔒 Iklan
                                  </span>
                                )}
                              </div>

                              <h4 className="font-bold text-lg mb-0.5 text-gray-900 dark:text-white">
                                Ujian #{exam.exam_number}
                              </h4>
                              <p className={`text-xs mb-4 ${meta.badgeTextLight} ${meta.badgeText}`}>
                                {exam.sections.length} seksi • {meta.difficulty}
                              </p>

                              <div className="grid grid-cols-2 gap-2">
                                <div className="bg-white/60 dark:bg-black/25 rounded-xl p-2.5">
                                  <div className={`flex items-center gap-1 text-xs mb-1 ${meta.badgeTextLight} ${meta.badgeText}`}>
                                    <Target className="w-3 h-3" /> Soal
                                  </div>
                                  <p className="font-bold text-sm text-gray-900 dark:text-white">{exam.total_questions}</p>
                                </div>
                                <div className="bg-white/60 dark:bg-black/25 rounded-xl p-2.5">
                                  <div className={`flex items-center gap-1 text-xs mb-1 ${meta.badgeTextLight} ${meta.badgeText}`}>
                                    <Clock className="w-3 h-3" /> Durasi
                                  </div>
                                  <p className="font-bold text-sm text-gray-900 dark:text-white">
                                    ~{Math.round(exam.total_questions * 1.5)}m
                                  </p>
                                </div>
                              </div>

                              <div className={`mt-4 flex items-center gap-1.5 text-sm font-semibold ${meta.badgeTextLight} ${meta.badgeText}`}>
                                {free || unlocked ? (
                                  <>
                                    <Play className="w-3.5 h-3.5" />
                                    Mulai Ujian
                                  </>
                                ) : (
                                  <>
                                    <Tv2 className="w-3.5 h-3.5" />
                                    Tonton Iklan untuk Buka
                                  </>
                                )}
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
        </div>
      </section>

      {/* ── MID BANNER AD ── */}
      <BannerAd slot="banner-mid" className="py-6 bg-white dark:bg-transparent" />

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 bg-white dark:bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-indigo-600 dark:text-indigo-400 text-sm font-bold tracking-widest uppercase mb-3">Testimoni</p>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Mereka Sudah Berhasil</h2>
            <p className="text-gray-400 dark:text-white/40">Bergabung dengan ribuan pelajar yang telah sukses lulus JLPT bersama kami.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/8 rounded-2xl p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-white/70 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{t.name}</p>
                    <p className="text-gray-400 dark:text-white/40 text-xs">{t.role}</p>
                  </div>
                  <span className="text-xs bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-lg font-bold">
                    {t.score}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 px-6 bg-gray-100/50 dark:bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-indigo-600 dark:text-indigo-400 text-sm font-bold tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Pertanyaan Umum</h2>
          </div>

          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/8 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-gray-800 dark:text-white/90 text-sm">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 dark:text-white/40 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-gray-500 dark:text-white/50 leading-relaxed border-t border-gray-100 dark:border-white/5 pt-4">
                    {item.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-6 bg-white dark:bg-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/80 dark:to-purple-950/60 border border-indigo-200 dark:border-indigo-800/40 rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(99,102,241,0.08),transparent)]" />
            <div className="relative">
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                Siap Lulus JLPT Tahun Ini?
              </h2>
              <p className="text-gray-500 dark:text-white/50 mb-8 max-w-lg mx-auto">
                Mulai berlatih sekarang. Gratis, tanpa daftar, langsung bisa dikerjakan.
              </p>
              <button
                onClick={scrollToExams}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition-opacity px-10 py-4 rounded-2xl text-base font-bold text-white shadow-xl shadow-indigo-500/25"
              >
                <Play className="w-5 h-5" />
                Mulai Ujian Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM BANNER AD ── */}
      <BannerAd slot="banner-bottom" className="pb-6 bg-white dark:bg-transparent" />

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-200 dark:border-white/5 py-10 px-6 bg-white dark:bg-transparent">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <LogoFull size="sm" />
          <p className="text-gray-400 dark:text-white/30 text-sm text-center">
            Platform latihan ujian JLPT untuk semua level. Gratis selamanya.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-300 dark:text-white/20">
            <Shield className="w-3.5 h-3.5" />
            Soal Autentik & Terpercaya
          </div>
        </div>
      </footer>

      {/* Ad Gate Modal */}
      {pendingExam && (
        <AdGateModal
          level={pendingExam.level}
          examNumber={pendingExam.examNumber}
          onUnlocked={handleAdWatched}
          onClose={() => setPendingExam(null)}
        />
      )}
    </div>
  );
}
