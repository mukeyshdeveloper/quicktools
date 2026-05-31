import type { Metadata } from 'next'
import Link from 'next/link'
import { meta } from '@/tools/color-picker/meta'
import ColorPicker from '@/tools/color-picker/ColorPicker'
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

export default function ColorPickerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Color Picker
        </h1>
        <p className="mb-8 text-gray-500 dark:text-gray-400">{meta.description}</p>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <ColorPicker />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-8" />

        <section className="mt-12 space-y-4 text-sm text-gray-600 dark:text-gray-400">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            How to Use the Color Picker
          </h2>
          <p>
            The Color Picker tool allows you to easily discover, convert, and generate colors for your next web design project. Simply use the visual color selector or type in any HEX value. The tool will instantly calculate the corresponding RGB and HSL values.
          </p>
          <p>
            Additionally, it generates a beautiful harmonic palette of tints and shades based on your selected base color, giving you a complete design system ready to be copied to your clipboard.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
            Frequently Asked Questions
          </h2>
          <h3 className="font-medium text-gray-800 dark:text-gray-200">
            What formats are supported?
          </h3>
          <p>Currently, the tool accepts HEX code inputs and converts them accurately into standard RGB and HSL representations widely used in CSS.</p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">Related Tools</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><Link href="/password-generator" className="text-brand hover:underline">Password Generator</Link></li>
            <li><Link href="/qr-code-generator" className="text-brand hover:underline">QR Code Generator</Link></li>
          </ul>
        </section>
      </main>
    </>
  )
}
