import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import CompoundInterestCalculator from '@/tools/compound-interest/CompoundInterestCalculator';
import { meta } from '@/tools/compound-interest/meta';
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

export default function CompoundInterestPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
      <div className="mb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Free calculator</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">Compound Interest Calculator</h1>
        <p className="mt-3 text-sm leading-6 text-muted sm:text-base">{meta.description}</p>
      </div>
        <CompoundInterestCalculator />
        <section className="prose-section mt-12 max-w-3xl">
          <h2>How to Use the Compound Interest Calculator</h2>
          <p>Enter your initial investment, annual interest rate, and the number of years you plan to invest. Optionally add a recurring monthly contribution and choose how often interest compounds — yearly, quarterly, monthly, or daily. The tool instantly shows you the future value of your investment, total contributions, and the total interest earned.</p>
          <p>The year-by-year growth table lets you track exactly how your wealth grows over time. This is invaluable for retirement planning, education savings, or comparing fixed deposit offers from different banks.</p>
          
          <FAQSection faqs={meta.faqs} />
          
          <div className="pt-8 mt-12 border-t border-border">
            <h2>Related Finance Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/emi-calculator" className="text-brand underline">EMI Calculator</Link></li>
              <li><Link href="/sip-calculator" className="text-brand underline">SIP Calculator</Link></li>
              <li><Link href="/salary-calculator" className="text-brand underline">Salary Calculator</Link></li>
            </ul>
          </div>
        </section>
      </>
    );
  }
