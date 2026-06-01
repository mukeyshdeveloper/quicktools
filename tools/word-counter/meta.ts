import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'word-counter',
  name: 'Word Counter',
  title: 'Word Counter – Free Word, Character & Sentence Counter',
  description:
    'Free word counter. Count words, characters, sentences, paragraphs, and reading time instantly. Paste text or type directly.',
  category: 'text',
  icon: '✍️',
  color: 'blue',
  keywords: [
    'word counter',
    'character counter',
    'word count tool',
    'character count online',
    'reading time calculator',
  ],
  canonical: '/word-counter',
  faqs: [
    {
      question: 'Does it count words in real time?',
      answer:
        'Yes. The counter updates instantly as you type or paste text. No need to click any button.',
    },
    {
      question: 'How is reading time calculated?',
      answer:
        'We use an average reading speed of 200 words per minute, which is standard for general English text.',
    },
  ],
};
