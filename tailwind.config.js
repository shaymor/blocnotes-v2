const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [require('@tailwindcss/forms')],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
      colors: {
        primary: {
          50: '--tw-color-primary-50',
          100: '--tw-color-primary-100',
          200: '--tw-color-primary-200',
          300: '--tw-color-primary-300',
          400: '--tw-color-primary-400',
          500: '--tw-color-primary-500',
          600: '--tw-color-primary-600',
          700: '--tw-color-primary-700',
          800: '--tw-color-primary-800',
          900: '--tw-color-primary-900',
        },
        dark: '#222222',
      },
    },
  },
};
