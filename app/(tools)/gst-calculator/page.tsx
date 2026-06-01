import type { Metadata } from 'next';
import { meta } from '@/tools/gst-calculator/meta';
import GstCalculator from '@/tools/gst-calculator/GstCalculator';
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

export default function GstCalculatorPage() {
  const jsonLd = generateToolSchema(meta);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-sm font-bold text-emerald-700 mb-4">
            India’s #1 GST Calculator
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-3">
            GST Calculator
          </h1>
          <p className="text-xl text-muted max-w-md mx-auto">
            Calculate GST inclusive & exclusive amounts with accurate CGST, SGST & IGST breakup.
          </p>
        </div>

        {/* Top Ad */}
        {AD_SLOTS.top && <AdBanner slot={AD_SLOTS.top} className="mb-8" />}

        {/* The Tool */}
        <GstCalculator />

        {/* Bottom Ad */}
        {AD_SLOTS.bottom && <AdBanner slot={AD_SLOTS.bottom} className="my-8" />}

        {/* SEO Content */}
        <div className="prose prose-gray max-w-none mt-12 text-[15px] leading-relaxed text-muted">
          <h2 className="text-2xl font-bold text-text tracking-tight">How to Use This GST Calculator</h2>
          
          <p>
            This free GST calculator helps you instantly compute Goods and Services Tax for any transaction in India. 
            Whether you are a business owner, freelancer, or consumer, understanding GST breakup (CGST, SGST, IGST) is essential.
          </p>

          <h3 className="text-xl font-semibold text-text mt-8">GST Exclusive vs Inclusive</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Exclusive:</strong> Enter the base price. The calculator adds GST on top.</li>
            <li><strong>Inclusive:</strong> Enter the final price you paid or quoted. The calculator extracts the GST amount and shows the original taxable value.</li>
          </ul>

          <h3 className="text-xl font-semibold text-text mt-8">Intra-State vs Inter-State GST</h3>
          <p>
            Indian GST has two types of supply:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Intra-State:</strong> When buyer and seller are in the same state. GST is split equally into CGST (Central) and SGST (State).</li>
            <li><strong>Inter-State:</strong> When buyer and seller are in different states (or imports). The entire GST is collected as IGST.</li>
          </ul>

          <h3 className="text-xl font-semibold text-text mt-8">Common GST Rates in India</h3>
          <p>
            The most frequently used GST slabs are 5%, 12%, 18%, and 28%. Our calculator includes quick preset buttons for all these rates plus support for custom rates like 3% or 0.25%.
          </p>

          <h2 className="text-2xl font-bold text-text tracking-tight mt-10">Why Use Our GST Calculator?</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>100% accurate calculations using official GST formulas</li>
            <li>Live results — no need to click "Calculate"</li>
            <li>Clear visual breakdown of CGST, SGST, and IGST</li>
            <li>Works completely offline after first visit</li>
            <li>Copy full breakup with one click</li>
            <li>Mobile-friendly design with large inputs</li>
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
            <li><a href="/invoice-generator" className="text-emerald-600 hover:underline">Invoice Generator</a> — Create professional GST invoices</li>
            <li><a href="/percentage-calculator" className="text-emerald-600 hover:underline">Percentage Calculator</a> — Quick percentage calculations</li>
            <li><a href="/discount-calculator" className="text-emerald-600 hover:underline">Discount Calculator</a> — Calculate discounts with tax</li>
          </ul>
        </div>
      </div>
    </>
  );
}
