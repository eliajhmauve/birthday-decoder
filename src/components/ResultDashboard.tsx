import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Camera, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getZodiac, getLifePathNumber, getLifePathMeaning, getBirthstone,
  getBirthdayColor, getLuckyNumbers, getLuckyDay,
  getLuckyDirection, getFamousBirthdays, getBirthdayRank,
  getBirthdayPercentage, getPersonalitySummary,
} from "@/data/birthdayData";
import { getDailyFlower } from "@/data/dailyFlowers";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import { toast } from "sonner";

interface ResultDashboardProps {
  birthday: Date;
  onReset: () => void;
}

const cardVariant = (i: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { delay: 0.15 * i, duration: 0.5, ease: "easeOut" as const } },
});

const ResultDashboard = ({ birthday, onReset }: ResultDashboardProps) => {
  const month = birthday.getMonth() + 1;
  const day = birthday.getDate();
  const year = birthday.getFullYear();

  const data = useMemo(() => {
    const zodiac = getZodiac(month, day);
    const lifePathNum = getLifePathNumber(year, month, day);
    return {
      zodiac,
      lifePathNum,
      lifePathMeaning: getLifePathMeaning(lifePathNum),
      birthstone: getBirthstone(month),
      birthFlower: getDailyFlower(month, day),
      birthdayColor: getBirthdayColor(month, day),
      luckyNumbers: getLuckyNumbers(lifePathNum, day),
      luckyDay: getLuckyDay(lifePathNum),
      luckyDirection: getLuckyDirection(month),
      famousBirthdays: getFamousBirthdays(month, day),
      rank: getBirthdayRank(month, day),
      percentage: getBirthdayPercentage(),
      personality: getPersonalitySummary(zodiac.name, lifePathNum),
    };
  }, [year, month, day]);

  const shareText = `🎂 我的生日密碼：${data.zodiac.symbol} ${data.zodiac.name} ｜ 生命靈數 ${data.lifePathNum} ｜ 誕生石：${data.birthstone.name} ｜「${data.personality.slice(0, 30)}...」\n\n你的生日密碼是什麼？快來解鎖！`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "我的生日密碼", text: shareText });
      } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast.success("已複製到剪貼簿！");
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 pb-20">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <Button variant="ghost" onClick={onReset} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" /> 重新輸入
        </Button>
        <Button variant="ghost" onClick={handleShare} className="text-muted-foreground hover:text-foreground">
          <Share2 className="mr-2 h-4 w-4" /> 分享
        </Button>
      </div>

      {/* Title */}
      <motion.div {...cardVariant(0)} className="mb-10 text-center">
        <p className="text-sm text-muted-foreground">{format(birthday, "yyyy 年 M 月 d 日", { locale: zhTW })}</p>
        <h1 className="font-display mt-2 text-3xl font-bold sm:text-4xl">
          🎂 <span className="gradient-text-golden">你的生日密碼</span>
        </h1>
      </motion.div>

      <div className="space-y-5">
        {/* Basic Info */}
        <motion.div {...cardVariant(1)} className="card-glow rounded-xl bg-card/80 p-6 backdrop-blur-sm">
          <h2 className="font-display mb-4 text-lg font-semibold text-primary">📅 基本資訊</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <InfoItem label="星座" value={`${data.zodiac.symbol} ${data.zodiac.name}`} />
            <InfoItem label="生命靈數" value={String(data.lifePathNum)} />
            <InfoItem label="誕生石" value={`${data.birthstone.emoji} ${data.birthstone.name}`} />
            <InfoItem label="生日花" value={`${data.birthFlower.emoji} ${data.birthFlower.name}`} />
            <div className="col-span-2 flex items-center gap-3">
              <span className="text-muted-foreground">生日色</span>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-border" style={{ backgroundColor: data.birthdayColor.hex }} />
                <span className="font-medium">{data.birthdayColor.name}</span>
                <span className="text-xs text-muted-foreground">{data.birthdayColor.hex}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Personality */}
        <motion.div {...cardVariant(2)} className="card-glow-accent rounded-xl bg-card/80 p-6 backdrop-blur-sm">
          <h2 className="font-display mb-3 text-lg font-semibold text-accent">🎯 性格速寫</h2>
          <p className="leading-relaxed text-foreground/90">{data.personality}</p>
        </motion.div>

        {/* Life Path */}
        <motion.div {...cardVariant(3)} className="card-glow rounded-xl bg-card/80 p-6 backdrop-blur-sm">
          <h2 className="font-display mb-3 text-lg font-semibold text-primary">🔮 靈數解析</h2>
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 font-display text-2xl font-bold text-primary">
              {data.lifePathNum}
            </span>
            <span className="text-sm text-muted-foreground">你的生命靈數</span>
          </div>
          <p className="text-sm leading-relaxed text-foreground/80">{data.lifePathMeaning}</p>
        </motion.div>

        {/* Lucky Numbers */}
        <motion.div {...cardVariant(4)} className="card-glow rounded-xl bg-card/80 p-6 backdrop-blur-sm">
          <h2 className="font-display mb-4 text-lg font-semibold text-primary">🔢 數字密碼</h2>
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <p className="mb-2 text-muted-foreground">幸運數字</p>
              <p className="font-display text-lg font-bold text-foreground">
                {data.luckyNumbers.join(", ")}
              </p>
            </div>
            <div>
              <p className="mb-2 text-muted-foreground">幸運日</p>
              <p className="font-display text-lg font-bold text-foreground">{data.luckyDay}</p>
            </div>
            <div>
              <p className="mb-2 text-muted-foreground">幸運方位</p>
              <p className="font-display text-lg font-bold text-foreground">{data.luckyDirection}</p>
            </div>
          </div>
        </motion.div>

        {/* Famous Birthdays */}
        {data.famousBirthdays.length > 0 && (
          <motion.div {...cardVariant(5)} className="card-glow rounded-xl bg-card/80 p-6 backdrop-blur-sm">
            <h2 className="font-display mb-4 text-lg font-semibold text-primary">👥 名人同天生日</h2>
            <div className="space-y-3">
              {data.famousBirthdays.map((person, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                  <span className="font-medium">{person.name}</span>
                  <span className="text-xs text-muted-foreground">{person.year} · {person.description}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Birthday Stats */}
        <motion.div {...cardVariant(6)} className="card-glow rounded-xl bg-card/80 p-6 backdrop-blur-sm">
          <h2 className="font-display mb-4 text-lg font-semibold text-primary">📊 你的生日統計</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
              <span className="text-muted-foreground">你的生日在一年中排第</span>
              <span className="font-display font-bold text-primary">{data.rank} 常見</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
              <span className="text-muted-foreground">同一天出生的人約佔全球</span>
              <span className="font-display font-bold text-primary">{data.percentage}%</span>
            </div>
          </div>
        </motion.div>

        {/* Birthstone & Flower Details */}
        <motion.div {...cardVariant(7)} className="card-glow-accent rounded-xl bg-card/80 p-6 backdrop-blur-sm">
          <h2 className="font-display mb-4 text-lg font-semibold text-accent">💎 誕生石與生日花</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="mb-2 text-2xl">{data.birthstone.emoji}</div>
              <p className="font-display font-semibold">{data.birthstone.name}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-4 w-4 rounded-full" style={{ backgroundColor: data.birthstone.color }} />
                <span className="text-xs text-muted-foreground">{data.birthstone.color}</span>
              </div>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="mb-2 text-2xl">{data.birthFlower.emoji}</div>
              <p className="font-display font-semibold">{data.birthFlower.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{data.birthFlower.meaning}</p>
            </div>
          </div>
        </motion.div>

        {/* Share Card */}
        <motion.div {...cardVariant(8)} className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 p-6 text-center backdrop-blur-sm">
          <p className="font-display mb-4 text-lg font-semibold text-foreground">
            我的生日密碼是 {data.zodiac.symbol}{data.zodiac.name} + 靈數{data.lifePathNum}！
          </p>
          <p className="mb-5 text-sm text-muted-foreground">你的呢？</p>
          <Button
            onClick={handleShare}
            className="bg-primary px-8 py-5 text-base font-semibold text-primary-foreground hover:scale-105 hover:shadow-[0_0_30px_hsl(38_90%_55%/0.4)] transition-all"
          >
            <Share2 className="mr-2 h-4 w-4" />
            分享我的生日密碼
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-display font-semibold text-foreground">{value}</span>
  </div>
);

export default ResultDashboard;
