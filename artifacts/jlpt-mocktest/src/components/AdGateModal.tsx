import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Volume2, VolumeX, AlertTriangle } from "lucide-react";

interface AdGateModalProps {
  level: string;
  examNumber: number;
  onUnlocked: () => void;
  onClose: () => void;
}

const AD_DURATION = 30;

export default function AdGateModal({ level, examNumber, onUnlocked, onClose }: AdGateModalProps) {
  const [countdown, setCountdown] = useState(AD_DURATION);
  const [done, setDone] = useState(false);
  const [muted, setMuted] = useState(true);
  const [confirmClose, setConfirmClose] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, []);

  const progress = ((AD_DURATION - countdown) / AD_DURATION) * 100;

  const handleCloseRequest = () => {
    if (done) {
      onClose();
    } else {
      setConfirmClose(true);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop — click closes with confirm */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={handleCloseRequest}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 22, stiffness: 300 }}
          className="relative z-10 w-full max-w-md mx-4 bg-gray-950 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/8">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded-full">
                Iklan
              </span>
              <span className="text-xs text-white/40">
                Membuka: {level} Paket #{examNumber}
              </span>
            </div>
            {/* Close button — always visible */}
            <button
              onClick={handleCloseRequest}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              title={done ? "Tutup" : "Batalkan"}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Ad Area */}
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 aspect-video flex flex-col items-center justify-center gap-4">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6">
              <div className="w-20 h-20 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center">
                <Play className="w-8 h-8 text-red-400" />
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Iklan sedang diputar</p>
                <p className="text-white/30 text-xs">Dukung NihongoGakkushu dengan menonton iklan ini</p>
              </div>
              {/* Real ad slot — replace with Google AdSense interstitial code */}
              {/* <ins className="adsbygoogle" data-ad-client="pub-XXXXXXXXXXXXXXXX" data-ad-slot="XXXXXXXXXX" data-ad-format="auto" /> */}
            </div>

            {/* Progress bar overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <motion.div
                className="h-full bg-red-500"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "linear" }}
              />
            </div>

            {/* Mute toggle */}
            <button
              onClick={() => setMuted(!muted)}
              className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center text-white/50 hover:text-white transition-colors"
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Countdown badge */}
            {!done && (
              <div className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-black/60 flex items-center justify-center">
                <span className="text-white font-bold text-sm tabular-nums">{countdown}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-4 bg-black/20">
            {done ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <p className="text-center text-sm text-white/70">
                  Terima kasih! Paket <span className="text-white font-medium">{level} #{examNumber}</span> sudah terbuka.
                </p>
                <button
                  onClick={onUnlocked}
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-colors"
                >
                  Mulai Ujian Sekarang →
                </button>
              </motion.div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-white/40">
                  <span>Menonton iklan...</span>
                  <span className="tabular-nums">{AD_DURATION - countdown}/{AD_DURATION}d</span>
                </div>
                <div className="w-full h-2 bg-white/8 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "linear" }}
                  />
                </div>
                <p className="text-center text-xs text-white/30 pt-1">
                  Tonton hingga selesai untuk membuka paket ini secara gratis
                </p>
              </div>
            )}
          </div>

          {/* ── Confirm-cancel overlay ── */}
          <AnimatePresence>
            {confirmClose && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-2xl"
              >
                <motion.div
                  initial={{ scale: 0.88, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.88, opacity: 0 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  className="mx-6 bg-gray-900 border border-white/10 rounded-2xl p-6 text-center shadow-2xl"
                >
                  <div className="w-12 h-12 rounded-2xl bg-yellow-500/15 border border-yellow-400/20 flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h3 className="text-white font-bold text-base mb-1">Batalkan iklan?</h3>
                  <p className="text-white/50 text-xs leading-relaxed mb-5">
                    Jika kamu tutup sekarang, paket <span className="text-white/70">{level} #{examNumber}</span> tidak akan terbuka.<br />
                    Kamu perlu menonton iklan dari awal lagi.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setConfirmClose(false)}
                      className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-colors"
                    >
                      Tetap Tonton
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 py-2.5 rounded-xl bg-white/8 hover:bg-white/15 text-white/60 hover:text-white text-sm font-medium transition-colors"
                    >
                      Tutup Saja
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
