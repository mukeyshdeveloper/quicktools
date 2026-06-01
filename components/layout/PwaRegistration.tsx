'use client';

import { useEffect } from 'react';

export default function PwaRegistration() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    // Skip service worker in development to avoid caching headaches
    if (process.env.NODE_ENV === 'development') {
      console.log('[PWA] Skipping service worker registration in development');
      return;
    }

    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content available — could show a "Refresh to update" toast here
              console.log('[PWA] New content available. Refresh to update.');
            }
          });
        });

        // Check for existing waiting worker
        if (registration.waiting) {
          console.log('[PWA] Service worker waiting to activate');
        }

        console.log('[PWA] Service worker registered successfully:', registration.scope);
      } catch (error) {
        console.warn('[PWA] Service worker registration failed:', error);
      }
    };

    // Register after the page has loaded to avoid blocking
    if (document.readyState === 'complete') {
      void registerSW();
    } else {
      window.addEventListener('load', () => void registerSW(), { once: true });
    }

    // Optional: Listen for controller change (e.g. after skipWaiting)
    const handleControllerChange = () => {
      console.log('[PWA] New service worker activated');
    };
    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
    };
  }, []);

  // This component renders nothing — it only handles registration side effects
  return null;
}
