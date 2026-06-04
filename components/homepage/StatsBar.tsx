interface StatItem {
  label: string;
  value: string;
}

const stats: StatItem[] = [
  { value: '100+', label: 'Free Tools' },
  { value: '₹0', label: 'Cost to Use' },
  { value: '100%', label: 'No Signup' },
  { value: 'Fast', label: 'Browser Based' },
];

export default function StatsBar(): React.ReactElement {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 py-6 text-center sm:grid-cols-4 sm:px-6">
        {stats.map((stat: StatItem) => (
          <div key={stat.label}>
            <div className="font-display text-2xl font-extrabold text-text">
              {stat.value}
            </div>
            <div className="mt-1 text-xs font-medium tracking-wide text-muted">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
