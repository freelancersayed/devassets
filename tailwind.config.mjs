/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#09090B',
          surface: '#18181B',
          border: '#27272A',
          emerald: '#10B981',
          'emerald-hover': '#34D399',
          heading: '#FAFAFA',
          muted: '#A1A1AA',
          amber: '#F59E0B',
        },
      },
      boxShadow: {
        'emerald-glow': '0 0 25px rgba(16, 185, 129, 0.35)',
        'card-border': 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
};
