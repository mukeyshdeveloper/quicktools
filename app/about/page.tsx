import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | QuickUtils',
  description: 'Learn about QuickUtils - your one-stop platform for fast, free, and secure online tools.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-text">
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl mb-8">
          About QuickUtils
        </h1>
        
        <div className="prose-section space-y-6 text-muted leading-relaxed">
          <p className="text-lg text-text font-medium">
            QuickUtils is a collection of 20+ free, fast, and secure web tools designed to make your daily tasks easier.
          </p>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">Our Mission</h2>
          <p>
            The internet is full of tools, but too many of them require sign-ups, have slow load times, or process your 
            private data on their servers. Our mission is to build the highest-quality utilities on the web that are:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>100% Free:</strong> No paywalls, no hidden fees, and no account required.</li>
            <li><strong>Blazing Fast:</strong> Built with Next.js, our tools load instantly and work smoothly on any device.</li>
            <li><strong>Privacy First:</strong> Our tools run entirely in your browser using client-side JavaScript. We do not store your data.</li>
          </ul>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">What We Offer</h2>
          <p>
            We provide a wide range of utilities across various categories:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Finance:</strong> EMI, SIP, ROI, and Compound Interest calculators.</li>
            <li><strong>Business:</strong> Invoice generators, Resume builders, and Salary slip makers.</li>
            <li><strong>Developer:</strong> Base64 encoding, JWT decoding, and JSON formatting.</li>
            <li><strong>Text & Media:</strong> Case converters, Diff checkers, and Lorem Ipsum generators.</li>
          </ul>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">Support Our Project</h2>
          <p>
            QuickUtils is maintained by a small team of passionate developers. We keep the platform free by displaying 
            non-intrusive advertisements via Google AdSense. 
          </p>

          <div className="mt-12 p-6 bg-card border border-border rounded-2xl text-center">
            <h3 className="font-bold text-lg text-text mb-2">Have a tool request?</h3>
            <p className="mb-4">If there's a tool you need that we don't have yet, let us know!</p>
            <Link href="/contact" className="inline-block px-6 py-2 rounded-xl bg-brand text-white font-bold hover:bg-brand/90 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
