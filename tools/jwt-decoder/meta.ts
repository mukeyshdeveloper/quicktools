import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'jwt-decoder',
  name: 'JWT Decoder',
  title: 'JWT Decoder – Decode & Inspect JSON Web Tokens Instantly | QuickUtils',
  description:
    'Free JWT decoder. Paste a token to instantly see the header, payload, expiry, issued time, and all claims. Runs 100% in your browser — nothing is logged or sent anywhere.',
  category: 'developer',
  icon: '🔑',
  color: 'rose',
  keywords: [
    'jwt decoder',
    'json web token decoder',
    'decode jwt online',
    'jwt parser',
    'jwt inspector',
    'jwt debugger',
  ],
  canonical: '/jwt-decoder',
  ogImage: '/og/jwt-decoder.jpg',
  faqs: [
    {
      question: 'Can this tool verify JWT signatures?',
      answer: 'Currently it decodes and displays the token contents. Signature verification requires the secret key and is not performed for security reasons.',
    },
  ],
};
