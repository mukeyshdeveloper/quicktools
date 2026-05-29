import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import EmiCalculator from '@/tools/emi-calculator/EmiCalculator';
import { meta } from '@/tools/emi-calculator/meta';

const siteUrl: string = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.thequickutils.com';

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: meta.canonical },
  openGraph: { title: meta.title, description: meta.description, url: `${siteUrl}${meta.canonical}`, images: [{ url: meta.ogImage ?? '/og-default.png', width: 1200, height: 630 }], type: 'website' },
  twitter: { card: 'summary_large_image', title: meta.title, description: meta.description },
};

export default function EmiCalculatorPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-background text-text">
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Free calculator</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">EMI Calculator</h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base">{meta.description}</p>
        </div>
        <EmiCalculator />
        <section className="prose-section mt-12">
          <h2>How to Use the EMI Calculator</h2>
          <p>Enter your loan amount, annual interest rate, and tenure in years or months. The calculator instantly computes your Equated Monthly Instalment (EMI) along with a complete breakdown of total payment and total interest. Everything runs client-side in your browser — your financial data never leaves your device.</p>
          <p>You can also expand the full amortization schedule to see exactly how much principal and interest you pay each month, and how the outstanding balance decreases over time. This is extremely useful when comparing different loan offers from banks.</p>
          <h2>Frequently Asked Questions</h2>
          <h3>What is EMI?</h3>
          <p>EMI stands for Equated Monthly Instalment. It is a fixed monthly payment made to repay a loan. Each EMI includes part principal repayment and part interest payment. Over time, the interest portion decreases while the principal portion increases.</p>
          <h3>How is EMI calculated?</h3>
          <p>EMI is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n – 1), where P is the principal, r is the monthly interest rate, and n is the total number of monthly instalments.</p>
          <h2>Related Tools</h2>
          <ul>
            <li><Link href="/compound-interest-calculator">Compound Interest Calculator</Link></li>
            <li><Link href="/sip-calculator">SIP Calculator</Link></li>
            <li><Link href="/roi-calculator">ROI Calculator</Link></li>
          </ul>
        </section>
      </main>
    </div>
  );
}
