export interface WeekInfo {
  week: number;
  trimester: 1 | 2 | 3;
  babySize: string;
  milestone: string;
  symptoms: string[];
  tips: string[];
}

export const WEEK_DATA: WeekInfo[] = [
  { week: 1, trimester: 1, babySize: 'Poppy seed', milestone: 'Fertilization occurs.', symptoms: ['No symptoms yet'], tips: ['Start prenatal vitamins'] },
  { week: 4, trimester: 1, babySize: 'Sesame seed', milestone: 'Implantation. Pregnancy test may be positive.', symptoms: ['Light spotting', 'Fatigue'], tips: ['Avoid alcohol and smoking'] },
  { week: 8, trimester: 1, babySize: 'Raspberry', milestone: 'Major organs forming. Heartbeat detectable.', symptoms: ['Morning sickness', 'Breast tenderness'], tips: ['Eat small frequent meals'] },
  { week: 12, trimester: 1, babySize: 'Lime', milestone: 'End of first trimester. Risk of miscarriage drops.', symptoms: ['Less nausea for many'], tips: ['Schedule first prenatal visit'] },
  { week: 16, trimester: 2, babySize: 'Avocado', milestone: 'Baby can make facial expressions.', symptoms: ['Increased energy', 'Round ligament pain'], tips: ['Start feeling baby move soon'] },
  { week: 20, trimester: 2, babySize: 'Banana', milestone: 'Anatomy scan time. Baby can hear.', symptoms: ['Backache', 'Leg cramps'], tips: ['Stay hydrated'] },
  { week: 24, trimester: 2, babySize: 'Ear of corn', milestone: 'Viability milestone. Lungs developing.', symptoms: ['Heartburn', 'Swelling'], tips: ['Consider childbirth classes'] },
  { week: 28, trimester: 3, babySize: 'Eggplant', milestone: 'Brain developing rapidly. Baby has sleep cycles.', symptoms: ['Shortness of breath', 'Frequent urination'], tips: ['Pack hospital bag soon'] },
  { week: 32, trimester: 3, babySize: 'Squash', milestone: 'Bones hardening. Baby gaining weight fast.', symptoms: ['Insomnia', 'Braxton Hicks'], tips: ['Rest with feet up'] },
  { week: 36, trimester: 3, babySize: 'Honeydew', milestone: 'Full term approaching. Baby is head down usually.', symptoms: ['Pelvic pressure', 'Fatigue'], tips: ['Final preparations'] },
  { week: 40, trimester: 3, babySize: 'Small pumpkin', milestone: 'Due date! Baby is ready.', symptoms: ['Labor signs'], tips: ['Stay calm and follow your birth plan'] },
];

export function getCurrentWeek(dueDate: Date): number {
  const today = new Date();
  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const weeksLeft = Math.round(diffDays / 7);
  return Math.max(1, Math.min(42, 40 - weeksLeft));
}

export function getWeekInfo(week: number): WeekInfo {
  return WEEK_DATA.find(w => w.week <= week) || WEEK_DATA[WEEK_DATA.length - 1]!;
}
