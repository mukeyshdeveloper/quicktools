'use cache';

import type { ToolMeta } from '@/types';
import { meta as ageCalculatorMeta } from '@/tools/age-calculator/meta';
import { meta as bmiCalculatorMeta } from '@/tools/bmi-calculator/meta';
import { meta as passwordGeneratorMeta } from '@/tools/password-generator/meta';
import { meta as qrCodeGeneratorMeta } from '@/tools/qr-code-generator/meta';
import { meta as unitConverterMeta } from '@/tools/unit-converter/meta';
import { meta as wordCounterMeta } from '@/tools/word-counter/meta';

export const tools: ToolMeta[] = [
  ageCalculatorMeta,
  wordCounterMeta,
  bmiCalculatorMeta,
  passwordGeneratorMeta,
  qrCodeGeneratorMeta,
  unitConverterMeta,
  {
    slug: 'color-picker',
    name: 'Color Picker',
    title: 'Color Picker - Convert HEX RGB and HSL | QuickUtils',
    description:
      'Pick colors, generate palettes and convert between HEX, RGB and HSL.',
    category: 'developer',
    icon: '🎨',
    color: 'amber',
    keywords: ['color picker', 'hex to rgb', 'color palette generator'],
    canonical: '/color-picker',
  },
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    title: 'JSON Formatter - Beautify and Validate JSON | QuickUtils',
    description:
      'Beautify, minify and validate JSON data for cleaner debugging.',
    category: 'developer',
    icon: '{ }',
    color: 'amber',
    keywords: ['json formatter', 'json validator', 'json beautifier'],
    canonical: '/json-formatter',
  },
  {
    slug: 'resume-builder',
    name: 'Resume Builder',
    title: 'Resume Builder - Create a Free Resume | QuickUtils',
    description:
      'Create a professional resume and prepare it for PDF download.',
    category: 'business',
    icon: '📄',
    color: 'orange',
    keywords: ['resume builder', 'cv maker', 'free resume'],
    canonical: '/resume-builder',
  },
  {
    slug: 'invoice-generator',
    name: 'Invoice Generator',
    title: 'Invoice Generator - Create Free Invoices | QuickUtils',
    description:
      'Create professional invoices for your business and download them as PDF.',
    category: 'business',
    icon: '🧾',
    color: 'orange',
    keywords: ['invoice generator', 'free invoice', 'bill maker'],
    canonical: '/invoice-generator',
  },
];

export async function getAllTools(): Promise<ToolMeta[]> {
  return tools;
}
