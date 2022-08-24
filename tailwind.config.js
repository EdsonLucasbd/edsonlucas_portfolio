/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.tsx',
    './src/**/*.tsx'
  ],
  theme: {
    colors: {
      'background': '#282A36',
      'foreground': '#F8F8F2',
      'current-line': '#44475A',
      'background-500': '#282A3650',
      'comment': '#6272A4',
      'purple': '#BD93F9',
      'pink': '#FF79C6',
    },
    extend: {
      fontFamily: {
        'title': ['"Titillium Web"', 'ui-sans-serif'],
        'body': ['"Open Sans"', 'ui-sans-serif']
      },
      backgroundImage: {
        'gradientRadial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
