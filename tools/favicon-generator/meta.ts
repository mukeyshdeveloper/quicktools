import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'favicon-generator',
  name: 'Favicon / ICO Generator',
  title: 'Favicon Generator – Convert Image to .ico for Websites',
  description:
    'Free favicon generator. Convert PNG, JPG, or WebP images into proper .ico favicon files for your website. Multiple sizes supported.',
  category: 'developer',
  icon: '🖼️',
  color: 'blue',
  keywords: [
    'favicon generator',
    'image to ico',
    'create favicon online',
    'png to ico converter',
    'website icon maker',
  ],
  canonical: '/favicon-generator',
  ogImage: '/og/favicon-generator.jpg',
  faqs: [
    {
      question: 'What size should my favicon be?',
      answer: 'Modern browsers support multiple sizes. We generate a standard .ico that includes 16×16, 32×32, and 48×48 for best compatibility.',
    },
  ],
};
