/**
 * Centralized site configuration for QuickUtils.
 * Import from here instead of hardcoding URLs or site details.
 */

export const SITE_NAME = 'QuickUtils';
export const SITE_TAGLINE = 'Free Online Tools for Everyday Tasks';

/**
 * Primary site URL. Always set NEXT_PUBLIC_SITE_URL in production.
 * Falls back to production domain for safety.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://quickutils.com';

/**
 * Default OG image (1200x630). 
 */
export const DEFAULT_OG_IMAGE = '/og-default.jpg';

/**
 * Full root metadata base (for Next.js Metadata API).
 */
export const SITE_METADATA_BASE = new URL(SITE_URL);

/**
 * Social / contact links (update these for E-E-A-T).
 */
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/quickutils',
  // Add GitHub, LinkedIn etc. when available
};

/**
 * Google AdSense publisher ID (set via env in production).
 */
export const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || '';

/**
 * Google Analytics ID.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

/**
 * Ad slot IDs.
 */
export const AD_SLOTS = {
  top: process.env.NEXT_PUBLIC_AD_SLOT_TOP || '',
  bottom: process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM || '',
};

/**
 * Helper to build absolute URLs.
 */
export function absoluteUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

/**
 * Common keywords for the site (used in root metadata).
 */
export const SITE_KEYWORDS = [
  'free online tools',
  'free calculators',
  'text tools',
  'developer utilities',
  'no signup tools',
  'browser based tools',
  'privacy focused tools',
];

/**
 * Root site description (used in layout + homepage).
 */
export const SITE_DESCRIPTION =
  'Free, fast, privacy-first online tools. Calculators, text utilities, generators, and developer tools that run 100% in your browser. No signup required.';
