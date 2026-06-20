/**
 * @file Footer component with company info, quick links, services, and contact details.
 * All visible text is read from next-intl translation files.
 */
import Link from 'next/link';
import { useTranslations } from 'next-intl';

/** Props for the Footer component */
interface FooterProps {
  /** Optional additional CSS classes */
  className?: string;
}

/** Quick link items */
const quickLinks: { key: string; href: string }[] = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'cases', href: '/cases' },
  { key: 'news', href: '/news' },
  { key: 'contact', href: '/contact' },
];

/** Service link items */
const serviceLinks: { key: string; href: string }[] = [
  { key: 'supply_chain', href: '/services#supply-chain' },
  { key: 'freight', href: '/services#freight' },
  { key: 'customs', href: '/services#customs' },
  { key: 'digital', href: '/services#digital' },
  { key: 'risk', href: '/services#risk' },
];

/**
 * Site footer with four-column layout: company intro, quick links,
 * services, and contact information.
 */
export default function Footer({ className = '' }: FooterProps) {
  const t = useTranslations('nav');
  const ts = useTranslations('services');
  const tf = useTranslations('footer');
  const tc = useTranslations('contact');

  return (
    <footer className={`bg-gray-900 text-gray-300 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-brand-400 shrink-0">
                <rect x="2" y="2" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M10 16L14 20L22 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-lg font-bold text-white">Far Horizon</span>
            </div>
            <p className="text-sm font-semibold text-white mb-1">{tf('company_name')}</p>`n            <p className="text-xs text-gray-400 mb-3">{tf('address')}</p>`n            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              {tf('description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {tf('quick_links')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {tf('services_footer')}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {ts(`${key}_title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {tf('contact_footer')}
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{tc('info_address')}</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{tc('info_phone')}</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{tc('info_email')}</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{tc('info_hours')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">{tf('copyright')}</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-600">{tf('icp')}</span>`n            <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              {tf('privacy')}
            </Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              {tf('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
