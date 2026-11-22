/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#F1F5F8',
          100: '#E4EBF1',
          200: '#C8D5E0',
          300: '#A1B5C5',
          400: '#718DA2',
          500: '#3E607B',
          600: '#102B45',
          700: '#0D2338',
          800: '#091B2C',
          900: '#061421',
          950: '#030B12',
        },
        accent: {
          50: '#FFF8E8',
          100: '#FDEFCB',
          200: '#F9DFA0',
          300: '#F4CA70',
          400: '#EDB448',
          500: '#E5A126',
          600: '#C98718',
          700: '#A66B12',
          800: '#80510F',
          900: '#603D0D',
        },
        success: { 50:'#f0fdf4',100:'#dcfce7',200:'#bbf7d0',300:'#86efac',400:'#4ade80',500:'#22c55e',600:'#16a34a',700:'#15803d',800:'#166534',900:'#14532d' },
        warning: { 50:'#fffbeb',100:'#fef3c7',200:'#fde68a',300:'#fcd34d',400:'#fbbf24',500:'#f59e0b',600:'#d97706',700:'#b45309',800:'#92400e',900:'#78350f' },
        error: { 50:'#fef2f2',100:'#fee2e2',200:'#fecaca',300:'#fca5a5',400:'#f87171',500:'#ef4444',600:'#dc2626',700:'#b91c1c',800:'#991b1b',900:'#7f1d1d' },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
