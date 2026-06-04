import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'bulk-image-resizer',
  name: 'Bulk Image Resizer',
  title: 'Bulk Image Resizer – Resize Many Photos Instantly in Browser | QuickUtils',
  description:
    'Resize dozens of images at once. Set max dimensions, exact sizes, or percentage scale. Preserve aspect ratio, choose output format, and download all results. Completely private — no uploads.',
  category: 'generator',
  icon: '📐',
  color: 'sky',
  keywords: [
    'bulk image resizer',
    'resize multiple images',
    'batch photo resizer',
    'resize images online free',
    'image batch resize',
    'compress and resize photos',
  ],
  canonical: '/bulk-image-resizer',
  ogImage: '/og/bulk-image-resizer.jpg',
  faqs: [
    {
      question: 'How many images can I resize at once?',
      answer: 'Practically 30–100 depending on their size and your device memory. The tool processes them sequentially to stay responsive.',
    },
    {
      question: 'Does it keep the original aspect ratio?',
      answer: 'Yes by default (contain or cover modes). You can also force exact dimensions which may crop or stretch.',
    },
    {
      question: 'Can I also change the format while resizing?',
      answer: 'Yes. Choose to keep original format or force JPEG, PNG, or WebP for the whole batch.',
    },
  ],
  whatIs:
    'A powerful client-side batch resizer for photographers, developers, and content creators who need consistent image sizes for web, email, or social without ever sending files to a server.',
};
