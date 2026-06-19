/**
 * @file Next.js configuration with next-intl internationalization plugin.
 * @see https://nextjs.org/docs/app/api-reference/next-config-js
 */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.example.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
