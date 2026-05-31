import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'period-calculator',
  name: 'Period & Ovulation Tracker',
  title: 'Period Tracker & Ovulation Calculator – Predict Your Cycle | QuickUtils',
  description:
    'Free period and ovulation tracker. Calculate your next period date, fertile window, and ovulation based on your average cycle length.',
  category: 'health',
  icon: '🩸',
  color: 'rose',
  keywords: [
    'period tracker',
    'ovulation calculator',
    'menstrual cycle calculator',
    'fertile window predictor',
    'when is my next period',
  ],
  canonical: '/period-calculator',
  ogImage: '/og/period-calculator.jpg',
  faqs: [
    {
      question: 'How accurate is the prediction?',
      answer: 'It is an estimate based on your average cycle. Actual cycles can vary due to stress, illness, travel, etc.',
    },
  ],
};
