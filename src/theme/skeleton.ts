import { css, keyframes } from 'styled-components';

const skeleton = keyframes`
0% {
  background-color: hsl(200, 20%, 85%);
}
100% {
  background-color: hsl(200, 20%, 95%);
}
`;

export const skeletonAnimation = css`
  animation: ${skeleton} 1s linear infinite alternate;
`;
