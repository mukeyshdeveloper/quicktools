export type ToolCategory =
  | 'calculator'
  | 'text'
  | 'health'
  | 'developer'
  | 'generator'
  | 'business';

export interface FAQ {
  question: string;
  answer: string;
}

export interface ToolMeta {
  slug: string;
  name: string;
  description: string;
  title: string;
  category: ToolCategory;
  icon: string;
  color: string;
  keywords: string[];
  canonical: string;
  ogImage?: string;
  /** Optional structured FAQs for FAQPage schema + on-page content */
  faqs?: FAQ[];
  /** Short "What is this tool?" explanation (used for richer SEO content) */
  whatIs?: string;
}
