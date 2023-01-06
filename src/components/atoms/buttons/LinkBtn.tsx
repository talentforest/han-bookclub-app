import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface ILinkBtnProps {
  to: string;
  children: ReactNode;
}

const LinkBtn = ({ to, children }: ILinkBtnProps) => {
  return <Btn to={to}>{children}</Btn>;
};

const Btn = styled(Link)`
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
  color: ${(props) => props.theme.text.gray};
  background-color: ${(props) => props.theme.container.yellow};
  @media ${device.tablet} {
    height: 50px;
    font-size: 16px;
    padding: 10px 12px;
  }
`;

export default LinkBtn;
