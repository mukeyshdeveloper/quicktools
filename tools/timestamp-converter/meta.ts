import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'timestamp-converter',
  name: 'Timestamp Converter',
  title: 'Timestamp Converter – Unix, ISO, Human & Multiple Timezones | QuickUtils',
  description:
    'Convert between Unix timestamps, ISO 8601, human readable dates, and any timezone instantly. Supports milliseconds, relative time, and batch conversion. The ultimate time tool for developers and ops.',
  category: 'developer',
  icon: '🕒',
  color: 'red',
  keywords: [
    'timestamp converter',
    'unix timestamp to date',
    'iso 8601 converter',
    'timezone converter',
    'epoch to date',
    'date to timestamp',
    'utc converter',
  ],
  canonical: '/timestamp-converter',
  ogImage: '/og/timestamp-converter.jpg',
  faqs: [
    {
      question: 'What is the difference between seconds and milliseconds?',
      answer: 'Unix timestamps are traditionally in seconds since 1970-01-01 UTC. JavaScript and many modern systems use milliseconds. This tool auto-detects and lets you choose.',
    },
    {
      question: 'Does it handle daylight saving time correctly?',
      answer: 'Yes. When converting to a specific IANA timezone it uses the browser\'s Intl API which correctly applies historical and future DST rules for that zone.',
    },
    {
      question: 'Can I convert many timestamps at once?',
      answer: 'Yes. Paste a list (one per line) and it will convert the entire batch, preserving order.',
    },
  ],
  whatIs:
    'A comprehensive time conversion utility that speaks every common timestamp format developers encounter — from raw epoch numbers to beautiful human dates across the world.',
};
