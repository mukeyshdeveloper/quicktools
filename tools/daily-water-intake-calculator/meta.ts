import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'daily-water-intake-calculator',
  name: 'Daily Water Intake Calculator',
  title: 'Daily Water Intake Calculator – How Much Water Should You Drink?',
  description:
    'Calculate your personalized daily water needs based on body weight, activity level, exercise, and climate. Science-backed hydration goals for health, energy, and performance.',
  category: 'health',
  icon: '💧',
  color: 'sky',
  keywords: [
    'daily water intake calculator',
    'how much water should I drink',
    'hydration calculator',
    'water intake by weight',
    'personalized water goal',
    'how many liters of water per day',
    'exercise hydration',
    'climate water intake',
  ],
  canonical: '/daily-water-intake-calculator',
  ogImage: '/og/daily-water-intake-calculator.jpg',
  faqs: [
    {
      question: 'Is the 8 glasses a day rule accurate?',
      answer: 'It is a rough average. Actual needs vary significantly with body size, activity, heat, and diet. Our calculator gives a more personalized estimate.',
    },
    {
      question: 'Do coffee, tea, or other drinks count toward water intake?',
      answer: 'Yes, most non-alcoholic beverages contribute. However, water is ideal. Caffeinated drinks have a mild diuretic effect but still provide net hydration for most people.',
    },
  ],
  whatIs: 'Daily water intake is the total fluid your body needs to maintain optimal cellular function, temperature regulation, joint health, and cognitive performance. Needs increase with heat, exercise, and larger body mass.',
};
