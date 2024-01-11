import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

export default function Box({ children }: Props) {
  return <InfoBox>{children}</InfoBox>;
}

const InfoBox = styled.section`
  padding: 12px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 2px 3px 3px 3px #eaeaea;
  display: flex;
  flex-direction: column;
`;
