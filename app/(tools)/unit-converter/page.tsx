import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { generateToolSchema } from '@/lib/schema';
import UnitConverter from '@/tools/unit-converter/UnitConverter';
import { meta } from '@/tools/unit-converter/meta';

const siteUrl: string = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quickutils.in';

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: {
    canonical: meta.canonical,
  },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${siteUrl}${meta.canonical}`,
    images: [
      {
        url: meta.ogImage ?? '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Unit Converter by QuickUtils',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
};

export default function UnitConverterPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-background text-text">
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateToolSchema(meta)),
          }}
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
            QuickUtils Unit Converter helps you convert common measurements in
            seconds. Choose a category such as length, weight, temperature,
            volume, speed, time, pressure, energy, power, data, angle, or fuel
            economy. Enter a value, pick the source unit, and the converted
            result appears instantly.
          </p>
          <p>
            The all-conversions grid shows the same value across every unit in
            the selected category, making it easy to compare multiple units at
            once. You can also swap the source and target units with one click.
            All calculations run in your browser and do not require an external
            API.
          </p>

          <h2>Frequently Asked Questions</h2>
          <h3>Which units can I convert?</h3>
          <p>
            The converter supports everyday units for distance, mass,
            temperature, area, volume, speed, time, pressure, energy, power,
            digital data, angles, and fuel economy.
          </p>
          <h3>Are the conversions exact?</h3>
          <p>
            Standard metric and defined conversion factors are used where
            possible. Some practical units, such as months, years, fuel economy,
            and Mach speed, use common reference values and should be treated as
            helpful estimates.
          </p>

          <h2>Related Tools</h2>
          <ul>
            <li>
              <Link href="/bmi-calculator">BMI Calculator</Link>
            </li>
            <li>
              <Link href="/age-calculator">Age Calculator</Link>
            </li>
            <li>
              <Link href="/qr-code-generator">QR Code Generator</Link>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
