/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        fraunces: ['Fraunces', 'serif'],
      },
      // Animation durations could be added here
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
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
      },
    },
  },
  plugins: [
    function ({ addBase }: { addBase: (base: any) => void }) {
      addBase({
        ':root': {
          // Define your CSS variables here for compatibility with your existing CSS
          '--foreground': 'rgba(245, 245, 245, 1)',
          '--component-blow-up-border': 'rgba(200, 200, 200, 1)',
          '--component-blow-up-fill': 'rgba(245, 245, 245, 1)',
          '--light-foreground': 'rgba(245, 245, 245, 1)',
          '--light-component-blow-up-border': 'rgba(200, 200, 200, 1)',
          '--light-primary': 'rgba(133, 77, 255, 1)',
          '--light-glow': 'rgba(133, 77, 255, 0.07)',

          // Dark mode variables
          '--dark-component-blow-up-fill': 'rgba(35, 34, 49, 1)',
          '--dark-component-blow-up-border': 'rgba(70, 68, 98, 1)',
          '--dark-foreground': 'rgba(23, 22, 38, 1)',
          '--dark-primary': 'rgba(133, 77, 255, 1)',
          '--dark-glow': 'rgba(133, 77, 255, 0.07)',
        },
        '.dark': {
          '--foreground': 'rgba(23, 22, 38, 1)',
          '--component-blow-up-border': 'rgba(70, 68, 98, 1)',
          '--component-blow-up-fill': 'rgba(35, 34, 49, 1)',
        },
      })
    },
  ],
}
