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
  ],
};
