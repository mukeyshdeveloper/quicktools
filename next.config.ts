import type { NextConfig } from 'next';

const config: NextConfig = {
  // Cache Components — opt-in caching with "use cache" directive (Next.js 16)
  cacheComponents: true,

  // React Compiler — automatic memoisation
  // reactCompiler: true,

  // // Turbopack filesystem cache (beta) — faster dev restarts
  // experimental: {
  //   turbopackFileSystemCacheForDev: true,
  // },

  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default config;
