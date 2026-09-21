/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { cream: '#FBF6EC', navy: '#1B2A49', gold: '#C9A227', stamp: '#B3261E', pinky: '#FF5C8A' },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        typewriter: ['"Special Elite"', 'monospace'],
      },
    },
  },
  plugins: [],
}
