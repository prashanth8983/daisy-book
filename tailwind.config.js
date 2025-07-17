/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./renderer/**/*.{html,js,ts,jsx,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': 'hsl(var(--background))',
        'foreground': 'hsl(var(--foreground))',
        'primary': 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        'secondary': 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        'accent': 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        'card': 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        'popover': 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        'border': 'hsl(var(--border))',
        'input': 'hsl(var(--input))',
        'ring': 'hsl(var(--ring))',
        'muted': 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        'success': 'hsl(var(--success))',
        'warning': 'hsl(var(--warning))',
        'danger': 'hsl(var(--danger))',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-in-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          'from': { transform: 'translateY(20px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          'from': { transform: 'translateY(-20px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
} 