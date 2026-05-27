import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { generateToolSchema } from '@/lib/schema';
import AgeCalculator from '@/tools/age-calculator/AgeCalculator';
import { meta } from '@/tools/age-calculator/meta';

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
        alt: 'Age Calculator by QuickUtils',
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

export default function AgeCalculatorPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
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
            Age Calculator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
            {meta.description}
          </p>
        </div>

        {/* <AdBanner
          className="mb-8"
          slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP}
        /> */}

        <AgeCalculator />

        {/* <AdBanner
          className="mt-8"
          slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM}
        /> */}

        <section className="prose-section mt-12">
          <h2>How to Use the Age Calculator</h2>
          <p>
            QuickUtils Age Calculator helps you calculate your exact age from a
            date of birth. Enter your birth date, keep today as the default
            comparison date, or choose another date if you need age for a form,
            exam, document, policy, or eligibility check. Select Calculate Age
            and the tool shows your age in completed years, remaining months,
            and days.
          </p>
          <p>
            The calculator also displays total months, total weeks, total days,
            and the number of days left for your next birthday. Everything runs
            in your browser, so your date is not sent to a server. You can reset
            the form anytime and try another date immediately.
          </p>

          <h2>Frequently Asked Questions</h2>
          <h3>How accurate is this age calculator?</h3>
          <p>
            It calculates age using calendar years, months, and days, then uses
            day-level date differences for total days and weeks. That makes it
            suitable for everyday personal, school, job, and document use.
          </p>
          <h3>Can I calculate age on a past or future date?</h3>
          <p>
            Yes. Change the Calculate Age As Of field to any valid date after
            the date of birth. The result updates against that selected date.
          </p>

          <h2>Related Tools</h2>
          <ul>
            <li>
              <Link href="/bmi-calculator">BMI Calculator</Link>
            </li>
            <li>
              <Link href="/word-counter">Word Counter</Link>
            </li>
            <li>
              <Link href="/unit-converter">Unit Converter</Link>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
