interface AdBannerProps {
  className?: string | undefined;
  slot?: string | undefined;
}

export default function AdBanner({
  className = '',
  slot,
}: AdBannerProps): React.ReactElement | null {
  if (!slot) {
    return null;
  }

  return (
    <aside
      aria-label="Advertisement"
      className={`rounded-xl border border-dashed border-border bg-card px-4 py-6 text-center text-xs font-medium uppercase tracking-wide text-muted ${className}`}
      data-ad-slot={slot}
    >
      Advertisement
    </aside>
  );
}
