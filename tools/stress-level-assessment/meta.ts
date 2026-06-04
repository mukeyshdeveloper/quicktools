import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'stress-level-assessment',
  name: 'Stress Level Assessment',
  title: 'Stress Level Assessment – Quick Questionnaire & Tips | QuickUtils',
  description: 'Take a short, science-based stress questionnaire. Get your stress score, category (Low / Moderate / High), and practical coping strategies tailored to your results.',
  category: 'health',
  icon: '🧠',
  color: 'orange',
  keywords: [
    'stress test',
    'stress level quiz',
    'perceived stress scale',
    'mental health assessment',
    'stress management',
    'anxiety self assessment',
  ],
  canonical: '/stress-level-assessment',
  ogImage: '/og/stress-level-assessment.jpg',
  faqs: [
    {
      question: 'Is this a medical diagnosis?',
      answer: 'No. This is a screening tool based on the Perceived Stress Scale. It is for awareness only. See a mental health professional for clinical assessment.',
    },
    {
      question: 'How often should I take it?',
      answer: 'Once every few weeks is useful to track changes, especially during high-pressure periods at work or life.',
    },
  ],
  whatIs: 'A quick self-assessment questionnaire that measures how unpredictable, uncontrollable, and overloaded you find your life, then provides actionable next steps.',
};
