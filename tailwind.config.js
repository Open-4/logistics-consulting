/**
 * @file Tailwind CSS configuration for the logistics consulting website.
 * @see https://tailwindcss.com/docs/configuration
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#dbe4ff',
          200: '#bac8ff',
          300: '#91a7ff',
          400: '#748ffc',
          500: '#1A56DB',
          600: '#1548c4',
          700: '#103aa3',
          800: '#0c2d82',
          900: '#082061',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Noto Sans SC',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
