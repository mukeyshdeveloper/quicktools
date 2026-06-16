import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'period-calculator',
  name: 'Period & Ovulation Tracker',
  title: 'Period Tracker & Ovulation Calculator – Predict Your Cycle',
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
      answer: 'It is an estimate based on your average cycle. Actual cycles can vary due to stress, illness, travel, weight changes, and other factors.',
    },
    {
      question: 'How do you predict my cycle and fertile window?',
      answer: 'Your next period is predicted by adding your average cycle length to the start date of your last period. Ovulation typically occurs about 14 days before your next period, and your fertile window represents the 5 days leading up to ovulation plus the day of ovulation itself.',
    },
    {
      question: 'Is my menstrual cycle data private?',
      answer: 'Yes, 100%. Unlike mobile tracking apps that upload your sensitive health data to the cloud, this tracker operates entirely locally in your web browser. No data is stored, shared, or sent to any server.',
    },
  ],
};
