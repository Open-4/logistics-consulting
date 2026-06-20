/**
 * @file Upgrade to Pro page — 展示专业版功能，当前显示「即将上线」。
 */
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function UpgradePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('upgrade');
  const features = ['unlimited', 'manager', 'custom', 'priority'] as const;

  return (
    <div className="pt-24 pb-16">
      <section className="py-16 bg-gradient-to-br from-brand-500 to-brand-700 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              {t('coming_soon')}
            </div>
            <p className="text-gray-600">{t('coming_soon_desc')}</p>
          </div>
          <div className="max-w-lg mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">{t('features_title')}</h2>
            <div className="space-y-4">
              {features.map((key) => (
                <div key={key} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <div className="w-10 h-10 rounded-lg bg-brand-100 text-brand-500 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{t('feature_' + key)}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 mb-1">{t('current_plan')}</p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 gradient-brand text-white font-semibold text-sm rounded-lg hover:opacity-90 transition-all">
                {t('free_remaining')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}