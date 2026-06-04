import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'hash-generator',
  name: 'Hash Generator',
  title: 'Hash Generator – MD5, SHA-1, SHA-256, SHA-512 & More | QuickUtils',
  description:
    'Generate cryptographic hashes instantly in your browser. Supports MD5, SHA-1, SHA-256, SHA-512. Hash text or files with one click. All processing happens locally — nothing is uploaded.',
  category: 'developer',
  icon: '🔐',
  color: 'amber',
  keywords: [
    'hash generator',
    'md5 online',
    'sha256 generator',
    'file hash calculator',
    'cryptographic hash',
    'sha512',
    'sha1',
    'blake2',
    'checksum tool',
  ],
  canonical: '/hash-generator',
  ogImage: '/og/hash-generator.jpg',
  faqs: [
    {
      question: 'Is it safe to hash sensitive data here?',
      answer: 'Yes. All hashing is performed entirely in your browser using the Web Crypto API (or a pure JavaScript implementation for MD5). No data ever leaves your device.',
    },
    {
      question: 'Why is MD5 and SHA-1 still available even though they are broken?',
      answer: 'They are still widely used for checksums, legacy systems, and non-security purposes. We include them for completeness while clearly labeling modern secure alternatives (SHA-256+).',
    },
    {
      question: 'Can I hash large files?',
      answer: 'Yes. The tool streams the file through the hash function without loading the entire file into memory at once (where supported by the browser).',
    },
  ],
  whatIs:
    'A fast, private hash calculator that lets you compute cryptographic digests of text or entire files using the most common algorithms — all without sending anything to a server.',
};
