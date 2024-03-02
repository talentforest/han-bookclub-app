import { createGlobalStyle } from 'styled-components';
import device from './mediaQueries';

export const ResetStyle = createGlobalStyle`
  @font-face {
     font-family: 'Locus_Sangsang';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/locus_sangsang.woff') format('woff');
     font-weight: normal;
     font-style: normal;
  }
  @font-face {
      font-family: 'SUITE';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Light.woff2') format('woff2');
      font-weight: 300;
      font-style: normal;
  }
  @font-face {
      font-family: 'SUITE';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
  }
  @font-face {
      font-family: 'SUITE';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Medium.woff2') format('woff2');
      font-weight: 500;
      font-style: normal;
  }
  @font-face {
      font-family: 'SUITE';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Bold.woff2') format('woff2');
      font-weight: 700;
      font-style: bold;
  }
  body {
    font-family: "SUITE";
    background-color: ${({ theme }) => theme.bgColor};
    ::-webkit-scrollbar {
      display: none;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    > div {
      padding-bottom: 60px;
      > main {
        position: relative;
        padding: 10px 20px 40px;
        @media ${device.tablet} {
          padding: 10px 80px 40px;
        }
        @media ${device.desktop} {
          padding: 0;
          width: 70%;
          margin: 0 auto 40px;
        }
      }
    }
  }
  * {
    color: ${({ theme }) => theme.text.default};
    box-sizing: border-box; 
  }
  textarea, 
  button {
    font-family: "SUITE";
    padding: 0;
    margin: 0;
    border: none;
    -webkit-appearance:none; 
    -moz-appearance:none; 
    appearance:none;
    cursor: pointer;
  }
  textarea, 
  button, 
  select {
    background: transparent;
    -webkit-border-radius:0; 
    -moz-border-radius:0; 
    -o-border-radius:0; 
    border-radius:0;
  }
  a {
    text-decoration: none;
  }
  ol,
  ul, li {
    list-style: none;
  }
  html,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video,
  body {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 1.6;
  }
  h1, h2, h3, h4, h5, h6, span, p, textarea {
    line-height: 1.6
  }
  a {
    line-height: 0;
  }
  input, textarea {
    font-family: "SUITE";
    &:focus {
      outline: none;
    }
    &::placeholder {
    color: #bbb;
  }
  
  }
`;
