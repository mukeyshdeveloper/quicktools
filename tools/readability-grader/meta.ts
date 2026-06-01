import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'readability-grader',
  name: 'Readability Grader',
  title: 'Readability Checker – Flesch-Kincaid & More',
  description:
    'Free readability grader. Get Flesch-Kincaid, Gunning Fog, and other readability scores for your content. See grade level and suggestions to improve clarity.',
  category: 'text',
  icon: '📚',
  color: 'violet',
  keywords: [
    'readability checker',
    'flesch kincaid readability',
    'reading level calculator',
    'content readability score',
    'writing clarity tool',
  ],
  canonical: '/readability-grader',
  ogImage: '/og/readability-grader.jpg',
  faqs: [
    {
      question: 'What is a good readability score?',
      answer: 'For general web content, aim for Grade 7–9 (Flesch-Kincaid). Most successful blog posts and marketing copy target 60+ on the Flesch Reading Ease scale.',
    },
  ],
};
