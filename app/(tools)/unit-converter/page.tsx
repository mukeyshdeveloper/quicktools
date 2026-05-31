import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import UnitConverter from '@/tools/unit-converter/UnitConverter';
import { meta } from '@/tools/unit-converter/meta';
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

export default function UnitConverterPage() {
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
            Unit Converter
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
            {meta.description}
          </p>
        </div>

        <UnitConverter />

        <section className="prose-section mt-12">
          <h2>How to Use the Unit Converter</h2>
          <p>
            Choose a category, enter a value, and instantly see conversions across all units in that category. Swap button reverses source/target.
          </p>

          <h2>Frequently Asked Questions</h2>
          <h3>Which units can I convert?</h3>
          <p>
            Distance, mass, temperature, volume, speed, time, pressure, energy, power, data, angles, and fuel economy.
          </p>
          <h3>Are the conversions exact?</h3>
          <p>
            Standard factors are used. Some practical units (months, fuel economy, etc.) use common reference values.
          </p>

          <h2>Related Tools</h2>
          <ul className="list-disc pl-5">
            <li><Link href="/bmi-calculator">BMI Calculator</Link></li>
            <li><Link href="/age-calculator">Age Calculator</Link></li>
            <li><Link href="/percentage-calculator">Percentage Calculator</Link></li>
          </ul>
        </section>
      </>
    );
  }
