import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";

interface BirthdayInputProps {
  onReveal: (date: Date) => void;
}

const BirthdayInput = ({ onReveal }: BirthdayInputProps) => {
  const [date, setDate] = useState<Date>();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6 text-7xl"
        >
          🎂
        </motion.div>

        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          <span className="gradient-text-golden">生日密碼解析器</span>
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          輸入你的生日，解鎖專屬於你的宇宙密碼
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="mt-12 flex flex-col items-center gap-6"
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[280px] justify-start border-primary/30 bg-card/80 py-6 text-left text-base backdrop-blur-sm hover:border-primary/60 hover:bg-card",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-3 h-5 w-5 text-primary" />
              {date ? format(date, "yyyy 年 M 月 d 日", { locale: zhTW }) : "選擇你的生日"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto border-primary/20 bg-card p-0" align="center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(d) => d > new Date()}
              defaultMonth={date || new Date(2000, 0)}
              captionLayout="dropdown-buttons"
              fromYear={1920}
              toYear={new Date().getFullYear()}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>

        <Button
          onClick={() => date && onReveal(date)}
          disabled={!date}
          className="w-[280px] bg-primary py-6 text-base font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_30px_hsl(38_90%_55%/0.4)] disabled:opacity-40"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          解鎖我的生日密碼
        </Button>
      </motion.div>
    </div>
  );
};

export default BirthdayInput;
