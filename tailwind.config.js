/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        detective: {
          dark: '#0d0b09',
          board: '#b88344',
          cork: '#c89656',
          corkDark: '#8b5c27',
          wood: '#3e2716',
          woodDark: '#23150c',
          woodBorder: '#53341d',
          paper: '#f5eed9',
          paperAged: '#ece1c1',
          paperDark: '#ded0ab',
          ink: '#1c1917',
          stamp: '#991b1b',
          string: '#dc2626',
          lampGlow: '#f59e0b',
          gold: '#d97706',
          badge: '#b45309',
          accent: '#0284c7'
        }
      },
      fontFamily: {
        typewriter: ['"Special Elite"', '"Courier Prime"', 'Courier', 'monospace'],
        handwriting: ['"Caveat"', '"Patrick Hand"', 'cursive'],
        display: ['"Cinzel"', '"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'pin': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5)',
        'dossier': '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
        'lamp': '0 0 80px 30px rgba(245, 158, 11, 0.12)',
        'string': '0 2px 4px rgba(0,0,0,0.4)',
      }
    },
  },
  plugins: [],
}
