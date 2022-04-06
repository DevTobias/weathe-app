module.exports = {
  darkMode: 'class',
  content: ['pages/**/*.{js,jsx,ts,tsx}', 'app/Components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        innerScreen: 'calc(var(--innerVh, 1vh) * 100)',
      },
      minHeight: {
        innerScreen: 'calc(var(--innerVh, 1vh) * 100)',
      },
      colors: {
        transparent: '#00000000',
        neutral: {
          900: '#001427',
          800: '#1a2c3d',
          700: '#334352',
          600: '#4d5b68',
          500: '#66727d',
          400: '#808a93',
          300: '#99a1a9',
          200: '#b3b9be',
          150: '#ccd0d4',
          100: '#f0f2f5',
          0: '#FFFFFF',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
