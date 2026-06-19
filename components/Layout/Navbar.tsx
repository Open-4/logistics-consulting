/**
 * @file Responsive navigation bar with mobile hamburger menu and locale switcher.
 * All visible text is read from next-intl translation files.
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

/** Navigation item structure */
interface NavItem {
  key: string;
  href: string;
}

/** Props for the Navbar component */
interface NavbarProps {
  /** Optional additional CSS classes */
  className?: string;
}

const navItems: NavItem[] = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/services' },
  { key: 'cases', href: '/cases' },
  { key: 'news', href: '/news' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
];

/**
 * Main navigation bar with desktop links, mobile hamburger menu,
 * and a Chinese/English language toggle.
 */
export default function Navbar({ className = '' }: NavbarProps) {
  const t = useTranslations('nav');
  const tc = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  /** Switch current locale while keeping the same page path */
  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    if (segments.length > 1 && ['en', 'zh'].includes(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join('/') || '/');
    setIsMobileOpen(false);
  };

  /** Check if a nav link matches the current route */
  const isActive = (href: string) => {
    if (href === '/') return pathname.replace(/^\/(en|zh)/, '') === '' || pathname === `/${locale}`;
    const path = pathname.replace(/^\/(en|zh)/, '');
    return path.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 ${className}`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-brand-500"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="shrink-0">
            <rect x="2" y="2" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M10 16L14 20L22 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="tracking-tight">Far Horizon</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map(({ key, href }) => (
            <li key={key}>
              <Link
                href={href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(href)
                    ? 'text-brand-500 bg-brand-50'
                    : 'text-gray-600 hover:text-brand-500 hover:bg-gray-50'
                }`}
              >
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Language Switcher + Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Desktop Language Toggle */}
          <div className="hidden md:flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => switchLocale('zh')}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                locale === 'zh'
                  ? 'bg-brand-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              中文
            </button>
            <button
              onClick={() => switchLocale('en')}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                locale === 'en'
                  ? 'bg-brand-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {isMobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
          <ul className="mx-auto max-w-7xl px-4 sm:px-6 py-3 space-y-1">
            {navItems.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(href)
                      ? 'text-brand-500 bg-brand-50'
                      : 'text-gray-600 hover:text-brand-500 hover:bg-gray-50'
                  }`}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
            {/* Mobile Language Switcher */}
            <li className="pt-3 border-t border-gray-100 mt-3">
              <div className="flex items-center gap-2 px-3 py-2">
                <span className="text-xs text-gray-500">{tc('switch_lang')}</span>
                <button
                  onClick={() => switchLocale('zh')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    locale === 'zh'
                      ? 'bg-brand-500 text-white'
                      : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  中文
                </button>
                <button
                  onClick={() => switchLocale('en')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    locale === 'en'
                      ? 'bg-brand-500 text-white'
                      : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  EN
                </button>
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
