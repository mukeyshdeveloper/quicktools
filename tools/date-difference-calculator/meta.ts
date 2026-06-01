import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'date-difference-calculator',
  name: 'Date Difference Calculator',
  title: 'Date Difference Calculator – Days, Months & Years Between Dates',
  description:
    'Free date difference calculator. Find the exact number of days, weeks, months, and years between any two dates. Useful for age, deadlines, and timelines.',
  category: 'calculator',
  icon: '📅',
  color: 'cyan',
  keywords: [
    'date difference calculator',
    'days between two dates',
    'how many days between dates',
    'time between dates',
    'date duration calculator',
  ],
  canonical: '/date-difference-calculator',
  ogImage: '/og/date-difference-calculator.jpg',
  faqs: [
    {
      question: 'Does it count leap years correctly?',
      answer: 'Yes. The calculator accounts for leap years when computing the exact number of days.',
    },
  ],
};
