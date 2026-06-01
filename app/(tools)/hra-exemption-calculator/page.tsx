import type { Metadata } from 'next';
import { meta } from '@/tools/hra-exemption-calculator/meta';
import HraExemptionCalculator from '@/tools/hra-exemption-calculator/HraExemptionCalculator';
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

export default function HraExemptionCalculatorPage() {
  const jsonLd = generateToolSchema(meta);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-sm font-bold text-blue-700 mb-4">
            For Salaried Employees
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-3">
            HRA Exemption Calculator
          </h1>
          <p className="text-xl text-muted max-w-md mx-auto">
            Calculate how much of your House Rent Allowance is exempt from tax.
          </p>
        </div>

        {AD_SLOTS.top && <AdBanner slot={AD_SLOTS.top} className="mb-8" />}

        <HraExemptionCalculator />

        {AD_SLOTS.bottom && <AdBanner slot={AD_SLOTS.bottom} className="my-8" />}

        <div className="prose prose-gray max-w-none mt-12 text-[15px] leading-relaxed text-muted">
          <h2 className="text-2xl font-bold text-text tracking-tight">How HRA Exemption Works (Section 10(13A))</h2>
          
          <p>
            If you receive House Rent Allowance (HRA) as part of your salary and you live in a rented house, 
            a significant portion of the HRA can be claimed as tax-free under Section 10(13A) of the Income Tax Act.
          </p>

          <h3 className="text-xl font-semibold text-text mt-8">The Three Limits Rule</h3>
          <p>
            Your HRA exemption is the <strong>least</strong> of the following three amounts:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Actual HRA received from your employer</li>
            <li>50% of (Basic + DA) if you live in a metro city, or 40% for non-metro cities</li>
            <li>Rent paid minus 10% of (Basic + DA)</li>
          </ol>

          <h3 className="text-xl font-semibold text-text mt-8">Important Points</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>You must actually pay rent for a residential property.</li>
            <li>If you live in your own house or with parents (without paying rent), you cannot claim HRA exemption.</li>
            <li>For rent above ₹3,000/month, rent receipts are usually required by your employer.</li>
            <li>If total rent paid in a year exceeds ₹1 lakh, you need to provide your landlord’s PAN.</li>
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
            <li><a href="/tax-regime-comparator" className="text-blue-600 hover:underline">Old vs New Tax Regime Comparator</a></li>
            <li><a href="/salary-calculator" className="text-blue-600 hover:underline">Salary Calculator</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}
