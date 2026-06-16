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
      answer: 'BMR (Basal Metabolic Rate) is the amount of calories your body burns at complete rest just to keep you alive. TDEE (Total Daily Energy Expenditure) multiplies your BMR by your physical activity level to estimate your actual daily calorie needs.',
    },
    {
      question: 'How accurate is this TDEE calculator?',
      answer: 'It uses the Mifflin-St Jeor equation, which is widely considered the most accurate formula for estimating BMR and TDEE. However, it is still an estimate. For best results, use these numbers as a starting point and adjust based on how your body weight responds over a few weeks.',
    },
    {
      question: 'Should I eat my TDEE to lose weight?',
      answer: 'No. Eating your exact TDEE will maintain your current weight. To lose weight, you need to eat in a calorie deficit (usually 300-500 calories below your TDEE).',
    },
    {
      question: 'Do I need to track macros or just calories?',
      answer: 'Calories dictate weight change (loss or gain), while macronutrients (protein, carbs, fat) dictate body composition. If you only care about weight loss, calories are enough. If you want to lose fat while keeping muscle, you must track protein.',
    },
  ],
};
