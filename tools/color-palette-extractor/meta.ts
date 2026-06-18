import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'color-palette-extractor',
  name: 'Color Palette Extractor',
  title: 'Color Palette from Image or URL – Extract HEX, RGB & More | QuickUtils',
  description:
    'Extract beautiful dominant color palettes from any image or public image URL. Get HEX, RGB, percentages, CSS variables, and exports. 100% private in your browser.',
  category: 'generator',
  icon: '🎨',
  color: 'pink',
  keywords: [
    'color palette extractor',
    'extract colors from image',
    'color palette from url',
    'dominant colors online',
    'get hex from image',
    'image color picker',
  ],
  canonical: '/color-palette-extractor',
  ogImage: '/og/color-palette-extractor.jpg',
  faqs: [
    {
      question: 'Can I extract from a URL?',
      answer: 'Yes — paste any public image URL. Note that many sites block cross-origin loading (CORS). Uploading the file always works reliably.',
    },
    {
      question: 'How many colors are extracted?',
      answer: 'You can choose between 3 and 12. The tool uses smart quantization and removes near-duplicates for a clean, useful palette.',
    },
    {
      question: 'Is my uploaded image sent to any server?',
      answer: 'No. All image processing is performed entirely inside your browser using the Canvas API. Your images never leave your device.',
    },
  ],
};
