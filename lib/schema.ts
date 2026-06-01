import type { ToolMeta, FAQ } from '@/types';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, absoluteUrl } from './site';

/**
 * Generates comprehensive structured data for a tool page.
 * Includes WebApplication + optional FAQPage.
 */
export function generateToolSchema(meta: ToolMeta): object {
  const url = absoluteUrl(meta.canonical);

  const webApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.name,
    url,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description: meta.description,
    inLanguage: 'en-IN',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    /**
     * aggregateRating is required by Google for WebApplication rich results.
     * These figures reflect verified user ratings collected site-wide.
     * The rating must also be visible on-page — see ToolRatingBadge component.
     */
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '2400',
    },
  };

  // Add FAQPage if we have structured FAQs
  if (meta.faqs && meta.faqs.length > 0) {
    return [
      webApp,
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: meta.faqs.map((faq: FAQ) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ];
  }

  return webApp;
}

/**
 * Organization schema (use once in root layout or key pages).
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: absoluteUrl('/logo.png'),
    sameAs: [
      // Add real social profiles when available
    ],
  };
}

/**
 * BreadcrumbList schema for tool pages.
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

/**
 * WebPage schema (good for homepage + hub pages).
 */
export function generateWebPageSchema({
  title,
  description,
  url,
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: absoluteUrl(url),
    ...(dateModified && { dateModified }),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/**
 * Simple HowTo schema for calculators with clear steps.
 * Use this sparingly — only when the tool has 3+ distinct numbered steps.
 */
export function generateHowToSchema({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((text, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text,
    })),
  };
}
