import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'password-generator',
  name: 'Password Generator',
  title: 'Password Generator – Create Strong Secure Passwords Instantly | QuickUtils',
  description:
    'Free strong password generator with custom length, symbols, numbers, and ambiguous character exclusion. Check strength in real time.',
  category: 'generator',
  icon: '🔐',
  color: 'violet',
  keywords: [
    'password generator',
    'strong password generator',
    'secure password generator',
    'random password',
  ],
  canonical: '/password-generator',
  faqs: [
    { question: 'How long should a password be?', answer: 'At least 16 characters is recommended for most accounts in 2026. Longer is almost always better.' },
    { question: 'Should I use symbols in my password?', answer: 'Yes when allowed. Symbols greatly increase the search space, but length matters more than complexity.' },
  ],
};
