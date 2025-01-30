/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '1024px',
      },
      fontFamily: {
        SUITE: ['SUITE', 'sans-serif'],
      },
      colors: {
        bg: '#f2f8ff',
        text: '#333',

        pointCoral: '#E94F37',
        pointBlue: '#1D3557',
        pointNavy: '#18206F',
        pointGreen: '#97EAD2',
        pointPurple: '#9381FF',

        gray1: '#6d6d6d',
        gray2: '#b5b5b5',
        gray3: '#dedede',
        gray4: '#e9e9e9',
        gray5: '#d9d9d9',

        darkBlue: '#272635',
        darkBlue2: '#18206F',

        blue1: '#5D8AFE',
        blue2: '#d1e9ff',
        blue3: '#e8eeff',

        purple1: '#9381FF',
        purple2: '#B8B8FF',
        purple3: '#e3defd',

        green1: '#8CC7A1',
        green2: '#97EAD2',
        green3: '#bcf5d5',
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
