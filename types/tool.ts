export type ToolCategory =
  | 'calculator'
  | 'text'
  | 'health'
  | 'developer'
  | 'generator'
  | 'business';

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
}
