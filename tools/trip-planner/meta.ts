import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'trip-planner',
  name: 'Advanced Trip Planner',
  title: 'Trip Planner – Itinerary, Expenses, Smart Bill Splitter & Share | QuickUtils',
  description:
    'Best-in-class free trip planner. Plan itineraries, log every expense with custom splits, auto-calculate who owes whom, and generate shareable summaries for friends. Covers solo, couple, group, multi-city trips.',
  category: 'business',
  icon: '✈️',
  color: 'blue',
  keywords: [
    'trip planner',
    'travel expense tracker',
    'group trip bill splitter',
    'itinerary planner with costs',
    'vacation cost calculator',
    'split expenses with friends',
    'who owes what trip',
    'advanced bill splitter for travel',
  ],
  canonical: '/trip-planner',
  ogImage: '/og/trip-planner.jpg',
  faqs: [
    {
      question: 'How does the bill splitter work for trips?',
      answer: 'Log every expense (flight, hotel, food, activities). Choose who paid and how to split (equally, by custom shares, or specific people only). The tool calculates exact balances and suggests the fewest payments to settle up.',
    },
    {
      question: 'Can I share the plan with friends without them installing anything?',
      answer: 'Yes. Use "Share with Friends" to copy a beautifully formatted summary (perfect for WhatsApp/Email) or generate a shareable link that loads the full trip state when opened (all client-side).',
    },
    {
      question: 'Does it handle different currencies or complex splits?',
      answer: 'You can enter a base currency and note foreign spends with approximate conversion. For splits, support equal, percentage, fixed amounts per person, and "only these people" for activities that not everyone joins.',
    },
  ],
  whatIs:
    'An all-in-one trip planner that combines itinerary building, detailed expense tracking, and an extremely powerful group bill splitter. Designed for real-world travel: solo trips, couples, big friend groups, multi-destination adventures, and everything in between.',
};
