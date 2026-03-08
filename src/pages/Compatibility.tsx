import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Sparkles, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { calculateCompatibility, CompatibilityResult } from "@/data/compatibility";
import confetti from "canvas-confetti";

const cardVariant = (i: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { delay: 0.15 * i, duration: 0.5, ease: "easeOut" as const } },
});

const Compatibility = () => {
  const navigate = useNavigate();
  const [dateA, setDateA] = useState<Date>();
  const [dateB, setDateB] = useState<Date>();
  const [result, setResult] = useState<CompatibilityResult | null>(null);

  const handleAnalyze = useCallback(() => {
    if (!dateA || !dateB) return;
    const r = calculateCompatibility(
      dateA.getFullYear(), dateA.getMonth() + 1, dateA.getDate(),
      dateB.getFullYear(), dateB.getMonth() + 1, dateB.getDate(),
    );
    setResult(r);

    // Heart confetti
    const colors = ["#FF6B6B", "#D4A017", "#E74C3C", "#F39C12", "#FF69B4"];
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 }, colors });
  }, [dateA, dateB]);

  const handleReset = () => setResult(null);

  const scoreColor = (score: number) => {
    if (score >= 85) return "text-green-400";
    if (score >= 70) return "text-primary";
    if (score >= 55) return "text-yellow-400";
    return "text-accent";
  };

  return (
    <div className="relative min-h-screen">
      <div className="star-field" />
      <div className="relative z-10 mx-auto max-w-2xl px-4 py-8 pb-20">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> 返回首頁
          </Button>
        </div>

        {/* Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mb-4 text-5xl"
          >
            💕
          </motion.div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">
            <span className="gradient-text-golden">生日配對分析</span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">輸入兩個人的生日，解鎖你們的命運密碼</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Person A */}
              <motion.div {...cardVariant(1)} className="card-glow rounded-xl bg-card/80 p-6 backdrop-blur-sm">
                <h2 className="font-display mb-4 text-base font-semibold text-primary">👤 第一個人的生日</h2>
                <DatePickerField date={dateA} onSelect={setDateA} />
              </motion.div>

              {/* Heart divider */}
              <div className="flex justify-center">
                <Heart className="h-6 w-6 text-accent animate-glow-pulse" fill="currentColor" />
              </div>

              {/* Person B */}
              <motion.div {...cardVariant(2)} className="card-glow-accent rounded-xl bg-card/80 p-6 backdrop-blur-sm">
                <h2 className="font-display mb-4 text-base font-semibold text-accent">👤 第二個人的生日</h2>
                <DatePickerField date={dateB} onSelect={setDateB} />
              </motion.div>

              {/* Analyze button */}
              <motion.div {...cardVariant(3)} className="text-center pt-2">
                <Button
                  onClick={handleAnalyze}
                  disabled={!dateA || !dateB}
                  className="w-full max-w-[300px] bg-primary py-6 text-base font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_30px_hsl(38_90%_55%/0.4)] disabled:opacity-40"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  分析配對指數
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              {/* Score circle */}
              <motion.div {...cardVariant(0)} className="text-center">
                <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full border-4 border-primary/30 bg-card/80 backdrop-blur-sm"
                  style={{ boxShadow: "0 0 40px hsl(38 90% 55% / 0.2)" }}
                >
                  <div>
                    <span className={cn("font-display text-5xl font-bold", scoreColor(result.overallScore))}>
                      {result.overallScore}
                    </span>
                    <p className="text-xs text-muted-foreground">配對指數</p>
                  </div>
                </div>
              </motion.div>

              {/* Zodiac pair */}
              <motion.div {...cardVariant(1)} className="card-glow rounded-xl bg-card/80 p-6 backdrop-blur-sm text-center">
                <div className="flex items-center justify-center gap-4">
                  <div>
                    <span className="text-3xl">{result.zodiacA.symbol}</span>
                    <p className="font-display mt-1 text-sm font-semibold">{result.zodiacA.name}</p>
                    <p className="text-xs text-muted-foreground">靈數 {result.lifePathA}</p>
                  </div>
                  <Heart className="h-6 w-6 text-accent" fill="currentColor" />
                  <div>
                    <span className="text-3xl">{result.zodiacB.symbol}</span>
                    <p className="font-display mt-1 text-sm font-semibold">{result.zodiacB.name}</p>
                    <p className="text-xs text-muted-foreground">靈數 {result.lifePathB}</p>
                  </div>
                </div>
              </motion.div>

              {/* Summary */}
              <motion.div {...cardVariant(2)} className="card-glow-accent rounded-xl bg-card/80 p-6 backdrop-blur-sm">
                <h2 className="font-display mb-3 text-lg font-semibold text-accent">💫 配對總評</h2>
                <p className="leading-relaxed text-foreground/90">{result.summary}</p>
              </motion.div>

              {/* Score breakdown */}
              <motion.div {...cardVariant(3)} className="card-glow rounded-xl bg-card/80 p-6 backdrop-blur-sm">
                <h2 className="font-display mb-4 text-lg font-semibold text-primary">📊 各維度分數</h2>
                <div className="space-y-4">
                  <ScoreBar label="星座相容度" score={result.zodiacScore} />
                  <ScoreBar label="靈數契合度" score={result.lifePathScore} />
                  <ScoreBar label="元素和諧度" score={result.elementScore} />
                </div>
              </motion.div>

              {/* Strengths */}
              <motion.div {...cardVariant(4)} className="card-glow rounded-xl bg-card/80 p-6 backdrop-blur-sm">
                <h2 className="font-display mb-3 text-lg font-semibold text-primary">✨ 你們的優勢</h2>
                <ul className="space-y-2">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                      <span className="mt-0.5 text-primary">•</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Challenges */}
              <motion.div {...cardVariant(5)} className="card-glow-accent rounded-xl bg-card/80 p-6 backdrop-blur-sm">
                <h2 className="font-display mb-3 text-lg font-semibold text-accent">⚡ 可能的挑戰</h2>
                <ul className="space-y-2">
                  {result.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                      <span className="mt-0.5 text-accent">•</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Advice */}
              <motion.div {...cardVariant(6)} className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 via-card/80 to-accent/5 p-6 backdrop-blur-sm">
                <h2 className="font-display mb-3 text-lg font-semibold text-primary">💝 給你們的建議</h2>
                <p className="text-sm leading-relaxed text-foreground/85">{result.advice}</p>
              </motion.div>

              {/* Actions */}
              <motion.div {...cardVariant(7)} className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-center">
                <Button
                  onClick={handleReset}
                  className="bg-primary px-8 py-5 text-base font-semibold text-primary-foreground hover:scale-105 hover:shadow-[0_0_30px_hsl(38_90%_55%/0.4)] transition-all"
                >
                  🔄 重新配對
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="border-primary/30 px-6 py-5 text-base hover:border-primary/60 transition-all"
                >
                  🎂 查看生日密碼
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const DatePickerField = ({ date, onSelect }: { date?: Date; onSelect: (d: Date | undefined) => void }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={cn(
          "w-full justify-start border-primary/30 bg-muted/30 py-5 text-left text-base hover:border-primary/60 hover:bg-muted/50",
          !date && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="mr-3 h-5 w-5 text-primary" />
        {date ? format(date, "yyyy 年 M 月 d 日", { locale: zhTW }) : "選擇生日"}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto border-primary/20 bg-card p-0" align="center">
      <Calendar
        mode="single"
        selected={date}
        onSelect={onSelect}
        disabled={(d) => d > new Date()}
        defaultMonth={date || new Date(2000, 0)}
        captionLayout="dropdown-buttons"
        fromYear={1920}
        toYear={new Date().getFullYear()}
        className={cn("p-3 pointer-events-auto")}
      />
    </PopoverContent>
  </Popover>
);

const ScoreBar = ({ label, score }: { label: string; score: number }) => {
  const barColor = score >= 80 ? "bg-green-500" : score >= 65 ? "bg-primary" : score >= 50 ? "bg-yellow-500" : "bg-accent";
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-display font-bold text-foreground">{score}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted/50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" as const }}
          className={cn("h-full rounded-full", barColor)}
        />
      </div>
    </div>
  );
};

export default Compatibility;
