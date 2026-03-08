import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Download, Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShareCardProps {
  birthday: string;
  zodiacSymbol: string;
  zodiacName: string;
  lifePathNum: number;
  birthstoneName: string;
  birthstoneEmoji: string;
  birthFlowerName: string;
  birthFlowerEmoji: string;
  birthdayColorName: string;
  birthdayColorHex: string;
  personality: string;
  onClose: () => void;
}

const ShareCard = ({
  birthday, zodiacSymbol, zodiacName, lifePathNum,
  birthstoneName, birthstoneEmoji, birthFlowerName, birthFlowerEmoji,
  birthdayColorName, birthdayColorHex, personality, onClose,
}: ShareCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);

  const generate = async () => {
    if (!cardRef.current) return;
    setGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const dataUrl = canvas.toDataURL("image/png");

      // Try native share with file first
      if (navigator.share && navigator.canShare) {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], "birthday-code.png", { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: "我的生日密碼",
              text: `🎂 我的生日密碼：${zodiacSymbol}${zodiacName} + 靈數${lifePathNum}！你的呢？`,
              files: [file],
            });
            setGenerating(false);
            return;
          } catch { /* user cancelled, fall through to download */ }
        }
      }

      // Fallback: download
      const link = document.createElement("a");
      link.download = `生日密碼-${birthday}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("圖片已儲存！");
    } catch {
      toast.error("生成圖片失敗，請稍後再試");
    }
    setGenerating(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute -top-12 right-0 text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* The card to capture */}
        <div
          ref={cardRef}
          className="overflow-hidden rounded-2xl"
          style={{
            background: "linear-gradient(145deg, #1a1333 0%, #0f0d1a 40%, #1a0f1f 100%)",
          }}
        >
          <div className="px-6 pt-8 pb-6">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🎂</div>
              <h2
                className="text-2xl font-bold"
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  background: "linear-gradient(135deg, #D4A017, #E8A020, #F5C542)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                我的生日密碼
              </h2>
              <p className="text-sm mt-1" style={{ color: "#8a8a9a" }}>{birthday}</p>
            </div>

            {/* Info Grid */}
            <div
              className="grid grid-cols-2 gap-3 mb-5"
            >
              <InfoBox label="星座" value={`${zodiacSymbol} ${zodiacName}`} />
              <InfoBox label="生命靈數" value={String(lifePathNum)} />
              <InfoBox label="誕生石" value={`${birthstoneEmoji} ${birthstoneName}`} />
              <InfoBox label="生日花" value={`${birthFlowerEmoji} ${birthFlowerName}`} />
            </div>

            {/* Birthday Color */}
            <div
              className="rounded-xl p-3 mb-5 flex items-center gap-3"
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <div
                className="w-10 h-10 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: birthdayColorHex,
                  boxShadow: `0 0 20px ${birthdayColorHex}60`,
                }}
              />
              <div>
                <p className="text-xs" style={{ color: "#8a8a9a" }}>生日色</p>
                <p className="font-semibold text-sm" style={{ color: "#e8e0d0", fontFamily: "'Noto Serif TC', serif" }}>
                  {birthdayColorName}
                  <span className="ml-2 text-xs" style={{ color: "#8a8a9a" }}>{birthdayColorHex}</span>
                </p>
              </div>
            </div>

            {/* Personality */}
            <div
              className="rounded-xl p-4 mb-4"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                borderLeft: "3px solid #D4A017",
              }}
            >
              <p className="text-xs mb-2" style={{ color: "#D4A017", fontFamily: "'Noto Serif TC', serif" }}>✨ 性格速寫</p>
              <p className="text-sm leading-relaxed" style={{ color: "#c8c0b0" }}>
                {personality.length > 60 ? personality.slice(0, 60) + "..." : personality}
              </p>
            </div>

            {/* Footer */}
            <div className="text-center pt-2">
              <p className="text-xs" style={{ color: "#6a6a7a" }}>
                🔮 你的生日密碼是什麼？快來解鎖！
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex gap-3">
          <Button
            onClick={generate}
            disabled={generating}
            className="flex-1 bg-primary py-5 text-base font-semibold text-primary-foreground hover:scale-105 hover:shadow-[0_0_30px_hsl(38_90%_55%/0.4)] transition-all"
          >
            {generating ? (
              <span className="animate-pulse">生成中...</span>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                儲存圖片
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={generate}
            disabled={generating}
            className="py-5 border-primary/30 hover:border-primary/60"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const InfoBox = ({ label, value }: { label: string; value: string }) => (
  <div
    className="rounded-xl p-3 text-center"
    style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
  >
    <p className="text-xs mb-1" style={{ color: "#8a8a9a" }}>{label}</p>
    <p
      className="font-semibold text-sm"
      style={{ color: "#e8e0d0", fontFamily: "'Noto Serif TC', serif" }}
    >
      {value}
    </p>
  </div>
);

export default ShareCard;
