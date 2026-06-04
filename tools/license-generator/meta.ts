import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'license-generator',
  name: 'License Generator',
  title: 'Open Source License Generator – MIT, Apache, GPL & More | QuickUtils',
  description: 'Generate standard open source licenses (MIT, Apache 2.0, GPL-3.0, BSD, ISC, Unlicense) with your details filled in. Copy or download ready-to-use LICENSE files.',
  category: 'developer',
  icon: '📜',
  color: 'blue',
  keywords: [
    'license generator',
    'mit license',
    'apache license',
    'gpl license generator',
    'open source license',
    'software license template',
  ],
  canonical: '/license-generator',
  ogImage: '/og/license-generator.jpg',
  faqs: [
    {
      question: 'Which license should I choose?',
      answer: 'MIT and Apache 2.0 are permissive. GPL requires derivative works to be open source. Choose based on how much control you want over derivatives.',
    },
    {
      question: 'Is this legally binding?',
      answer: 'These are standard templates. For important projects, have a lawyer review. This tool simply fills in the common placeholders correctly.',
    },
  ],
  whatIs: 'A quick generator that produces correctly formatted, standard open source license text ready to drop into your GitHub or project repository.',
};
