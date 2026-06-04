import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'lead-tracker',
  name: 'Simple CRM / Lead Tracker',
  title: 'Lead Tracker – Simple CRM for Small Business | QuickUtils',
  description: 'Track leads, update stages, add notes and values. See pipeline totals and conversion stats. Fully private with local browser storage. No accounts or cloud sync.',
  category: 'business',
  icon: '📋',
  color: 'rose',
  keywords: [
    'lead tracker',
    'simple crm',
    'sales pipeline',
    'lead management',
    'customer relationship tool',
    'free crm online',
  ],
  canonical: '/lead-tracker',
  ogImage: '/og/lead-tracker.jpg',
  faqs: [
    {
      question: 'Is my lead data saved across devices?',
      answer: 'No. Data is stored only in this browser using localStorage. Use the same device/browser for continuity, or export notes manually.',
    },
    {
      question: 'Can I export my leads?',
      answer: 'Currently you can copy the table or take screenshots. Full CSV export is planned for a future update.',
    },
  ],
  whatIs: 'A lightweight, zero-friction lead and pipeline tracker built for solopreneurs and small teams who want visibility without the complexity or cost of full CRMs.',
};
