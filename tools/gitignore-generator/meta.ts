import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'gitignore-generator',
  name: 'Git Ignore Generator',
  title: 'Git Ignore Generator – Curated .gitignore by Language & Framework | QuickUtils',
  description:
    'Generate perfect .gitignore files for any stack. 30+ templates for Node, Next.js, Python, Java, Go, mobile, OS, IDEs and more. Add custom rules and download instantly. Keep your repos clean.',
  category: 'developer',
  icon: '📁',
  color: 'amber',
  keywords: [
    'gitignore generator',
    'git ignore file',
    '.gitignore template',
    'gitignore by language',
    'create gitignore online',
    'node gitignore',
    'python gitignore',
  ],
  canonical: '/gitignore-generator',
  ogImage: '/og/gitignore-generator.jpg',
  faqs: [
    {
      question: 'How many templates are included?',
      answer: 'Over 30 popular languages, frameworks, editors, and operating systems. You can combine any number of them.',
    },
    {
      question: 'Can I edit the generated file?',
      answer: 'Yes. The preview is fully editable in the custom box and you can tweak the final output before copying or downloading.',
    },
    {
      question: 'What if I already have a .gitignore?',
      answer: 'Paste your existing content into the custom section or use it as a base and re-select templates — the combiner deduplicates lines.',
    },
  ],
  whatIs:
    'A smart .gitignore builder that merges high-quality community patterns for your exact tech stack so you never accidentally commit build artifacts, dependencies, or secrets.',
};
