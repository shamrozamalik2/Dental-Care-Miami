/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#087FB5',
          50: '#EAF7FC',
          100: '#D3EEF8',
          200: '#A6DBF0',
          300: '#6EC2E4',
          400: '#2FA2D1',
          500: '#087FB5',
          600: '#066A98',
          700: '#05557A',
          800: '#06425E',
          900: '#073247',
        },
        sky: { soft: '#EAF7FC' },
        navy: { DEFAULT: '#152B3C', 700: '#20394C', 500: '#4A6072', 300: '#8A9BA8' },
        teal: { DEFAULT: '#16B8A6', 50: '#E7F8F5', 600: '#109585', 700: '#0D7A6D' },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', 'system-ui', 'sans-serif'],
        display: ['"Fraunces Variable"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(21,43,60,0.04), 0 8px 24px -6px rgba(21,43,60,0.08)',
        lift: '0 2px 4px rgba(21,43,60,0.04), 0 24px 48px -12px rgba(8,127,181,0.22)',
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
