import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import SalarySlipGenerator from '@/tools/salary-slip-generator/SalarySlipGenerator';
import { meta } from '@/tools/salary-slip-generator/meta';

const siteUrl: string = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quickutils.in';

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

export default function SalarySlipGeneratorPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-background text-text">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
        />

        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Free tool — no sign-up
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Salary Slip Generator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">
            {meta.description}
          </p>
        </div>

        <SalarySlipGenerator />

        {/* SEO Content */}
        <section className="prose-section mt-16 max-w-3xl">
          <h2>What is a Salary Slip?</h2>
          <p>
            A salary slip (also called a payslip or pay stub) is an official document issued by an employer
            to an employee every month. It details the breakdown of gross earnings, deductions, and the
            final net pay for that pay period. In India, salary slips are mandatory for salaried employees
            and are required for loan applications, visa processing, income tax filing, and background
            verification.
          </p>

          <h2>How to Use This Salary Slip Generator</h2>
          <p>
            Fill in your company details and employee information in the form on the left. The salary slip
            preview on the right updates in real time. Customize the earnings components (Basic, HRA, DA,
            Special Allowance, etc.) and deductions (PF, Professional Tax, TDS) by editing the pre-filled
            rows or adding new ones. Once satisfied, click <strong>Print / Save PDF</strong> and choose
            &ldquo;Save as PDF&rdquo; in your browser&rsquo;s print dialog to download a professional payslip.
          </p>

          <h2>Standard Salary Components in India</h2>
          <p>
            A typical Indian salary slip includes: <strong>Basic Salary</strong> (40–50% of CTC),
            <strong> HRA</strong> (House Rent Allowance, usually 40–50% of basic),
            <strong> DA</strong> (Dearness Allowance), <strong>Special Allowance</strong>, and
            <strong> Transport Allowance</strong>. Common deductions include <strong>Provident Fund</strong>
            (12% of basic, both employee and employer), <strong>Professional Tax</strong> (up to ₹2,400/year
            depending on state), and <strong>TDS</strong> based on income tax slab.
          </p>

          <h2>Frequently Asked Questions</h2>
          <h3>Is this salary slip legally valid?</h3>
          <p>
            This generator creates a professional, formatted payslip that contains all standard information.
            However, for it to be legally valid, it must be issued by a registered employer and reflect
            accurate employment data. This tool is perfect for SMBs, startups, and HR professionals who
            need to generate compliant payslips quickly.
          </p>
          <h3>Can I customize the salary components?</h3>
          <p>
            Yes — you can add, edit, or remove any earning or deduction row to match your company&rsquo;s
            exact pay structure. The tool comes pre-filled with the most common Indian payroll components
            as a starting point.
          </p>
          <h3>Is my data stored anywhere?</h3>
          <p>
            No. All processing happens entirely in your browser. No employee data is sent to any server.
            Your payroll data stays 100% private.
          </p>

          <h2>Related Tools</h2>
          <ul>
            <li><Link href="/salary-calculator">Salary Calculator — hourly to annual conversion</Link></li>
            <li><Link href="/invoice-generator">Invoice Generator</Link></li>
            <li><Link href="/emi-calculator">EMI Calculator</Link></li>
          </ul>
        </section>
      </main>
    </div>
  );
}
