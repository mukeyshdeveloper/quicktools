import type { Metadata } from 'next';
import { meta } from '@/tools/home-loan-eligibility-calculator/meta';
import HomeLoanEligibilityCalculator from '@/tools/home-loan-eligibility-calculator/HomeLoanEligibilityCalculator';
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

export default function HomeLoanEligibilityCalculatorPage() {
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
            Now with Age &amp; FOIR Visual
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-3">
            Home Loan Eligibility Calculator
          </h1>
          <p className="text-xl text-muted max-w-lg mx-auto">
            Find out the maximum home loan amount you can get based on your income and obligations.
          </p>
        </div>

        {AD_SLOTS.top && <AdBanner slot={AD_SLOTS.top} className="mb-8" />}

        <HomeLoanEligibilityCalculator />

        {AD_SLOTS.bottom && <AdBanner slot={AD_SLOTS.bottom} className="my-8" />}

        <div className="prose prose-gray max-w-none mt-12 text-[15px] leading-relaxed text-muted">
          <h2 className="text-2xl font-bold text-text tracking-tight">How Home Loan Eligibility is Calculated</h2>
          
          <p>
            Banks in India primarily use the <strong>FOIR (Fixed Obligation to Income Ratio)</strong> method to decide your home loan eligibility. 
            This tool uses the same logic that most banks and housing finance companies follow.
          </p>

          <h3 className="text-xl font-semibold text-text mt-8">The Formula Banks Use</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>They calculate your <strong>maximum allowable EMI</strong> = (Gross Monthly Income − Existing EMIs) × FOIR %</li>
            <li>They then work backwards from this EMI using the current interest rate and desired tenure to find the <strong>maximum loan amount</strong>.</li>
          </ol>

          <h3 className="text-xl font-semibold text-text mt-8">What Affects Your Eligibility?</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Income:</strong> Higher stable income = higher eligibility</li>
            <li><strong>Existing EMIs:</strong> Car loans, personal loans, credit card payments reduce your eligibility</li>
            <li><strong>Age:</strong> Banks usually require you to repay before retirement (often age 65–70). Younger borrowers can get longer tenures and higher eligibility.</li>
            <li><strong>FOIR Policy:</strong> Most banks use 50–60%. Some go up to 65–70% for strong profiles</li>
            <li><strong>Credit Score:</strong> This calculator gives an estimate. Actual approval also depends on your CIBIL score</li>
          </ul>

          <h2 className="text-2xl font-bold text-text tracking-tight mt-10">How to Use This Tool Effectively</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Enter your actual gross monthly income (before deductions)</li>
            <li>Include all existing EMIs accurately</li>
            <li>Try different tenures — longer tenure usually means higher eligibility</li>
            <li>Use this along with our <a href="/emi-calculator" className="text-blue-600 underline">EMI Calculator</a> to plan your budget</li>
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
            <li><a href="/emi-calculator" className="text-blue-600 hover:underline">EMI Calculator</a> — Calculate EMI for a known loan amount</li>
            <li><a href="/tax-regime-comparator" className="text-blue-600 hover:underline">Tax Regime Comparator</a> — Plan your finances better</li>
          </ul>
        </div>
      </div>
    </>
  );
}
