import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'small-savings-calculator',
  name: 'Small Savings Schemes Calculator',
  title: 'PPF, NSC & KVP Calculator – Small Savings Maturity Calculator',
  description:
    'Free calculator for Government Small Savings Schemes: PPF, NSC, and KVP. Calculate maturity amount, interest earned, and total returns with latest interest rates.',
  category: 'calculator',
  icon: '🏦',
  color: 'emerald',
  keywords: [
    'ppf calculator',
    'nsc calculator',
    'kvp calculator',
    'small savings calculator',
    'ppf maturity calculator',
    'government savings schemes',
    'ppf interest rate calculator',
  ],
  canonical: '/small-savings-calculator',
  ogImage: '/og/small-savings-calculator.jpg',
  faqs: [
    {
      question: 'What is the current PPF interest rate?',
      answer: 'The PPF interest rate is reviewed every quarter by the Government. As of FY 2025-26, it is 7.1% per annum (compounded annually).',
    },
    {
      question: 'Is PPF interest and maturity tax-free?',
      answer: 'Yes. PPF enjoys EEE (Exempt-Exempt-Exempt) status. Contributions (up to ₹1.5 lakh), interest, and maturity amount are all tax-free.',
    },
    {
      question: 'What is the difference between NSC and KVP?',
      answer: 'NSC has a 5-year tenure with interest taxable every year. KVP has a longer tenure (~9 years 7 months) and also has taxable interest, but it doubles your investment.',
    },
    {
      question: 'Can I extend my PPF account after 15 years?',
      answer: 'Yes. After the initial 15-year tenure, you can extend your PPF account in blocks of 5 years with or without further contributions.',
    },
  ],
  whatIs: 'This tool helps you calculate the maturity value and interest earned on popular Government Small Savings Schemes — Public Provident Fund (PPF), National Savings Certificate (NSC), and Kisan Vikas Patra (KVP).',
};
