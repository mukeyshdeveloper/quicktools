'use cache';

import type { ToolMeta } from '@/types';
import { meta as ageCalculatorMeta } from '@/tools/age-calculator/meta';
import { meta as bmiCalculatorMeta } from '@/tools/bmi-calculator/meta';
import { meta as passwordGeneratorMeta } from '@/tools/password-generator/meta';
import { meta as qrCodeGeneratorMeta } from '@/tools/qr-code-generator/meta';
import { meta as unitConverterMeta } from '@/tools/unit-converter/meta';
import { meta as wordCounterMeta } from '@/tools/word-counter/meta';
import { meta as colorPickerMeta } from '@/tools/color-picker/meta';
import { meta as jsonFormatterMeta } from '@/tools/json-formatter/meta';
import { meta as invoiceGeneratorMeta } from '@/tools/invoice-generator/meta';
import { meta as resumeBuilderMeta } from '@/tools/resume-builder/meta';

// Sprint 1 — Finance tools
import { meta as emiCalculatorMeta } from '@/tools/emi-calculator/meta';
import { meta as compoundInterestMeta } from '@/tools/compound-interest/meta';
import { meta as salaryCalculatorMeta } from '@/tools/salary-calculator/meta';
import { meta as sipCalculatorMeta } from '@/tools/sip-calculator/meta';
import { meta as roiCalculatorMeta } from '@/tools/roi-calculator/meta';

// Sprint 2 — Business / HR
import { meta as salarySlipMeta } from '@/tools/salary-slip-generator/meta';

// Sprint 2 — Developer / Text
import { meta as base64Meta } from '@/tools/base64-encoder-decoder/meta';
import { meta as caseConverterMeta } from '@/tools/case-converter/meta';
import { meta as loremIpsumMeta } from '@/tools/lorem-ipsum-generator/meta';
import { meta as jwtDecoderMeta } from '@/tools/jwt-decoder/meta';
import { meta as regexTesterMeta } from '@/tools/regex-tester/meta';
import { meta as cssGeneratorMeta } from '@/tools/css-generator/meta';
import { meta as markdownPreviewerMeta } from '@/tools/markdown-previewer/meta';
import { meta as diffCheckerMeta } from '@/tools/diff-checker/meta';
import { meta as urlEncoderDecoderMeta } from '@/tools/url-encoder-decoder/meta';
import { meta as uuidGeneratorMeta } from '@/tools/uuid-generator/meta';
import { meta as codeMinifierMeta } from '@/tools/code-minifier/meta';
import { meta as svgToBase64Meta } from '@/tools/svg-to-base64/meta';
import { meta as metaTagGeneratorMeta } from '@/tools/meta-tag-generator/meta';

export const tools: ToolMeta[] = [
  // Originals
  ageCalculatorMeta,
  wordCounterMeta,
  bmiCalculatorMeta,
  passwordGeneratorMeta,
  qrCodeGeneratorMeta,
  unitConverterMeta,
  colorPickerMeta,
  jsonFormatterMeta,
  resumeBuilderMeta,
  invoiceGeneratorMeta,
  // Finance
  emiCalculatorMeta,
  compoundInterestMeta,
  salaryCalculatorMeta,
  sipCalculatorMeta,
  roiCalculatorMeta,
  // Business / HR
  salarySlipMeta,
  // Developer / Text
  base64Meta,
  caseConverterMeta,
  loremIpsumMeta,
  jwtDecoderMeta,
  diffCheckerMeta,
  regexTesterMeta,
  cssGeneratorMeta,
  markdownPreviewerMeta,
  urlEncoderDecoderMeta,
  uuidGeneratorMeta,
  codeMinifierMeta,
  svgToBase64Meta,
  metaTagGeneratorMeta,
];

export async function getAllTools(): Promise<ToolMeta[]> {
  return tools;
}
