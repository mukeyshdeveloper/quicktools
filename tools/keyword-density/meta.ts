import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'keyword-density',
  name: 'Keyword Density Checker',
  title: 'Keyword Density Checker – Analyze Word Frequency & SEO',
  description:
    'Free keyword density tool. Analyze word frequency, keyword usage, and stop words in your content to optimize for SEO without overstuffing.',
  category: 'text',
  icon: '📊',
  color: 'emerald',
  keywords: [
    'keyword density checker',
    'keyword frequency analyzer',
    'seo content analyzer',
    'word frequency counter',
    'keyword density tool',
  ],
  canonical: '/keyword-density',
  ogImage: '/og/keyword-density.jpg',
  faqs: [
    {
      question: 'What is ideal keyword density?',
      answer: 'There is no magic number. Most modern SEO experts recommend natural usage between 0.5–2.5% for primary keywords. Focus on context and user intent over exact percentages.',
    },
  ],
};
