module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#fafeff',
          100: '#f0fbff',
          200: '#d1f2ff',
          300: '#ade8ff',
          400: '#80dbff',
          500: '#47cbff',
          600: '#00b7ff',
          700: '#00a1e0',
          800: '#0084b8',
          900: '#005f85',
        },
        red: {
          50: '#ff104103',
          100: '#fff0f2',
          200: '#ffccd1',
          300: '#ffa3a9',
          400: '#ff8084',
          500: '#ff5a57',
          600: '#ff0f17',
          700: '#c7000d',
          800: '#7a000c',
          900: '#330007',
        },
      },
      height: {
        layout: '80vh',
      },
      minHeight: {
        layout: '80vh',
      },
      maxHeight: {
        layout: '80vh',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Martel', 'serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
