import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'regex-tester',
  name: 'Regex Tester & Matcher',
  title: 'Regex Tester – Test & Debug Regular Expressions Live | QuickUtils',
  description:
    'Free regex tester with live highlighting. Test JavaScript regular expressions, see matches, groups, and flags in real time. Perfect for developers.',
  category: 'developer',
  icon: '🔍',
  color: 'violet',
  keywords: [
    'regex tester',
    'regular expression tester',
    'regex matcher online',
    'javascript regex debugger',
    'test regex pattern',
  ],
  canonical: '/regex-tester',
  ogImage: '/og/regex-tester.jpg',
  faqs: [
    {
      question: 'Which regex flavor does it use?',
      answer: 'It uses JavaScript (ECMAScript) regular expressions, the same as what runs in browsers.',
    },
  ],
};
