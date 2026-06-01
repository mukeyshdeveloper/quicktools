import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'home-loan-eligibility-calculator',
  name: 'Home Loan Eligibility Calculator',
  title: 'Home Loan Eligibility Calculator – Check How Much Loan You Can Get',
  description:
    'Free Home Loan Eligibility Calculator for India. Instantly find out the maximum home loan you can get based on your income, existing EMIs, age, and FOIR. Complements our EMI Calculator.',
  category: 'calculator',
  icon: '🏠',
  color: 'blue',
  keywords: [
    'home loan eligibility calculator',
    'how much home loan can i get',
    'home loan eligibility india',
    'loan eligibility calculator',
    'maximum home loan calculator',
    'foir calculator',
    'home loan amount calculator',
    'check home loan eligibility',
  ],
  canonical: '/home-loan-eligibility-calculator',
  ogImage: '/og/home-loan-eligibility-calculator.jpg',
  faqs: [
    {
      question: 'How is home loan eligibility calculated in India?',
      answer: 'Banks typically use FOIR (Fixed Obligation to Income Ratio). Your total EMIs (including the new home loan) should not exceed 50-60% of your gross monthly income.',
    },
    {
      question: 'What is a good FOIR percentage?',
      answer: 'Most banks prefer FOIR between 50% to 60%. Some lenders go up to 65-70% for high-income applicants with good credit scores.',
    },
    {
      question: 'Does age affect my home loan eligibility?',
      answer: 'Yes. Banks usually allow maximum tenure such that your age at loan maturity does not exceed 60-70 years. Younger applicants can get longer tenures.',
    },
    {
      question: 'How is this different from the EMI Calculator?',
      answer: 'The EMI Calculator tells you the monthly payment for a known loan amount. This tool works backwards — it tells you the maximum loan amount you can get based on your income and obligations.',
    },
  ],
  whatIs: 'A Home Loan Eligibility Calculator helps you determine the maximum amount a bank is likely to lend you for buying a house, based on your income, existing debts, age, and the bank’s FOIR policy.',
};
