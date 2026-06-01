import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'gst-calculator',
  name: 'GST Calculator',
  title: 'GST Calculator – Calculate Inclusive & Exclusive GST with CGST/SGST/IGST',
  description:
    'Free GST Calculator for India. Instantly calculate GST inclusive and exclusive amounts. Get accurate CGST, SGST & IGST breakup for any GST rate (5%, 12%, 18%, 28%). Works offline.',
  category: 'calculator',
  icon: '🧾',
  color: 'emerald',
  keywords: [
    'gst calculator',
    'gst inclusive exclusive calculator',
    'cgst sgst igst calculator',
    'india gst calculator',
    'gst amount calculator',
    'calculate gst online',
    '18% gst calculator',
    'gst breakup calculator',
    'intra state gst',
    'inter state gst',
  ],
  canonical: '/gst-calculator',
  ogImage: '/og/gst-calculator.jpg',
  faqs: [
    {
      question: 'What is the difference between GST exclusive and inclusive amount?',
      answer: 'Exclusive means the price does not include GST — you add GST on top. Inclusive means the price already includes GST — we calculate the base value and GST amount from the final price.',
    },
    {
      question: 'When should I use Intra-state vs Inter-state GST?',
      answer: 'Use Intra-state (CGST + SGST) when buyer and seller are in the same state. Use Inter-state (IGST) when they are in different states or for imports/exports.',
    },
    {
      question: 'How is CGST and SGST calculated?',
      answer: 'For intra-state transactions, the total GST is split equally into CGST (Central GST) and SGST (State GST). For example, on 18% GST, CGST = 9% and SGST = 9%.',
    },
    {
      question: 'Does this GST calculator work offline?',
      answer: 'Yes. Once you visit the page, the entire GST calculator works completely offline. All calculations happen in your browser.',
    },
  ],
  whatIs:
    'A GST Calculator helps you quickly find the Goods and Services Tax amount on any transaction in India. It supports both adding GST to a base price and extracting GST from an inclusive price, along with the correct CGST, SGST, or IGST breakup based on place of supply.',
};
