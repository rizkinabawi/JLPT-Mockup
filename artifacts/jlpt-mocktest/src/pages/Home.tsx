import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { Exam } from "../types/exam";
import { motion } from "framer-motion";
import {
  BookOpen,
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
} from "lucide-react";

interface HomeProps {
  exams: Exam[];
}

const LEVEL_META: Record<string, {
  bg: string;
  glow: string;
  badge: string;
  badgeText: string;
  border: string;
  desc: string;
  difficulty: string;
}> = {
  N1: {
    bg: "from-rose-950/80 to-red-950/60",
    glow: "shadow-rose-900/30",
    badge: "bg-rose-800/80 text-rose-200",
    badgeText: "text-rose-300",
    border: "border-rose-900/60",
    desc: "Level tertinggi, menguasai bahasa Jepang secara mendalam",
    difficulty: "Sangat Sulit",
  },
  N2: {
    bg: "from-orange-950/80 to-amber-950/60",
    glow: "shadow-orange-900/30",
    badge: "bg-orange-800/80 text-orange-200",
    badgeText: "text-orange-300",
    border: "border-orange-900/60",
    desc: "Memahami bahasa Jepang digunakan dalam situasi sehari-hari",
    difficulty: "Sulit",
  },
  N3: {
    bg: "from-indigo-950/80 to-violet-950/60",
    glow: "shadow-indigo-900/30",
    badge: "bg-indigo-800/80 text-indigo-200",
    badgeText: "text-indigo-300",
    border: "border-indigo-900/60",
    desc: "Kemampuan memahami bahasa Jepang hingga tingkat tertentu",
    difficulty: "Menengah",
  },
  N4: {
    bg: "from-emerald-950/80 to-teal-950/60",
    glow: "shadow-emerald-900/30",
    badge: "bg-emerald-800/80 text-emerald-200",
    badgeText: "text-emerald-300",
    border: "border-emerald-900/60",
    desc: "Memahami bahasa Jepang dasar yang digunakan sehari-hari",
    difficulty: "Mudah",
  },
  N5: {
    bg: "from-teal-950/80 to-cyan-950/60",
    glow: "shadow-teal-900/30",
    badge: "bg-teal-800/80 text-teal-200",
    badgeText: "text-teal-300",
    border: "border-teal-900/60",
    desc: "Memahami bahasa Jepang dasar tingkat pemula",
    difficulty: "Pemula",
  },
};

