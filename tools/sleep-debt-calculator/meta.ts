import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'sleep-debt-calculator',
  name: 'Sleep Debt Calculator',
  title: 'Sleep Debt Calculator – Track & Recover Your Sleep | QuickUtils',
  description: 'Calculate how much sleep you owe your body. Log your recent nights, see your cumulative sleep debt, and get a realistic recovery plan. Improve energy and health.',
  category: 'health',
  icon: '🌙',
  color: 'indigo',
  keywords: [
    'sleep debt calculator',
    'sleep tracker',
    'how much sleep do I need',
    'sleep deficit',
    'recovery sleep plan',
  ],
  canonical: '/sleep-debt-calculator',
  ogImage: '/og/sleep-debt-calculator.jpg',
  faqs: [
    {
      question: 'What is sleep debt?',
      answer: 'Sleep debt is the cumulative difference between the sleep you need and the sleep you actually get over time.',
    },
    {
      question: 'Can I pay off sleep debt quickly?',
      answer: 'You can recover some with extra sleep on weekends, but chronic debt takes consistent good habits over weeks to fully repay.',
    },
    {
      question: 'Is my sleep history data secure?',
      answer: 'Yes. All data you enter in the sliders remains entirely local in your browser. No personal logs or history are sent to external databases or servers.',
    },
  ],
  whatIs: 'A practical tool that quantifies your sleep shortfall and gives actionable steps to get back on track.',
};
