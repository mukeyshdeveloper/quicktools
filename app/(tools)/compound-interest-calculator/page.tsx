import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import CompoundInterestCalculator from '@/tools/compound-interest/CompoundInterestCalculator';
import { meta } from '@/tools/compound-interest/meta';

const siteUrl: string = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quickutils.in';

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: meta.canonical },
  openGraph: { title: meta.title, description: meta.description, url: `${siteUrl}${meta.canonical}`, images: [{ url: meta.ogImage ?? '/og-default.png', width: 1200, height: 630 }], type: 'website' },
  twitter: { card: 'summary_large_image', title: meta.title, description: meta.description },
};

export default function CompoundInterestPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-background text-text">
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Free calculator</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">Compound Interest Calculator</h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base">{meta.description}</p>
        </div>
        <CompoundInterestCalculator />
        <section className="prose-section mt-12">
          <h2>How to Use the Compound Interest Calculator</h2>
          <p>Enter your initial investment, annual interest rate, and the number of years you plan to invest. Optionally add a recurring monthly contribution and choose how often interest compounds — yearly, quarterly, monthly, or daily. The tool instantly shows you the future value of your investment, total contributions, and the total interest earned.</p>
          <p>The year-by-year growth table lets you track exactly how your wealth grows over time. This is invaluable for retirement planning, education savings, or comparing fixed deposit offers from different banks.</p>
          <h2>Frequently Asked Questions</h2>
          <h3>What is compound interest?</h3>
          <p>Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, compound interest grows exponentially, making it one of the most powerful wealth-building concepts in finance.</p>
          <h3>How often should interest compound?</h3>
          <p>The more frequently interest compounds, the more you earn. Daily compounding yields slightly more than monthly, which yields more than yearly. Most savings accounts and fixed deposits compound monthly or quarterly.</p>
          <h2>Related Tools</h2>
          <ul>
            <li><Link href="/emi-calculator">EMI Calculator</Link></li>
            <li><Link href="/sip-calculator">SIP Calculator</Link></li>
            <li><Link href="/salary-calculator">Salary Calculator</Link></li>
          </ul>
        </section>
      </main>
    </div>
  );
}
