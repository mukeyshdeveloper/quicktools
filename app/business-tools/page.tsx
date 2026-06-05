import type { Metadata } from 'next';
import Link from 'next/link';
import { generateWebPageSchema } from '@/lib/schema';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free Business Tools – Quotes, Invoices, Break-Even, CRM & More',
  description:
    'Free professional business tools: Quotation & Invoice tools, Pricing calculators, Lead Tracker, License Generator, Number Converters, and more. All run privately in your browser.',
  alternates: { canonical: '/business-tools' },
  openGraph: {
    title: 'Free Business Tools – Quotes, Invoices, CRM & Calculators | QuickUtils',
    description: 'Professional tools for small businesses and freelancers: quotes, invoices, pricing calculators, lead tracking and more.',
    url: absoluteUrl('/business-tools'),
  },
};

const businessTools = [
  { href: '/resume-builder', name: 'Resume Builder', desc: 'Create modern, ATS-friendly professional resumes with live preview and PDF export.' },
  { href: '/invoice-generator', name: 'Invoice Generator', desc: 'Generate clean, professional invoices and download as PDF instantly.' },
  { href: '/quotation-generator', name: 'Quotation / Estimate Generator', desc: 'Professional quotes with line items, taxes, validity dates and print-to-PDF.' },
  { href: '/salary-slip-generator', name: 'Salary Slip Generator', desc: 'Create formatted salary slips / payslips for employees and contractors.' },
  { href: '/break-even-calculator', name: 'Break-Even Analysis', desc: 'Calculate units and revenue needed to cover costs and hit profit targets.' },
  { href: '/profit-margin-calculator', name: 'Profit Margin & Markup', desc: 'Advanced margin vs markup calculations and reverse pricing.' },
  { href: '/lead-tracker', name: 'Simple CRM / Lead Tracker', desc: 'Track leads through stages with values, notes and pipeline totals (local only).' },
  { href: '/invoice-number-generator', name: 'Invoice Number Tracker', desc: 'Generate and remember sequential invoice/quote numbers with history.' },
  { href: '/license-generator', name: 'License Generator', desc: 'Generate MIT, Apache, GPL and other standard open source licenses.' },
  { href: '/indian-numbering-converter', name: 'Indian Numbering Converter', desc: 'Convert between Lakh/Crore and Million/Billion systems.' },
  { href: '/trip-planner', name: 'Advanced Trip Planner', desc: 'Itinerary + expenses + smart group bill splitter with share links.' },
  { href: '/bill-splitter', name: 'Advanced Bill Splitter', desc: 'Itemized splits, taxes, tips, custom shares & optimal settlements for any group.' },
  { href: '/meeting-cost-calculator', name: 'Meeting Cost Calculator', desc: 'Calculate the real salary cost of team meetings with projections.' },
  { href: '/decision-maker', name: 'Decision Maker', desc: 'Make fair random or weighted decisions for choices, raffles and votes.' },
  { href: '/utm-builder', name: 'UTM Link Builder', desc: 'Create trackable campaign URLs with UTM parameters for Google Analytics.' },
];

export default function BusinessToolsPage() {
  const schema = generateWebPageSchema({
    title: 'Free Business Tools',
    description: metadata.description || '',
    url: '/business-tools',
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
              Business & Professional Tools
            </p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
              Free Business Tools
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Professional document generators and marketing tools for small businesses, 
              freelancers, and HR teams. Create resumes, invoices, and payslips in seconds.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {businessTools.map((tool) => (
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
                  Open tool →
                </span>
              </Link>
            ))}
          </div>

          <section className="prose-section mt-16">
            <h2>Professional Tools for Small Businesses, Freelancers & HR Teams</h2>
            <p>
              Running a business or working as a freelancer often requires creating professional documents quickly and affordably. 
              Our business tools help you generate resumes, client invoices, employee salary slips, and marketing tracking links 
              without expensive software or monthly subscriptions.
            </p>

            <h3>Who Uses These Tools?</h3>
            <ul>
              <li>Freelancers and consultants creating professional invoices for clients</li>
              <li>Small business owners and HR teams generating employee salary slips / payslips</li>
              <li>Job seekers building modern, ATS-optimized resumes</li>
              <li>Digital marketers creating trackable UTM campaign links</li>
            </ul>

            <h2>Why Choose QuickUtils Business Tools?</h2>
            <p>
              All our business tools are completely free, private, and work directly in your browser. 
              You don’t need to upload sensitive company or employee data to any third-party server.
            </p>

            <h2>Frequently Asked Questions</h2>
            <h3>Are the documents legally valid?</h3>
            <p>
              Yes. The generators produce properly formatted professional documents. For legal, tax, or official use, 
              ensure that the information you enter is accurate and that the document is issued by an authorized entity.
            </p>

            <h3>Can I customize the templates?</h3>
            <p>
              Yes. The Resume Builder and Invoice Generator allow good customization of fields and styling. 
              We are continuously adding more advanced template options based on user feedback.
            </p>

            <h3>Is my company or employee data safe?</h3>
            <p>
              100% safe. All processing happens locally in your browser. No data is sent to our servers.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
