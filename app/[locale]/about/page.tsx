/**
 * @file About page — 公司介绍、使命愿景、核心价值观。
 */
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

const valueKeys = ['professional', 'global', 'innovation', 'trust'] as const;

const zhExpertise = [
  { title: '国际货运咨询', desc: '海运、空运、铁路及多式联运方案设计、路线对比与服务商推荐' },
  { title: '海关合规咨询', desc: 'HS编码归类指导、关税筹划方案、清关流程咨询与问题诊断' },
  { title: '供应链咨询', desc: '供应链网络设计、运输模式优化、成本管控方案建议' },
  { title: '数字化物流咨询', desc: '物流系统选型建议、数字化方案对比、技术实施指导' },
];const enExpertise = [
  { title: 'Freight Consulting', desc: 'Ocean, air, rail and multimodal transport solutions, route comparison and provider recommendations' },
  { title: 'Customs Compliance', desc: 'HS code guidance, tariff planning, customs process consulting and issue diagnosis' },
  { title: 'Supply Chain Advisory', desc: 'Network design, transport mode optimization, cost management recommendations' },
  { title: 'Digital Logistics', desc: 'System selection advice, digital solution comparison, technology implementation guidance' },
];export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('about');
  const tcommon = useTranslations('common');

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-brand-500 to-brand-700 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">{t('description')}</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 rounded-2xl border border-gray-100 bg-gray-50">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('mission_title')}</h2>
              <p className="text-gray-600 leading-relaxed">{t('mission')}</p>
            </div>
            <div className="p-8 rounded-2xl border border-gray-100 bg-gray-50">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('vision_title')}</h2>
              <p className="text-gray-600 leading-relaxed">{t('vision')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{t('values_title')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueKeys.map((key) => (
              <div key={key} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div className="w-14 h-14 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center mx-auto mb-4">
                  <ValueSvg name={key} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('value_' + key)}</h3>
                <p className="text-sm text-gray-600">{t('value_' + key + '_desc')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl border border-gray-100 bg-gray-50 text-center">
                <p className="text-3xl font-bold text-brand-500">2026</p>
                <p className="text-sm text-gray-600 mt-1">{t('founded')}</p>
              </div>
              <div className="p-8 rounded-2xl border border-gray-100 bg-gray-50 text-center">
                <p className="text-3xl font-bold text-brand-500">—</p>
                <p className="text-sm text-gray-600 mt-1">{t('team_size')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{t('team_section_title')}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(locale === "en" ? enExpertise : zhExpertise).map((item: {title:string;desc:string}, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{t('description')}</p>
          <a href="mailto:contact@farhorizon-logistics.com" className="inline-flex items-center px-6 py-3 rounded-lg bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 transition-colors">{tcommon('contact_us')}</a>
        </div>
      </section>
    </div>
  );
}

function ValueSvg({ name }: { name: string }) {
  switch (name) {
    case 'professional': return (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2" /></svg>);
    case 'global': return (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>);
    case 'innovation': return (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>);
    case 'trust': return (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>);
    default: return null;
  }
}