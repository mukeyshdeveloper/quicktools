import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/daily-water-intake-calculator/meta';
import WaterIntakeCalculator from '@/tools/daily-water-intake-calculator/WaterIntakeCalculator';
import AdBanner from '@/components/layout/AdBanner';
import { generateToolSchema } from '@/lib/schema';
import FAQSection from '@/components/ui/FAQSection';

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

export default function DailyWaterIntakePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Health &amp; Fitness</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Daily Water Intake Calculator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <WaterIntakeCalculator />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Why Personalized Water Intake Matters</h2>
          <p>
            Water is essential for nearly every bodily function — from transporting nutrients and oxygen to regulating temperature and cushioning joints. Dehydration, even at 1–2%, can impair mood, focus, and physical performance. The classic “8 glasses a day” is only a rough starting point.
          </p>

          <h2>How This Calculator Works</h2>
          <p>
            We start with a weight-based baseline (roughly 30–40 ml per kg of body weight depending on activity). Then we layer adjustments for:
          </p>
          <ul>
            <li><strong>Activity level:</strong> More movement = higher baseline turnover.</li>
            <li><strong>Climate:</strong> Hot or humid conditions dramatically increase fluid loss through sweat.</li>
            <li><strong>Planned exercise:</strong> We add ~550 ml per hour of moderate-to-hard exercise, a conservative, evidence-aligned figure.</li>
          </ul>

          <h2>Built-in Daily Tracker &amp; Reminders</h2>
          <p>
            The calculator also includes a practical daily intake logger. Log glasses as you drink, watch live progress toward your personalized goal, and optionally turn on gentle in-tab reminders (every 30–90 minutes). Reminders use the browser Notification API and only fire while this page is open — perfect for a focused hydration session. For always-on phone reminders, install the site as a PWA or use your phone’s Health app.
          </p>

          <h2>Tips for Staying Hydrated</h2>
          <ul>
            <li>Start the day with 400–500 ml of water.</li>
            <li>Carry a reusable bottle and sip regularly rather than chugging large amounts at once.</li>
            <li>Eat water-rich foods (cucumber, watermelon, citrus, yogurt).</li>
            <li>Monitor urine color — pale straw is ideal; dark yellow means drink more.</li>
            <li>Increase intake further during illness, high altitude, or pregnancy (consult your doctor).</li>
          </ul>

          <FAQSection faqs={meta.faqs} />

          <div className="pt-4 border-t border-border">
            <h2>Related Health Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/tdee-calculator" className="text-brand underline">TDEE &amp; Macro Calculator</Link></li>
              <li><Link href="/sleep-cycle-calculator" className="text-brand underline">Sleep Cycle Calculator</Link></li>
              <li><Link href="/calorie-deficit-planner" className="text-brand underline">Calorie Deficit Planner</Link></li>
              <li><Link href="/bmi-calculator" className="text-brand underline">BMI Calculator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
