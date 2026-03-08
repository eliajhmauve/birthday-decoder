// === ZODIAC ===
export interface ZodiacInfo {
  name: string;
  symbol: string;
  dateRange: string;
  element: string;
  traits: string[];
}

const zodiacSigns: { month: number; day: number; sign: string }[] = [
  { month: 1, day: 20, sign: "摩羯座" },
  { month: 2, day: 19, sign: "水瓶座" },
  { month: 3, day: 20, sign: "雙魚座" },
  { month: 4, day: 20, sign: "牡羊座" },
  { month: 5, day: 21, sign: "金牛座" },
  { month: 6, day: 21, sign: "雙子座" },
  { month: 7, day: 22, sign: "巨蟹座" },
  { month: 8, day: 23, sign: "獅子座" },
  { month: 9, day: 23, sign: "處女座" },
  { month: 10, day: 23, sign: "天秤座" },
  { month: 11, day: 22, sign: "天蠍座" },
  { month: 12, day: 22, sign: "射手座" },
  { month: 12, day: 31, sign: "摩羯座" },
];

const zodiacDetails: Record<string, Omit<ZodiacInfo, "name">> = {
  "牡羊座": { symbol: "♈", dateRange: "3/21 - 4/19", element: "火", traits: ["勇敢", "熱情", "自信", "果斷"] },
  "金牛座": { symbol: "♉", dateRange: "4/20 - 5/20", element: "土", traits: ["務實", "忠誠", "耐心", "感性"] },
  "雙子座": { symbol: "♊", dateRange: "5/21 - 6/20", element: "風", traits: ["機智", "好奇", "善變", "社交"] },
  "巨蟹座": { symbol: "♋", dateRange: "6/21 - 7/22", element: "水", traits: ["溫柔", "直覺", "重感情", "保護慾強"] },
  "獅子座": { symbol: "♌", dateRange: "7/23 - 8/22", element: "火", traits: ["自信", "慷慨", "領導力", "戲劇性"] },
  "處女座": { symbol: "♍", dateRange: "8/23 - 9/22", element: "土", traits: ["細心", "分析力強", "完美主義", "實際"] },
  "天秤座": { symbol: "♎", dateRange: "9/23 - 10/22", element: "風", traits: ["和諧", "公正", "社交", "優雅"] },
  "天蠍座": { symbol: "♏", dateRange: "10/23 - 11/21", element: "水", traits: ["神秘", "熱情", "意志堅定", "洞察力強"] },
  "射手座": { symbol: "♐", dateRange: "11/22 - 12/21", element: "火", traits: ["冒險", "樂觀", "自由", "哲學"] },
  "摩羯座": { symbol: "♑", dateRange: "12/22 - 1/19", element: "土", traits: ["堅毅", "有紀律", "責任感", "野心"] },
  "水瓶座": { symbol: "♒", dateRange: "1/20 - 2/18", element: "風", traits: ["獨立", "創新", "人道主義", "不拘一格"] },
  "雙魚座": { symbol: "♓", dateRange: "2/19 - 3/20", element: "水", traits: ["浪漫", "富想像力", "同理心", "藝術感"] },
};

export function getZodiac(month: number, day: number): ZodiacInfo {
  let sign = "摩羯座";
  for (const z of zodiacSigns) {
    if (month < z.month || (month === z.month && day <= z.day)) {
      sign = z.sign;
      break;
    }
  }
  return { name: sign, ...zodiacDetails[sign] };
}

// === LIFE PATH NUMBER ===
export function getLifePathNumber(year: number, month: number, day: number): number {
  const reduce = (n: number): number => {
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
      n = String(n).split("").reduce((a, b) => a + parseInt(b), 0);
    }
    return n;
  };
  const y = reduce(year);
  const m = reduce(month);
  const d = reduce(day);
  return reduce(y + m + d);
}

