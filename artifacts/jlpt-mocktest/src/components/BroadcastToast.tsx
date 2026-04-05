import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Award, BookOpen } from "lucide-react";

const NAMES = [
  "Andi S.", "Budi R.", "Citra W.", "Dewi A.", "Eko P.", "Fitri N.",
  "Gilang M.", "Hana K.", "Irfan D.", "Julia T.", "Kevin L.", "Lina F.",
  "Maya S.", "Naufal H.", "Olivia R.", "Putri A.", "Rizky B.", "Sari D.",
  "Taufik N.", "Umar F.", "Vira C.", "Wulan S.", "Xander P.", "Yuni M.",
  "Zaki A.", "Ayu L.", "Bagas W.", "Cantika R.", "Dimas P.", "Elsa T.",
];

const LEVELS = ["N5", "N4", "N3", "N2", "N1"];
const PASSING_SCORE = { N5: 80, N4: 80, N3: 95, N2: 90, N1: 100 };
const TOTAL_PACKS: Record<string, number> = { N5: 1, N4: 1, N3: 1, N2: 1, N1: 1 };

type BroadcastEvent = {
  id: number;
  type: "pass" | "complete" | "start";
  name: string;
  level: string;
  pack: number;
  score?: number;
  timeAgo: string;
};

const TIME_AGOS = ["baru saja", "1 mnt lalu", "2 mnt lalu", "3 mnt lalu", "5 mnt lalu"];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateEvent(id: number): BroadcastEvent {
  const level = LEVELS[randomInt(0, LEVELS.length - 1)];
  const passing = PASSING_SCORE[level];
  const pack = randomInt(1, TOTAL_PACKS[level] || 1);
  const roll = Math.random();

  if (roll < 0.55) {
    const score = randomInt(passing, 100);
    return { id, type: "pass", name: NAMES[randomInt(0, NAMES.length - 1)], level, pack, score, timeAgo: TIME_AGOS[randomInt(0, 2)] };
  } else if (roll < 0.80) {
    const score = randomInt(42, passing - 1);
    return { id, type: "complete", name: NAMES[randomInt(0, NAMES.length - 1)], level, pack, score, timeAgo: TIME_AGOS[randomInt(0, 3)] };
  } else {
    return { id, type: "start", name: NAMES[randomInt(0, NAMES.length - 1)], level, pack, timeAgo: TIME_AGOS[randomInt(0, 4)] };
  }
}

function avatarColor(name: string) {
  const palette = [
    "bg-indigo-500", "bg-purple-500", "bg-pink-500", "bg-rose-500",
    "bg-amber-500", "bg-emerald-500", "bg-teal-500", "bg-sky-500",
  ];
  const idx = name.charCodeAt(0) % palette.length;
  return palette[idx];
}

function EventIcon({ type }: { type: BroadcastEvent["type"] }) {
  if (type === "pass") return <Award className="w-3.5 h-3.5 text-emerald-400" />;
  if (type === "complete") return <BookOpen className="w-3.5 h-3.5 text-indigo-400" />;
  return <TrendingUp className="w-3.5 h-3.5 text-amber-400" />;
}

function EventMessage({ event }: { event: BroadcastEvent }) {
  const initials = event.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const color = avatarColor(event.name);

  let message: React.ReactNode;
  if (event.type === "pass") {
    message = (
      <>
        <span className="font-semibold text-white">{event.name}</span>
        {" lulus "}
        <span className="font-semibold text-indigo-300">JLPT {event.level}</span>
        {" Pack "}
        <span className="font-semibold">{event.pack}</span>
        {" dengan skor "}
        <span className="font-semibold text-emerald-400">{event.score}%</span>
      </>
    );
  } else if (event.type === "complete") {
    message = (
      <>
        <span className="font-semibold text-white">{event.name}</span>
        {" menyelesaikan "}
        <span className="font-semibold text-indigo-300">JLPT {event.level}</span>
        {" Pack "}
        <span className="font-semibold">{event.pack}</span>
        {" skor "}
        <span className="font-semibold text-amber-400">{event.score}%</span>
      </>
    );
  } else {
    message = (
      <>
        <span className="font-semibold text-white">{event.name}</span>
        {" memulai latihan "}
        <span className="font-semibold text-indigo-300">JLPT {event.level}</span>
        {" Pack "}
        <span className="font-semibold">{event.pack}</span>
      </>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-white/80 leading-snug">{message}</p>
        <div className="flex items-center gap-1 mt-1">
          <EventIcon type={event.type} />
          <span className="text-[10px] text-white/35">{event.timeAgo}</span>
        </div>
      </div>
    </div>
  );
}

let counter = 0;

export default function BroadcastToast() {
  const [visible, setVisible] = useState<BroadcastEvent | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function scheduleNext(delay: number) {
    timeoutRef.current = setTimeout(() => {
      const event = generateEvent(++counter);
      setVisible(event);
      // Hide after 5 seconds, then schedule next
      timeoutRef.current = setTimeout(() => {
        setVisible(null);
        scheduleNext(randomInt(8000, 16000));
      }, 5000);
    }, delay);
  }

  useEffect(() => {
    // First broadcast after 1.5–3 seconds (quick to hook attention)
    scheduleNext(randomInt(1500, 3000));
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <div className="fixed bottom-6 left-4 z-40 pointer-events-none" style={{ maxWidth: 300 }}>
      <AnimatePresence>
        {visible && (
          <motion.div
            key={visible.id}
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 shadow-2xl shadow-black/40 pointer-events-auto"
          >
            <EventMessage event={visible} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
