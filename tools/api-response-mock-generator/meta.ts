import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'api-response-mock-generator',
  name: 'API Response Mock Generator',
  title: 'API Mock Generator – Realistic JSON Responses & Code Snippets | QuickUtils',
  description:
    'Generate realistic API mock responses instantly. Define schema or examples, get valid JSON, error cases, and ready-to-use curl/fetch/axios code. Perfect for frontend development, testing, and documentation.',
  category: 'developer',
  icon: '🔌',
  color: 'blue',
  keywords: [
    'api mock generator',
    'mock api response',
    'fake api json',
    'api response simulator',
    'rest api mock',
    'generate mock data',
    'api testing tool',
  ],
  canonical: '/api-response-mock-generator',
  ogImage: '/og/api-response-mock-generator.jpg',
  faqs: [
    {
      question: 'How realistic is the generated data?',
      answer: 'It uses smart defaults for common fields (names, emails, dates, IDs, prices) and respects your schema structure, types, and constraints like min/max, patterns, and enums.',
    },
    {
      question: 'Can I generate error responses?',
      answer: 'Yes. Switch between success, client error (4xx), and server error (5xx) templates. You can also customize status codes and error bodies.',
    },
    {
      question: 'Is the mock data consistent across requests?',
      answer: 'By default it is random each time for realism. You can enable "seed" mode for deterministic output useful in tests.',
    },
  ],
  whatIs:
    'A fast way to create believable API responses without a real backend. Ideal for frontend devs who need to build against contracts, test edge cases, or demo features quickly.',
};
