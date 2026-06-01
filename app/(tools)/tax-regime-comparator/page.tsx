import type { Metadata } from 'next';
import { meta } from '@/tools/tax-regime-comparator/meta';
import TaxRegimeComparator from '@/tools/tax-regime-comparator/TaxRegimeComparator';
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

export default function TaxRegimeComparatorPage() {
  const jsonLd = generateToolSchema(meta);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-sm font-bold text-blue-700 mb-4">
            Updated for FY 2025-26
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-3">
            Old vs New Tax Regime Comparator
          </h1>
          <p className="text-xl text-muted max-w-lg mx-auto">
            Instantly find out which tax regime will save you more money this year.
          </p>
        </div>

        {AD_SLOTS.top && <AdBanner slot={AD_SLOTS.top} className="mb-8" />}

        <TaxRegimeComparator />

        {AD_SLOTS.bottom && <AdBanner slot={AD_SLOTS.bottom} className="my-8" />}

        <div className="prose prose-gray max-w-none mt-12 text-[15px] leading-relaxed text-muted">
          <h2 className="text-2xl font-bold text-text tracking-tight">How to Use This Tax Regime Comparator</h2>
          <p>
            This tool helps you make an informed decision between the Old and New Tax Regimes introduced by the Government of India. 
            Simply enter your gross annual income and the deductions you claim under the Old Regime (80C, 80D, home loan interest, etc.). 
            The calculator instantly shows your tax liability under both regimes.
          </p>

          <h3 className="text-xl font-semibold text-text mt-8">Key Differences Between the Two Regimes</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>New Regime:</strong> Lower tax rates, higher standard deduction (₹75,000), but almost no deductions allowed.</li>
            <li><strong>Old Regime:</strong> Higher tax rates in most slabs, but allows full benefit of deductions under Chapter VI-A (80C, 80D, HRA, etc.).</li>
          </ul>

          <h3 className="text-xl font-semibold text-text mt-8">When is the New Regime Better?</h3>
          <p>
            The New Regime is generally better if your total deductions are less than ₹3.5–4 lakh (depending on your income level). 
            Most salaried individuals with basic investments now prefer the New Regime because of the reduced rates and higher rebate.
          </p>

          <h3 className="text-xl font-semibold text-text mt-8">When is the Old Regime Better?</h3>
          <p>
            If you have high deductions — for example, you max out 80C (₹1.5L), have a home loan, pay significant health insurance premiums, 
            or claim HRA — the Old Regime can still save you a substantial amount of tax.
          </p>

          <h2 className="text-2xl font-bold text-text tracking-tight mt-10">Frequently Asked Questions</h2>

          {meta.faqs?.map((faq, index) => (
            <div key={index} className="mt-6">
              <h3 className="font-semibold text-text">{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}

          <h2 className="text-2xl font-bold text-text tracking-tight mt-10">Related Tools</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><a href="/gst-calculator" className="text-blue-600 hover:underline">GST Calculator</a> — Calculate GST inclusive & exclusive with breakup</li>
            <li><a href="/salary-calculator" className="text-blue-600 hover:underline">Salary Calculator</a> — Calculate in-hand salary after tax</li>
            <li><a href="/emi-calculator" className="text-blue-600 hover:underline">EMI Calculator</a> — Plan your home loan better</li>
          </ul>
        </div>
      </div>
    </>
  );
}
