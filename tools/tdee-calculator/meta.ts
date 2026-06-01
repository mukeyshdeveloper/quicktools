import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'tdee-calculator',
  name: 'TDEE & Macro Calculator',
  title: 'TDEE Calculator – Daily Calories & Macro Split (Free)',
  description:
    'Free TDEE calculator. Find your Total Daily Energy Expenditure and get personalized protein, carbs, and fat recommendations for weight loss, maintenance, or muscle gain.',
  category: 'health',
  icon: '🔥',
  color: 'red',
  keywords: [
    'tdee calculator',
    'macro calculator',
    'daily calorie needs',
    'tdee and macros',
    'weight loss calorie calculator',
    'bulking macros',
  ],
  canonical: '/tdee-calculator',
  ogImage: '/og/tdee-calculator.jpg',
  faqs: [
    {
      question: 'What is the difference between BMR and TDEE?',
      answer: 'BMR is the calories you burn at complete rest. TDEE multiplies BMR by your activity level to estimate real-world daily calorie needs.',
    },
  ],
};
