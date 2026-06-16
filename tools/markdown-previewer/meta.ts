import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'markdown-previewer',
  name: 'Markdown Previewer',
  title: 'Markdown Previewer – Live HTML Editor with Split View',
  description:
    'Free Markdown to HTML previewer. Write Markdown on the left and see live rendered HTML on the right. Supports GFM, tables, code highlighting, and export.',
  category: 'developer',
  icon: '📝',
  color: 'teal',
  keywords: [
    'markdown previewer',
    'markdown to html',
    'live markdown editor',
    'github flavored markdown',
    'markdown html converter',
  ],
  canonical: '/markdown-previewer',
  ogImage: '/og/markdown-previewer.jpg',
  faqs: [
    {
      question: 'Does it support GitHub Flavored Markdown?',
      answer: 'Yes. It supports tables, task lists, strikethrough, and most common GFM extensions.',
    },
    {
      question: 'Is my content saved?',
      answer: 'Your Markdown is processed 100% in your browser. We do not store or transmit your content. If you reload the page, the content will reset to the default example.',
    },
  ],
};
