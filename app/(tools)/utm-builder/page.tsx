import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/utm-builder/meta';
import UtmBuilder from '@/tools/utm-builder/UtmBuilder';
import AdBanner from '@/components/layout/AdBanner';
import { generateToolSchema } from '@/lib/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.thequickutils.com';

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: meta.canonical },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${siteUrl}${meta.canonical}`,
    images: [{ url: meta.ogImage ?? '/og-default.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
};

export default function UtmBuilderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Marketing Utility
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            UTM Campaign Link Builder
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">
            {meta.description}
          </p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <UtmBuilder />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">What are UTM Parameters?</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              UTM (Urchin Tracking Module) parameters are short text codes that you add to URLs to track the performance of campaigns and content. By appending these tags to your links, tools like Google Analytics can accurately report exactly where your traffic is coming from, how they found you, and what specific link they clicked.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Understanding the 5 UTM Tags</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>
                <strong>utm_source (Required):</strong> Identifies the advertiser, site, publication, etc. that is sending traffic to your property (e.g. <em>google, newsletter, facebook</em>).
              </li>
              <li>
                <strong>utm_medium:</strong> The advertising or marketing medium (e.g. <em>cpc, banner, email</em>).
              </li>
              <li>
                <strong>utm_campaign:</strong> The individual campaign name, slogan, promo code, etc. for a product.
              </li>
              <li>
                <strong>utm_term:</strong> Identify paid search keywords. If you're manually tagging paid keyword campaigns, you should use utm_term to specify the keyword.
              </li>
              <li>
                <strong>utm_content:</strong> Used to differentiate similar content, or links within the same ad. For example, if you have two call-to-action links within the same email message, you can use utm_content to tell them apart.
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Related SEO & Marketing Utilities</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li><Link href="/meta-tag-generator" className="text-brand underline hover:text-brand-hover">Meta Tag & OpenGraph Generator</Link></li>
              <li><Link href="/keyword-density" className="text-brand underline hover:text-brand-hover">Keyword Density Checker</Link></li>
              <li><Link href="/url-encoder-decoder" className="text-brand underline hover:text-brand-hover">URL Percent Encoder & Query Parser</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
