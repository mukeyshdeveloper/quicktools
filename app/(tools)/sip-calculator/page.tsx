import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import SipCalculator from '@/tools/sip-calculator/SipCalculator';
import { meta } from '@/tools/sip-calculator/meta';

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

export default function SipCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
      <div className="mb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Free calculator</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">SIP Calculator</h1>
        <p className="mt-3 text-sm leading-6 text-muted sm:text-base">{meta.description}</p>
      </div>
      <SipCalculator />
      <section className="prose-section mt-12">
        <h2>How to Use the SIP Calculator</h2>
        <p>
          Enter monthly investment amount, expected annual return, and time horizon. Instantly see projected future value, total invested, and wealth gained.
        </p>

        <h2>Frequently Asked Questions</h2>
        {meta.faqs?.map((faq, i) => (
          <div key={i}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}

        <h2>Related Tools</h2>
        <ul className="list-disc pl-5">
          <li><Link href="/compound-interest-calculator">Compound Interest Calculator</Link></li>
          <li><Link href="/emi-calculator">EMI Calculator</Link></li>
          <li><Link href="/roi-calculator">ROI Calculator</Link></li>
        </ul>
      </section>
    </>
  );
}
