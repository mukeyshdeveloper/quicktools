import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'utm-builder',
  name: 'UTM Link Builder',
  title: 'UTM Builder – Free Google Analytics Campaign Link Creator | QuickUtils',
  description:
    'Free UTM link builder for Google Analytics. Generate clean, trackable URLs with source, medium, campaign, term, and content parameters instantly.',
  category: 'business',
  icon: '🔗',
  color: 'indigo',
  keywords: [
    'utm builder',
    'utm link generator',
    'google analytics utm',
    'campaign url builder',
    'marketing tracking links',
  ],
  canonical: '/utm-builder',
  ogImage: '/og/utm-builder.jpg',
  faqs: [
    {
      question: 'Do I need to URL-encode the values?',
      answer: 'The tool automatically encodes special characters. Just paste your normal values (e.g. "Facebook Ads" or "Summer Sale").',
    },
  ],
};
