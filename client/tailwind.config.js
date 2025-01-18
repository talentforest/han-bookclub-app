/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        lg: { max: '4000px' },
        md: { max: '1023px' },
        sm: { max: '700px' },
      },
      fontFamily: {
        SUITE: ['SUITE', 'sans-serif'],
      },
      colors: {
        bg: '#F5F5F7',
        text: '#333',

        gray1: '#6d6d6d',
        gray2: '#b5b5b5',
        gray3: '#dedede',
        gray4: '#e9e9e9',
        gray5: '#d9d9d9',

        white: '#fff',

        blue1: '#5D8AFE',
        blue2: '#d1e9ff',
        blue3: '#e8eeff',

        textBlue1: '#3d70a0',
        textBlue2: '#5162FF',
        textBlue3: '#0043EF',

        skyBlue1: '#00b2e3',
        skyBlue2: '#7bd2ec',

        yellow1: '#9f8116',
        yellow2: '#ffe69d',
        yellow3: '#ffeb88',
        yellow4: '#fcfac5',

        purple1: '#695ac8',
        purple2: '#B6C2FF',
        purple3: '#e3defd',

        green1: '#379a32',
        green2: '#80E37E',
        green3: '#bcf5d5',

        red: '#e3463b',

        orange: '#ffbc6b',

        pink: '#FFC3F2',
      },
      boxShadow: {
        card: '2px 4px 12px 0px rgba(0, 0, 0, 0.08)',
        modal: '2px 2px 16px 0px rgba(0, 0, 0, 0.25)',
      },
      borderColor: {
        DEFAULT: '#efefef', // 기본 테두리 색상
      },
    },
  },

  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/typography'),
  ],
};