const lifePathMeanings: Record<number, string> = {
  1: "你是天生的領袖，擁有強烈的獨立性和創造力。你勇於開拓新路，不畏挑戰，是推動世界前進的力量。",
  2: "你是和平的使者，擁有細膩的感受力和卓越的合作能力。你善於傾聽，是人群中不可或缺的調和者。",
  3: "你是創意的泉源，表達能力出眾，充滿藝術天分。你的樂觀和熱情感染著身邊的每一個人。",
  4: "你是穩固的基石，務實且有條理。你用毅力和決心建構夢想，是最值得信賴的夥伴。",
  5: "你是自由的靈魂，渴望冒險和改變。你充滿好奇心，適應力強，人生如一場精彩的旅程。",
  6: "你是愛的守護者，充滿責任感和關懷。你重視家庭與和諧，是溫暖他人心靈的存在。",
  7: "你是智慧的探索者，熱愛思考和追求真理。你的內在世界豐富而深邃，擁有非凡的洞察力。",
  8: "你是力量的化身，擁有卓越的商業頭腦和領導才能。你注定要在物質世界中取得非凡成就。",
  9: "你是人道主義者，胸懷寬廣，富有同理心。你的人生使命是用愛和智慧服務全人類。",
  11: "你擁有大師級的直覺力，是靈性的通道。你的使命是啟發他人，照亮黑暗中的道路。",
  22: "你是大師級的建造者，能將夢想化為現實。你擁有將宏大願景落地執行的非凡能力。",
  33: "你是大師級的導師，擁有無條件的愛。你的存在本身就是一種療癒和祝福。",
};

export function getLifePathMeaning(num: number): string {
  return lifePathMeanings[num] || lifePathMeanings[num > 9 ? 9 : num];
}

// === BIRTHSTONE ===
const birthstones: Record<number, { name: string; emoji: string; color: string }> = {
  1: { name: "石榴石", emoji: "🔴", color: "#8B0000" },
  2: { name: "紫水晶", emoji: "🟣", color: "#9B59B6" },
  3: { name: "海藍寶石", emoji: "💎", color: "#7EC8E3" },
  4: { name: "鑽石", emoji: "💍", color: "#E8E8E8" },
  5: { name: "祖母綠", emoji: "💚", color: "#2ECC71" },
  6: { name: "珍珠", emoji: "🤍", color: "#FDEBD0" },
  7: { name: "紅寶石", emoji: "❤️", color: "#E74C3C" },
  8: { name: "橄欖石", emoji: "💛", color: "#B5E61D" },
  9: { name: "藍寶石", emoji: "💙", color: "#2980B9" },
  10: { name: "蛋白石", emoji: "🌈", color: "#F5B7B1" },
  11: { name: "黃玉", emoji: "🧡", color: "#F39C12" },
  12: { name: "坦桑石", emoji: "💜", color: "#6C3483" },
};

export function getBirthstone(month: number) {
  return birthstones[month];
}

// === BIRTH FLOWER ===
const birthFlowers: Record<number, { name: string; emoji: string; meaning: string }> = {
  1: { name: "康乃馨", emoji: "🌸", meaning: "深深的愛與敬意" },
  2: { name: "紫羅蘭", emoji: "💜", meaning: "忠誠與謙遜" },
  3: { name: "水仙花", emoji: "🌼", meaning: "新的開始與重生" },
  4: { name: "雛菊", emoji: "🌼", meaning: "純真與忠誠" },
  5: { name: "鈴蘭", emoji: "🔔", meaning: "幸福的回歸" },
  6: { name: "玫瑰", emoji: "🌹", meaning: "愛與美麗" },
  7: { name: "向日葵", emoji: "🌻", meaning: "崇拜與忠誠" },
  8: { name: "劍蘭", emoji: "🌺", meaning: "堅強與正直" },
  9: { name: "紫苑", emoji: "💐", meaning: "智慧與信念" },
  10: { name: "萬壽菊", emoji: "🏵️", meaning: "溫暖與創造力" },
  11: { name: "菊花", emoji: "🌸", meaning: "快樂與長壽" },
  12: { name: "聖誕紅", emoji: "❤️", meaning: "好運與歡樂" },
};

export function getBirthFlower(month: number) {
  return birthFlowers[month];
}

