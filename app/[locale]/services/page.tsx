/**
 * @file Services listing page.
 * Displays all service cards from /content/{locale}/services/.
 */
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getContentItems } from '@/lib/mdx';

export default function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('services');
  const tcommon = useTranslations('common');
  const services = getContentItems(locale, 'services');

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
            {services.map((svc) => (
              <Link key={svc.slug} href={'/services/' + svc.slug} className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-md hover:border-brand-100 transition-all">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-600 mb-4">{svc.category}</span>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-brand-500 transition-colors">{svc.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{svc.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-500 mt-4 group-hover:gap-2 transition-all">{tcommon('learn_more')} &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}