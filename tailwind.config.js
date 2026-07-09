/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Press Start 2P"', 'system-ui', 'monospace'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#06b6d4',
          light: '#22d3ee',
          dim: 'rgba(6, 182, 212, 0.1)',
        },
        surface: {
          DEFAULT: '#0f1923',
          hover: '#172636',
        },
      },
      animation: {
        'hero-fade-in': 'heroFadeIn 1s ease-out',
        'bounce-down': 'bounceDown 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'wave': 'wave 4s ease-in-out infinite',
        'news-float': 'newsFloat 3s ease-in-out infinite',
        'typewriter': 'typewriter 2s steps(40) 0.5s forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'count-up': 'countUp 0.5s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        heroFadeIn: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        bounceDown: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.6' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0) scaleY(1)' },
          '50%': { transform: 'translateY(-6px) scaleY(1.02)' },
        },
        newsFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-4px) rotate(0.5deg)' },
          '75%': { transform: 'translateY(2px) rotate(-0.3deg)' },
        },
        typewriter: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(6,182,212,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(6,182,212,0.25)' },
        },
      },
    },
  },
  plugins: [],
}
