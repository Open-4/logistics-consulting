/**
 * @file GET /sitemap.xml — Dynamic XML sitemap covering all routes.
 * Reads content directories on each request to include all pages.
 */
import { NextResponse } from 'next/server';
import { getContentItems } from '@/lib/mdx';

const LOCALES = ['zh', 'en'] as const;

/** Static page paths (without locale prefix) */
const STATIC_PAGES = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/cases', priority: '0.8', changefreq: 'weekly' },
  { path: '/news', priority: '0.8', changefreq: 'weekly' },
];

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || 'https://farhorizon-logistics.com').replace(/\/+$/, '');

function url(locale: string, path: string, priority: string, changefreq: string, lastmod?: string): string {
  const loc = SITE_URL + '/' + locale + path;
  return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    ${lastmod ? '<lastmod>' + lastmod + '</lastmod>' : ''}
  </url>`;
}

export async function GET() {
  const now = new Date().toISOString().split('T')[0];
  const lines: string[] = [];

  // Static pages
  for (const locale of LOCALES) {
    for (const page of STATIC_PAGES) {
      lines.push(url(locale, page.path, page.priority, page.changefreq, now));
    }
  }

  // Dynamic content pages
  for (const type of ['services', 'cases', 'news'] as const) {
    for (const locale of LOCALES) {
      const items = getContentItems(locale, type);
      // Deduplicate by slug (in case both .md and .mdx exist)
      const seen = new Set<string>();
      for (const item of items) {
        if (seen.has(item.slug)) continue;
        seen.add(item.slug);
        lines.push(
          url(locale, '/' + type + '/' + item.slug, '0.7', 'monthly', item.date || now),
        );
      }
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${lines.join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}