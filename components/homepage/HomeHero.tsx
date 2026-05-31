import Link from 'next/link';

const categories = [
  { href: '/finance-calculators', label: 'Finance Calculators', icon: '💰' },
  { href: '/health-calculators', label: 'Health & Fitness', icon: '❤️' },
  { href: '/text-tools', label: 'Text Tools', icon: '✍️' },
  { href: '/developer-tools', label: 'Developer Tools', icon: '{' },
  { href: '/generators', label: 'Generators', icon: '⚡' },
  { href: '/business-tools', label: 'Business Tools', icon: '📄' },
];

export default function HomeHero(): React.ReactElement {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-12 pt-16 text-center sm:px-6 sm:pt-20">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
        100% Free • No Signup • Privacy First
      </div>

      <h1 className="font-display text-4xl font-extrabold leading-tight text-text sm:text-5xl lg:text-6xl">
        Free Online Tools That Actually Work
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
        Instant calculators, text utilities, generators, and developer tools.
        Everything runs in your browser — no data leaves your device.
      </p>

      {/* Category quick navigation for topical SEO + UX */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-text transition hover:border-brand hover:bg-brand/5"
          >
            <span aria-hidden="true">{cat.icon}</span>
            {cat.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
