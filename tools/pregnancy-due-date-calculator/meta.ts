import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'pregnancy-due-date-calculator',
  name: 'Pregnancy Due Date Calculator',
  title: 'Pregnancy Due Date Calculator – Find Your Baby’s EDD',
  description:
    'Free pregnancy due date calculator. Estimate your baby’s arrival based on last menstrual period, conception date, or ultrasound.',
  category: 'health',
  icon: '👶',
  color: 'pink',
  keywords: [
    'pregnancy due date calculator',
    'EDD calculator',
    'when is my baby due',
    'pregnancy calculator',
    'conception date calculator',
  ],
  canonical: '/pregnancy-due-date-calculator',
  ogImage: '/og/pregnancy-due-date-calculator.jpg',
  faqs: [
    {
      question: 'How accurate is the due date calculation?',
      answer: 'It’s an estimate. Only about 5% of babies are born exactly on their due date. Most arrive within a week before or after.',
    },
  ],
};
