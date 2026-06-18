import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'pregnancy-week-tracker',
  name: 'Pregnancy Week-by-Week Tracker',
  title: 'Pregnancy Week Tracker – Milestones, Symptoms & Tips | QuickUtils',
  description: 'Track your pregnancy week by week. Enter your due date or last period and see current week, trimester, baby development milestones, common symptoms, and self-care tips.',
  category: 'health',
  icon: '🤰',
  color: 'pink',
  keywords: [
    'pregnancy week by week',
    'pregnancy tracker',
    'baby development by week',
    'pregnancy milestones',
    'week by week pregnancy',
  ],
  canonical: '/pregnancy-week-tracker',
  ogImage: '/og/pregnancy-week-tracker.jpg',
  faqs: [
    {
      question: 'How is pregnancy week counted?',
      answer: 'From the first day of your last menstrual period (LMP). Week 1 is before conception in this counting.',
    },
    {
      question: 'Can I use this if I know my exact conception date?',
      answer: 'Yes. The tool adjusts based on your due date. Most due dates are calculated as 40 weeks from LMP.',
    },
    {
      question: 'Is my pregnancy tracker data secure?',
      answer: 'Yes. All inputs, trimester progress, and week logs are computed locally in your browser and saved using browser localStorage. We do not store or transmit any of this information to external servers.',
    },
  ],
  whatIs: 'An interactive week-by-week pregnancy guide that updates based on your personal due date, giving relevant information for where you are right now.',
};
