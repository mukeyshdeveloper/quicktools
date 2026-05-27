import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | QuickUtils',
  description: 'Privacy Policy for QuickUtils. Learn how we protect your data and privacy.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-text">
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose-section space-y-6 text-muted leading-relaxed">
          <p><strong>Last Updated: May 2026</strong></p>

          <p>
            Welcome to QuickUtils ("we", "our", or "us"). We respect your privacy and are committed to protecting it. 
            This Privacy Policy explains what information we collect, how we use it, and your rights when you use our website (quickutils.in).
          </p>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">1. Information We Do NOT Collect</h2>
          <p>
            QuickUtils is designed with privacy in mind. <strong>All of our tools run 100% locally in your browser.</strong> 
            We do not store, log, or transmit any data you enter into our calculators, text formatters, or generators. 
            Your financial data, text inputs, and encoded strings never leave your device.
          </p>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">2. Information We Do Collect</h2>
          <p>
            To keep QuickUtils free, we use third-party services that may collect certain analytical and advertising data:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Analytics:</strong> We use Google Analytics to understand how visitors interact with our website (e.g., pages visited, time on site). This data is anonymized.</li>
            <li><strong>Log Files:</strong> Like most standard web servers, we use log files that include IP addresses, browser types, and timestamps. This information is used solely for site administration and security.</li>
          </ul>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">3. Cookies and Advertising</h2>
          <p>
            We use Google AdSense to display advertisements. Google uses cookies to serve ads based on your prior visits to our website or other websites.
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet.</li>
            <li>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">Google Ads Settings</a>.</li>
          </ul>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">4. Third-Party Links</h2>
          <p>
            Our website may contain links to external sites that are not operated by us. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party sites.
          </p>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">5. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please <Link href="/contact" className="text-brand hover:underline">contact us</Link>.
          </p>
        </div>
      </main>
    </div>
  );
}
