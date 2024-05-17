import { ReactNode } from 'react';
import styled from 'styled-components';

type TagColor = 'green' | 'purple' | 'blue' | 'yellow' | 'red';

interface Props {
  children: ReactNode;
  color?: TagColor;
  roundedFull?: boolean;
}

export default function Tag({
  children,
  roundedFull = true,
  color = 'blue',
}: Props) {
  return (
    <InfoTag $rounded={roundedFull} $color={color}>
      {children && children}
    </InfoTag>
  );
}

const getTextColor = (color: TagColor) => {
  return color === 'blue'
    ? '#3d70a0'
    : color === 'yellow'
    ? '#9f8116'
    : color === 'purple'
    ? '#695ac8'
    : color === 'green'
    ? '#379a32'
    : color === 'red'
    ? '#ea4f4f'
    : '';
};

const InfoTag = styled.div<{ $rounded: boolean; $color: TagColor }>`
  display: flex;
  gap: 5px;
  padding: 6px 12px 4px;
  height: fit-content;
  width: fit-content;
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: ${({ $rounded }) => ($rounded ? '30px' : '8px')};
  background-color: ${({ $color }) =>
    $color === 'blue'
      ? '#d1e9ff'
      : $color === 'yellow'
      ? '#ffe69d'
      : $color === 'purple'
      ? '#e3defd'
      : $color === 'green'
      ? '#bcf5d5'
      : $color === 'red'
      ? '#ffdfdf'
      : ''};
  span,
  h1,
  h2,
  h3,
  h4,
  h6,
  h5 {
    font-size: 14px;
    color: ${({ $color }) => getTextColor($color)};
  }
  svg {
    margin-top: 2px;
    stroke: ${({ $color }) => getTextColor($color)};
  }
`;
