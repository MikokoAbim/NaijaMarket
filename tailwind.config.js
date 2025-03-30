/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nigerian flag colors
        'nigerian-green': '#008751',
        'nigerian-white': '#ffffff',
        
        // Traditional Nigerian colors
        'ankara-red': '#e63946',
        'ankara-orange': '#f77f00',
        'ankara-yellow': '#fcbf49',
        'ankara-purple': '#7209b7',
        'ankara-blue': '#4361ee',
        
        // Earth tones inspired by Nigerian landscape
        'earth-brown': '#774936',
        'earth-terracotta': '#bc6c25',
        'earth-sand': '#dda15e',
        'earth-clay': '#bb9457',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'adire-pattern': "url('/backgrounds/adire-pattern.svg')",
        'ankara-pattern': "url('/backgrounds/ankara-pattern.svg')",
      },
    },
  },
  plugins: [],
} 