import type { Metadata } from 'next'
import Link from 'next/link'
import { meta } from '@/tools/resume-builder/meta'
import ResumeBuilder from '@/tools/resume-builder/ResumeBuilder'
import AdBanner from '@/components/layout/AdBanner'
import { generateToolSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: meta.canonical },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${meta.canonical}`,
    images: [{ url: meta.ogImage ?? '/og-default.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
}

export default function ResumeBuilderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />

      <main className="mx-auto max-w-[1500px] px-4 py-10 print:py-0 print:px-0 bg-slate-50 dark:bg-gray-950 print:bg-white min-h-screen">
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8 print:hidden max-w-4xl mx-auto" />

        <ResumeBuilder />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12 print:hidden max-w-4xl mx-auto" />

        <section className="mt-16 space-y-5 text-sm text-gray-600 dark:text-gray-400 max-w-4xl mx-auto print:hidden bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Best Free Online Resume Builder
          </h2>
          <p className="leading-relaxed">
            Stand out to employers and land your dream job with our professional, ATS-friendly Resume Builder. Designed for simplicity and impact, our tool allows you to craft a modern CV directly in your browser without signing up or paying hidden fees.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
            Why Choose Our CV Maker?
          </h3>
          <ul className="list-disc pl-5 space-y-3 leading-relaxed">
            <li><strong className="text-gray-900 dark:text-gray-200">Real-Time Formatting:</strong> No more fighting with Word documents or Google Docs. Your resume is automatically formatted perfectly as you type.</li>
            <li><strong className="text-gray-900 dark:text-gray-200">ATS Optimized:</strong> The minimalist, clean design ensures Applicant Tracking Systems (ATS) can easily parse your information without design glitches getting in the way.</li>
            <li><strong className="text-gray-900 dark:text-gray-200">100% Privacy:</strong> Your personal data, job history, and contact information are processed solely on your local device. We never store or transmit your CV.</li>
            <li><strong className="text-gray-900 dark:text-gray-200">Instant PDF Export:</strong> With one click, generate a universally accepted PDF format ready to be attached to your next application.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
            How to Download as PDF
          </h3>
          <p className="leading-relaxed bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-xl text-indigo-800 dark:text-indigo-200 border border-indigo-100 dark:border-indigo-900/30">
            Once your resume is ready, click the <strong>"Download PDF"</strong> button. This opens your browser's native print menu. Ensure the destination is set to <strong>"Save as PDF"</strong>, turn on <strong>"Background graphics"</strong> to keep the styling, and set margins to <strong>"None"</strong> to perfectly fit the A4 document size.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Related Tools</h2>
          <ul className="list-none space-y-2">
            <li><Link href="/invoice-generator" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors">→ Invoice Generator</Link></li>
            <li><Link href="/word-counter" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors">→ Word Counter</Link></li>
          </ul>
        </section>
      </main>
    </>
  )
}
