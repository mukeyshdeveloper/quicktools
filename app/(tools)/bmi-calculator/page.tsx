import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import BmiCalculator from '@/tools/bmi-calculator/BmiCalculator';
import { meta } from '@/tools/bmi-calculator/meta';
import { absoluteUrl } from '@/lib/site';
import FAQSection from '@/components/ui/FAQSection';

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

export default function BmiCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />

      <div className="mb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
          Free health tool
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
          BMI Calculator
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
          {meta.description}
        </p>
      </div>

        <BmiCalculator />

        <section className="prose-section mt-12">
          <h2>How to Use the BMI Calculator</h2>
          <p>
            Select metric or imperial units, enter your height and weight. The tool instantly shows your BMI, the corresponding weight category, and a suggested healthy weight range for your height.
          </p>

          <FAQSection faqs={meta.faqs} />

          <div className="pt-8 mt-12 border-t border-border">
            <h2>Related Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/age-calculator" className="text-brand underline">Age Calculator</Link></li>
              <li><Link href="/tdee-calculator" className="text-brand underline">TDEE Calculator</Link></li>
              <li><Link href="/sleep-cycle-calculator" className="text-brand underline">Sleep Cycle Calculator</Link></li>
            </ul>
          </div>
        </section>
      </>
    );
  }
