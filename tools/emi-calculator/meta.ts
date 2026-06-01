import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'emi-calculator',
  name: 'EMI Calculator',
  title: 'EMI Calculator – Home, Car & Personal Loan EMI (India)',
  description:
    'Free EMI calculator for Indian loans. Get monthly EMI, total interest, and full repayment schedule for home, car, and personal loans using reducing balance method.',
  category: 'calculator',
  icon: '🏦',
  color: 'blue',
  keywords: [
    'emi calculator',
    'home loan emi calculator',
    'car loan emi',
    'personal loan emi',
    'loan emi calculator india',
  ],
  canonical: '/emi-calculator',
  ogImage: '/og/emi-calculator.jpg',
  faqs: [
    {
      question: 'How is EMI calculated in India?',
      answer: 'Using the reducing balance method. The formula is EMI = [P × r × (1+r)^n] / [(1+r)^n – 1].',
    },
    {
      question: 'Does prepayment reduce my EMI or tenure?',
      answer: 'Most Indian lenders first reduce the remaining tenure, though some allow you to choose lower EMI. Check with your bank.',
    },
  ],
};
