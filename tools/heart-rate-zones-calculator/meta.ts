import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'heart-rate-zones-calculator',
  name: 'Heart Rate Zones Calculator',
  title: 'Heart Rate Zones Calculator – 5 Training Zones for Cardio',
  description:
    'Calculate your 5 personalized heart rate training zones using maximum heart rate or the more accurate Karvonen (heart rate reserve) method. Optimize fat burn, endurance, and VO2max workouts.',
  category: 'health',
  icon: '❤️',
  color: 'red',
  keywords: [
    'heart rate zones calculator',
    'hr zones',
    '5 zone heart rate training',
    'karvonen method',
    'fat burn zone calculator',
    'cardio training zones',
    'maximum heart rate zones',
    'endurance heart rate zones',
  ],
  canonical: '/heart-rate-zones-calculator',
  ogImage: '/og/heart-rate-zones-calculator.jpg',
  faqs: [
    {
      question: 'Is 220 − age accurate for max heart rate?',
      answer: 'It is a simple population average and can be off by 10–15 bpm for individuals. The Karvonen method using your actual resting heart rate is significantly more accurate for training prescription.',
    },
    {
      question: 'How do I measure my resting heart rate?',
      answer: 'Measure first thing in the morning before getting out of bed. Count your pulse for 60 seconds or use a chest strap / good wrist HR monitor. Average 3–5 mornings for best results.',
    },
  ],
  whatIs: 'Heart rate zones divide your maximum working heart rate into five intensity bands. Training in specific zones produces different physiological adaptations — from easy aerobic base building to high-intensity VO2max improvements.',
};
