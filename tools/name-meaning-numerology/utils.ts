export interface NameInfo {
  origin: string;
  meaning: string;
  traits: string[];
}

export interface NumerologyResult {
  destiny: number;
  soulUrge: number;
  personality: number;
  lifePath?: number | undefined;
  maturity?: number | undefined;
}

const NAME_DB: Record<string, NameInfo> = {
  // Indian names
  'aarav': { origin: 'Sanskrit', meaning: 'Peaceful, wise', traits: ['calm', 'intelligent', 'leader'] },
  'aanya': { origin: 'Sanskrit', meaning: 'Grace, favour', traits: ['graceful', 'kind', 'creative'] },
  'vivaan': { origin: 'Sanskrit', meaning: 'Full of life', traits: ['energetic', 'charismatic', 'adventurous'] },
  'siya': { origin: 'Sanskrit', meaning: 'Goddess Sita', traits: ['devoted', 'strong', 'virtuous'] },
  'arjun': { origin: 'Sanskrit', meaning: 'Bright, shining', traits: ['brave', 'skilled', 'noble'] },
  'anika': { origin: 'Sanskrit', meaning: 'Goddess Durga', traits: ['powerful', 'graceful', 'determined'] },
  'krishna': { origin: 'Sanskrit', meaning: 'Dark, attractive', traits: ['charismatic', 'wise', 'playful'] },
  'priya': { origin: 'Sanskrit', meaning: 'Beloved', traits: ['loving', 'charming', 'empathetic'] },
  // Western
  'emma': { origin: 'Germanic', meaning: 'Whole, universal', traits: ['complete', 'nurturing', 'versatile'] },
  'liam': { origin: 'Irish', meaning: 'Strong-willed warrior', traits: ['strong', 'protective', 'determined'] },
  'olivia': { origin: 'Latin', meaning: 'Olive tree', traits: ['peaceful', 'wise', 'fruitful'] },
  'noah': { origin: 'Hebrew', meaning: 'Rest, comfort', traits: ['calm', 'comforting', 'reliable'] },
  'ava': { origin: 'Latin', meaning: 'Birdlike, lively', traits: ['lively', 'free-spirited', 'graceful'] },
  'james': { origin: 'Hebrew', meaning: 'Supplanter', traits: ['ambitious', 'adaptable', 'leader'] },
  // More
  'rahul': { origin: 'Sanskrit', meaning: 'Able, efficient', traits: ['capable', 'efficient', 'intelligent'] },
  'sneha': { origin: 'Sanskrit', meaning: 'Love, affection', traits: ['affectionate', 'caring', 'loyal'] },
};

function letterToNumber(char: string): number {
  const c = char.toUpperCase().charCodeAt(0) - 64;
  if (c < 1 || c > 26) return 0;
  return ((c - 1) % 9) + 1;
}

function reduceNumber(num: number, allowMaster = true): number {
  while (num > 9) {
    if (allowMaster && (num === 11 || num === 22 || num === 33)) return num;
    num = String(num).split('').reduce((a, b) => a + parseInt(b), 0);
  }
  return num;
}

function sumName(name: string, onlyVowels = false, onlyConsonants = false): number {
  let sum = 0;
  const vowels = 'AEIOU';
  for (const char of name.replace(/[^a-zA-Z]/g, '')) {
    if (onlyVowels && !vowels.includes(char.toUpperCase())) continue;
    if (onlyConsonants && vowels.includes(char.toUpperCase())) continue;
    sum += letterToNumber(char);
  }
  return sum;
}

export function getNameMeaning(name: string): NameInfo | null {
  const key = name.toLowerCase().trim();
  return NAME_DB[key] || null;
}

export function calculateNumerology(fullName: string, birthDate?: string): NumerologyResult {
  const destiny = reduceNumber(sumName(fullName));
  const soulUrge = reduceNumber(sumName(fullName, true));
  const personality = reduceNumber(sumName(fullName, false, true));

  let lifePath: number | undefined;
  let maturity: number | undefined;

  if (birthDate) {
    const date = new Date(birthDate);
    if (!isNaN(date.getTime())) {
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();
      const total = y + m + d;
      lifePath = reduceNumber(total);
      maturity = reduceNumber(lifePath + destiny);
    }
  }

  return { 
    destiny, 
    soulUrge, 
    personality, 
    lifePath: lifePath as (number | undefined), 
    maturity: maturity as (number | undefined) 
  };
}

export function getCombinedInsights(nameInfo: NameInfo | null, num: NumerologyResult): string[] {
  const insights: string[] = [];

  if (nameInfo) {
    insights.push(`Your name "${nameInfo.meaning}" suggests you are ${nameInfo.traits.slice(0, 2).join(' and ')}.`);
  }

  if (num.lifePath) {
    insights.push(`Life Path ${num.lifePath} indicates your core life lesson and natural talents.`);
  }

  insights.push(`Destiny ${num.destiny} reveals the path you are meant to walk in this lifetime.`);

  if (num.soulUrge > 5) {
    insights.push('Your Soul Urge shows a deep inner desire for freedom and self-expression.');
  } else {
    insights.push('Your Soul Urge points to a need for stability, family, and deep connections.');
  }

  if (num.personality) {
    insights.push(`Others often see you as having the qualities of Personality number ${num.personality}.`);
  }

  if (num.maturity) {
    insights.push(`In later life, your Maturity number ${num.maturity} suggests a blending of your Life Path and Destiny.`);
  }

  return insights;
}
