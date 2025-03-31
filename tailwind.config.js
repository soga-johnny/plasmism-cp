/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'opacity-0',
    'translate-y-4',
    'opacity-100',
    'fade-out',
    'line-through',
    'font-normal',
    'hover:opacity-70',
    'hover:translate-y-[-2px]',
    'text-[#00E7A2]',
    'text-[#FFB800]',
    'text-[#EC5D49]',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto-sans-jp)'],
        inter: ['var(--font-inter)'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
} 