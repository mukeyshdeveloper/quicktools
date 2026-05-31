import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'sip-calculator',
  name: 'SIP Calculator',
  title: 'SIP Calculator – Mutual Fund SIP Future Value & Returns | QuickUtils',
  description:
    'Free SIP calculator. Project the future value of your monthly mutual fund investments with expected rate of return and total wealth gain.',
  category: 'calculator',
  icon: '💹',
  color: 'orange',
  keywords: [
    'sip calculator',
    'mutual fund sip calculator',
    'sip returns calculator',
    'monthly sip calculator india',
  ],
  canonical: '/sip-calculator',
  ogImage: '/og/sip-calculator.jpg',
  faqs: [
    {
      question: 'What return rate should I assume for equity SIPs?',
      answer: 'Long-term diversified equity funds in India have historically returned ~11-14% CAGR. 12% is a reasonable conservative assumption for planning.',
    },
  ],
};
