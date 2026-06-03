import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'meeting-cost-calculator',
  name: 'Meeting Cost Calculator',
  title: 'Meeting Cost Calculator – Real Cost of Team Meetings (INR) | QuickUtils',
  description:
    'Calculate the true cost of meetings in real time. Enter attendees, salaries or hourly rates, and duration to see total cost, cost per minute, and yearly projections.',
  category: 'calculator',
  icon: '💰',
  color: 'amber',
  keywords: [
    'meeting cost calculator',
    'cost of meetings',
    'team meeting cost',
    'how much do meetings cost',
    'meeting roi calculator',
    'employee time cost',
    'meeting productivity cost',
  ],
  canonical: '/meeting-cost-calculator',
  ogImage: '/og/meeting-cost-calculator.jpg',
  faqs: [
    {
      question: 'How is the cost calculated?',
      answer: 'We take the total hourly cost of everyone in the room (or their average) and multiply by the length of the meeting in hours. You can also add a productivity overhead multiplier (many companies use 1.5–2×) because meetings have hidden costs beyond salaries.',
    },
    {
      question: 'Should I include my own salary?',
      answer: 'Yes. Even if you’re the organizer, your time has an opportunity cost. If you’re calculating for a company, use fully loaded cost (salary + benefits + taxes + office) for more accurate numbers.',
    },
  ],
  whatIs:
    'Every meeting has a real financial cost. This calculator turns “let’s have a quick sync” into a concrete number so teams can make better decisions about when a meeting is actually worth everyone’s time.',
};
