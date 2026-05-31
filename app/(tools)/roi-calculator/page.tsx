import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import RoiCalculator from '@/tools/roi-calculator/RoiCalculator';
import { meta } from '@/tools/roi-calculator/meta';

import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: meta.canonical },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: absoluteUrl(meta.canonical),
    images: [{ url: meta.ogImage ?? '/og-default.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: meta.title, description: meta.description },
};

export default function RoiCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
      <div className="mb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Free calculator</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">ROI Calculator</h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base">{meta.description}</p>
        </div>
        <RoiCalculator />
        <section className="prose-section mt-12">
          <h2>How to Use the ROI Calculator</h2>
          <p>Enter the cost of your investment (what you spent) and the total return or revenue generated. Optionally specify the investment period in years. The calculator shows your net profit, ROI percentage, annualized ROI, profit margin, and return multiple — all the key metrics investors and business owners need.</p>
          <p>Whether you are evaluating a stock trade, real estate deal, marketing campaign, or business expansion, this tool gives you a comprehensive picture of your investment performance in seconds.</p>
          <h2>Frequently Asked Questions</h2>
          <h3>What is ROI?</h3>
          <p>ROI (Return on Investment) measures the gain or loss generated relative to the amount invested. It is expressed as a percentage: ROI = (Net Profit / Cost of Investment) × 100. A positive ROI means you made money; a negative ROI means you lost money.</p>
          <h3>What is annualized ROI?</h3>
          <p>Annualized ROI adjusts the return to a yearly basis, making it easier to compare investments with different holding periods. A 50% ROI over 5 years is very different from 50% ROI in 1 year — annualized ROI accounts for this difference.</p>
          <h2>Related Tools</h2>
          <ul>
            <li><Link href="/sip-calculator">SIP Calculator</Link></li>
            <li><Link href="/compound-interest-calculator">Compound Interest Calculator</Link></li>
            <li><Link href="/salary-calculator">Salary Calculator</Link></li>
          </ul>
        </section>
      </>
    );
  }
