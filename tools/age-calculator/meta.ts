import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'age-calculator',
  name: 'Age Calculator',
  title: 'Age Calculator – Find Exact Age in Years, Months & Days',
  description:
    'Free age calculator to find your exact age in years, months, and days. Calculate age as of any date. 100% private and instant.',
  category: 'calculator',
  icon: '📅',
  color: 'green',
  keywords: [
    'age calculator',
    'exact age calculator',
    'how old am i',
    'age in years months days',
    'birthday calculator',
    'date of birth calculator',
  ],
  canonical: '/age-calculator',
  ogImage: '/og/age-calculator.jpg',
  whatIs:
    'An age calculator computes the exact time elapsed between a date of birth and another date, expressed in years, months, and days.',
  faqs: [
    {
      question: 'How accurate is this age calculator?',
      answer:
        'It calculates exact calendar age using full years, months, and days. It is accurate for everyday, legal, and administrative purposes.',
    },
    {
      question: 'Can I calculate age on a future or past date?',
      answer:
        'Yes. Change the "Calculate As Of" date to any valid date. The tool will correctly compute age as of that specific day.',
    },
    {
      question: 'Does it account for leap years?',
      answer:
        'Yes. The calculation uses precise day counts and handles leap years correctly when computing total days and next birthday.',
    },
    {
      question: 'Is my birthdate data secure?',
      answer:
        'Yes. All calculations are performed entirely locally within your browser. No personal birthdate or tracking data is uploaded, stored, or processed on external servers.',
    },
  ],
};
