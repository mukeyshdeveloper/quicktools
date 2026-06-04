import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'image-watermark',
  name: 'Image Watermark Tool',
  title: 'Image Watermark Tool – Add Text & Logo Watermarks | QuickUtils',
  description:
    'Add professional text and logo watermarks to your images. Control position, opacity, rotation, size, and color. Works on single images or entire batches. 100% private and offline.',
  category: 'generator',
  icon: '💧',
  color: 'rose',
  keywords: [
    'image watermark',
    'add watermark to photo',
    'text watermark online',
    'logo watermark tool',
    'batch watermark images',
    'protect images with watermark',
  ],
  canonical: '/image-watermark',
  ogImage: '/og/image-watermark.jpg',
  faqs: [
    {
      question: 'Can I add both text and a logo at the same time?',
      answer: 'Yes. You can add a text line and upload a logo (PNG with transparency recommended) and position them independently.',
    },
    {
      question: 'Does it support batch processing?',
      answer: 'Absolutely. Upload multiple base images and the same watermark settings will be applied to every photo in the batch.',
    },
    {
      question: 'Will the watermark look good on both light and dark photos?',
      answer: 'Use the opacity slider and consider a subtle drop shadow or outline for text. You can also add the watermark multiple times with different positions.',
    },
  ],
  whatIs:
    'A flexible, private watermarking studio that lets creators, agencies, and sellers protect and brand their visual assets without ever uploading the originals to a third-party service.',
};
