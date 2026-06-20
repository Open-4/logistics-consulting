/**
 * @file Contact information display component with click-to-call, email, WhatsApp, WeChat QR code, address, and hours.
 * All user-visible text is read from next-intl translation files.
 */
import { useTranslations } from 'next-intl';

/* ──────── Contact data (shared across locales) ──────── */

/* ──────── Contact item type ──────── */

interface ContactItem {
  key: string;
  href: string;
  icon: React.ReactNode;
  labelKey: string;
  value: string;
  external?: boolean;
}
const CONTACTS: ContactItem[] = [
  {
    key: 'phone',
    href: '#phone',
    external: false,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    labelKey: 'info_phone',
    value: '021-XXXX-XXXX',
  },
  {
    key: 'email',
    href: 'mailto:contact@farhorizon-logistics.com',
    external: false,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    labelKey: 'info_email',
    value: 'contact@farhorizon-logistics.com',
  },
  {
    key: 'whatsapp',
    href: '#whatsapp',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    labelKey: 'info_whatsapp_label',
    value: '+86 138 0000 0000',
    external: false,
  },
];

/** Props for ContactInfo component */
interface ContactInfoProps {
  /** Additional CSS classes */
  className?: string;
  /** Whether to show WeChat QR section */
  showWechat?: boolean;
}

/**
 * Contact information card listing phone, email, WhatsApp, WeChat, address, and hours.
 */
export default function ContactInfo({ className = '', showWechat = true }: ContactInfoProps) {
  const t = useTranslations('contact');
  const tc = useTranslations('common');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* ── Interactive contact links ── */}
      <div className="grid gap-4">
        {CONTACTS.map((item) => (
          <a
            key={item.key}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md hover:border-brand-100 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                {t(item.labelKey as keyof typeof t)}
              </p>
              <p className="text-sm font-medium text-gray-900 mt-0.5 group-hover:text-brand-500 transition-colors">
                {item.value}
              </p>
            </div>
            <svg className="w-4 h-4 text-gray-300 group-hover:text-brand-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ))}
      </div>

      {/* ── WeChat Work QR (placeholder) ── */}
      {showWechat && (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm text-center">
          <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-900 mb-1">{t('info_wechat_label')}</p>
          <p className="text-xs text-gray-500 mb-4">{t('info_wechat_desc')}</p>
          <div className="w-36 h-36 mx-auto rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-10 h-10 mx-auto text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M7 7h4v4H7zM13 7h4v4h-4zM7 13h4v4H7zM13 13h4v4h-4z" />
              </svg>
              <p className="text-xs text-gray-400">{tc('loading')}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Address & Hours ── */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm space-y-3">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 mt-0.5 text-brand-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">{t('info_title')}</p>
            <p className="text-sm text-gray-900 mt-0.5">{t('info_address')}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 mt-0.5 text-brand-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">{t('info_title')}</p>
            <p className="text-sm text-gray-900 mt-0.5">{t('info_hours')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
