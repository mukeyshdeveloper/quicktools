import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'code-minifier',
  name: 'Code Minifier (HTML/CSS/JS)',
  title: 'Code Minifier – Minify HTML, CSS & JavaScript',
  description:
    'Free online code minifier. Compress HTML, CSS, and JavaScript by removing whitespace and comments. See before/after size comparison.',
  category: 'developer',
  icon: '🗜️',
  color: 'violet',
  keywords: [
    'code minifier',
    'html minifier',
    'css minifier',
    'javascript minifier',
    'minify js online',
    'code compressor',
  ],
  canonical: '/code-minifier',
  ogImage: '/og/code-minifier.jpg',
  faqs: [
    {
      question: 'Is minification safe for production?',
      answer: 'Yes for most cases. It only removes whitespace and comments. Always test your minified code, especially with JavaScript.',
    },
  ],
};