// === BIRTHDAY COLOR ===
export function getBirthdayColor(month: number, day: number): { name: string; hex: string } {
  const hue = ((month - 1) * 30 + day) % 360;
  const colors: { name: string; hex: string; range: [number, number] }[] = [
    { name: "熱情紅", hex: "#E74C3C", range: [0, 15] },
    { name: "珊瑚橘", hex: "#FF6B6B", range: [15, 30] },
    { name: "落日橙", hex: "#E67E22", range: [30, 50] },
    { name: "琥珀金", hex: "#F1C40F", range: [50, 70] },
    { name: "檸檬黃", hex: "#F7DC6F", range: [70, 90] },
    { name: "草木綠", hex: "#82E0AA", range: [90, 120] },
    { name: "翡翠綠", hex: "#27AE60", range: [120, 150] },
    { name: "薄荷藍", hex: "#76D7C4", range: [150, 180] },
    { name: "天空藍", hex: "#5DADE2", range: [180, 210] },
    { name: "皇家藍", hex: "#2E86C1", range: [210, 240] },
    { name: "星空靛", hex: "#6C3483", range: [240, 270] },
    { name: "神秘紫", hex: "#8E44AD", range: [270, 300] },
    { name: "夢幻粉", hex: "#F1948A", range: [300, 330] },
    { name: "薔薇紅", hex: "#C0392B", range: [330, 360] },
  ];
  return colors.find(c => hue >= c.range[0] && hue < c.range[1]) || colors[0];
}

// === LUCKY NUMBERS ===
export function getLuckyNumbers(lifePathNum: number, day: number): number[] {
  const base = [lifePathNum, (day % 9) + 1, ((lifePathNum + day) % 30) + 1];
  return [...new Set(base)].slice(0, 3);
}

export function getLuckyDay(lifePathNum: number): string {
  const days = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];
  return days[lifePathNum % 7];
}

export function getLuckyDirection(month: number): string {
  const directions = ["北", "東北", "東", "東南", "南", "西南", "西", "西北"];
  return directions[(month - 1) % 8];
}

// === FAMOUS BIRTHDAYS ===
interface FamousPerson {
  name: string;
  year: number;
  description: string;
}

