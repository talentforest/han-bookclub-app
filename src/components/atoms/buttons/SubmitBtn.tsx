import { ReactNode } from 'react';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface ISubmitBtnProps {
  children: ReactNode;
  disabled?: boolean;
}

const SubmitBtn = ({ children, disabled }: ISubmitBtnProps) => {
  return (
    <Btn type='submit' $diabled={disabled}>
      {children}
    </Btn>
  );
};

export const Btn = styled.button<{ $diabled?: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  padding: 15px 10px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) =>
    props.$diabled
      ? props.theme.text.lightGray
      : props.theme.container.lightBlue};
  color: ${(props) =>
    props.$diabled ? props.theme.text.gray : props.theme.text.lightBlue};
  pointer-events: ${(props) => (props.$diabled ? 'none' : 'all')};
  svg {
    width: 18px;
    height: 18px;
    fill: ${(props) => props.theme.text.accent};
  }
  @media ${device.tablet} {
    height: 50px;
    font-size: 16px;
    padding: 10px 12px;
  }
`;

export default SubmitBtn;
