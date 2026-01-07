/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        sm: '640px',
        md: '1024px',
      },
      fontFamily: {
        SUITE: ['SUITE', 'sans-serif'],
        RomanticGumi: ['RomanticGumi', 'sans-serif'],
        SiwonhanSeolreim: ['SiwonhanSeolreim', 'sans-serif'],
        GiantsInline: ['GiantsInline', 'sans-serif'],
      },
      colors: {
        bg: '#f2f8ff',
        text: '#333',

        pointCoral: '#E94F37',

        darkGray: '#262626',

        gray1: '#6d6d6d',
        gray2: '#b5b5b5',
        gray3: '#dedede',
        gray4: '#e9e9e9',

        blue1: '#18206F',
        blue2: '#1D4ED8',
        blue3: '#5D8AFE',
        blue4: '#DBEAFE',

        purple1: '#7E22CE',
        purple2: '#9381FF',
        purple3: '#B8B8FF',
        purple4: '#e3defd',

        green1: '#16A34A',
        green2: '#23CA06',
        green3: '#BDFFBC',
      },
      borderRadius: {
        card: '20px',
      },
      boxShadow: {
        book: '-2px 2px 6px 2px rgba(0, 0, 0, 0.3)',
        card: '2px 4px 8px 0px rgba(0, 0, 0, 0.08)',
        modal: '2px 2px 16px 0px rgba(0, 0, 0, 0.25)',
      },
      borderColor: {
        DEFAULT: '#b5b5b5', // 기본 테두리 색상
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
      backgroundImage: {
        skeleton: 'linear-gradient(-45deg, #fff 25%, #efefef 37%, #fff 63%)',
      },
      backgroundSize: {
        skeleton: '400% 100%',
      },
    },
  },

  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/typography'),
  ],
};
