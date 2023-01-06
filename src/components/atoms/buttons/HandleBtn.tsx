import { ReactNode } from 'react';
import { Btn } from './SubmitBtn';
import styled from 'styled-components';

interface ISubmitBtnProps {
  children: ReactNode;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const HandleBtn = ({ children, handleClick }: ISubmitBtnProps) => {
  return <BtnBox onClick={handleClick}>{children}</BtnBox>;
};

const BtnBox = styled(Btn)`
  color: ${(props) => props.theme.text.accent};
  gap: 5px;
`;

export default HandleBtn;
