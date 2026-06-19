/**
 * @file JSON-LD structured data generators for SEO.
 * Each function returns a plain object ready for JSON.stringify.
 * @see https://schema.org
 */

const BASE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || 'https://farhorizon-logistics.com').replace(/\/+$/, '');

function abs(path: string): string {
  return BASE_URL + (path.startsWith('/') ? path : '/' + path);
}

export function OrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Far Horizon International Logistics Consulting',
    alternateName: '\u8fdc\u626c\u56fd\u9645\u7269\u6d41\u54a8\u8be2',
    url: BASE_URL,
    logo: abs('/logo.png'),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+86-21-5888-8888',
      contactType: 'customer service',
      availableLanguage: ['Chinese', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Shanghai',
      addressCountry: 'CN',
    },
    sameAs: [],
  };
}

export function BreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function ArticleSchema(article: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author || 'Far Horizon International Logistics Consulting',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Far Horizon International Logistics Consulting',
      url: BASE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': abs(article.url),
    },
  };
}

export function LocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Far Horizon International Logistics Consulting',
    description: 'Professional international logistics and supply chain consulting services.',
    url: BASE_URL,
    telephone: '+86-21-5888-8888',
    email: 'contact@farhorizon-logistics.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pudong New Area',
      addressLocality: 'Shanghai',
      addressCountry: 'CN',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  };
}

export function JsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data, null, 2);
}