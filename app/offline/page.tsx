'use client';

import Link from 'next/link';
import { WifiOff } from 'lucide-react';

export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 rounded-full bg-muted/20 p-6">
        <WifiOff className="h-12 w-12 text-muted" />
      </div>

      <h1 className="mb-3 text-3xl font-bold tracking-tight">You&apos;re offline</h1>

      <p className="mb-8 max-w-md text-lg text-muted">
        QuickUtils works offline for tools you&apos;ve already visited. Reconnect to access the full library and get the latest updates.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="btn-primary"
        >
          Go to Homepage
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="btn-secondary"
        >
          Try Again
        </button>
      </div>

      <p className="mt-8 text-xs text-muted">
        All calculations happen in your browser — no data is sent anywhere.
      </p>
    </main>
  );
}
