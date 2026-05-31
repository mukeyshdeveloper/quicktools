import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import SalaryCalculator from '@/tools/salary-calculator/SalaryCalculator';
import { meta } from '@/tools/salary-calculator/meta';

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

export default function SalaryCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
      <div className="mb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Free calculator</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">Salary Calculator</h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base">{meta.description}</p>
        </div>
        <SalaryCalculator />
        <section className="prose-section mt-12">
          <h2>How to Use the Salary Calculator</h2>
          <p>Select your pay period — hourly, daily, weekly, bi-weekly, monthly, or annual — and enter your wage. The calculator instantly converts it to every other period. Adjust hours per week, days per week, and add an estimated tax rate to see your after-tax take-home pay across all periods.</p>
          <p>This is especially useful when comparing job offers that quote salaries differently. One company may offer ₹25 per hour while another offers ₹4,00,000 per year — this tool instantly tells you which is better.</p>
          <h2>Frequently Asked Questions</h2>
          <h3>How is annual salary calculated from hourly rate?</h3>
          <p>Annual salary = Hourly Rate × Hours per Week × 52 weeks. The default is 40 hours per week, 5 days per week, giving 2,080 working hours per year.</p>
          <h3>Is the tax calculation exact?</h3>
          <p>The tax calculation uses a flat rate you provide. Real taxes involve slabs and deductions. Use this as a quick estimate, and consult a tax professional for exact figures.</p>
          <h2>Related Tools</h2>
          <ul>
            <li><Link href="/emi-calculator">EMI Calculator</Link></li>
            <li><Link href="/roi-calculator">ROI Calculator</Link></li>
            <li><Link href="/compound-interest-calculator">Compound Interest Calculator</Link></li>
          </ul>
        </section>
      </>
    );
  }
