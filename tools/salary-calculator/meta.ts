import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'salary-calculator',
  name: 'Salary Calculator',
  title: 'Salary Calculator – Hourly to Annual & Take-Home Pay',
  description:
    'Free salary calculator. Convert hourly rate to yearly or monthly salary and estimate take-home pay after taxes and deductions.',
  category: 'calculator',
  icon: '💼',
  color: 'purple',
  keywords: [
    'salary calculator',
    'hourly to annual salary',
    'take home pay calculator',
    'wage to salary converter',
    'monthly salary calculator',
  ],
  canonical: '/salary-calculator',
  ogImage: '/og/salary-calculator.jpg',
  faqs: [
    {
      question: 'Does it include taxes?',
      answer: 'It provides a rough estimate. Actual take-home pay depends on your country, state, deductions, and tax bracket.',
    },
  ],
};
