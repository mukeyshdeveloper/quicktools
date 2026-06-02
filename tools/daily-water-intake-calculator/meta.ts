import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'daily-water-intake-calculator',
  name: 'Daily Water Intake Calculator',
  title: 'Daily Water Intake Calculator – How Much Water Should You Drink?',
  description:
    'Calculate your personalized daily water needs based on body weight, activity, exercise, and climate. Includes a built-in daily intake tracker with progress, logging, and optional in-tab reminders.',
  category: 'health',
  icon: '💧',
  color: 'sky',
  keywords: [
    'daily water intake calculator',
    'how much water should I drink',
    'hydration calculator',
    'water intake tracker',
    'daily hydration log',
    'water reminder',
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
    {
      question: 'How do the in-tab reminders work?',
      answer: 'When you enable reminders the tool uses the browser Notification API to show a gentle prompt at your chosen interval. The tab must stay open and the page visible for notifications to fire. It also shows an in-page banner as a reliable fallback.',
    },
    {
      question: 'Is my intake data saved or sent anywhere?',
      answer: 'No. Everything is stored only in your browser’s localStorage and is automatically cleared the next calendar day. Nothing leaves your device.',
    },
  ],
  whatIs: 'Daily water intake is the total fluid your body needs to maintain optimal cellular function, temperature regulation, joint health, and cognitive performance. Needs increase with heat, exercise, and larger body mass.',
};
