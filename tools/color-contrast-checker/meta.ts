import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'color-contrast-checker',
  name: 'Color Contrast Checker',
  title: 'Color Contrast Checker – WCAG AA/AAA Compliance Tool | QuickUtils',
  description:
    'Instantly check color contrast ratios against WCAG 2.1 AA and AAA standards. Live preview, multiple input formats, color blindness simulation, and suggestions for accessible color pairs. Essential for designers and developers.',
  category: 'developer',
  icon: '🎨',
  color: 'violet',
  keywords: [
    'color contrast checker',
    'wcag contrast',
    'aa aaa compliance',
    'accessible colors',
    'contrast ratio calculator',
    'color blindness simulator',
    'web accessibility tool',
    'wcag 2.1 checker',
  ],
  canonical: '/color-contrast-checker',
  ogImage: '/og/color-contrast-checker.jpg',
  faqs: [
    {
      question: 'What contrast ratios are required for WCAG AA and AAA?',
      answer: 'For normal text: AA requires 4.5:1, AAA requires 7:1. For large text (18pt+ or 14pt bold): AA is 3:1, AAA is 4.5:1. UI components and graphical objects need at least 3:1 for AA.',
    },
    {
      question: 'Why does my color pass in one tool but fail here?',
      answer: 'Different tools sometimes use slightly different rounding or sRGB linearization. We follow the official WCAG 2.1 relative luminance formula exactly for maximum accuracy.',
    },
    {
      question: 'Does it support alpha transparency?',
      answer: 'For the most accurate results we recommend checking the actual computed colors after compositing. The checker works with opaque colors; use a color picker that shows the final RGB values.',
    },
  ],
  whatIs:
    'A precise tool that calculates the contrast ratio between any two colors and tells you immediately whether they meet the WCAG accessibility guidelines for text, UI components, and graphics — with helpful visualizations and suggestions.',
};
