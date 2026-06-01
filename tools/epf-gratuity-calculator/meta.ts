import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'epf-gratuity-calculator',
  name: 'EPF & Gratuity Calculator',
  title: 'EPF & Gratuity Calculator – Calculate EPF Maturity + Gratuity Amount',
  description:
    'Free EPF & Gratuity Calculator for India. Accurately project your EPF corpus at retirement and calculate gratuity amount. Includes salary growth, current EPF balance, and latest interest rates.',
  category: 'calculator',
  icon: '🏦',
  color: 'emerald',
  keywords: [
    'epf calculator',
    'epf maturity calculator',
    'gratuity calculator',
    'epf gratuity calculator',
    'provident fund calculator',
    'calculate epf corpus',
    'gratuity amount calculator india',
    'epf interest rate calculator',
  ],
  canonical: '/epf-gratuity-calculator',
  ogImage: '/og/epf-gratuity-calculator.jpg',
  faqs: [
    {
      question: 'How is EPF maturity calculated?',
      answer: 'EPF grows with monthly contributions from employee (12%) and employer (3.67%), plus annual interest (currently 8.25%). Our calculator factors in your salary growth over the years.',
    },
    {
      question: 'What is the current EPF interest rate?',
      answer: 'The EPF interest rate for FY 2025-26 is 8.25%. You can adjust this rate in the calculator if needed.',
    },
    {
      question: 'How is Gratuity calculated?',
      answer: 'Gratuity = (Basic Salary + DA) × 15/26 × Number of years of service. You become eligible after completing 5 years of service. The maximum gratuity is currently capped at ₹25 lakhs.',
    },
    {
      question: 'Does this calculator include employer\'s full 12% contribution?',
      answer: 'No. Only 3.67% of the employer\'s contribution goes to your EPF account (8.33% goes to EPS pension scheme). Our calculator uses the accurate 15.67% total monthly credit.',
    },
  ],
  whatIs: 'This tool helps employees calculate their projected EPF balance at retirement along with the gratuity amount they will receive. It is essential for retirement planning in India.',
};
