import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'image-converter',
  name: 'Image Format Converter',
  title: 'Image Format Converter – JPG, PNG, WebP & More (No Upload)',
  description:
    'Free image format converter. Convert between JPG, PNG, WebP, AVIF, GIF and other formats instantly in your browser. No upload, no signup, private.',
  category: 'generator',
  icon: '🔄',
  color: 'blue',
  keywords: [
    'image format converter',
    'jpg to webp converter',
    'png to webp',
    'convert image online',
    'webp converter',
    'image format changer',
  ],
  canonical: '/image-converter',
  ogImage: '/og/image-converter.jpg',
  faqs: [
    {
      question: 'Is my image uploaded to a server?',
      answer: 'No. All conversion happens locally in your browser. Your images never leave your device.',
    },
  ],
};
