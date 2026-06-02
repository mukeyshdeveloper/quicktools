import type { Metadata } from 'next';
import Link from 'next/link';
import { generateWebPageSchema } from '@/lib/schema';
import { SITE_NAME, absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free Health & Fitness Calculators – BMI, TDEE, Pregnancy, Sleep & More',
  description:
    'Free health calculators including BMI, TDEE, pregnancy due date, sleep cycle, and period tracker. Private and accurate tools for better health decisions.',
  alternates: { canonical: '/health-calculators' },
};

const healthTools = [
  { href: '/bmi-calculator', name: 'BMI Calculator', desc: 'Check Body Mass Index and healthy weight range.' },
  { href: '/body-fat-percentage-calculator', name: 'Body Fat Percentage Calculator', desc: 'US Navy & YMCA tape-measure body fat estimates.' },
  { href: '/ideal-body-weight-calculator', name: 'Ideal Body Weight Calculator', desc: 'Devine, Robinson & Miller medical formulas.' },
  { href: '/tdee-calculator', name: 'TDEE & Macro Calculator', desc: 'Calculate total daily energy expenditure and macros.' },
  { href: '/daily-water-intake-calculator', name: 'Daily Water Intake Calculator', desc: 'Personalized hydration based on weight, activity & climate.' },
  { href: '/heart-rate-zones-calculator', name: 'Heart Rate Zones Calculator', desc: '5-zone cardio training targets (Karvonen & %max).' },
  { href: '/vo2-max-estimator', name: 'VO2 Max Estimator', desc: 'Rockport walk test or non-exercise aerobic fitness estimate.' },
  { href: '/calorie-deficit-planner', name: 'Calorie Deficit Planner', desc: 'Safe weight loss timeline with daily targets & visuals.' },
  { href: '/pregnancy-due-date-calculator', name: 'Pregnancy Due Date Calculator', desc: 'Estimate baby arrival date from last menstrual period.' },
  { href: '/sleep-cycle-calculator', name: 'Sleep Cycle Calculator', desc: 'Plan optimal bedtime or wake-up time for better rest.' },
  { href: '/period-calculator', name: 'Period Calculator', desc: 'Predict next period dates and fertile window.' },
  { href: '/age-calculator', name: 'Age Calculator', desc: 'Calculate exact age in years, months, and days.' },
];

export default function HealthCalculatorsPage() {
  const schema = generateWebPageSchema({
    title: 'Free Health & Fitness Calculators',
    description: metadata.description || '',
    url: '/health-calculators',
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="min-h-screen bg-background text-text">
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <div className="mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Health & Wellness</p>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Free Health Calculators</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Accurate, private tools for fitness, pregnancy, sleep, and general health tracking.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {healthTools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="group rounded-2xl border border-border bg-card p-6 transition hover:border-brand">
                <h2 className="text-xl font-semibold group-hover:text-brand">{tool.name}</h2>
                <p className="mt-2 text-sm text-muted">{tool.desc}</p>
              </Link>
            ))}
          </div>

          <section className="prose-section mt-16">
            <h2>Take Control of Your Health Numbers</h2>
            <p>
              Understanding your body metrics helps you make better lifestyle decisions. All our health
              calculators are designed to be easy to use while remaining scientifically grounded. Your
              personal health data never leaves your device.
            </p>
            <h2>Frequently Asked Questions</h2>
            <h3>Are these medical diagnostic tools?</h3>
            <p>No. These are informational calculators only. Always consult a qualified doctor for medical advice.</p>
          </section>
        </main>
      </div>
    </>
  );
}
