import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'profit-margin-calculator',
  name: 'Profit Margin & Markup Calculator',
  title: 'Profit Margin & Markup Calculator – Advanced Pricing Tool | QuickUtils',
  description: 'Calculate gross profit margin, markup percentage, and reverse engineer pricing. Supports target margin pricing, multiple scenarios, and clear explanations for business owners and freelancers.',
  category: 'business',
  icon: '💰',
  color: 'blue',
  keywords: [
    'profit margin calculator',
    'markup calculator',
    'gross margin',
    'pricing calculator',
    'margin vs markup',
    'target profit pricing',
  ],
  canonical: '/profit-margin-calculator',
  ogImage: '/og/profit-margin-calculator.jpg',
  faqs: [
    {
      question: 'What is the difference between margin and markup?',
      answer: 'Margin is profit as a percentage of selling price. Markup is profit as a percentage of cost. They are related but not the same number.',
    },
    {
      question: 'Which one should I use for pricing?',
      answer: 'Most businesses think in margins (what % of revenue is profit). Use markup when you know your cost and want a specific profit on top.',
    },
  ],
  whatIs: 'An advanced pricing calculator that removes the common confusion between margin and markup and helps you set profitable prices with confidence.',
};
