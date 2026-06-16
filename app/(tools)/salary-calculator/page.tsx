import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import SalaryCalculator from '@/tools/salary-calculator/SalaryCalculator';
import { meta } from '@/tools/salary-calculator/meta';
import FAQSection from '@/components/ui/FAQSection';

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
        <section className="prose-section mt-12 max-w-3xl">
          <h2>How to Use the Salary Calculator</h2>
          <p>Select your pay period — hourly, daily, weekly, bi-weekly, monthly, or annual — and enter your wage. The calculator instantly converts it to every other period. Adjust hours per week, days per week, and add an estimated tax rate to see your after-tax take-home pay across all periods.</p>
          <p>This is especially useful when comparing job offers that quote salaries differently. One company may offer ₹250 per hour while another offers ₹4,00,000 per year — this tool instantly tells you which is better.</p>
          
          <FAQSection faqs={meta.faqs} />
          
          <div className="pt-8 mt-12 border-t border-border">
            <h2>Related Finance Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/emi-calculator" className="text-brand underline">EMI Calculator</Link></li>
              <li><Link href="/roi-calculator" className="text-brand underline">ROI Calculator</Link></li>
              <li><Link href="/compound-interest-calculator" className="text-brand underline">Compound Interest Calculator</Link></li>
            </ul>
          </div>
        </section>
      </>
    );
  }
