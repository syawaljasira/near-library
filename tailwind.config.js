module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        layout: '80vh',
      },
      minHeight: {
        layout: '80vh',
      },
      maxHeight: {
        layout: '80vh',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
