import type { Metadata } from 'next';
import { meta } from '@/tools/epf-gratuity-calculator/meta';
import EpfGratuityCalculator from '@/tools/epf-gratuity-calculator/EpfGratuityCalculator';
import AdBanner from '@/components/layout/AdBanner';
import { AD_SLOTS } from '@/lib/site';
import { generateToolSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: meta.canonical },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${meta.canonical}`,
    images: [{ url: meta.ogImage ?? '/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function EpfGratuityCalculatorPage() {
  const jsonLd = generateToolSchema(meta);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-sm font-bold text-emerald-700 mb-4">
            Retirement Planning Tool
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-3">
            EPF &amp; Gratuity Calculator
          </h1>
          <p className="text-xl text-muted max-w-lg mx-auto">
            Project your EPF corpus at retirement and calculate your gratuity amount accurately.
          </p>
        </div>

        {AD_SLOTS.top && <AdBanner slot={AD_SLOTS.top} className="mb-8" />}

        <EpfGratuityCalculator />

        {AD_SLOTS.bottom && <AdBanner slot={AD_SLOTS.bottom} className="my-8" />}

        <div className="prose prose-gray max-w-none mt-12 text-[15px] leading-relaxed text-muted">
          <h2 className="text-2xl font-bold text-text tracking-tight">How This EPF &amp; Gratuity Calculator Works</h2>
          
          <p>
            This tool helps you estimate two of the most important retirement benefits for salaried employees in India — 
            your Employees' Provident Fund (EPF) balance and Gratuity amount at the time of retirement.
          </p>

          <h3 className="text-xl font-semibold text-text mt-8">EPF Projection</h3>
          <p>
            Your EPF grows every month with contributions from both you (12% of Basic + DA) and your employer (3.67% goes to EPF). 
            We also factor in your expected salary growth every year and the current EPF interest rate (8.25% for FY 2025-26).
          </p>

          <h3 className="text-xl font-semibold text-text mt-8">Gratuity Calculation</h3>
          <p>
            Gratuity is a lump sum amount paid by your employer when you leave the organization after completing 5 or more years of service. 
            The formula used is: <strong>(Basic Salary + DA) × 15/26 × Years of Service</strong>. The maximum gratuity payable is currently capped at ₹25 lakhs.
          </p>

          <h2 className="text-2xl font-bold text-text tracking-tight mt-10">Key Features</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Accurate EPF calculation using 15.67% total monthly contribution</li>
            <li>Accounts for annual salary increments</li>
            <li>Option to enter your current EPF balance</li>
            <li>Live results as you change inputs</li>
            <li>Gratuity eligibility check (5+ years)</li>
            <li>Current EPF interest rate pre-filled (editable)</li>
          </ul>

          <h2 className="text-2xl font-bold text-text tracking-tight mt-10">Frequently Asked Questions</h2>

          {meta.faqs?.map((faq, index) => (
            <div key={index} className="mt-6">
              <h3 className="font-semibold text-text">{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}

          <h2 className="text-2xl font-bold text-text tracking-tight mt-10">Related Tools</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><a href="/tax-regime-comparator" className="text-emerald-600 hover:underline">Tax Regime Comparator</a> — Compare old vs new tax regime</li>
            <li><a href="/salary-calculator" className="text-emerald-600 hover:underline">Salary Calculator</a> — Calculate in-hand salary</li>
          </ul>
        </div>
      </div>
    </>
  );
}
