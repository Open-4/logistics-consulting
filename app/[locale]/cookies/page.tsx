/**
 * @file Cookie Policy page — 读取翻译文件展示 Cookie 政策内容。
 */
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default function CookiesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('cookies');

  return (
    <div className="pt-24 pb-16">
      <section className="py-16 bg-gradient-to-br from-brand-500 to-brand-700 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <p className="mt-2 text-sm text-blue-200">{t('lastUpdated')}</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="p-6 sm:p-8 rounded-2xl border border-gray-100 bg-white shadow-sm">
            <p className="text-gray-600 leading-relaxed">{t('intro')}</p>
          </div>
          {[1, 2, 3].map((num) => (
            <div key={num} className="p-6 sm:p-8 rounded-2xl border border-gray-100 bg-white shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('section' + num + '_title')}</h2>
              <p className="text-gray-600 leading-relaxed">{t('section' + num + '_desc')}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}