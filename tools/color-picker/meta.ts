import type { ToolMeta } from '@/types/tool'

export const meta: ToolMeta = {
  slug: 'color-picker',
  name: 'Color Picker',
  title: 'Color Picker – HEX, RGB, HSL Converter & Palette Tool',
  description:
    'Free online color picker. Pick colors, convert between HEX / RGB / HSL / HSV, generate harmonious palettes, and copy values instantly.',
  category: 'developer',
  icon: '🎨',
  color: 'purple',
  keywords: [
    'color picker online',
    'hex to rgb converter',
    'color palette generator',
    'hsl color picker',
    'web color tools',
  ],
  canonical: '/color-picker',
  ogImage: '/og/color-picker.jpg',
  faqs: [
    {
      question: 'Can I generate color palettes?',
      answer: 'Yes. After picking a base color you can generate analogous, complementary, triadic, and monochromatic palettes with one click.',
    },
    {
      question: 'What color formats are supported?',
      answer: 'HEX, RGB, HSL, and HSV. You can type in any of these formats and the tool instantly converts to all others.',
    },
    {
      question: 'Is my color data tracked or stored?',
      answer: 'No. All conversions and palette generations run entirely in your browser. Nothing is sent to or saved on any server.',
    },
  ],
}
