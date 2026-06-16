import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'base64-encoder-decoder',
  name: 'Base64 Encoder / Decoder',
  title: 'Base64 Encoder & Decoder – Text & File Conversion',
  description:
    'Free Base64 encoder and decoder. Convert text or files to Base64 and decode them back instantly. 100% private – everything runs in your browser.',
  category: 'developer',
  icon: '🔐',
  color: 'cyan',
  keywords: [
    'base64 encoder',
    'base64 decoder',
    'base64 to text',
    'text to base64',
    'encode base64 online',
    'decode base64',
  ],
  canonical: '/base64-encoder-decoder',
  ogImage: '/og/base64-encoder-decoder.jpg',
  faqs: [
    {
      question: 'Can I encode files to Base64?',
      answer: 'Yes. You can upload small files and get their Base64 representation directly in the browser.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes. This tool runs 100% locally in your browser. Your input text and files are never sent to a server. We use the browser\'s native btoa() and atob() functions, meaning your sensitive API keys, passwords, and data stay completely private.',
    },
  ],
};
