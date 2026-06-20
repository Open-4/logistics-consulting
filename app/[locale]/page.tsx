/**
 * @file Home page for the international logistics consulting website.
 */
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { getContentItems } from '@/lib/mdx';
import SearchBar from '@/components/common/SearchBar';

const featuredServices = ['supply_chain', 'freight', 'digital'] as const;
const valueKeys = ['professional', 'global', 'innovation', 'trust'] as const;

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const th = useTranslations('hero');
  const ts = useTranslations('services');
  const ta = useTranslations('about');
  const tw = useTranslations('why_us');
  const tc = useTranslations('cases');
  const tn = useTranslations('news');
  const tcontact = useTranslations('contact');
  const tcommon = useTranslations('common');
  const tg = useTranslations('guide');
  const topCases = getContentItems(locale, 'cases').slice(0, 3);
  const topNews = getContentItems(locale, 'news').slice(0, 3);

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 text-white">
        <div className="absolute inset-0 opacity-50" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M 40 0 L 0 0 0 40\' fill=\'none\' stroke=\'rgba(255,255,255,0.05)\' stroke-width=\'1\'/%3E%3C/svg%3E")'}} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-24 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">{th('title')}</h1>
            <p className="mt-6 text-lg sm:text-xl text-blue-100 leading-relaxed max-w-2xl">{th('subtitle')}</p>
            <div className="mt-8 mb-10">
              <SearchBar variant="hero" />
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/services" className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-brand-600 font-semibold text-sm shadow-lg hover:bg-blue-50 transition-all hover:shadow-xl">{th('cta_primary')}</Link>
              <Link href="/tools" className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-all">{th('cta_secondary')}</Link>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 sm:gap-12 max-w-lg">
            <div><p className="text-3xl sm:text-4xl font-bold">100+</p><p className="mt-1 text-sm text-blue-200">{th('stats_projects')}</p></div>
            <div><p className="text-3xl sm:text-4xl font-bold">20+</p><p className="mt-1 text-sm text-blue-200">{th('stats_clients')}</p></div>
            <div><p className="text-3xl sm:text-4xl font-bold">10+</p><p className="mt-1 text-sm text-blue-200">{th('stats_countries')}</p></div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{ts('title')}</h2>
            <p className="mt-4 text-lg text-gray-600">{ts('description')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((key) => (
              <div key={key} className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-md hover:border-brand-100 transition-all">
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mb-5 group-hover:bg-brand-500 group-hover:text-white transition-colors"><ServiceIcon name={key} /></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{ts(key + '_title')}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">{ts(key + '_desc')}</p>
                <Link href={'/services#' + key} className="inline-flex items-center gap-1 text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors">{tcommon('learn_more')}<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{tw('title')}</h2>
            <p className="mt-4 text-lg text-gray-600">{tw('description')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueKeys.map((key) => (
              <div key={key} className="text-center">
                <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center mx-auto mb-4"><ValueIcon name={key} /></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tw(key + '_title')}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{tw(key + '_desc')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{tc('title')}</h2>
            <p className="mt-4 text-lg text-gray-600">{tc('description')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topCases.map((c) => (
              <Link key={c.slug} href={'/cases/' + c.slug} className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="h-48 bg-gradient-to-br from-brand-100 to-brand-50 flex items-center justify-center"><CaseIcon name={c.slug} /></div>
                <div className="p-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-3 line-clamp-2">{c.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">{c.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/cases" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors">{tcommon('learn_more')}<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{tn('title')}</h2>
            <p className="mt-4 text-lg text-gray-600">{tn('description')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topNews.map((article, i) => (
              <div key={article.slug} className="group rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-4"><span className="w-2 h-2 rounded-full bg-brand-500" /><span className="text-xs text-gray-400">{article.date}</span></div>
                <h3 className="text-base font-semibold text-gray-900 mb-3 group-hover:text-brand-500 transition-colors line-clamp-2">{article.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">{article.description}</p>
                <Link href={'/news/' + article.slug} className="inline-flex items-center gap-1 text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors">{tcommon('learn_more')}<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors">{tn('read_all')}<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-brand-500 to-brand-700 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{tcontact('cta_title')}</h2>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">{tcontact('description')}</p>
          <div className="mt-10">
            <Link href="/services" className="inline-flex items-center px-8 py-3.5 rounded-lg bg-white text-brand-600 font-semibold text-sm shadow-lg hover:bg-blue-50 transition-all hover:shadow-xl">{tcontact('cta_button')}</Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{tg('title')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {[1,2,3].map(num => (
              <div key={num} className="text-center">
                <div className="w-14 h-14 rounded-full gradient-brand text-white flex items-center justify-center mx-auto mb-4 text-lg font-bold shadow-lg">{num}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tg('step' + num + '_title')}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{tg('step' + num + '_desc')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{'实用工具'}</h2>
            <p className="mt-4 text-lg text-gray-600">{'实时查询国际海运、空运和铁路运价与时效'}</p>
          </div>
          <div className="bg-gradient-to-br from-brand-50 to-blue-50 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{'国际物流运价时效查询'}</h3>
            <p className="text-gray-600 mb-6">{'覆盖全球主要航线，实时参考运价、运输时效和班期信息'}</p>
            <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 gradient-brand text-white font-semibold text-sm rounded-lg hover:opacity-90 transition-all shadow-lg">
              {"立即查询"}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ServiceIcon({ name }: { name: string }) {
  switch (name) {
    case 'supply_chain': return (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" /><path d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>);
    case 'freight': return (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10" /><path d="M13 11h4a2 2 0 012 2v3" /><path d="M4 3h3l2 3" /></svg>);
    case 'digital': return (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 7l3 3-3 3" /><path d="M17 7l-3 3 3 3" /></svg>);
    default: return null;
  }
}

function ValueIcon({ name }: { name: string }) {
  switch (name) {
    case 'professional': return (<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>);
    case 'global': return (<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>);
    case 'innovation': return (<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>);
    case 'trust': return (<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>);
    default: return null;
  }
}

function CaseIcon({ name: _n }: { name: string }) {
  switch (_n) {
    default: return (<svg className="w-16 h-16 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>);
    case 'consumer-electronics': return (<svg className="w-16 h-16 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /><path d="M9 14l2 2 4-4" /></svg>);
    case 'heavy-lift-project': return (<svg className="w-16 h-16 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>);
  }
}