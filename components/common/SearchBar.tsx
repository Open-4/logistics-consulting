/**
 * @file SearchBar — 搜索知识库内容
 */
'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

interface SearchBarProps {
  /** Large variant for home page hero */
  variant?: 'hero' | 'navbar';
  placeholder?: string;
}

export default function SearchBar({ variant = 'hero', placeholder }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const isHero = variant === 'hero';

  const handleSearch = useCallback(async () => {
    const q = query.trim();
    if (!q || q.length < 2) return;
    setLoading(true);
    router.push(`/${locale}/search?q=${encodeURIComponent(q)}`);
  }, [query, locale, router]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className={`relative ${isHero ? 'max-w-2xl mx-auto' : 'w-full max-w-md'}`}>
      <div className="relative flex items-center">
        <svg className={`absolute left-4 text-gray-400 ${isHero ? 'w-6 h-6' : 'w-4 h-4'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || (locale === 'zh' ? '搜索知识库，如：海运费用、HS编码、清关流程...' : 'Search knowledge base...')}
          className={`w-full bg-white border-0 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 ${
            isHero ? 'pl-14 pr-6 py-4 text-base' : 'pl-10 pr-4 py-2 text-sm'
          }`}
        />
        <button
          onClick={handleSearch}
          disabled={loading || query.trim().length < 2}
          className={`absolute right-2 rounded-lg font-semibold transition-all ${
            isHero
              ? 'px-6 py-2.5 gradient-brand text-white text-sm hover:opacity-90'
              : 'px-3 py-1.5 bg-brand-500 text-white text-xs hover:bg-brand-600'
          } disabled:opacity-50`}
        >
          {loading ? '...' : (locale === 'zh' ? '搜索' : 'Search')}
        </button>
      </div>
    </div>
  );
}