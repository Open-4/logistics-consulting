'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function PricingPage() {
  const t = useTranslations('pricing');
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale }),
      });
      const data = await res.json();
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        setMessage(locale === 'zh' ? '支付服务暂不可用，请稍后再试' : 'Payment unavailable, please try again');
      }
    } catch {
      setMessage(locale === 'zh' ? '网络错误' : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <section className="py-16 bg-gradient-to-br from-brand-500 to-brand-700 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <p className="mt-4 text-lg text-blue-100">{t('description')}</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{t('free_title')}</h2>
              <p className="text-sm text-gray-500 mb-6">{t('free_desc')}</p>
              <p className="text-3xl font-bold text-gray-900 mb-6">{t('free_price')}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {(t.raw('free_features'))?.map((f: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/tools" className="w-full text-center px-6 py-3 rounded-lg border-2 border-brand-500 text-brand-500 font-semibold text-sm hover:bg-brand-50 transition-all">
                {t('free_cta')}
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-2xl border-2 border-brand-500 p-8 flex flex-col relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-xs font-semibold px-4 py-1 rounded-full">{t('popular')}</span>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{t('pro_title')}</h2>
              <p className="text-sm text-gray-500 mb-6">{t('pro_desc')}</p>
              <p className="text-3xl font-bold text-gray-900 mb-6">{t('pro_price')}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {(t.raw('pro_features'))?.map((f: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={handleSubscribe} disabled={loading} className="w-full px-6 py-3 rounded-lg gradient-brand text-white font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-all">
                {loading ? '...' : t('pro_cta')}
              </button>
              {message && <p className="text-sm text-center mt-3 text-gray-500">{message}</p>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}