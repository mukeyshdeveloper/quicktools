import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'base64-image-optimizer',
  name: 'Base64 Image Optimizer',
  title: 'Base64 Image Optimizer – Compress & Resize Base64 Images | QuickUtils',
  description:
    'Paste or upload a base64 image and instantly get a smaller, optimized version. Control quality, max dimensions, and output format. Perfect for web developers who embed images in CSS, JSON, or HTML.',
  category: 'developer',
  icon: '🖼️',
  color: 'teal',
  keywords: [
    'base64 image compressor',
    'optimize base64 image',
    'compress base64 png jpg',
    'resize base64 image',
    'base64 image optimizer online',
  ],
  canonical: '/base64-image-optimizer',
  ogImage: '/og/base64-image-optimizer.jpg',
  faqs: [
    {
      question: 'How much can it reduce the size?',
      answer: 'Typical savings are 30–70% depending on original quality and chosen settings. The tool uses the browser\'s canvas with good JPEG/WebP encoders.',
    },
    {
      question: 'Does it support transparency?',
      answer: 'Yes for PNG output. For JPEG/WebP the background will be white (or the color you choose).',
    },
    {
      question: 'Is my image data private?',
      answer: 'Everything is processed locally in your browser using the Canvas API. No data is uploaded or stored.',
    },
  ],
  whatIs:
    'A specialized optimizer for the common (but heavy) case of base64-encoded images. It lets you trade quality and size before embedding images in code or data.',
};
