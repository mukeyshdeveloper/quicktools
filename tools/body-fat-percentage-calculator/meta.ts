import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'body-fat-percentage-calculator',
  name: 'Body Fat Percentage Calculator',
  title: 'Body Fat Calculator – US Navy & YMCA Formulas (Free)',
  description:
    'Calculate body fat percentage using the US Navy circumference method and YMCA formula. Accurate tape-measure estimates with fat mass, lean mass, and category. Private and free.',
  category: 'health',
  icon: '📏',
  color: 'rose',
  keywords: [
    'body fat calculator',
    'body fat percentage',
    'navy body fat',
    'ymca body fat',
    'us navy body fat calculator',
    'tape measure body fat',
    'body composition calculator',
    'calculate body fat',
    'bf% calculator',
  ],
  canonical: '/body-fat-percentage-calculator',
  ogImage: '/og/body-fat-percentage-calculator.jpg',
  faqs: [
    {
      question: 'How accurate is the US Navy body fat calculator?',
      answer: 'The Navy method is accurate to about ±3-4% when measurements are taken correctly. It is one of the best non-calipers field methods available.',
    },
    {
      question: 'Do I need a special tape measure?',
      answer: 'A standard flexible tailor’s tape works perfectly. Measure at the recommended sites: neck (just below larynx), waist (at navel, relaxed), and hip (widest point) for women.',
    },
    {
      question: 'Why do results differ between Navy and YMCA methods?',
      answer: 'They use different inputs and were derived from different populations. Navy uses more circumference points and is generally preferred for tracking changes. Use the same method consistently over time.',
    },
  ],
  whatIs:
    'Body fat percentage is the proportion of your total body weight that is fat mass. Unlike BMI, it distinguishes fat from muscle and is a far better indicator of health and fitness progress.',
};
