import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'mockup-generator',
  name: 'Simple Mockup Generator',
  title: 'Mockup Generator – Phone & Laptop Product Mockups | QuickUtils',
  description:
    'Turn any screenshot or photo into beautiful phone and laptop mockups instantly. Choose device, color, and export high-quality PNGs. Perfect for landing pages, portfolios, and presentations — all in your browser.',
  category: 'generator',
  icon: '💻',
  color: 'indigo',
  keywords: [
    'mockup generator',
    'phone mockup',
    'laptop mockup',
    'app screenshot mockup',
    'product mockup online',
    'free mockup maker',
  ],
  canonical: '/mockup-generator',
  ogImage: '/og/mockup-generator.jpg',
  faqs: [
    {
      question: 'Are the mockup frames high resolution?',
      answer: 'Yes. The generator renders at 2× retina scale internally so your exported PNGs look crisp even on high-DPI screens and in print.',
    },
    {
      question: 'Can I change the device color?',
      answer: 'You can pick from several popular finishes (Space Black, Silver, Gold, Midnight, etc.) that affect the bezel and camera details.',
    },
    {
      question: 'Is my image uploaded anywhere?',
      answer: 'Never. The photo is composited entirely locally using Canvas. Nothing leaves your computer.',
    },
  ],
  whatIs:
    'A fast, private way to create professional-looking device mockups from your screenshots or product photos without expensive design software or stock mockup sites.',
};
