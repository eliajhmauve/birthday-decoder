import { getZodiac, getLifePathNumber, ZodiacInfo } from "./birthdayData";

// Element compatibility matrix
const elementCompat: Record<string, Record<string, number>> = {
  "火": { "火": 75, "土": 50, "風": 90, "水": 40 },
  "土": { "火": 50, "土": 85, "風": 45, "水": 80 },
  "風": { "火": 90, "土": 45, "風": 80, "水": 55 },
  "水": { "火": 40, "土": 80, "風": 55, "水": 85 },
};

// Life path compatibility
const lifePathCompat: Record<string, number> = {
  "1-1": 60, "1-2": 70, "1-3": 85, "1-4": 55, "1-5": 80, "1-6": 65, "1-7": 75, "1-8": 70, "1-9": 80,
  "2-2": 75, "2-3": 70, "2-4": 80, "2-5": 55, "2-6": 90, "2-7": 65, "2-8": 75, "2-9": 70,
  "3-3": 65, "3-4": 50, "3-5": 85, "3-6": 80, "3-7": 70, "3-8": 60, "3-9": 90,
  "4-4": 70, "4-5": 45, "4-6": 75, "4-7": 80, "4-8": 85, "4-9": 55,
  "5-5": 70, "5-6": 50, "5-7": 75, "5-8": 65, "5-9": 80,
  "6-6": 80, "6-7": 55, "6-8": 70, "6-9": 85,
  "7-7": 75, "7-8": 60, "7-9": 70,
  "8-8": 65, "8-9": 75,
  "9-9": 80,
};

function getLifePathCompatScore(a: number, b: number): number {
  const na = a > 9 ? (a % 9 || 9) : a;
  const nb = b > 9 ? (b % 9 || 9) : b;
  const key1 = `${Math.min(na, nb)}-${Math.max(na, nb)}`;
  return lifePathCompat[key1] || 65;
}

// Zodiac sign compatibility
const zodiacCompat: Record<string, string[]> = {
  "牡羊座": ["獅子座", "射手座", "雙子座", "水瓶座"],
  "金牛座": ["處女座", "摩羯座", "巨蟹座", "雙魚座"],
  "雙子座": ["天秤座", "水瓶座", "牡羊座", "獅子座"],
  "巨蟹座": ["天蠍座", "雙魚座", "金牛座", "處女座"],
  "獅子座": ["牡羊座", "射手座", "雙子座", "天秤座"],
  "處女座": ["金牛座", "摩羯座", "巨蟹座", "天蠍座"],
  "天秤座": ["雙子座", "水瓶座", "獅子座", "射手座"],
  "天蠍座": ["巨蟹座", "雙魚座", "處女座", "摩羯座"],
  "射手座": ["牡羊座", "獅子座", "天秤座", "水瓶座"],
  "摩羯座": ["金牛座", "處女座", "天蠍座", "雙魚座"],
  "水瓶座": ["雙子座", "天秤座", "牡羊座", "射手座"],
  "雙魚座": ["巨蟹座", "天蠍座", "金牛座", "摩羯座"],
};

function getZodiacCompatScore(a: string, b: string): number {
  if (a === b) return 75;
  const bestMatches = zodiacCompat[a] || [];
  const idx = bestMatches.indexOf(b);
  if (idx === 0 || idx === 1) return 95;
  if (idx === 2 || idx === 3) return 80;
  return 55;
}

export interface CompatibilityResult {
  overallScore: number;
  zodiacScore: number;
  lifePathScore: number;
  elementScore: number;
  zodiacA: ZodiacInfo;
  zodiacB: ZodiacInfo;
  lifePathA: number;
  lifePathB: number;
  summary: string;
  strengths: string[];
  challenges: string[];
  advice: string;
}

const summaryByScore = (score: number, nameA: string, nameB: string): string => {
  if (score >= 90) return `${nameA}和${nameB}是天作之合！你們的靈魂彷彿在星空中早已注定相遇，彼此之間有著深層的理解和共鳴。`;
  if (score >= 80) return `${nameA}和${nameB}有著非常好的相容性！你們能互相啟發，共同成長，是令人羨慕的組合。`;
  if (score >= 70) return `${nameA}和${nameB}的配對充滿潛力！雖然有些不同，但正是這些差異讓你們的關係更加豐富多彩。`;
  if (score >= 60) return `${nameA}和${nameB}需要彼此多一些理解和包容。你們的差異可以成為互補的力量，也可能成為挑戰。`;
  return `${nameA}和${nameB}的組合充滿了學習的機會。你們的差異較大，但如果願意敞開心扉，將會收穫意想不到的成長。`;
};

