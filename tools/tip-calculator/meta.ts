import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'tip-calculator',
  name: 'Tip Calculator & Bill Splitter',
  title: 'Tip Calculator & Bill Splitter – Calculate Tips & Split the Check',
  description:
    'Free tip calculator with bill splitter. Calculate tip amount, total bill, and split the cost evenly among friends. Supports custom tip percentages.',
  category: 'calculator',
  icon: '🧾',
  color: 'amber',
  keywords: [
    'tip calculator',
    'bill splitter',
    'restaurant tip calculator',
    'split the bill',
    'gratuity calculator',
    'calculate tip and split',
  ],
  canonical: '/tip-calculator',
  ogImage: '/og/tip-calculator.jpg',
  faqs: [
    {
      question: 'What is a good tip percentage in restaurants?',
      answer: 'In most places, 15–20% is standard for good service. 10% for basic service, 25%+ for excellent service.',
    },
    {
      question: 'Can I split the bill unevenly?',
      answer: 'The current version splits equally. For uneven splits you can calculate the total first then divide manually.',
    },
  ],
};
