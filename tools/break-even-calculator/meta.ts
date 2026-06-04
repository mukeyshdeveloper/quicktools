import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'break-even-calculator',
  name: 'Break-Even Analysis Calculator',
  title: 'Break-Even Calculator – Find Your Break-Even Point Fast | QuickUtils',
  description: 'Calculate break-even point in units and revenue. Input fixed costs, price per unit, and variable costs. See contribution margin, margin of safety, and target profit scenarios. 100% private browser tool.',
  category: 'business',
  icon: '📊',
  color: 'emerald',
  keywords: [
    'break even calculator',
    'break even analysis',
    'break even point',
    'fixed costs variable costs',
    'contribution margin calculator',
    'business break even',
  ],
  canonical: '/break-even-calculator',
  ogImage: '/og/break-even-calculator.jpg',
  faqs: [
    {
      question: 'What is the break-even point?',
      answer: 'The point at which total revenue equals total costs. Below it you lose money; above it you make profit.',
    },
    {
      question: 'Do I need to know my exact variable cost per unit?',
      answer: 'Yes for accuracy. If you sell multiple products, use a weighted average contribution margin.',
    },
  ],
  whatIs: 'A simple yet powerful calculator that helps entrepreneurs and managers determine the minimum sales needed to cover all costs and start turning a profit.',
};
