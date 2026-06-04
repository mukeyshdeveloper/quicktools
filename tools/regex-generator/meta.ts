import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'regex-generator',
  name: 'Regex Generator',
  title: 'Regex Generator – Create Patterns from Example Strings | QuickUtils',
  description:
    'Turn example strings into accurate regular expressions. Provide positive and negative examples, get a smart regex with explanation, test cases, and flags. Great for beginners and power users alike.',
  category: 'developer',
  icon: '🔍',
  color: 'violet',
  keywords: [
    'regex generator',
    'regular expression from examples',
    'create regex online',
    'regex from text',
    'pattern generator',
    'regex builder',
    'test regex',
  ],
  canonical: '/regex-generator',
  ogImage: '/og/regex-generator.jpg',
  faqs: [
    {
      question: 'How does it generate the regex?',
      answer: 'It analyzes the common structure across your positive examples and produces a pattern that matches them while trying to stay as specific as possible. Negative examples help refine it.',
    },
    {
      question: 'Is the generated regex always perfect?',
      answer: 'It is a strong starting point based on the examples you provide. For complex cases you may still need to tweak quantifiers or character classes. Always test thoroughly.',
    },
    {
      question: 'Can it handle very different example formats?',
      answer: 'It works best when examples share a clear structure (e.g. emails, phone numbers, log lines). Highly varied data may produce a very broad regex.',
    },
  ],
  whatIs:
    'An intelligent assistant that learns a regular expression by looking at strings you say should match (and ones that should not). It saves hours of trial and error when writing patterns.',
};
