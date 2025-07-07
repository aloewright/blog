/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Scientific/Technical Dark Theme Palette
        // Primary - Electric Blue (for accents and interactive elements)
        primary: {
          50: '#e6f3ff',
          100: '#b3daff',
          200: '#80c1ff',
          300: '#4da8ff',
          400: '#1a8fff',
          500: '#0077e6', // Main primary
          600: '#005db3',
          700: '#004480',
          800: '#002a4d',
          900: '#00111a',
          950: '#000810',
        },
        // Secondary - Cyan (for highlights and supporting elements)
        secondary: {
          50: '#e6fffc',
          100: '#b3fff5',
          200: '#80ffed',
          300: '#4dffe6',
          400: '#1affde',
          500: '#00e6cc', // Main secondary
          600: '#00b3a0',
          700: '#008073',
          800: '#004d47',
          900: '#001a1a',
          950: '#00100f',
        },
        // Accent - Neon Green (for success states and highlights)
        accent: {
          50: '#f0ffe6',
          100: '#d4ffb3',
          200: '#b8ff80',
          300: '#9cff4d',
          400: '#80ff1a',
          500: '#66e600', // Main accent
          600: '#52b300',
          700: '#3d8000',
          800: '#294d00',
          900: '#141a00',
          950: '#0a1000',
        },
        // Warning - Amber
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        // Error - Red
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        // Dark mode backgrounds and surfaces
        dark: {
          50: '#f7f7f8',
          100: '#e3e3e6',
          200: '#c7c7cd',
          300: '#a5a5ad',
          400: '#83838d',
          500: '#686873',
          600: '#535359',
          700: '#454549',
          800: '#3a3a3e',
          900: '#2d2d30',
          950: '#1a1a1c',
        },
        // Ultra dark backgrounds for contrast
        void: {
          50: '#e6e6e7',
          100: '#ccccce',
          200: '#999999',
          300: '#666666',
          400: '#333333',
          500: '#1f1f1f',
          600: '#191919',
          700: '#141414',
          800: '#0f0f0f',
          900: '#0a0a0a',
          950: '#050505',
        },
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'SF Mono', 'Consolas', 'monospace'],
        'sans': ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 119, 230, 0.5)',
        'glow-lg': '0 0 40px rgba(0, 119, 230, 0.6)',
        'neon': '0 0 10px rgba(102, 230, 0, 0.8), 0 0 20px rgba(102, 230, 0, 0.6)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scan-line': 'scan-line 4s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 119, 230, 0.5)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(0, 119, 230, 0.8)',
          },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}
