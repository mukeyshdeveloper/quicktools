import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'bill-splitter',
  name: 'Advanced Bill Splitter',
  title: 'Bill Splitter – Smart Group Expense Sharing & Optimal Settlements | QuickUtils',
  description:
    'Most advanced free bill splitter. Handle itemized bills, custom shares, tips/taxes, multiple payers, and get perfect settlement suggestions. Works for dinners, rent, trips, projects, and any group expense.',
  category: 'business',
  icon: '💸',
  color: 'emerald',
  keywords: [
    'bill splitter',
    'expense splitter',
    'split bills with friends',
    'group expense calculator',
    'who owes what',
    'settle up calculator',
    'advanced bill split',
    'smart expense sharing',
  ],
  canonical: '/bill-splitter',
  ogImage: '/og/bill-splitter.jpg',
  faqs: [
    {
      question: 'How is this different from simple splitters?',
      answer: 'It supports item-level splitting (different people pay for different dishes), multiple people paying one bill, proportional tax/tip, custom percentages or fixed amounts, and "this person didn\'t participate" scenarios. Then it gives optimal (fewest transfers) settlement plan.',
    },
    {
      question: 'Can I use it for ongoing expenses like rent or a shared project?',
      answer: 'Yes. Add as many bills as you want over time. It keeps running balances and can show cumulative who-owes-whom. Perfect for roommates, office teams, or long group trips.',
    },
    {
      question: 'Is my data private when sharing?',
      answer: 'Everything stays in your browser. Sharing creates a temporary link with encoded data (or a text summary). No accounts or servers involved.',
    },
  ],
  whatIs:
    'A production-grade bill splitter that handles every real-world complication: itemized receipts, unequal participation, taxes, tips, multiple payers, and gives you the mathematically optimal way for the group to settle with the minimum number of transactions.',
};
