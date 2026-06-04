import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'health-metrics-dashboard',
  name: 'Health Metrics Dashboard',
  title: 'Health Metrics Dashboard – BMI, Body Fat & Ideal Weight | QuickUtils',
  description: 'All-in-one health calculator. Get your BMI, body fat percentage (Navy/ YMCA), and ideal body weight using multiple formulas. Visual results and recommendations in one place.',
  category: 'health',
  icon: '📊',
  color: 'red',
  keywords: [
    'bmi calculator',
    'body fat calculator',
    'ideal weight calculator',
    'health metrics',
    'body composition',
    'fitness dashboard',
  ],
  canonical: '/health-metrics-dashboard',
  ogImage: '/og/health-metrics-dashboard.jpg',
  faqs: [
    {
      question: 'Which body fat formula should I use?',
      answer: 'Navy method is popular and only needs tape measurements. YMCA is simpler but less accurate for very fit individuals.',
    },
    {
      question: 'Are these numbers medical advice?',
      answer: 'No. These are screening tools. Consult a doctor or registered dietitian for personalized health advice.',
    },
  ],
  whatIs: 'A combined dashboard that brings together the three most common body composition calculations so you can see the full picture of your metrics at once.',
};
