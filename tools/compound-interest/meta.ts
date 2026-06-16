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
    {
      question: 'What is compound interest?',
      answer: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, compound interest grows exponentially, making it one of the most powerful wealth-building concepts in finance.',
    },
    {
      question: 'How often should interest compound?',
      answer: 'The more frequently interest compounds, the more you earn. Daily compounding yields slightly more than monthly, which yields more than yearly. Most savings accounts and fixed deposits compound monthly or quarterly.',
    },
  ],
};