const famousBirthdays: Record<string, FamousPerson[]> = {
  // 一月
  "1-1": [{ name: "J·D·賽林格", year: 1919, description: "美國作家" }],
  "1-3": [{ name: "乃木坂46 岩本蓮加", year: 2004, description: "日本偶像" }, { name: "J·R·R·托爾金", year: 1892, description: "英國作家" }],
  "1-5": [{ name: "宮崎駿", year: 1941, description: "日本動畫大師" }],
  "1-8": [{ name: "白石麻衣", year: 1992, description: "日本偶像" }, { name: "乃木坂46", year: 0, description: "" }].filter(p => p.year > 0),
  "1-8x": undefined,
  "1-9": [{ name: "凱特·乃德頓", year: 1982, description: "英國王妃" }],
  "1-12": [{ name: "村上春樹", year: 1949, description: "日本作家" }],
  "1-15": [{ name: "馬丁·路德·金", year: 1929, description: "美國民權領袖" }],
  "1-17": [{ name: "班傑明·富蘭克林", year: 1706, description: "美國開國元勳" }, { name: "坂道坂46 齋藤飛鳥", year: 1998, description: "日本偶像" }],
  "1-20": [{ name: "費里尼", year: 1920, description: "義大利導演" }],
  "1-23": [{ name: "湯川秀樹", year: 1907, description: "日本物理學家" }],
  "1-27": [{ name: "莫札特", year: 1756, description: "奧地利音樂家" }],
  "1-30": [{ name: "富蘭克林·羅斯福", year: 1882, description: "美國前總統" }],
  // 二月
  "2-2": [{ name: "乃木坂46 大園桃子", year: 2000, description: "日本偶像" }, { name: "乃木坂46 遠藤さくら", year: 2001, description: "日本偶像" }],
  "2-5": [{ name: "C·羅納爾多", year: 1985, description: "足球運動員" }],
  "2-7": [{ name: "查爾斯·狄更斯", year: 1812, description: "英國作家" }, { name: "阿什頓·庫徹", year: 1978, description: "美國演員" }],
  "2-11": [{ name: "愛迪生", year: 1847, description: "美國發明家" }, { name: "乃木坂46 山下美月", year: 1999, description: "日本偶像" }],
  "2-14": [{ name: "張藝謀", year: 1950, description: "中國導演" }],
  "2-17": [{ name: "乃木坂46 堀未央奈", year: 1996, description: "日本偶像" }, { name: "乃伊克·乔丹", year: 1963, description: "美國籃球巨星" }],
  "2-20": [{ name: "蕾哈娜", year: 1988, description: "巴巴多斯歌手" }, { name: "乃木坂46 久保史緒里", year: 2001, description: "日本偶像" }],
  "2-22": [{ name: "喬治·華盛頓", year: 1732, description: "美國首任總統" }],
  "2-24": [{ name: "史蒂夫·乔布斯", year: 1955, description: "蘋果創辦人" }],
  "2-28": [{ name: "村上春", year: 1949, description: "日本作家" }],
  // 三月
  "3-1": [{ name: "蕭邦", year: 1810, description: "波蘭音樂家" }, { name: "賈斯汀·乃伯", year: 1994, description: "加拿大歌手" }],
  "3-6": [{ name: "乃開朗基羅", year: 1475, description: "文藝復興藝術家" }],
  "3-9": [{ name: "尤里·加加林", year: 1934, description: "蘇聯太空人" }],
  "3-14": [{ name: "愛因斯坦", year: 1879, description: "物理學家" }],
  "3-17": [{ name: "乃木坂46 寺田蘭世", year: 1998, description: "日本偶像" }],
  "3-20": [{ name: "斯派克·李", year: 1957, description: "美國導演" }],
  "3-21": [{ name: "巴哈", year: 1685, description: "德國音樂家" }],
  "3-25": [{ name: "艾爾頓·強", year: 1947, description: "英國歌手" }],
  "3-27": [{ name: "昆汀·塔倫提諾", year: 1963, description: "美國導演" }],
  "3-30": [{ name: "乃木坂46 中村麗乃", year: 2001, description: "日本偶像" }, { name: "乃達利", year: 1853, description: "荷蘭畫家" }],
  // 四月
  "4-2": [{ name: "安徒生", year: 1805, description: "丹麥作家" }],
  "4-4": [{ name: "小乃勃·唐尼", year: 1965, description: "美國演員" }],
  "4-7": [{ name: "成龍", year: 1954, description: "香港演員" }, { name: "乃木坂46 生田繪梨花", year: 1997, description: "日本偶像" }],
  "4-10": [{ name: "乃木坂46 星野南", year: 1999, description: "日本偶像" }],
  "4-15": [{ name: "達文西", year: 1452, description: "文藝復興巨匠" }, { name: "艾瑪·乃特森", year: 1990, description: "英國演員" }],
  "4-16": [{ name: "卓别林", year: 1889, description: "英國喜劇大師" }],
  "4-20": [{ name: "乃木坂46 若月佑美", year: 1994, description: "日本偶像" }],
  "4-23": [{ name: "莎士乃亞", year: 1564, description: "英國劇作家" }],
  "4-25": [{ name: "乃木坂46 鈴木絢音", year: 1999, description: "日本偶像" }, { name: "乃尼·帕奇諾", year: 1940, description: "美國演員" }],
  "4-28": [{ name: "乃乃坂46 伊藤萬理華", year: 1996, description: "日本偶像" }],
  // 五月
  "5-2": [{ name: "乃木坂46 新内眞衣", year: 1992, description: "日本偶像" }, { name: "乃克漢", year: 1975, description: "英國足球明星" }],
  "5-6": [{ name: "佐治·乃古尼", year: 1961, description: "美國演員" }],
  "5-10": [{ name: "乃木坂46 松村沙友理", year: 1992, description: "日本偶像" }],
  "5-14": [{ name: "馬克·乃克伯格", year: 1984, description: "Facebook 創辦人" }],
  "5-15": [{ name: "乃木坂46 若月佑美", year: 1994, description: "日本偶像" }],
  "5-19": [{ name: "乃木坂46 寺田蘭世", year: 1998, description: "日本偶像" }],
  "5-21": [{ name: "乃木坂46 佐藤楓", year: 1998, description: "日本偶像" }],
  "5-24": [{ name: "乃布·狄倫", year: 1941, description: "美國歌手" }],
  "5-29": [{ name: "甘迺迪", year: 1917, description: "美國前總統" }],
  // 六月
  "6-1": [{ name: "瑪麗蓮·乃露", year: 1926, description: "美國演員" }],
  "6-5": [{ name: "乃克·偉士", year: 1947, description: "英國搖滾歌手" }],
  "6-9": [{ name: "乃翰·乃普", year: 1963, description: "美國演員" }, { name: "娜塔莉·乃特曼", year: 1981, description: "以色列裔美國演員" }],
  "6-11": [{ name: "石原聰美", year: 1986, description: "日本演員" }],
  "6-14": [{ name: "川端康成", year: 1899, description: "日本作家" }, { name: "唐納·乃朗普", year: 1946, description: "美國前總統" }],
  "6-18": [{ name: "乃爾·乃卡尼", year: 1942, description: "英國音樂家" }],
  "6-22": [{ name: "梅莉·乃翠普", year: 1949, description: "美國演員" }],
  "6-25": [{ name: "喬治·乃威爾", year: 1903, description: "英國作家" }],
  "6-28": [{ name: "乃隆·乃斯", year: 1966, description: "美國特斯拉CEO" }],
  // 七月
  "7-2": [{ name: "赫曼·赫塞", year: 1877, description: "德國作家" }],
  "7-6": [{ name: "芙烈達·乃蘿", year: 1907, description: "墨西哥畫家" }, { name: "乃維斯·史特乃", year: 1946, description: "美國導演" }],
  "7-7": [{ name: "林哥·乃達", year: 1940, description: "英國音樂家" }],
  "7-10": [{ name: "特斯拉", year: 1856, description: "發明家" }],
  "7-13": [{ name: "乃裡乃·福特", year: 1942, description: "美國演員" }],
  "7-16": [{ name: "乃生安三", year: 1934, description: "日本軍事家" }],
  "7-21": [{ name: "海明威", year: 1899, description: "美國作家" }, { name: "渡邊直美", year: 1987, description: "日本演員" }],
  "7-23": [{ name: "乃尼爾·乃基克里夫", year: 1989, description: "英國演員" }],
  "7-26": [{ name: "乃克·佐格", year: 1943, description: "英國搖滾歌手" }],
  "7-31": [{ name: "J.K.羅琳", year: 1965, description: "英國作家" }],
  // 八月
  "8-1": [{ name: "乃木坂46 川後陽菜", year: 1998, description: "日本偶像" }],
  "8-4": [{ name: "巴拉克·歐巴馬", year: 1961, description: "美國前總統" }],
  "8-8": [{ name: "乃傑·費德勒", year: 1981, description: "瑞士網球選手" }],
  "8-11": [{ name: "克里斯·漢斯乃", year: 1973, description: "美國演員" }],
  "8-15": [{ name: "拿破崙", year: 1769, description: "法國皇帝" }, { name: "乃木坂46 梅澤美波", year: 1999, description: "日本偶像" }],
  "8-18": [{ name: "乃勃·乃尼洛", year: 1943, description: "美國演員" }],
  "8-20": [{ name: "黃明志", year: 1983, description: "馬來西亞歌手" }],
  "8-23": [{ name: "乃比·布萊乃", year: 1978, description: "美國籃球巨星" }],
  "8-29": [{ name: "乃克·傑克森", year: 1958, description: "美國歌手" }],
  // 九月
  "9-2": [{ name: "基努·乃維斯", year: 1964, description: "加拿大演員" }],
  "9-5": [{ name: "菅田将暉", year: 1993, description: "日本演員" }, { name: "乃萊迪·乃乃里", year: 1946, description: "英國歌手" }],
  "9-9": [{ name: "乃夫·乃德斯坦", year: 1828, description: "俄國作家" }],
  "9-12": [{ name: "新垣結衣", year: 1988, description: "日本演員" }],
  "9-15": [{ name: "哈利王子", year: 1984, description: "英國王室" }],
  "9-21": [{ name: "宮澤賢治", year: 1896, description: "日本作家" }, { name: "史蒂芬·金", year: 1947, description: "美國作家" }],
  "9-25": [{ name: "威爾·乃密斯", year: 1968, description: "美國演員" }],
  "9-27": [{ name: "乃木坂46 生駒里奈", year: 1995, description: "日本偶像" }],
  "9-29": [{ name: "孔子", year: -551, description: "中國哲學家" }],
  // 十月
  "10-1": [{ name: "乃吉·乃仁", year: 1924, description: "美國前總統" }],
  "10-5": [{ name: "乃木坂46 秋元真夏", year: 1993, description: "日本偶像" }],
  "10-9": [{ name: "約翰·乃農", year: 1940, description: "英國音樂家" }],
  "10-28": [{ name: "比爾·蓋茲", year: 1955, description: "微軟創辦人" }],
  "11-11": [{ name: "乃木坂46 高山一實", year: 1994, description: "日本偶像" }, { name: "乃伊那多·乃卡皮歐", year: 1974, description: "美國演員" }],
  "11-22": [{ name: "乃木坂46 伊藤理々杏", year: 2002, description: "日本偶像" }],
  "12-5": [{ name: "華特·迪士尼", year: 1901, description: "動畫之父" }],
  "12-18": [{ name: "布萊德·彼特", year: 1963, description: "美國演員" }, { name: "史蒂芬·史匹柏", year: 1946, description: "美國導演" }],
  "12-25": [{ name: "艾薩克·牛頓", year: 1643, description: "物理學家" }],
};

