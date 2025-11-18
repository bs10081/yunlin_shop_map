/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // 80s Retro Colors (Synthwave/Vaporwave)
        retro: {
          pink: '#ff006e',
          purple: '#8338ec',
          cyan: '#06ffa5',
          blue: '#3a86ff',
          orange: '#fb5607',
          yellow: '#ffbe0b',
          magenta: '#ff006e',
          teal: '#06ffa5',
        },
        neon: {
          pink: '#ff10f0',
          blue: '#00d4ff',
          purple: '#b537f2',
          green: '#39ff14',
          orange: '#ff6600',
          yellow: '#ffff00',
        },
      },
      fontFamily: {
        sans: ['Noto Sans TC', 'system-ui', 'sans-serif'],
        retro: ['Orbitron', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
        'grid-slide': 'gridSlide 20s linear infinite',
        'scanline': 'scanline 8s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-slow': 'bounceSlow 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        neonPulse: {
          '0%, 100%': {
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
            filter: 'brightness(1)',
          },
          '50%': {
            textShadow: '0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor',
            filter: 'brightness(1.2)',
          },
        },
        gridSlide: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(50px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        bounceSlow: {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(-10%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      backgroundImage: {
        'retro-grid': 'linear-gradient(#ff006e 1px, transparent 1px), linear-gradient(90deg, #ff006e 1px, transparent 1px)',
        'retro-gradient': 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        'neon-gradient': 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)',
      },
    },
  },
  plugins: [],
}
