import { ReactNode } from 'react';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

type BtnColor = 'red' | 'purple' | 'yellow' | 'blue' | 'orange';

interface Props {
  name: string;
  type?: 'button' | 'submit';
  children?: ReactNode;
  disabled?: boolean;
  handleClick?: () => void;
  color?: BtnColor;
}

export default function SquareBtn({
  name,
  type = 'button',
  children,
  disabled,
  handleClick,
  color = 'blue',
}: Props) {
  return (
    <Btn
      type={type}
      onClick={handleClick}
      disabled={disabled}
      $disabled={disabled}
      $color={color}
    >
      {children}

      <span>{name}</span>
    </Btn>
  );
}

export const Btn = styled.button<{ $disabled: boolean; $color?: BtnColor }>`
  height: 40px;
  width: 100%;
  padding: 0 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ $disabled, $color, theme }) =>
    $disabled
      ? theme.text.gray1
      : $color === 'orange'
      ? theme.container.orange
      : $color === 'purple'
      ? theme.container.purple1
      : theme.container.blue1};
  span {
    font-size: 15px;
    color: ${({ $disabled, theme }) =>
      $disabled ? theme.text.gray2 : theme.text.blue1};
  }
  @media ${device.tablet} {
    /* height: 40px; */
  }
`;
