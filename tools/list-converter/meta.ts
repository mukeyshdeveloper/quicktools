import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'list-converter',
  name: 'List to Comma Converter',
  title: 'List Converter – Comma, Pipe, SQL, Array Formatter',
  description:
    'Convert vertical lists to comma-separated, pipe, tab, or custom delimited strings. Add quotes, escape for SQL, and prepare data for code or spreadsheets.',
  category: 'text',
  icon: '🔗',
  color: 'indigo',
  keywords: [
    'comma separator',
    'list to csv',
    'delimiter converter',
    'sql in clause generator',
    'convert column to comma separated',
  ],
  canonical: '/list-converter',
  ogImage: '/og/list-converter.jpg',
  faqs: [
    {
      question: 'Can it handle large lists?',
      answer: 'Yes. It processes thousands of lines instantly in your browser with no upload required.',
    },
  ],
};
