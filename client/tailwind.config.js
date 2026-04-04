module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#006a2b',
        'primary-container': '#86f898',
        secondary: '#0058bc',
        'secondary-container': '#bed2ff',
        tertiary: '#00647b',
        'tertiary-fixed': '#00d2ff',
        surface: '#f5f7f9',
        'on-surface': '#2c2f31',
        'on-surface-variant': '#595c5e',
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
