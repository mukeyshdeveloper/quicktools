import type { Metadata } from 'next';
import Link from 'next/link';
import { generateWebPageSchema } from '@/lib/schema';
import { SITE_NAME, absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free Finance Calculators – EMI, SIP, ROI, Compound Interest & More',
  description:
    'Free financial calculators for India and worldwide. Calculate EMI, SIP returns, compound interest, salary, ROI, and more. 100% private, no signup.',
  alternates: { canonical: '/finance-calculators' },
  openGraph: {
    title: 'Free Finance Calculators – EMI, SIP, Compound Interest | QuickUtils',
    description:
      'Accurate financial calculators for loans, investments, and salary planning. All tools run in your browser.',
    url: absoluteUrl('/finance-calculators'),
  },
};

const financeTools = [
  { href: '/emi-calculator', name: 'EMI Calculator', desc: 'Calculate monthly loan EMI for home, car, and personal loans.' },
  { href: '/sip-calculator', name: 'SIP Calculator', desc: 'Project mutual fund returns with monthly SIP investments.' },
  { href: '/compound-interest', name: 'Compound Interest Calculator', desc: 'See how your money grows with compound interest over time.' },
  { href: '/roi-calculator', name: 'ROI Calculator', desc: 'Calculate return on investment percentage for any asset.' },
  { href: '/salary-calculator', name: 'Salary Calculator', desc: 'Convert CTC to in-hand salary and understand deductions.' },
  { href: '/discount-calculator', name: 'Discount Calculator', desc: 'Calculate final price after percentage discounts.' },
  { href: '/tip-calculator', name: 'Tip Calculator', desc: 'Quickly split bills and calculate tips at restaurants.' },
  { href: '/percentage-calculator', name: 'Percentage Calculator', desc: 'Find percentages, percentage change, and more.' },
];

export default function FinanceCalculatorsPage() {
  const schema = generateWebPageSchema({
    title: 'Free Finance Calculators',
    description: metadata.description || '',
    url: '/finance-calculators',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="min-h-screen bg-background text-text">
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <div className="mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
              Financial Planning Tools
            </p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
              Free Finance Calculators
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Accurate, private financial calculators for loans, investments, salary, and budgeting.
              All tools run 100% in your browser.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {financeTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-2xl border border-border bg-card p-6 transition hover:border-brand hover:shadow-sm"
              >
                <h2 className="text-xl font-semibold text-text group-hover:text-brand">
                  {tool.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{tool.desc}</p>
                <span className="mt-4 inline-block text-sm font-medium text-brand">
                  Use calculator →
                </span>
              </Link>
            ))}
          </div>

          <section className="prose-section mt-16">
            <h2>Why Use Our Finance Calculators?</h2>
            <p>
              Making smart money decisions requires accurate numbers. Our finance calculators
              are designed for Indian users (EMI on reducing balance, tax considerations) while
              remaining useful globally. Every tool works offline and never sends your financial
              data anywhere.
            </p>

            <h3>Popular Use Cases</h3>
            <ul>
              <li>Home loan EMI planning before speaking to banks</li>
              <li>Projecting corpus from monthly SIP investments</li>
              <li>Understanding real in-hand salary from CTC offers</li>
              <li>Calculating actual returns on PPF, FD, or mutual funds</li>
            </ul>

            <h2>Frequently Asked Questions</h2>
            <h3>Are these calculators accurate for Indian loans?</h3>
            <p>
              Yes. Our EMI calculator uses the standard reducing balance method used by almost all
              Indian banks and NBFCs.
            </p>

            <h3>Is my financial data safe?</h3>
            <p>
              Completely. All calculations happen in your browser. We do not store or transmit any
              numbers you enter.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
