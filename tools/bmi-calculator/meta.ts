import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'bmi-calculator',
  name: 'BMI Calculator',
  title: 'BMI Calculator – Free Body Mass Index Checker with Healthy Range | QuickUtils',
  description:
    'Free BMI calculator. Check your Body Mass Index instantly, see weight category, and healthy weight range. Metric & imperial supported.',
  category: 'health',
  icon: '⚖️',
  color: 'pink',
  keywords: [
    'bmi calculator',
    'body mass index calculator',
    'bmi calculator india',
    'healthy weight calculator',
    'bmi chart',
  ],
  canonical: '/bmi-calculator',
  ogImage: '/og/bmi-calculator.jpg',
  whatIs:
    'BMI (Body Mass Index) is a simple screening tool that estimates body fat based on height and weight.',
  faqs: [
    {
      question: 'What is a healthy BMI range?',
      answer:
        'For most adults, a BMI between 18.5 and 24.9 is considered normal weight. Below 18.5 is underweight, 25–29.9 is overweight, and 30+ is obese.',
    },
    {
      question: 'Is BMI accurate for everyone?',
      answer:
        'BMI is a useful screening tool but has limitations. It does not distinguish muscle from fat or account for age, sex, or ethnicity. Athletes and elderly people may get misleading results.',
    },
  ],
};
