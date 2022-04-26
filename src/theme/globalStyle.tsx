import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
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

export const Header = styled.header`
  color: ${(props) => props.theme.text.gray};
  font-weight: 700;
  @media screen and (max-width: 500px) {
    padding: 20px 15px 10px;
  }
`;

export const Container = styled.main`
  @media screen and (max-width: 500px) {
    padding: 10px 15px 80px;
  }
`;

export const Box = styled.div`
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 10px 15px;
`;

export const BigBox = styled(Box)`
  width: 290px;
  min-height: 100px;
`;

export const MediumBox = styled(Box)`
  width: 260px;
  min-height: 200px;
`;

export const SubmitBtn = styled.input`
  border: none;
  background-color: ${(props) => props.theme.container.blue};
  color: ${(props) => props.theme.text.white};
  font-size: 14px;
  padding: 3px 8px;
  border-radius: 5px;
  cursor: pointer;
`;
