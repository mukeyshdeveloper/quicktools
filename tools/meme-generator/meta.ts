import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'meme-generator',
  name: 'Meme Text Generator',
  title: 'Meme Generator – Create Custom Memes Instantly (No Upload)',
  description:
    'Free meme generator. Add Impact font text to your own images instantly in the browser. Create custom memes privately with no upload required.',
  category: 'generator',
  icon: '🎭',
  color: 'amber',
  keywords: [
    'meme generator',
    'meme maker online',
    'add text to image',
    'create meme',
    'impact font meme',
    'image text editor',
  ],
  canonical: '/meme-generator',
  ogImage: '/og/meme-generator.jpg',
  faqs: [
    {
      question: 'Are my images uploaded anywhere?',
      answer: 'No. Everything runs locally in your browser. Your photos stay on your device.',
    },
  ],
};
