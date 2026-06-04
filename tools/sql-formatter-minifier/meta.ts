import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'sql-formatter-minifier',
  name: 'SQL Formatter & Minifier',
  title: 'SQL Formatter & Minifier – Beautify and Compress SQL Instantly | QuickUtils',
  description:
    'Format ugly SQL into beautiful, readable code or minify it for production. Supports common dialects with smart keyword casing, indentation, and comment stripping. Essential for DBAs, developers, and code reviews.',
  category: 'developer',
  icon: '🗄️',
  color: 'emerald',
  keywords: [
    'sql formatter',
    'sql beautifier',
    'minify sql',
    'format sql online',
    'sql pretty print',
    'compress sql',
    'sql code formatter',
  ],
  canonical: '/sql-formatter-minifier',
  ogImage: '/og/sql-formatter-minifier.jpg',
  faqs: [
    {
      question: 'Which SQL dialects are supported?',
      answer: 'Basic support for PostgreSQL, MySQL, SQLite, and standard ANSI SQL. The formatter recognizes common keywords and functions across dialects.',
    },
    {
      question: 'Does it preserve comments?',
      answer: 'In format mode, inline and block comments are kept and nicely indented. In minify mode they are stripped to reduce size.',
    },
    {
      question: 'Is the output safe to run in production?',
      answer: 'Yes for formatting (it only changes whitespace and casing). Minified output is functionally identical but harder to read — use it for deployment or logging.',
    },
  ],
  whatIs:
    'A fast client-side tool that turns messy SQL into clean, consistent, readable statements or squeezes it down to the smallest possible size while keeping it valid.',
};
