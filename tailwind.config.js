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
      'foreground-500': '#F8F8F250',
      'foreground-900': '#F8F8F290',
      'current-line': '#44475A',
      'background-500': '#282A3650',
      'comment': '#6272A4',
      'purple': '#BD93F9',
      'pink': '#FF79C6',
    },
    screens: {
      'mobile': '640px',
      'tablet': '768px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    extend: {
      fontFamily: {
        'title': ['"Titillium Web"', 'ui-sans-serif'],
        'body': ['"Open Sans"', 'ui-sans-serif']
      },
      backgroundImage: {
        'gradientRadial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite;',
        'bounce-medium': 'bounce 1.5s infinite;'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
