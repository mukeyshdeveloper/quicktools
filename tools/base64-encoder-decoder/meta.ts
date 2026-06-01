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
  faqs: [
    {
      question: 'Can I encode files to Base64?',
      answer: 'Yes. You can upload small files and get their Base64 representation directly in the browser.',
    },
  ],
};
