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
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
        },
        secondary: {
          500: '#f97316',
          600: '#ea580c',
        },
        accent: {
          400: '#fbbf24',
          500: '#f59e0b',
          50: '#fffbeb',
          100: '#fef3c7',
        }
      }
    },
  },
  plugins: [],
}