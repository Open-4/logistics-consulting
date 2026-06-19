/**
 * @file News listing page.
 * Displays all news articles from /content/{locale}/news/.
 */
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getContentItems } from '@/lib/mdx';

export default function NewsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('news');
  const tcommon = useTranslations('common');
  const news = getContentItems(locale, 'news');

  return (
    <div className="pt-24 pb-16">
      <section className="py-16 bg-gradient-to-br from-brand-500 to-brand-700 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">{t('description')}</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article) => (
              <Link key={article.slug} href={'/news/' + article.slug} className="group rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  <span className="text-xs text-gray-400">{article.date}</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-brand-500 line-clamp-2">{article.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">{article.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-500 group-hover:gap-2 transition-all">{tcommon('read_more')} &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}