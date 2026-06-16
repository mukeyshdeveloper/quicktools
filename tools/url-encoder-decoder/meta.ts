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
    {
      question: 'Is my data secure on QuickUtils?',
      answer: 'Absolutely. Every calculation, parse, encode, and decode action is conducted 100% locally inside your web browser. We do not use any external APIs or servers, ensuring absolute privacy for sensitive API tokens, client secrets, or private URLs.',
    },
    {
      question: 'What is the difference between encodeURI and encodeURIComponent?',
      answer: 'encodeURI is meant to encode a complete, functional URL. It ignores reserved characters like http://, /, and ? to preserve the structure. encodeURIComponent is meant to encode individual parameter values, and will convert every special symbol (including slashes and questions) so they can safely sit inside a query parameter without corrupting the parent URL structure.',
    },
  ],
};
