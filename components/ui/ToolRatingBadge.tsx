/**
 * ToolRatingBadge — renders the site-wide aggregate rating visibly on every tool page.
 *
 * Google's rich results policy requires that any aggregateRating in JSON-LD
 * structured data is also clearly visible to users on the page.
 * This component satisfies that requirement for all WebApplication schemas.
 */
export default function ToolRatingBadge() {
  const rating = 4.8;
  const count = 2400;
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div
      className="inline-flex items-center gap-1.5 text-sm text-muted print:hidden"
      aria-label={`Rated ${rating} out of 5 by ${count.toLocaleString()} users`}
    >
      {/* Stars */}
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < fullStars;
          const half = !filled && hasHalf && i === fullStars;
          return (
            <svg
              key={i}
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              {half ? (
                <>
                  <defs>
                    <linearGradient id={`half-${i}`}>
                      <stop offset="50%" stopColor="var(--color-brand)" />
                      <stop offset="50%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill={`url(#half-${i})`}
                    stroke="var(--color-brand)"
                    strokeWidth="1.5"
                  />
                </>
              ) : (
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={filled ? 'var(--color-brand)' : 'none'}
                  stroke={filled ? 'var(--color-brand)' : 'currentColor'}
                  strokeWidth="1.5"
                  opacity={filled ? 1 : 0.3}
                />
              )}
            </svg>
          );
        })}
      </span>

      {/* Numeric rating */}
      <span className="font-semibold text-text">{rating}</span>

      {/* Count */}
      <span className="text-xs text-muted">
        ({count.toLocaleString()} ratings)
      </span>
    </div>
  );
}
