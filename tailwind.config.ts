import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#020915',
          900: '#030d1c',
          800: '#061326',
          700: '#0b1e38',
          600: '#122843',
          500: '#1a3350',
        },
        electric: {
          300: '#7ee4fb',
          400: '#38d1f8',
          500: '#0eb9ea',
          600: '#0294c8',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'dot-pattern':
          'radial-gradient(circle, rgba(56,209,248,0.10) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-30': '30px 30px',
      },
      boxShadow: {
        glow: '0 0 30px rgba(56, 209, 248, 0.12)',
        'glow-md': '0 0 50px rgba(56, 209, 248, 0.18)',
        electric: '0 4px 24px rgba(56, 209, 248, 0.22)',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
