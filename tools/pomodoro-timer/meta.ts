import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'pomodoro-timer',
  name: 'Pomodoro Timer',
  title: 'Pomodoro Timer – 25/5 Focus Timer with Stats & History | QuickUtils',
  description:
    'Free Pomodoro timer with tasks, auto breaks, session tracking, daily stats, and per-task time breakdowns. Tag your focus sessions to see exactly where your deep work goes.',
  category: 'calculator',
  icon: '🍅',
  color: 'red',
  keywords: [
    'pomodoro timer',
    'pomodoro with tasks',
    'pomodoro technique',
    '25 minute timer',
    'focus timer with tasks',
    'productivity timer',
    'pomodoro with stats',
    'task time tracker',
    'session tracker',
    'deep work timer',
  ],
  canonical: '/pomodoro-timer',
  ogImage: '/og/pomodoro-timer.jpg',
  faqs: [
    {
      question: 'What is the Pomodoro Technique?',
      answer: 'Work focused for 25 minutes (one Pomodoro), take a 5-minute break. After 4 Pomodoros, take a longer 15-30 minute break. It trains your brain to focus in short bursts and prevents burnout.',
    },
    {
      question: 'Can I customize the timer lengths?',
      answer: 'Yes. The defaults are 25/5/15 but you can change work, short break, and long break durations in the settings. Many people use 50/10 or custom lengths that suit their flow.',
    },
    {
      question: 'Do the stats save if I close the tab?',
      answer: 'Yes. Completed sessions are saved in your browser for the current day. You can see today\'s total Pomodoros, focus minutes, and a simple history. Data stays private on your device.',
    },
    {
      question: 'How do tasks work with the timer?',
      answer: 'Create lightweight tasks (just a name). Click “Focus on this” on any task card — the timer will tag every completed Pomodoro to that task. You’ll get per-task totals and nice visual breakdowns in the stats area, on top of the global streak and weekly numbers.',
    },
  ],
  whatIs:
    'The Pomodoro Timer helps you work in focused sprints using the proven Pomodoro Technique. Optionally assign sessions to tasks so you can see not just how much you focused, but exactly what you focused on — with beautiful per-task time breakdowns.',
};
