import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/youtube-thumbnail-downloader/meta';
import YoutubeThumbnailDownloader from '@/tools/youtube-thumbnail-downloader/YoutubeThumbnailDownloader';
import AdBanner from '@/components/layout/AdBanner';
import { generateToolSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: meta.canonical },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.canonical,
    images: [{ url: meta.ogImage ?? '/og-default.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: meta.title, description: meta.description },
};

export default function YoutubeThumbnailDownloaderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Media Utility</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            YouTube Thumbnail Downloader
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />
        <YoutubeThumbnailDownloader />
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-text">How to Download a YouTube Thumbnail</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Every YouTube video automatically generates several hidden, static image URLs that serve as its thumbnail. This tool simply extracts the video ID from the URL you paste and fetches these static images directly from YouTube's image servers (`img.youtube.com`).
            </p>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              You can download the thumbnail in High Definition (Max Res), Standard Definition (HQ), or Medium Quality. Note that very old or low-resolution videos might not have a Max Res thumbnail available.
            </p>
          </div>
          <div className="pt-4 border-t border-border">
            <h2 className="text-xl font-bold text-text">Related Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/image-converter" className="text-brand underline">Image Format Converter</Link></li>
              <li><Link href="/image-compressor" className="text-brand underline">Image Compressor</Link></li>
              <li><Link href="/favicon-generator" className="text-brand underline">Favicon Generator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
