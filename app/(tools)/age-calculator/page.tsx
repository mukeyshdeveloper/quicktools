import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import AgeCalculator from '@/tools/age-calculator/AgeCalculator';
import { meta } from '@/tools/age-calculator/meta';
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
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
};

export default function AgeCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />

      <div className="mb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
          Free calculator
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
          Age Calculator
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
          {meta.description}
        </p>
      </div>

      <AgeCalculator />

      <section className="prose-section mt-12">
        <h2>How to Use the Age Calculator</h2>
        <p>
          Enter your date of birth and optionally change the “as of” date. The tool instantly shows
          your exact age in years, months, and days along with total days lived and days until your
          next birthday.
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
          <li><Link href="/bmi-calculator">BMI Calculator</Link></li>
          <li><Link href="/date-difference-calculator">Date Difference Calculator</Link></li>
          <li><Link href="/pregnancy-due-date-calculator">Pregnancy Due Date Calculator</Link></li>
        </ul>
      </section>
    </>
  );
}
