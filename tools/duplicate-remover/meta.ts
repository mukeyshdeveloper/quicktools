import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'duplicate-remover',
  name: 'Duplicate Line Remover',
  title: 'Remove Duplicate Lines – Clean, Sort & Deduplicate Text | QuickUtils',
  description:
    'Free duplicate line remover. Instantly clean lists by removing duplicates, empty lines, and sort alphabetically, by length, or in reverse order.',
  category: 'text',
  icon: '🧹',
  color: 'emerald',
  keywords: [
    'remove duplicate lines',
    'duplicate line remover',
    'list deduplicator',
    'text cleaner',
    'sort list online',
  ],
  canonical: '/duplicate-remover',
  ogImage: '/og/duplicate-remover.jpg',
  faqs: [
    {
      question: 'Does it remove case-sensitive duplicates?',
      answer: 'By default it treats "Apple" and "apple" as different. You can normalize case before processing if needed.',
    },
  ],
};
