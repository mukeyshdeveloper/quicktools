/**
 * QuickUtils Service Worker
 * Provides offline support for all client-side tools.
 * Once a tool page is visited while online, it will work fully offline.
 *
 * Strategy:
 * - Static assets (_next/static, icons, etc.): Cache First (long-lived)
 * - Navigation requests (HTML pages): Network First → Cache fallback
 * - Other GET requests: Stale While Revalidate
 */

const CACHE_VERSION = 'quickutils-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const PAGES_CACHE = `${CACHE_VERSION}-pages`;

const STATIC_ASSETS = [
  '/',
  '/offline',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// Precache critical shell on install
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      await cache.addAll(STATIC_ASSETS);
      await self.skipWaiting();
    })()
  );
});

// Clean up old caches on activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => !key.startsWith(CACHE_VERSION))
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

// Helper: is this a static asset we should cache aggressively?
function isStaticAsset(request) {
  const url = new URL(request.url);
  return (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.startsWith('/og/') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.avif') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.woff')
  );
}

// Helper: is this a navigation request (user loading a page)?
function isNavigationRequest(request) {
  return request.mode === 'navigate';
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests (analytics, ads, etc.)
  if (new URL(request.url).origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    (async () => {
      // === 1. Static assets: Cache First ===
      if (isStaticAsset(request)) {
        const cached = await caches.match(request);
        if (cached) return cached;

        try {
          const response = await fetch(request);
          if (response && response.status === 200) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, response.clone());
          }
          return response;
        } catch {
          return cached || new Response('Offline', { status: 503 });
        }
      }

      // === 2. Navigation (page loads): Network First with cache fallback ===
      if (isNavigationRequest(request)) {
        try {
          const response = await fetch(request);
          if (response && response.status === 200) {
            const cache = await caches.open(PAGES_CACHE);
            cache.put(request, response.clone());
          }
          return response;
        } catch {
          // Offline: try to serve the cached page (or homepage as last resort)
          const cached = await caches.match(request);
          if (cached) return cached;

          const offlinePage = await caches.match('/offline');
          if (offlinePage) return offlinePage;

          const home = await caches.match('/');
          return home || new Response('You are offline. Please reconnect to use QuickUtils.', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' },
          });
        }
      }

      // === 3. Everything else (API calls, etc. — none in this app): Stale-While-Revalidate ===
      const cached = await caches.match(request);

      const fetchPromise = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const cache = caches.open(STATIC_CACHE);
            cache.then((c) => c.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => cached);

      return cached || fetchPromise;
    })()
  );
});

// Optional: Allow the page to trigger skipWaiting for immediate updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
