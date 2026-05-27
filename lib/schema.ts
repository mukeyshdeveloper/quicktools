import type { ToolMeta } from '@/types';

export function generateToolSchema(meta: ToolMeta): object {
  const siteUrl: string =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quickutils.in';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.name,
    url: `${siteUrl}${meta.canonical}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description: meta.description,
    inLanguage: 'en-IN',
  };
}
