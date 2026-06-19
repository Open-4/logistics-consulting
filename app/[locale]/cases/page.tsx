/**
 * @file Case studies listing page.
 * Displays all case studies from /content/{locale}/cases/.
 */
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getContentItems } from '@/lib/mdx';

export default function CasesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('cases');
  const tcommon = useTranslations('common');
  const cases = getContentItems(locale, 'cases');

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
            {cases.map((c) => (
              <Link key={c.slug} href={'/cases/' + c.slug} className="group rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-gradient-to-br from-brand-100 to-brand-50 flex items-center justify-center">
                  <svg className="w-16 h-16 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-600 mb-3">{c.category}</span>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-brand-500">{c.title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{c.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-500 mt-3 group-hover:gap-2 transition-all">{tcommon('read_more')} &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}