const getStrengths = (zodiacA: ZodiacInfo, zodiacB: ZodiacInfo, score: number): string[] => {
  const strengths: string[] = [];
  if (zodiacA.element === zodiacB.element) {
    strengths.push("同屬一個元素，天生有共同語言");
  }
  if (score >= 80) {
    strengths.push("直覺上能理解對方的需求");
    strengths.push("價值觀和生活節奏容易同步");
  }
  if ((zodiacA.element === "火" && zodiacB.element === "風") || (zodiacA.element === "風" && zodiacB.element === "火")) {
    strengths.push("火與風的組合充滿激情和創意");
  }
  if ((zodiacA.element === "水" && zodiacB.element === "土") || (zodiacA.element === "土" && zodiacB.element === "水")) {
    strengths.push("水與土的結合穩定而深情");
  }
  if (strengths.length === 0) {
    strengths.push("差異帶來新鮮感和學習機會");
    strengths.push("能從對方身上看到不同的世界");
  }
  return strengths;
};

const getChallenges = (zodiacA: ZodiacInfo, zodiacB: ZodiacInfo, score: number): string[] => {
  const challenges: string[] = [];
  if (score < 60) {
    challenges.push("溝通方式和表達習慣差異較大");
    challenges.push("需要更多耐心去理解對方的想法");
  } else if (score < 75) {
    challenges.push("偶爾會因為觀點不同而產生小摩擦");
  }
  if ((zodiacA.element === "火" && zodiacB.element === "水") || (zodiacA.element === "水" && zodiacB.element === "火")) {
    challenges.push("情感表達方式截然不同，需要磨合");
  }
  if (zodiacA.element === zodiacB.element && score < 80) {
    challenges.push("太過相似可能缺少互補的刺激感");
  }
  if (challenges.length === 0) {
    challenges.push("保持新鮮感需要雙方持續的用心");
  }
  return challenges;
};

const getAdvice = (score: number): string => {
  if (score >= 85) return "珍惜這份難得的緣分，繼續用愛和理解灌溉你們的關係。記得保持各自的獨立空間，讓愛情在自由中綻放。";
  if (score >= 70) return "你們有很好的基礎，關鍵在於學會欣賞彼此的不同。多一些傾聽，少一些批判，你們的關係會更上一層樓。";
  if (score >= 55) return "勇敢面對差異，把它們當作成長的養分。定期進行深度溝通，了解對方內心真正的需求，你們會發現更多驚喜。";
  return "每段關係都是一面鏡子。即使挑戰較多，也蘊含著最深刻的人生功課。用開放的心態去理解對方，你們都會成為更好的自己。";
};

export function calculateCompatibility(
  yearA: number, monthA: number, dayA: number,
  yearB: number, monthB: number, dayB: number,
): CompatibilityResult {
  const zodiacA = getZodiac(monthA, dayA);
  const zodiacB = getZodiac(monthB, dayB);
  const lifePathA = getLifePathNumber(yearA, monthA, dayA);
  const lifePathB = getLifePathNumber(yearB, monthB, dayB);

  const zodiacScore = getZodiacCompatScore(zodiacA.name, zodiacB.name);
  const lifePathScore = getLifePathCompatScore(lifePathA, lifePathB);
  const elementScore = elementCompat[zodiacA.element]?.[zodiacB.element] ?? 60;

  const overallScore = Math.round(zodiacScore * 0.4 + lifePathScore * 0.3 + elementScore * 0.3);

  return {
    overallScore,
    zodiacScore,
    lifePathScore,
    elementScore,
    zodiacA,
    zodiacB,
    lifePathA,
    lifePathB,
    summary: summaryByScore(overallScore, zodiacA.name, zodiacB.name),
    strengths: getStrengths(zodiacA, zodiacB, overallScore),
    challenges: getChallenges(zodiacA, zodiacB, overallScore),
    advice: getAdvice(overallScore),
  };
}
