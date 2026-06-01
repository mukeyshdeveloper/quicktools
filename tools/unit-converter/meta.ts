import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'unit-converter',
  name: 'Unit Converter',
  title: 'Unit Converter – Convert Length, Weight, Temperature & More',
  description:
    'Free unit converter for length, weight, temperature, volume, speed, time, data, pressure, energy and more. Fast and accurate conversions.',
  category: 'calculator',
  icon: '📐',
  color: 'green',
  keywords: [
    'unit converter',
    'measurement converter',
    'length converter',
    'weight converter',
    'temperature converter',
    'speed converter online',
  ],
  canonical: '/unit-converter',
  faqs: [
    {
      question: 'How accurate are the conversions?',
      answer: 'We use standard conversion factors. For everyday use the results are highly accurate. Some specialized units may use common approximations.',
    },
  ],
};
