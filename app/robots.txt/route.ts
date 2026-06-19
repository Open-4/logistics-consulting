/**
 * @file GET /robots.txt — Instructions for web crawlers.
 */
import { NextResponse } from 'next/server';

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || 'https://farhorizon-logistics.com').replace(/\/+$/, '');

export async function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Sitemap',
    'Sitemap: ' + SITE_URL + '/sitemap.xml',
    '',
    '# Crawl-delay recommended for heavy crawlers',
    'Crawl-delay: 10',
  ].join('\n');

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}