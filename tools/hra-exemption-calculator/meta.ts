import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'hra-exemption-calculator',
  name: 'HRA Exemption Calculator',
  title: 'HRA Exemption Calculator – Calculate Tax-Free HRA Amount',
  description:
    'Free HRA Exemption Calculator as per Section 10(13A). Instantly calculate how much of your House Rent Allowance is tax-free based on salary, rent paid, and city type (Metro/Non-Metro).',
  category: 'calculator',
  icon: '🏠',
  color: 'blue',
  keywords: [
    'hra exemption calculator',
    'hra tax exemption',
    'calculate hra exemption',
    'section 10(13a) calculator',
    'tax free hra',
    'hra exemption india',
    'metro non metro hra',
  ],
  canonical: '/hra-exemption-calculator',
  ogImage: '/og/hra-exemption-calculator.jpg',
  faqs: [
    {
      question: 'What is HRA exemption under Section 10(13A)?',
      answer: 'If you receive House Rent Allowance (HRA) from your employer and pay rent, a portion of it is exempt from tax under Section 10(13A) of the Income Tax Act.',
    },
    {
      question: 'How is HRA exemption calculated?',
      answer: 'It is the least of: (1) Actual HRA received, (2) 50% of salary (Metro) or 40% (Non-Metro), (3) Rent paid minus 10% of salary.',
    },
    {
      question: 'Do I need to submit rent receipts for HRA exemption?',
      answer: 'Yes. For amounts above ₹3,000 per month, you generally need to submit rent receipts and a rent agreement to your employer. For amounts above ₹1 lakh per year, landlord PAN is also required.',
    },
    {
      question: 'Can I claim HRA exemption if I live in my own house?',
      answer: 'No. HRA exemption is only available if you are actually paying rent for a residential accommodation.',
    },
  ],
  whatIs: 'The HRA Exemption Calculator helps salaried employees determine how much of their House Rent Allowance (HRA) is exempt from income tax under Section 10(13A).',
};
