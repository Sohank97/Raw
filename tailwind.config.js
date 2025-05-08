/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
        'ping': 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'progress': 'progress 6s linear 1',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        progress: {
          '0%': { width: '0%', left: '0' },
          '100%': { width: '100%', left: '0' },
        }
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transformOrigin: {
        '0': '0%',
      },
      rotate: {
        '3': '3deg',
        '6': '6deg',
        '12': '12deg',
      },
      scale: {
        '95': '0.95',
        '105': '1.05',
      },
    },
  },
  safelist: [
    'rotate-3',
    'rotate-6',
    'rotate-12',
    '-rotate-6',
    'scale-95',
    'scale-105',
    'blur-3xl',
    'animate-pulse',
    'animate-bounce',
    'animate-ping',
    'animate-ping-slow',
    'animate-float',
    'animate-spin-slow',
    'animate-progress',
    'perspective',
    'preserve-3d',
    'backface-hidden',
    'my-rotate-y-180',
    'transform-style',
    'rotateY',
    'from-amber-500',
    'to-amber-600',
    'from-amber-600',
    'to-amber-700',
    'from-white/90',
    'via-white/70',
    'to-white/30',
    'from-amber-500/20',
    'to-amber-500/10',
    'from-amber-600/10', 
    'to-amber-600/5',
  ],
  plugins: [],
} 