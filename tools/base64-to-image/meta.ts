import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'base64-to-image',
  name: 'Base64 to Image Decoder',
  title: 'Base64 to Image – Decode & Download Instantly (Free)',
  description:
    'Free Base64 to image converter. Paste any Base64 string and instantly preview + download the image. 100% private and offline.',
  category: 'developer',
  icon: '👁️',
  color: 'teal',
  keywords: [
    'base64 to image',
    'decode base64 image',
    'base64 image converter',
    'view base64 image',
    'base64 decoder online',
  ],
  canonical: '/base64-to-image',
  ogImage: '/og/base64-to-image.jpg',
  faqs: [
    {
      question: 'What kind of Base64 images can I decode?',
      answer: 'Most common formats: PNG, JPG, GIF, WebP, and SVG Base64 strings work well.',
    },
    {
      question: 'Is my decoded image sent to any server?',
      answer: 'No. The decoding is done completely inside your browser using JavaScript and HTML canvas. Your Base64 strings never leave your device.',
    },
  ],
};
