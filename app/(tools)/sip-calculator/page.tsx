import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import SipCalculator from '@/tools/sip-calculator/SipCalculator';
import { meta } from '@/tools/sip-calculator/meta';

const siteUrl: string = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.thequickutils.com';

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: meta.canonical },
  openGraph: { title: meta.title, description: meta.description, url: `${siteUrl}${meta.canonical}`, images: [{ url: meta.ogImage ?? '/og-default.png', width: 1200, height: 630 }], type: 'website' },
  twitter: { card: 'summary_large_image', title: meta.title, description: meta.description },
};

export default function SipCalculatorPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-background text-text">
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Free calculator</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">SIP Calculator</h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base">{meta.description}</p>
        </div>
        <SipCalculator />
        <section className="prose-section mt-12">
          <h2>How to Use the SIP Calculator</h2>
          <p>Enter your monthly investment amount, expected annual return rate, and the number of years. The calculator shows the future value of your SIP, total amount invested, and wealth gained through returns. A visual breakdown bar and year-by-year table help you understand how your money grows over time.</p>
          <p>SIP (Systematic Investment Plan) is a disciplined way to invest in mutual funds. Instead of investing a lump sum, you invest a fixed amount every month. This averages out market volatility through rupee-cost averaging, making it ideal for long-term wealth creation.</p>
          <h2>Frequently Asked Questions</h2>
          <h3>What return rate should I use?</h3>
          <p>Equity mutual funds in India have historically returned 12-15% annually over 10+ year periods. Debt funds typically return 6-8%. Use a conservative estimate for planning — 12% is a common benchmark for equity SIPs.</p>
          <h3>Is SIP better than lump sum investing?</h3>
          <p>SIP reduces timing risk through rupee-cost averaging. You buy more units when markets are low and fewer when high. For most investors without large lump sums, SIP is the most practical and disciplined approach to investing.</p>
          <h2>Related Tools</h2>
          <ul>
            <li><Link href="/compound-interest-calculator">Compound Interest Calculator</Link></li>
            <li><Link href="/emi-calculator">EMI Calculator</Link></li>
            <li><Link href="/roi-calculator">ROI Calculator</Link></li>
          </ul>
        </section>
      </main>
    </div>
  );
}
