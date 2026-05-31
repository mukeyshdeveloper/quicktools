import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'svg-to-base64',
  name: 'SVG to Base64 Converter',
  title: 'SVG to Base64 & Data URI Converter – Free Online Tool | QuickUtils',
  description:
    'Free SVG to Base64 converter. Turn SVG code into Data URIs for CSS backgrounds or inline HTML. Fast and private.',
  category: 'developer',
  icon: '🖼️',
  color: 'blue',
  keywords: [
    'svg to base64',
    'svg data uri generator',
    'svg to css background',
    'inline svg base64',
    'frontend svg tools',
  ],
  canonical: '/svg-to-base64',
  ogImage: '/og/svg-to-base64.jpg',
  faqs: [
    {
      question: 'When should I use Base64 SVGs?',
      answer: 'Base64/Data URIs are useful for small icons and to reduce HTTP requests, especially for CSS backgrounds.',
    },
  ],
};
