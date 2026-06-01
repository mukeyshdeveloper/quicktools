import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'password-strength-meter',
  name: 'Secure Password Strength Meter',
  title: 'Password Strength Checker – Test Security & Crack Time',
  description:
    'Free password strength meter. Instantly analyze password entropy, estimated crack time, and security score. 100% private — nothing is sent anywhere.',
  category: 'generator',
  icon: '🛡️',
  color: 'emerald',
  keywords: [
    'password strength meter',
    'check password strength',
    'password security test',
    'password entropy calculator',
    'how long to crack password',
  ],
  canonical: '/password-strength-meter',
  ogImage: '/og/password-strength-meter.jpg',
  faqs: [
    {
      question: 'Is my password stored or sent anywhere?',
      answer: 'No. All analysis happens locally in your browser. Your passwords are never transmitted or logged.',
    },
  ],
};
