import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'image-converter',
  name: 'Image to WebP / AVIF Converter',
  title: 'Image to WebP/AVIF Converter – Bulk Format + Resize (Private)',
  description:
    'Convert images to WebP and AVIF (plus JPEG/PNG). Resize in bulk, control quality, and download everything. Zero uploads — all processing happens in your browser.',
  category: 'generator',
  icon: '🔄',
  color: 'blue',
  keywords: [
    'webp converter',
    'avif converter',
    'image to webp',
    'bulk image converter',
    'jpg to avif',
    'convert images online free',
  ],
  canonical: '/image-converter',
  ogImage: '/og/image-converter.jpg',
  faqs: [
    {
      question: 'Does AVIF work in all browsers?',
      answer: 'AVIF encoding is supported in recent Chromium browsers (Chrome, Edge, Opera). The tool gracefully falls back to WebP when needed.',
    },
    {
      question: 'Can I resize while converting?',
      answer: 'Yes. Set a Max Width or Max Height and the converter will downscale while changing format for the whole batch.',
    },
  ],
};
