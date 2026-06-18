import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'sleep-cycle-calculator',
  name: 'Sleep Cycle Calculator',
  title: 'Sleep Cycle Calculator – Best Time to Wake Up or Sleep',
  description:
    'Free sleep cycle calculator. Find the best times to go to bed or wake up so you finish a full 90-minute REM cycle and feel more refreshed.',
  category: 'health',
  icon: '💤',
  color: 'indigo',
  keywords: [
    'sleep cycle calculator',
    'best time to wake up',
    'rem cycle calculator',
    'bedtime calculator',
    'wake up refreshed',
    '90 minute sleep cycles',
  ],
  canonical: '/sleep-cycle-calculator',
  ogImage: '/og/sleep-cycle-calculator.jpg',
  faqs: [
    {
      question: 'Why are 90-minute cycles important?',
      answer: 'A full sleep cycle (light → deep → REM) lasts about 90 minutes. Waking up at the end of a cycle leaves you feeling more alert than waking in the middle of deep sleep.',
    },
    {
      question: 'Is my sleep data secure?',
      answer: 'Yes. All calculations are performed entirely on your device. We do not store, track, or transmit any of your personal sleep schedules or data to external servers.',
    },
  ],
};
