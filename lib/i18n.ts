/**
 * @file Internationalization configuration for next-intl.
 * Loads translation messages for the current locale.
 * @see https://next-intl.dev/docs/getting-started/app-router
 */
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  locale,
  messages: (await import(`../messages/${locale}.json`)).default,
}));