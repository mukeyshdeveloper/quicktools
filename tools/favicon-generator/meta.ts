import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'favicon-generator',
  name: 'Favicon + App Icon Generator',
  title: 'Favicon & App Icon Generator – All Sizes + PWA Manifest | QuickUtils',
  description:
    'Generate complete favicon sets (16×16 to 512×512), Apple touch icons, and PWA icons from one square image. Includes ready-to-use manifest.json snippet. Everything runs locally.',
  category: 'developer',
  icon: '🖼️',
  color: 'blue',
  keywords: [
    'favicon generator',
    'app icon generator',
    'pwa icons',
    'apple touch icon',
    'generate icons from image',
    'website favicon kit',
  ],
  canonical: '/favicon-generator',
  ogImage: '/og/favicon-generator.jpg',
  faqs: [
    {
      question: 'Do I still need a .ico file?',
      answer: 'Modern sites can rely on PNGs referenced in <link> tags and manifest.json. We focus on high-quality PNGs for all required sizes.',
    },
    {
      question: 'What sizes are generated?',
      answer: '16, 32, 48 (classic web), 180 (Apple), 192 & 512 (PWA / Android).',
    },
  ],
};
