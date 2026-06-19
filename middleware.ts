/**
 * @file Next.js middleware for internationalization routing.
 * Handles locale detection and redirects for /en/ and /zh/ path prefixes.
 * @see https://next-intl.dev/docs/routing/middleware
 */
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'zh'],
  defaultLocale: 'zh',
  localePrefix: 'always',
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
