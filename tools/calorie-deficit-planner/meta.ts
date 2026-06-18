import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'calorie-deficit-planner',
  name: 'Calorie Deficit Planner',
  title: 'Calorie Deficit Planner – Safe Weight Loss Timeline Calculator',
  description:
    'Plan sustainable weight loss. Calculate exact daily calorie target, weeks to goal, and realistic timeline based on your weekly loss target. Includes visual progress chart and safety warnings.',
  category: 'health',
  icon: '📉',
  color: 'orange',
  keywords: [
    'calorie deficit calculator',
    'weight loss planner',
    'calorie deficit planner',
    'how long to lose weight',
    'weekly weight loss calculator',
    'safe calorie deficit',
    'weight loss timeline',
    'deficit to goal weight',
  ],
  canonical: '/calorie-deficit-planner',
  ogImage: '/og/calorie-deficit-planner.jpg',
  faqs: [
    {
      question: 'How fast is safe to lose weight?',
      answer: 'For most people 0.5–1% of body weight per week is sustainable and minimizes muscle loss. Faster rates increase the risk of rebound, fatigue, and metabolic adaptation.',
    },
    {
      question: 'Do I need to know my exact TDEE?',
      answer: 'A good estimate is enough to start. Track your actual weight trend for 2–3 weeks and adjust calories up or down by 100–200 kcal based on real results.',
    },
    {
      question: 'Is my weight planning data private?',
      answer: 'Yes. All calculations, timelines, and goal progress are calculated entirely inside your web browser. No personal weight logs, targets, or information are uploaded or stored externally.',
    },
  ],
  whatIs: 'A calorie deficit occurs when you consume fewer calories than you burn. The difference is supplied by your body’s energy stores (primarily fat). A well-planned deficit produces steady fat loss while preserving muscle and energy.',
};
