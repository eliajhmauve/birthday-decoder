import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import BirthdayInput from "@/components/BirthdayInput";
import ResultDashboard from "@/components/ResultDashboard";

const Index = () => {
  const [birthday, setBirthday] = useState<Date | null>(null);

  const handleReveal = useCallback((date: Date) => {
    setBirthday(date);
    // Confetti burst
    const end = Date.now() + 1500;
    const colors = ["#D4A017", "#E74C3C", "#8E44AD", "#F39C12", "#FF6B6B"];
    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  const handleReset = useCallback(() => {
    setBirthday(null);
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="star-field" />
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!birthday ? (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <BirthdayInput onReveal={handleReveal} />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ResultDashboard birthday={birthday} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
