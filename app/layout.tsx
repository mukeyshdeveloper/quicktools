import type { Metadata, Viewport } from 'next';
import { DM_Mono, DM_Sans } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import './globals.css';
import {
  SITE_URL,
  SITE_METADATA_BASE,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  GA_ID,
  ADSENSE_ID,
} from '@/lib/site';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PwaRegistration from '@/components/layout/PwaRegistration';
import ShareRail from '@/components/layout/ShareRail';
import { generateOrganizationSchema } from '@/lib/schema';

const sans = DM_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans',
});

const mono = DM_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: SITE_METADATA_BASE,
  title: {
    default: `${SITE_NAME} – Free Online Tools`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${SITE_NAME} – Free Online Tools for Everyday Tasks`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} – Free Online Tools`,
    description: SITE_DESCRIPTION,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: SITE_NAME,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2d6a4f' },
    { media: '(prefers-color-scheme: dark)', color: '#1a3d30' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = generateOrganizationSchema();

  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* AdSense - only load if we have a real publisher ID */}
        {ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}

        {/* Organization structured data (global) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>

      <body className="min-h-full flex flex-col bg-background text-text">
        <Navbar />
        <ShareRail />

        <main className="flex-1">{children}</main>

        <Footer />

        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}

        {/* PWA Service Worker registration (client-only) */}
        <PwaRegistration />
      </body>
    </html>
  );
}
