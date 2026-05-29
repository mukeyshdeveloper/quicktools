import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { generateToolSchema } from '@/lib/schema';
import BmiCalculator from '@/tools/bmi-calculator/BmiCalculator';
import { meta } from '@/tools/bmi-calculator/meta';

const siteUrl: string = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.thequickutils.com';

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
        alt: 'BMI Calculator by QuickUtils',
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

export default function BmiCalculatorPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-background text-text">
      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateToolSchema(meta)),
          }}
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
            QuickUtils BMI Calculator helps you estimate Body Mass Index using
            your height and weight. Choose metric units for kilograms and
            centimeters, or imperial units for pounds and inches. Enter your
            values and the calculator instantly shows your BMI number, category,
            and estimated healthy weight range for your height.
          </p>
          <p>
            BMI is commonly used as a quick screening measure for adult weight
            categories. It can be helpful for general awareness, goal tracking,
            and basic health conversations. It does not measure body fat
            directly and may not reflect individual factors like muscle mass,
            age, pregnancy, or medical conditions.
          </p>

          <h2>Frequently Asked Questions</h2>
          <h3>What is a normal BMI range?</h3>
          <p>
            A BMI from 18.5 to 24.9 is commonly considered normal weight for
            adults. Below 18.5 is underweight, 25 to 29.9 is overweight, and 30
            or above is obese.
          </p>
          <h3>Is BMI a medical diagnosis?</h3>
          <p>
            No. BMI is a simple screening estimate. For personal medical advice,
            interpretation, or weight planning, speak with a qualified health
            professional.
          </p>

          <h2>Related Tools</h2>
          <ul>
            <li>
              <Link href="/age-calculator">Age Calculator</Link>
            </li>
            <li>
              <Link href="/unit-converter">Unit Converter</Link>
            </li>
            <li>
              <Link href="/word-counter">Word Counter</Link>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
