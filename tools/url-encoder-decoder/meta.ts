import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'url-encoder-decoder',
  name: 'URL Encoder / Decoder',
  title: 'URL Encoder & Decoder – Live Query String Tool',
  description:
    'Free URL encoder and decoder with live query parameter parser. Encode/decode URLs and visually edit query strings for debugging and development.',
  category: 'developer',
  icon: '🔗',
  color: 'emerald',
  keywords: [
    'url encoder',
    'url decoder',
    'urlencode online',
    'urldecode',
    'query string parser',
    'url builder',
  ],
  canonical: '/url-encoder-decoder',
  ogImage: '/og/url-encoder-decoder.jpg',
  faqs: [
    {
      question: 'Why do I need to encode URLs?',
      answer: 'Special characters in URLs (spaces, &, ?, etc.) must be percent-encoded to be valid and safe to transmit.',
    },
  ],
};
