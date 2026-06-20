/**
 * @file Cookie consent banner — 底部浮动横幅，点击接受后存入 localStorage 不再显示。
 */
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations('cookies');

  useEffect(() => {
    const accepted = localStorage.getItem('cookieConsent');
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-900/95 text-white px-4 py-3 shadow-lg">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-center sm:text-left leading-relaxed">
          {t('banner_text')}
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/cookies"
            className="text-sm text-gray-300 underline hover:text-white transition-colors"
          >
            {t('learn_more')}
          </Link>
          <button
            onClick={accept}
            className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
