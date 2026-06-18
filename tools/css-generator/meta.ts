import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'css-generator',
  name: 'CSS Shadow & Gradient',
  title: 'CSS Box-Shadow & Gradient Generator – Visual Editor',
  description:
    'Free visual CSS generator. Create beautiful box-shadows and linear/radial gradients with live preview. Copy ready-to-use CSS instantly.',
  category: 'developer',
  icon: '🎨',
  color: 'pink',
  keywords: [
    'css box shadow generator',
    'css gradient generator',
    'linear gradient css',
    'radial gradient css',
    'visual css editor',
  ],
  canonical: '/css-generator',
  ogImage: '/og/css-generator.jpg',
  faqs: [
    {
      question: 'Can I use multiple shadows?',
      answer: 'Yes. The generator supports comma-separated multiple box-shadows for layered effects.',
    },
    {
      question: 'What gradient types are supported?',
      answer: 'Linear, radial, and conic gradients are all supported, with full control over angle, color stops, and positions.',
    },
    {
      question: 'Is my design data sent anywhere?',
      answer: 'No. All CSS generation runs 100% locally in your browser. No shadow or gradient configurations are stored on our servers.',
    },
  ],
};
