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
  box-shadow: ${(props) => props.theme.boxShadow};
  background-color: ${(props) =>
    props.$disabled
      ? props.theme.text.lightGray
      : props.$color === 'orange'
      ? props.theme.container.orange
      : props.$color === 'purple'
      ? props.theme.container.purple
      : props.theme.container.lightBlue};
  span {
    font-size: 15px;
    color: ${(props) =>
      props.$disabled
        ? props.theme.text.mediumGray
        : props.theme.text.lightBlue};
  }
  @media ${device.tablet} {
    /* height: 40px; */
  }
`;
