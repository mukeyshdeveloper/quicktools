import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'ideal-body-weight-calculator',
  name: 'Ideal Body Weight Calculator',
  title: 'Ideal Body Weight Calculator – Devine, Robinson, Miller (Free)',
  description:
    'Calculate your ideal body weight using the three most trusted medical formulas: Devine, Robinson, and Miller. Useful for health goals, nutrition planning, and clinical dosing estimates.',
  category: 'health',
  icon: '⚖️',
  color: 'amber',
  keywords: [
    'ideal body weight calculator',
    'ibw calculator',
    'devine formula',
    'robinson formula',
    'miller formula',
    'ideal weight by height',
    'healthy weight calculator',
    'medical ideal body weight',
  ],
  canonical: '/ideal-body-weight-calculator',
  ogImage: '/og/ideal-body-weight-calculator.jpg',
  faqs: [
    {
      question: 'Which IBW formula is most accurate?',
      answer: 'All three are estimates based on population data. Devine is the most commonly used in medicine today. Compare all three and use the range as a general guide rather than an absolute target.',
    },
    {
      question: 'Should I aim exactly for my ideal body weight?',
      answer: 'No. IBW is a reference point, not a personal goal. Many healthy, fit people are above or below IBW. Focus on body composition, energy, strength, and lab markers instead.',
    },
  ],
  whatIs: 'Ideal Body Weight (IBW) is a height-based estimate of the weight associated with the lowest mortality risk in large population studies. It does not account for muscle mass, frame size, or current fitness level.',
};
