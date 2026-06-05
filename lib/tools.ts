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
import { meta as utmBuilderMeta } from '@/tools/utm-builder/meta';
import { meta as imageCompressorMeta } from '@/tools/image-compressor/meta';
import { meta as imageConverterMeta } from '@/tools/image-converter/meta';
import { meta as colorPaletteExtractorMeta } from '@/tools/color-palette-extractor/meta';
import { meta as tdeeCalculatorMeta } from '@/tools/tdee-calculator/meta';
import { meta as pregnancyCalculatorMeta } from '@/tools/pregnancy-due-date-calculator/meta';
import { meta as sleepCycleMeta } from '@/tools/sleep-cycle-calculator/meta';
import { meta as percentageCalculatorMeta } from '@/tools/percentage-calculator/meta';
import { meta as discountCalculatorMeta } from '@/tools/discount-calculator/meta';
import { meta as tipCalculatorMeta } from '@/tools/tip-calculator/meta';
import { meta as gstCalculatorMeta } from '@/tools/gst-calculator/meta';
import { meta as taxRegimeComparatorMeta } from '@/tools/tax-regime-comparator/meta';
import { meta as epfGratuityCalculatorMeta } from '@/tools/epf-gratuity-calculator/meta';
import { meta as homeLoanEligibilityMeta } from '@/tools/home-loan-eligibility-calculator/meta';
import { meta as hraExemptionMeta } from '@/tools/hra-exemption-calculator/meta';
import { meta as smallSavingsMeta } from '@/tools/small-savings-calculator/meta';
import { meta as dateDifferenceMeta } from '@/tools/date-difference-calculator/meta';
import { meta as faviconGeneratorMeta } from '@/tools/favicon-generator/meta';
import { meta as base64ToImageMeta } from '@/tools/base64-to-image/meta';
import { meta as periodCalculatorMeta } from '@/tools/period-calculator/meta';

// Sprint 3 — Advanced Health & Fitness
import { meta as bodyFatMeta } from '@/tools/body-fat-percentage-calculator/meta';
import { meta as waterIntakeMeta } from '@/tools/daily-water-intake-calculator/meta';
import { meta as idealWeightMeta } from '@/tools/ideal-body-weight-calculator/meta';
import { meta as heartRateMeta } from '@/tools/heart-rate-zones-calculator/meta';
import { meta as vo2MaxMeta } from '@/tools/vo2-max-estimator/meta';
import { meta as calorieDeficitMeta } from '@/tools/calorie-deficit-planner/meta';

// Productivity tools
import { meta as pomodoroMeta } from '@/tools/pomodoro-timer/meta';
import { meta as habitMeta } from '@/tools/habit-tracker/meta';
import { meta as decisionMeta } from '@/tools/decision-maker/meta';
import { meta as meetingCostMeta } from '@/tools/meeting-cost-calculator/meta';

// Travel & Group Finance
import { meta as tripPlannerMeta } from '@/tools/trip-planner/meta';
import { meta as billSplitterMeta } from '@/tools/bill-splitter/meta';

// New Developer Tools
import { meta as contrastMeta } from '@/tools/color-contrast-checker/meta';
import { meta as hashMeta } from '@/tools/hash-generator/meta';
import { meta as jwtEncoderMeta } from '@/tools/jwt-encoder/meta';

// Batch 6 — More Developer Tools
import { meta as apiMockMeta } from '@/tools/api-response-mock-generator/meta';
import { meta as sqlFmtMeta } from '@/tools/sql-formatter-minifier/meta';
import { meta as regexGenMeta } from '@/tools/regex-generator/meta';
import { meta as tsConvMeta } from '@/tools/timestamp-converter/meta';
import { meta as b64ImgMeta } from '@/tools/base64-image-optimizer/meta';
import { meta as gitignoreMeta } from '@/tools/gitignore-generator/meta';
import { meta as bulkResizerMeta } from '@/tools/bulk-image-resizer/meta';
import { meta as mockupMeta } from '@/tools/mockup-generator/meta';
import { meta as watermarkMeta } from '@/tools/image-watermark/meta';
import { meta as imagesToPdfMeta } from '@/tools/images-to-pdf/meta';
import { meta as breakEvenMeta } from '@/tools/break-even-calculator/meta';
import { meta as profitMarginMeta } from '@/tools/profit-margin-calculator/meta';
import { meta as quotationMeta } from '@/tools/quotation-generator/meta';
import { meta as leadTrackerMeta } from '@/tools/lead-tracker/meta';
import { meta as invoiceNumMeta } from '@/tools/invoice-number-generator/meta';

// Converters, Licenses & Advanced Health
import { meta as indianNumMeta } from '@/tools/indian-numbering-converter/meta';
import { meta as licenseMeta } from '@/tools/license-generator/meta';
import { meta as pregWeekMeta } from '@/tools/pregnancy-week-tracker/meta';
import { meta as sleepDebtMeta } from '@/tools/sleep-debt-calculator/meta';

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
  utmBuilderMeta,
  // Image tools
  imageCompressorMeta,
  imageConverterMeta,
  colorPaletteExtractorMeta,
  // New Calculators & Health
  tdeeCalculatorMeta,
  pregnancyCalculatorMeta,
  sleepCycleMeta,
  percentageCalculatorMeta,
  discountCalculatorMeta,
  tipCalculatorMeta,
  gstCalculatorMeta,
  taxRegimeComparatorMeta,
  epfGratuityCalculatorMeta,
  homeLoanEligibilityMeta,
  hraExemptionMeta,
  smallSavingsMeta,
  dateDifferenceMeta,
  faviconGeneratorMeta,
  base64ToImageMeta,
  periodCalculatorMeta,
  // Advanced Health & Fitness (new)
  bodyFatMeta,
  waterIntakeMeta,
  idealWeightMeta,
  heartRateMeta,
  vo2MaxMeta,
  calorieDeficitMeta,
  // Productivity
  pomodoroMeta,
  habitMeta,
  decisionMeta,
  meetingCostMeta,
  // Travel & Group Finance
  tripPlannerMeta,
  billSplitterMeta,
  // Developer Tools (new)
  contrastMeta,
  hashMeta,
  jwtEncoderMeta,
  // Developer Tools batch 6
  apiMockMeta,
  sqlFmtMeta,
  regexGenMeta,
  tsConvMeta,
  b64ImgMeta,
  gitignoreMeta,
  // Image Tools batch
  bulkResizerMeta,
  mockupMeta,
  watermarkMeta,
  imagesToPdfMeta,
  // Business Tools batch
  breakEvenMeta,
  profitMarginMeta,
  quotationMeta,
  leadTrackerMeta,
  invoiceNumMeta,
  // Converters, Licenses & Advanced Health
  indianNumMeta,
  licenseMeta,
  pregWeekMeta,
  sleepDebtMeta,
];

export async function getAllTools(): Promise<ToolMeta[]> {
  return tools;
}
