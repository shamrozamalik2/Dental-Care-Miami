/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#087EAB',
          50: '#F2F9FC',
          100: '#D6EEF7',
          200: '#ADDCEE',
          300: '#73C1DF',
          400: '#2F9FCB',
          500: '#087EAB',
          600: '#066A91',
          700: '#055675',
          800: '#05435B',
          900: '#063346',
        },
        sky: { soft: '#F2F9FC' },
        navy: { DEFAULT: '#17324A', 700: '#24435E', 500: '#4D6478', 300: '#8B9DAD' },
        teal: { DEFAULT: '#20B8B0', 50: '#E8F8F7', 600: '#19968F', 700: '#137A74' },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', 'system-ui', 'sans-serif'],
        display: ['"Fraunces Variable"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(23,50,74,0.04), 0 8px 24px -6px rgba(23,50,74,0.08)',
        lift: '0 2px 4px rgba(23,50,74,0.04), 0 24px 48px -12px rgba(8,126,171,0.22)',
      },
      borderRadius: { '4xl': '2rem' },
      keyframes: {
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(16px)' }, '100%': { opacity: 1, transform: 'none' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        wiggle: { '0%,100%': { transform: 'rotate(0)' }, '25%': { transform: 'rotate(-14deg)' }, '75%': { transform: 'rotate(14deg)' } },
      },
      animation: {
        'fade-up': 'fade-up .7s cubic-bezier(.2,.7,.2,1) both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
