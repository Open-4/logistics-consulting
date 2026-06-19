/**
 * @file Service detail page (dynamic route).
 * Renders a single service from /content/{locale}/services/.
 */
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getContentItem, getRelatedItems, renderMarkdown } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { getContentItems } from '@/lib/mdx';

export function generateStaticParams() {
  const locales = ['en', 'zh'];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const items = getContentItems(locale, 'services');
    for (const item of items) {
      params.push({ locale, slug: item.slug });
    }
  }
  return params;
}

export default function ServiceDetailPage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('services');
  const tcommon = useTranslations('common');
  const item = getContentItem(locale, 'services', slug);
  if (!item) notFound();

  const related = getRelatedItems(locale, 'services', slug, item.tags, 2);

  return (
    <div className="pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-brand-500">{tcommon('learn_more')}</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-brand-500">{t('title')}</Link>
          <span>/</span>
          <span className="text-gray-900">{item.title}</span>
        </nav>
      </div>

      {/* Title */}
      <section className="py-12 bg-gradient-to-br from-brand-500 to-brand-700 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white mb-4">{item.category}</span>
          <h1 className="text-3xl sm:text-4xl font-bold">{item.title}</h1>
          <p className="mt-4 text-lg text-blue-100">{item.description}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900 prose-code:text-brand-600 prose-code:bg-brand-50 prose-code:px-1 prose-code:rounded prose-a:text-brand-500 prose-blockquote:border-brand-500 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3" dangerouslySetInnerHTML={{ __html: renderMarkdown(item.content) }} />
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{tcommon('learn_more')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {related.map((r) => (
                <Link key={r.slug} href={'/services/' + r.slug} className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">{r.title}</h3>
                  <p className="text-sm text-gray-600">{r.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}