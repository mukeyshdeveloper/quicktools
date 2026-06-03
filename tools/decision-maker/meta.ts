import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'decision-maker',
  name: 'Decision Maker',
  title: 'Decision Maker – Random Choice & Weighted Picker | QuickUtils',
  description:
    'Free decision maker tool. Enter options for pure random picks or assign weights for smart weighted decisions. Great for choices, raffles, or team votes.',
  category: 'calculator',
  icon: '🎲',
  color: 'violet',
  keywords: [
    'decision maker',
    'random choice picker',
    'weighted random picker',
    'decision tool',
    'pick one for me',
    'random selector',
    'weighted decision maker',
  ],
  canonical: '/decision-maker',
  ogImage: '/og/decision-maker.jpg',
  faqs: [
    {
      question: 'What’s the difference between random and weighted?',
      answer: 'Random gives every option exactly the same chance. Weighted lets you give options different importance (e.g. cost, preference, team size) so better options are statistically more likely to be chosen.',
    },
    {
      question: 'Can I use this for team decisions or raffles?',
      answer: 'Absolutely. Add everyone’s name with equal weights for a fair raffle, or give higher weight to options that matter more to the group. The history lets you prove the result wasn’t manipulated.',
    },
  ],
  whatIs:
    'When you have too many options and analysis paralysis kicks in, this tool removes the emotion. It either picks completely fairly at random or respects the different importance you assign to each choice.',
};
