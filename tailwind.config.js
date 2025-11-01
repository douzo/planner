/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // iOS-inspired color palette
        ios: {
          blue: '#007AFF',
          green: '#34C759',
          orange: '#FF9500',
          red: '#FF3B30',
          purple: '#AF52DE',
          cyan: '#5AC8FA',
          yellow: '#FFCC00',
          pink: '#FF2D92',
        },
        neutral: {
          bg: '#FFFFFF',
          'bg-secondary': '#F3F4F6',
          border: '#E5E7EB',
          'text-primary': '#1D1D1F',
          'text-secondary': '#86868B',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'ios': '12px',
      }
    },
  },
  plugins: [],
}
