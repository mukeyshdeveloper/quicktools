import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'uuid-generator',
  name: 'UUID / GUID Generator',
  title: 'UUID Generator – Create Bulk v4 & v7 IDs (Free)',
  description:
    'Free UUID generator. Create secure v4, v7, and other UUIDs in bulk with custom formatting options. Perfect for databases, APIs, and development.',
  category: 'developer',
  icon: '🆔',
  color: 'indigo',
  keywords: [
    'uuid generator',
    'guid generator',
    'uuid v4 generator',
    'uuid v7',
    'bulk uuid generator',
    'unique id generator',
  ],
  canonical: '/uuid-generator',
  ogImage: '/og/uuid-generator.jpg',
  faqs: [
    {
      question: 'What is the difference between UUID v4 and v7?',
      answer: 'v4 is fully random. v7 is time-based (sortable) and recommended for databases as it improves indexing performance.',
    },
    {
      question: 'Are my generated UUIDs private?',
      answer: 'Yes, 100%. All UUID calculations, formatting, and casing are executed directly inside your web browser using client-side JavaScript. No data is transmitted to our servers, ensuring your generated IDs are completely secure, private, and yours alone to use.',
    },
    {
      question: 'Why should I use UUID v7 over UUID v4 for databases?',
      answer: 'UUID v4 is completely random, which means inserting new rows creates random insert points. This forces database systems to fragment and restructure B-tree indexes constantly, dragging down performance on large datasets. Because UUID v7 begins with a timestamp, new entries are appended sequentially, preserving high-performance indexing and fast lookups.',
    },
  ],
};
