/**
 * @file Search API — searches across all content (services, cases, news).
 */
import { NextRequest, NextResponse } from 'next/server';
import { getContentItems } from '@/lib/mdx';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase().trim() || '';
  const locale = searchParams.get('locale') || 'zh';
  
  if (!q || q.length < 2) {
    return NextResponse.json({ success: true, data: [] });
  }

  const allItems = [
    ...getContentItems(locale as 'services' | 'cases' | 'news', 'services'),
    ...getContentItems(locale as 'services' | 'cases' | 'news', 'cases'),
    ...getContentItems(locale as 'services' | 'cases' | 'news', 'news'),
  ];

  const results = allItems
    .filter((item) => {
      const searchText = [item.title, item.description, item.content, item.category, ...item.tags]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return searchText.includes(q);
    })
    .map(({ slug, title, description, category, date }) => ({ slug, title, description, category, date }))
    .slice(0, 20);

  return NextResponse.json({ success: true, data: results });
}