import type { Metadata } from 'next';
import { meta } from '@/tools/small-savings-calculator/meta';
import SmallSavingsCalculator from '@/tools/small-savings-calculator/SmallSavingsCalculator';
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

export default function SmallSavingsCalculatorPage() {
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
            Government Backed &amp; Safe
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-3">
            Small Savings Schemes Calculator
          </h1>
          <p className="text-xl text-muted max-w-md mx-auto">
            Calculate maturity for PPF, NSC, and KVP with current interest rates.
          </p>
        </div>

        {AD_SLOTS.top && <AdBanner slot={AD_SLOTS.top} className="mb-8" />}

        <SmallSavingsCalculator />

        {AD_SLOTS.bottom && <AdBanner slot={AD_SLOTS.bottom} className="my-8" />}

        <div className="prose prose-gray max-w-none mt-12 text-[15px] leading-relaxed text-muted">
          <h2 className="text-2xl font-bold text-text tracking-tight">Popular Government Small Savings Schemes</h2>
          
          <h3 className="text-xl font-semibold text-text mt-8">Public Provident Fund (PPF)</h3>
          <p>
            A long-term savings scheme with a 15-year tenure (extendable). It offers tax-free interest and maturity (EEE status). 
            The current interest rate is around 7.1%. Maximum annual contribution is ₹1.5 lakh.
          </p>

          <h3 className="text-xl font-semibold text-text mt-8">National Savings Certificate (NSC)</h3>
          <p>
            A 5-year fixed income instrument. Interest is taxable but reinvested. Good for those in lower tax brackets looking for safety.
          </p>

          <h3 className="text-xl font-semibold text-text mt-8">Kisan Vikas Patra (KVP)</h3>
          <p>
            A savings scheme where your investment doubles over a fixed period (currently ~9 years 7 months). Interest is taxable.
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
            <li><a href="/tax-regime-comparator" className="text-emerald-600 hover:underline">Tax Regime Comparator</a></li>
            <li><a href="/epf-gratuity-calculator" className="text-emerald-600 hover:underline">EPF &amp; Gratuity Calculator</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}
