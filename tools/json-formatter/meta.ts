import type { ToolMeta } from '@/types/tool'

export const meta: ToolMeta = {
  slug: 'json-formatter',
  name: 'JSON Formatter',
  title: 'JSON Formatter – Beautify, Minify & Validate JSON Online | QuickUtils',
  description:
    'Free JSON formatter and validator. Beautify, minify, and fix JSON with instant error highlighting. Works offline and private.',
  category: 'developer',
  icon: '{ }',
  color: 'amber',
  keywords: [
    'json formatter',
    'json validator',
    'json beautifier',
    'json parser',
    'minify json',
    'pretty print json',
  ],
  canonical: '/json-formatter',
  ogImage: '/og/json-formatter.jpg',
  faqs: [
    {
      question: 'Is my JSON data sent anywhere?',
      answer: 'No. All formatting and validation happens locally in your browser. Nothing is uploaded.',
    },
    {
      question: 'Can it fix broken JSON?',
      answer: 'It can detect errors and show you exactly where the problem is. It does not auto-repair malformed JSON.',
    },
  ],
}
