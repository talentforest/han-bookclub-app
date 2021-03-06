import { createGlobalStyle } from "styled-components";

export const ResetStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.bgColor};
  }
  * {
    font-family: "Noto Sans KR", sans-serif;
    color: ${(props) => props.theme.text.default};
    box-sizing: border-box;
    &::-webkit-scrollbar {
    display: none;
    }
  }
  input[type=button],
  input[type=password],
  input[type=email],
  input[type=text],
  input[type=submit], 
  textarea, 
  button {
    -webkit-appearance:none; 
    -moz-appearance:none; 
    appearance:none;
  }
  
  textarea, 
  button, 
  select {
    -webkit-border-radius:0; 
    -moz-border-radius:0; 
    -o-border-radius:0; 
    border-radius:0;
  }
  a {
    text-decoration: none;
    color: ${(props) => props.theme.text.gray}
  }
  ol,
  ul {
    list-style: none;
  }
  html,
  body,
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
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
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
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
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
`;
