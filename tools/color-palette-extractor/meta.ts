import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'color-palette-extractor',
  name: 'Color Palette Extractor',
  title: 'Color Palette Extractor – Get HEX from Any Image | QuickUtils',
  description:
    'Free color palette extractor. Upload an image and instantly get its dominant colors as HEX, RGB, and HSL. Great for design, branding, and UI work.',
  category: 'generator',
  icon: '🎨',
  color: 'pink',
  keywords: [
    'color palette extractor',
    'extract colors from image',
    'image color picker',
    'dominant color palette',
    'get hex from image',
  ],
  canonical: '/color-palette-extractor',
  ogImage: '/og/color-palette-extractor.jpg',
  faqs: [
    {
      question: 'How many colors does it extract?',
      answer: 'It extracts the top 6-8 most prominent colors from the image automatically.',
    },
  ],
};
