import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'image-compressor',
  name: 'Image Compressor',
  title: 'Image Compressor – Reduce JPG, PNG & WebP Size (No Upload) | QuickUtils',
  description:
    'Free image compressor that runs entirely in your browser. Compress and resize JPG, PNG, and WebP images by up to 90% with no upload required.',
  category: 'generator',
  icon: '🖼️',
  color: 'orange',
  keywords: [
    'image compressor',
    'compress image online',
    'jpg compressor',
    'png compressor',
    'image optimizer',
    'reduce image size',
  ],
  canonical: '/image-compressor',
  ogImage: '/og/image-compressor.jpg',
  faqs: [
    {
      question: 'Is my image uploaded anywhere?',
      answer: 'No. All compression happens locally in your browser using JavaScript. Your photos never leave your device.',
    },
  ],
};
