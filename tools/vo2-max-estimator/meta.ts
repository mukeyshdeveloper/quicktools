import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'vo2-max-estimator',
  name: 'VO2 Max Estimator',
  title: 'VO2 Max Calculator – Estimate Aerobic Fitness & VO2max',
  description:
    'Estimate your VO2 max using the Rockport 1-mile walk test or a quick non-exercise questionnaire. See your cardio fitness rating compared to age and gender norms. Free and private.',
  category: 'health',
  icon: '🏃',
  color: 'indigo',
  keywords: [
    'vo2 max calculator',
    'vo2max estimator',
    'rockport walk test',
    'aerobic fitness test',
    'cardio capacity calculator',
    'fitness level test',
    'estimate vo2 max',
    'maximal oxygen uptake',
  ],
  canonical: '/vo2-max-estimator',
  ogImage: '/og/vo2-max-estimator.jpg',
  faqs: [
    {
      question: 'How accurate are these VO2 max estimates?',
      answer: 'The Rockport 1-mile walk test is validated within ~5% of lab values for most adults. Non-exercise estimates are less precise but useful for tracking direction over time.',
    },
    {
      question: 'What is a good VO2 max for my age?',
      answer: 'It varies widely. “Superior” for a 30-year-old male is roughly 55+ ml/kg/min. For a 55-year-old female, 35+ is already excellent. Use the category table shown in the results.',
    },
    {
      question: 'Is my personal fitness data secure?',
      answer: 'Yes. All calculations and results are computed entirely client-side in your browser. None of your inputs (such as weight, age, gender, or heart rate) are sent to or stored on any external servers.',
    },
  ],
  whatIs: 'VO2 max is the maximum rate at which your body can consume and use oxygen during intense exercise. It is the single best measure of cardiovascular fitness and a strong predictor of longevity and healthspan.',
};
