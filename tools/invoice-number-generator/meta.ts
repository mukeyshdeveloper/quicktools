import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'invoice-number-generator',
  name: 'Invoice Number Generator + Tracker',
  title: 'Invoice Number Generator & Tracker – Sequential IDs | QuickUtils',
  description: 'Generate clean sequential invoice numbers with custom prefixes. Track used numbers, dates, and clients locally. Never reuse or skip numbers again.',
  category: 'business',
  icon: '🔢',
  color: 'amber',
  keywords: [
    'invoice number generator',
    'sequential invoice numbers',
    'invoice tracker',
    'invoice id generator',
    'accounting number sequence',
  ],
  canonical: '/invoice-number-generator',
  ogImage: '/og/invoice-number-generator.jpg',
  faqs: [
    {
      question: 'Can I customize the prefix and starting number?',
      answer: 'Yes. Set any prefix (INV-, QT-, FY26-) and any starting number. The tool will continue sequentially from there.',
    },
    {
      question: 'Is the history saved?',
      answer: 'Yes, in your browser’s localStorage. You can see every number you generated along with optional client/date notes.',
    },
  ],
  whatIs: 'A simple compliance and organization tool that ensures your invoices, quotes, or any documents always have unique, sequential, professional numbering.',
};
