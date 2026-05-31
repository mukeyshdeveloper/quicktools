import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'discount-calculator',
  name: 'Discount & Sales Tax Calculator',
  title: 'Discount Calculator – Calculate Price After % Off + Sales Tax | QuickUtils',
  description:
    'Free discount calculator. Find the final price after percentage discount, then add sales tax. See exactly how much you save on any purchase.',
  category: 'calculator',
  icon: '🏷️',
  color: 'emerald',
  keywords: [
    'discount calculator',
    'percent off calculator',
    'sales tax calculator',
    'price after discount',
    'coupon calculator',
    'shopping price calculator',
  ],
  canonical: '/discount-calculator',
  faqs: [
    {
      question: 'How do I calculate price after discount and tax?',
      answer: 'First apply the discount to the original price, then add the sales tax percentage on the discounted amount.',
    },
  ],
};
