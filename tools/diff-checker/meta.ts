import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'diff-checker',
  name: 'Diff Checker',
  title: 'Diff Checker – Compare Text & Code Side-by-Side | QuickUtils',
  description:
    'Free diff checker. Instantly compare two blocks of text or code with clear line-by-line highlighting. Ideal for developers, writers, and data analysts.',
  category: 'text',
  icon: '🔍',
  color: 'orange',
  keywords: [
    'diff checker',
    'text compare tool',
    'compare two texts',
    'text diff online',
    'code diff checker',
    'find differences in text',
  ],
  canonical: '/diff-checker',
  ogImage: '/og/diff-checker.jpg',
  faqs: [
    {
      question: 'Can it compare code files?',
      answer: 'Yes. It works great for comparing code, JSON, configs, and any text-based files.',
    },
  ],
};
