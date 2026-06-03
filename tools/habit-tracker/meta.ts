import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'habit-tracker',
  name: 'Habit Tracker',
  title: 'Habit Tracker – Build Daily Streaks & Simple Habits | QuickUtils',
  description:
    'Free simple habit tracker. Add habits, check them off daily, watch current and longest streaks grow. Visual calendar grids and zero-friction daily logging.',
  category: 'calculator',
  icon: '🔥',
  color: 'emerald',
  keywords: [
    'habit tracker',
    'streak tracker',
    'daily habit builder',
    'habit streak calendar',
    'build habits',
    'simple habit tracker',
    'no signup habit tracker',
  ],
  canonical: '/habit-tracker',
  ogImage: '/og/habit-tracker.jpg',
  faqs: [
    {
      question: 'How are streaks calculated?',
      answer: 'Current streak counts consecutive days ending today where you marked the habit complete. Longest streak is the highest number of consecutive days you have ever achieved for that habit.',
    },
    {
      question: 'Can I track more than one habit?',
      answer: 'Yes. Add as many habits as you want. Each habit has its own independent streak and mini calendar so you can see at a glance which days you were consistent.',
    },
    {
      question: 'Is my habit data private?',
      answer: 'Completely. Everything is stored only in your browser’s local storage. No accounts, no servers, no sharing. Delete your data anytime by clearing browser storage.',
    },
  ],
  whatIs:
    'A minimal habit tracker that focuses on what actually matters: showing up every day. Mark habits complete and instantly see your current streak, best streak ever, and a visual 14-day grid so you never lose momentum.',
};
