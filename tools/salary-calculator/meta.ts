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
      question: 'How is annual salary calculated from an hourly rate?',
      answer: 'Annual salary = Hourly Rate × Hours per Week × 52 weeks. The default is 40 hours per week, giving 2,080 working hours per year.',
    },
    {
      question: 'Is the tax calculation exact?',
      answer: 'The tax calculation uses a flat rate you provide. Real income taxes involve tax slabs, standard deductions, and other exemptions. Use this as a quick estimate, and consult a tax calculator for exact figures.',
    },
    {
      question: 'How do I calculate monthly take-home pay?',
      answer: 'First, find your gross annual salary. Deduct your estimated annual taxes. Then, divide the remaining amount by 12. This calculator does all of this instantly based on your inputs.',
    },
    {
      question: 'Is this salary calculator specific to India?',
      answer: 'No, this calculator is universal. It works with any currency because it strictly calculates the mathematical breakdown of hourly, weekly, monthly, and yearly wages.',
    },
  ],
};
