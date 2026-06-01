import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'slug-converter',
  name: 'URL Slug Converter',
  title: 'URL Slug Generator – Convert Text to SEO-Friendly Slugs',
  description:
    'Free URL slug generator. Convert titles and text into clean, SEO-optimized URL slugs. Handles special characters, spaces, and multiple formats instantly.',
  category: 'developer',
  icon: '🔗',
  color: 'sky',
  keywords: [
    'url slug generator',
    'slug converter',
    'seo slug generator',
    'text to url slug',
    'clean url maker',
  ],
  canonical: '/slug-converter',
  faqs: [
    {
      question: 'What makes a good URL slug?',
      answer: 'Short, descriptive, lowercase, uses hyphens instead of underscores or spaces, and contains the main keyword.',
    },
  ],
};
