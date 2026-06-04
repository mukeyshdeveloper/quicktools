import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'jwt-encoder',
  name: 'JWT Encoder',
  title: 'JWT Encoder – Create & Sign JSON Web Tokens | QuickUtils',
  description:
    'Create valid JWTs instantly. Edit header and payload as JSON, choose algorithm (HS256, HS384, HS512), enter secret, and generate a properly signed token. Live preview and validation included. All done locally in your browser.',
  category: 'developer',
  icon: '🔑',
  color: 'emerald',
  keywords: [
    'jwt encoder',
    'jwt generator',
    'create jwt token',
    'sign jwt online',
    'hs256 jwt',
    'jwt creator',
    'json web token tool',
  ],
  canonical: '/jwt-encoder',
  ogImage: '/og/jwt-encoder.jpg',
  faqs: [
    {
      question: 'Is it safe to use my real secret here?',
      answer: 'Yes. Signing happens 100% in your browser using the Web Crypto API. The secret never leaves your device. For production use, always keep secrets in environment variables or secure vaults.',
    },
    {
      question: 'Which algorithms are supported?',
      answer: 'HS256, HS384, and HS512 (HMAC + SHA). These are the most common symmetric algorithms. We do not support RSA/ECDSA public-key algorithms in this client-only tool.',
    },
    {
      question: 'Can I decode the token I just created?',
      answer: 'Yes — the live preview shows the decoded header and payload. For full verification against the signature, use our separate JWT Decoder tool.',
    },
  ],
  whatIs:
    'A simple, trustworthy tool for generating properly signed JWTs during development and testing. Edit the claims, pick your algorithm and secret, and get a real token you can copy into your apps.',
};
