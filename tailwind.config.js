/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./renderer/**/*.{html,js,ts,jsx,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0D1117',
        'bg-secondary': '#161B22',
        'text-primary': '#C9D1D9',
        'text-secondary': '#8B949E',
        'text-accent': '#58A6FF',
        'border-color': '#30363D',
        'highlight-primary': '#F78166',
        'highlight-secondary': '#FFA657',
        'highlight-code-bg': 'rgba(88, 166, 255, 0.15)',
        'success-color': '#56D364',
        'warning-color': '#DBAB0A',
        'danger-color': '#F85149',
      },
      fontFamily: {
        sans: ['JetBrains Mono', 'monospace'],
        serif: ['JetBrains Mono', 'monospace'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}