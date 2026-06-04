import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'indian-numbering-converter',
  name: 'Indian Numbering System Converter',
  title: 'Indian Numbering Converter – Lakh, Crore to Million, Billion | QuickUtils',
  description: 'Convert between Indian numbering (Lakh, Crore, Arab) and International (Thousand, Million, Billion). Format numbers with correct commas instantly. Essential for finance, real estate, and business in India.',
  category: 'calculator',
  icon: '💱',
  color: 'amber',
  keywords: [
    'indian numbering converter',
    'lakh crore converter',
    'crore to million',
    'indian number format',
    'arab to billion',
    'number converter india',
  ],
  canonical: '/indian-numbering-converter',
  ogImage: '/og/indian-numbering-converter.jpg',
  faqs: [
    {
      question: 'How many zeros in a Crore?',
      answer: '1 Crore = 10,000,000 (7 zeros). 1 Lakh = 100,000 (5 zeros).',
    },
    {
      question: 'What comes after Crore?',
      answer: 'Arab (1,000,000,000), Kharab, Neel, Padma, Shankh in traditional Indian system.',
    },
  ],
  whatIs: 'A practical converter that helps Indians and businesses working with international partners translate large numbers between the two common systems.',
};
