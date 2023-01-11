import { ReactNode } from 'react';
import { Btn } from './SubmitBtn';
import styled from 'styled-components';

interface ISubmitBtnProps {
  children: ReactNode;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const HandleBtn = ({ children, handleClick, disabled }: ISubmitBtnProps) => {
  return (
    <BtnBox onClick={handleClick} $disabled={disabled}>
      {children}
    </BtnBox>
  );
};

const BtnBox = styled(Btn)<{ $disabled?: boolean }>`
  color: ${(props) => props.theme.text.accent};
  gap: 5px;
  background-color: ${(props) =>
    props.$disabled
      ? props.theme.text.lightGray
      : props.theme.container.lightBlue};
  color: ${(props) =>
    props.$disabled ? props.theme.text.gray : props.theme.text.lightBlue};
  pointer-events: ${(props) => (props.$disabled ? 'none' : 'all')};
  svg {
    fill: ${(props) =>
      props.$disabled ? props.theme.text.gray : props.theme.text.lightBlue};
  }
`;

export default HandleBtn;
