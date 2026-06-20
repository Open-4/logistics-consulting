/**
 * @file Search results page — 搜索结果页
 */
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

interface SearchResult {
  slug: string;
  title: string;
  description: string;
  category: string;
  date?: string;
}

export const dynamic = 'force-dynamic';

export default function SearchPage() {
  const t = useTranslations('common');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!q || q.length < 2) { setLoading(false); return; }
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(q)}&locale=${locale}`)
      .then(r => r.json())
      .then(data => { setResults(data.data || []); setLoading(false); })
      .catch(() => { setError(locale === 'zh' ? '搜索出错，请稍后重试' : 'Search error, please try again'); setLoading(false); });
  }, [q, locale]);

  const getTypeLabel = (cat: string) => {
    if (locale === 'zh') {
      if (cat === 'services' || cat.includes('货运') || cat.includes('咨询')) return '服务';
      if (cat === 'cases') return '案例';
      return '资讯';
    }
    if (cat === 'services') return 'Service';
    if (cat === 'cases') return 'Case';
    return 'News';
  };

  const getTypePath = (slug: string, cat: string) => {
    if (cat === 'services' || cat.includes('货运') || cat.includes('咨询')) return `/services/${slug}`;
    if (cat === 'cases') return `/cases/${slug}`;
    return `/news/${slug}`;
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {locale === 'zh' ? `搜索"${q}"的结果` : `Results for "${q}"`}
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          {loading ? (locale === 'zh' ? '搜索中...' : 'Searching...') : `${results.length} ${locale === 'zh' ? '条结果' : 'results'}`}
        </p>

        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-500">{locale === 'zh' ? '搜索中...' : 'Searching...'}</p>
          </div>
        )}

        {error && <div className="text-center py-16"><p className="text-red-500">{error}</p></div>}

        {!loading && !error && results.length === 0 && q && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">{locale === 'zh' ? '未找到相关结果' : 'No results found'}</h2>
            <p className="text-sm text-gray-500">{locale === 'zh' ? '建议换个关键词试试' : 'Try different keywords'}</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-4">
            {results.map((r) => (
              <Link key={r.slug} href={getTypePath(r.slug, r.category)} className="block bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-brand-100 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-brand-50 text-brand-600">{getTypeLabel(r.category)}</span>
                  {r.date && <span className="text-xs text-gray-400">{r.date}</span>}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{r.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{r.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}