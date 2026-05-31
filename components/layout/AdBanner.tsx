'use client';

import { useEffect } from 'react';
import { ADSENSE_ID } from '@/lib/site';

interface AdBannerProps {
  slot: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdBanner({ slot, className = '' }: AdBannerProps) {
  useEffect(() => {
    if (!ADSENSE_ID || !slot) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // AdSense not available (e.g. ad blocker, dev environment)
    }
  }, [slot]);

  if (!slot) {
    return null;
  }

  // Placeholder in development or when AdSense ID is missing
  if (!ADSENSE_ID) {
    return (
      <div
        className={`min-h-[90px] rounded-xl border border-dashed border-border bg-card px-4 py-6 text-center text-xs font-medium uppercase tracking-wide text-muted ${className}`}
      >
        Ad placeholder (set NEXT_PUBLIC_ADSENSE_ID)
      </div>
    );
  }

  return (
    <aside
      aria-label="Advertisement"
      className={`overflow-hidden rounded-xl ${className}`}
      style={{ minHeight: '90px' }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
