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
    {
      question: 'Will minification break my JavaScript code?',
      answer: 'No. Our minifier runs careful state tracking that preserves all string literals, template literals, and regex statements exactly as written. However, we always recommend keeping a backup of your original, highly formatted source code for future editing, as minified code is intentionally difficult to read.',
    },
    {
      question: 'Is this minification process secure?',
      answer: 'Absolutely. Unlike other online minification web apps that transmit your code to a remote server, QuickUtils processes all minification completely locally on your machine using client-side JavaScript. Your code never leaves your computer, ensuring total privacy.',
    },
  ],
};
