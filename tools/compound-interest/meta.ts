import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'compound-interest-calculator',
  name: 'Compound Interest Calculator',
  title: 'Compound Interest Calculator – See Investment Growth Over Time',
  description:
    'Free compound interest calculator. See how your money grows with different compounding frequencies, monthly contributions, and time horizons.',
  category: 'calculator',
  icon: '📈',
  color: 'green',
  keywords: [
    'compound interest calculator',
    'investment growth calculator',
    'compound interest formula',
    'savings calculator with interest',
  ],
  canonical: '/compound-interest-calculator',
  ogImage: '/og/compound-interest-calculator.jpg',
  faqs: [
    {
      question: 'What is the power of compounding?',
      answer: 'Compounding means your returns start earning returns. Over long periods this dramatically increases final wealth compared to simple interest.',
    },
  ],
};