export function getFamousBirthdays(month: number, day: number): FamousPerson[] {
  return famousBirthdays[`${month}-${day}`] || [];
}

// === BIRTHDAY STATS ===
// Based on common birthday frequency data
const commonBirthdays = [
  "9-9", "9-19", "9-12", "9-17", "9-10", "9-20", "9-15", "9-16",
  "9-18", "9-14", "9-21", "9-22", "9-23", "9-25", "9-26", "9-27",
  "8-8", "8-10", "8-12", "7-7", "7-8", "10-5", "12-25",
];

export function getBirthdayRank(month: number, day: number): number {
  const key = `${month}-${day}`;
  const idx = commonBirthdays.indexOf(key);
  if (idx !== -1) return idx + 1;
  // Generate a pseudo-rank based on date
  return Math.floor(((month * 31 + day) * 7 + 50) % 300) + 30;
}

export function getBirthdayPercentage(): string {
  return (100 / 365).toFixed(2);
}

// === PERSONALITY SUMMARY ===
export function getPersonalitySummary(zodiacName: string, lifePathNum: number): string {
  const zodiacTraits: Record<string, string> = {
    "牡羊座": "你是天生的開拓者，擁有無畏的勇氣和不服輸的精神。",
    "金牛座": "你擁有堅定的意志和對美好事物的深刻鑑賞力。",
    "雙子座": "你的思維敏捷如風，擁有讓人驚艷的溝通天賦。",
    "巨蟹座": "你是溫暖的守護者，以深厚的情感連結周圍的人。",
    "獅子座": "你是天生的王者，散發著無可抵擋的光芒和魅力。",
    "處女座": "你擁有精準的洞察力，追求完美是你的人生藝術。",
    "天秤座": "你是優雅的平衡大師，天生懂得和諧之美。",
    "天蠍座": "你擁有深不見底的力量，和令人著迷的神秘感。",
    "射手座": "你是自由的冒險家，永遠追尋生命的真諦。",
    "摩羯座": "你是堅毅的攀登者，用耐心和智慧征服每座高峰。",
    "水瓶座": "你是未來的先知，用獨特的視角改變這個世界。",
    "雙魚座": "你擁有如海洋般深邃的靈魂，和無邊的想像力。",
  };

  const lifePathAdd: Record<number, string> = {
    1: "結合你強大的領導力，你注定要走出一條獨特的道路。",
    2: "你的敏感和直覺讓你成為最好的傾聽者和合作者。",
    3: "你的創造力和表達力讓每個遇見你的人都感到驚喜。",
    4: "你的穩定和堅持為身邊的人提供了最可靠的支持。",
    5: "你對自由的渴望驅使你不斷探索生命的無限可能。",
    6: "你對愛和家庭的重視讓你成為最溫暖的存在。",
    7: "你對真理的追求讓你在精神世界中找到了獨特的智慧。",
    8: "你的野心和實力讓你在物質世界中光芒萬丈。",
    9: "你的慈悲和大愛讓你成為人群中最美的風景。",
    11: "作為大師級靈數的持有者，你擁有超凡的直覺和啟發力。",
    22: "作為大師級靈數的持有者，你擁有將夢想變為現實的非凡能力。",
    33: "作為大師級靈數的持有者，你的愛和智慧能療癒無數生命。",
  };

  const base = zodiacTraits[zodiacName] || "你擁有獨特而迷人的個人魅力。";
  const add = lifePathAdd[lifePathNum] || lifePathAdd[lifePathNum > 9 ? 9 : lifePathNum];
  return `${base}${add}`;
}