const FEATURES = [
  {
    icon: FileText,
    title: "Soal Autentik",
    desc: "Soal-soal diambil dari ujian JLPT resmi, memastikan kamu berlatih dengan materi yang akurat.",
    color: "text-indigo-400",
    bg: "bg-indigo-950/40",
  },
  {
    icon: Target,
    title: "Analisis Hasil Detail",
    desc: "Lihat skor per-seksi dan review jawaban benar/salah setelah mengerjakan ujian.",
    color: "text-emerald-400",
    bg: "bg-emerald-950/40",
  },
  {
    icon: Clock,
    title: "Timer Real-time",
    desc: "Berlatih dengan timer seperti ujian nyata agar terbiasa mengatur waktu dengan baik.",
    color: "text-amber-400",
    bg: "bg-amber-950/40",
  },
  {
    icon: Zap,
    title: "Progress Tersimpan",
    desc: "Jawaban tersimpan otomatis, tidak perlu khawatir kehilangan progress jika keluar.",
    color: "text-purple-400",
    bg: "bg-purple-950/40",
  },
  {
    icon: Shield,
    title: "Multi-Level N1–N5",
    desc: "Tersedia soal untuk semua level JLPT dari N5 (pemula) hingga N1 (mahir).",
    color: "text-rose-400",
    bg: "bg-rose-950/40",
  },
  {
    icon: TrendingUp,
    title: "Review Mendalam",
    desc: "Pelajari setiap soal secara detail termasuk pilihan yang benar dan salah.",
    color: "text-cyan-400",
    bg: "bg-cyan-950/40",
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

export default function Home({ exams }: HomeProps) {
  const [, navigate] = useLocation();
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const examRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="min-h-screen bg-[#07070f] text-white overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#07070f]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <BookOpen className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-sm tracking-tight">NihonGo</span>
              <span className="text-indigo-400 text-sm font-bold">JLPT</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-7 text-sm text-white/50">
            <button onClick={scrollToExams} className="hover:text-white transition-colors">Mulai Ujian</button>
            <a href="#fitur" className="hover:text-white transition-colors">Fitur</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          <button
            onClick={scrollToExams}
            className="bg-indigo-600 hover:bg-indigo-500 transition-colors px-4 py-2 rounded-xl text-sm font-semibold"
          >
            Mulai Sekarang
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-indigo-950/60 border border-indigo-800/50 rounded-full px-4 py-1.5 text-xs font-medium text-indigo-300 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Platform Latihan JLPT #1 Terpercaya
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight mb-6">
              Kuasai Bahasa Jepang{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Lebih Cepat
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
              Berlatih ujian JLPT dengan soal-soal autentik untuk semua level N1–N5.
              Analisis hasil mendalam, timer real-time, dan ribuan soal siap pakai.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={scrollToExams}
                className="group flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all px-8 py-4 rounded-2xl text-base font-bold shadow-2xl shadow-indigo-900/40"
              >
                <Play className="w-5 h-5" />
                Mulai Ujian Gratis
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#fitur"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white/60 hover:text-white transition-colors border border-white/10 hover:border-white/20"
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
                className="bg-white/[0.04] border border-white/8 rounded-2xl p-4 text-center"
              >
                <stat.icon className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="fitur" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-indigo-400 text-sm font-bold tracking-widest uppercase mb-3">Kenapa Pilih Kami</p>
            <h2 className="text-4xl font-black text-white mb-4">
              Semua yang Kamu Butuhkan untuk Lulus JLPT
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
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
                className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 hover:border-white/15 transition-colors group"
              >
                <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXAM LIST ── */}
      <section ref={examRef} id="ujian" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-indigo-400 text-sm font-bold tracking-widest uppercase mb-3">Bank Soal</p>
            <h2 className="text-4xl font-black text-white mb-4">Pilih Level & Mulai Berlatih</h2>
            <p className="text-white/40 max-w-xl mx-auto">
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
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40"
                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/5"
                }`}
              >
                {level === "all" ? "Semua Level" : `JLPT ${level}`}
              </button>
            ))}
          </div>

          {/* Exams Grid */}
          {Object.keys(groupedExams).length === 0 ? (
            <div className="text-center py-20 text-white/30">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
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
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold tracking-wider ${meta.badge}`}>
                        {level}
                      </span>
                      <h3 className="text-lg font-bold text-white">JLPT {level}</h3>
                      <p className={`text-sm ${meta.badgeText} hidden sm:block`}>— {meta.desc}</p>
                      <div className="h-px flex-1 bg-white/5" />
                      <span className="text-white/25 text-xs">{levelExams.length} ujian</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {levelExams.map((exam, idx) => (
                        <motion.div
                          key={`${exam.level}-${exam.exam_number}`}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <button
                            onClick={() => navigate(`/exam/${exam.level}/${exam.exam_number}`)}
                            className={`w-full text-left bg-gradient-to-br ${meta.bg} rounded-2xl p-5 border ${meta.border} hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg ${meta.glow} group`}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${meta.badge}`}>
                                {exam.level}
                              </span>
                              <ChevronRight className={`w-4 h-4 ${meta.badgeText} opacity-0 group-hover:opacity-100 transition-opacity`} />
                            </div>

                            <h4 className="text-white font-bold text-lg mb-0.5">
                              Ujian #{exam.exam_number}
                            </h4>
                            <p className={`text-xs ${meta.badgeText} mb-4`}>
                              {exam.sections.length} seksi • {meta.difficulty}
                            </p>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-black/25 rounded-xl p-2.5">
                                <div className={`flex items-center gap-1 text-xs ${meta.badgeText} mb-1`}>
                                  <Target className="w-3 h-3" /> Soal
                                </div>
                                <p className="text-white font-bold text-sm">{exam.total_questions}</p>
                              </div>
                              <div className="bg-black/25 rounded-xl p-2.5">
                                <div className={`flex items-center gap-1 text-xs ${meta.badgeText} mb-1`}>
                                  <Clock className="w-3 h-3" /> Durasi
                                </div>
                                <p className="text-white font-bold text-sm">
                                  ~{Math.round(exam.total_questions * 1.5)}m
                                </p>
                              </div>
                            </div>

                            <div className={`mt-4 flex items-center gap-1.5 text-sm font-semibold ${meta.badgeText}`}>
                              <Play className="w-3.5 h-3.5" />
                              Mulai Ujian
                            </div>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-indigo-400 text-sm font-bold tracking-widest uppercase mb-3">Testimoni</p>
            <h2 className="text-4xl font-black text-white mb-4">Mereka Sudah Berhasil</h2>
            <p className="text-white/40">Bergabung dengan ribuan pelajar yang telah sukses lulus JLPT bersama kami.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/8 rounded-2xl p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.role}</p>
                  </div>
                  <span className="text-xs bg-emerald-900/50 text-emerald-300 px-2.5 py-1 rounded-lg font-bold">
                    {t.score}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-indigo-400 text-sm font-bold tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-4xl font-black text-white mb-4">Pertanyaan Umum</h2>
          </div>

          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-white/90 text-sm">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-white/40 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-white/50 leading-relaxed border-t border-white/5 pt-4">
                    {item.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-indigo-950/80 to-purple-950/60 border border-indigo-800/40 rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(99,102,241,0.12),transparent)]" />
            <div className="relative">
              <h2 className="text-4xl font-black text-white mb-4">
                Siap Lulus JLPT Tahun Ini?
              </h2>
              <p className="text-white/50 mb-8 max-w-lg mx-auto">
                Mulai berlatih sekarang. Gratis, tanpa daftar, langsung bisa dikerjakan.
              </p>
              <button
                onClick={scrollToExams}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition-opacity px-10 py-4 rounded-2xl text-base font-bold shadow-2xl shadow-indigo-900/40"
              >
                <Play className="w-5 h-5" />
                Mulai Ujian Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">NihonGo<span className="text-indigo-400">JLPT</span></span>
          </div>
          <p className="text-white/30 text-sm text-center">
            Platform latihan ujian JLPT untuk semua level. Gratis selamanya.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/20">
            <Shield className="w-3.5 h-3.5" />
            Soal Autentik & Terpercaya
          </div>
        </div>
      </footer>
    </div>
  );
}
