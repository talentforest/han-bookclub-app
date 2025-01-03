import Subtitle from 'components/atoms/Subtitle';
import { ReactNode } from 'react';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface SectionProps {
  children: ReactNode;
  title?: string;
}

export default function Section({ children, title }: SectionProps) {
  return (
    <Container>
      {title && <Subtitle title={title} />}
      {children}
    </Container>
  );
}

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 55px;
  position: relative;
  @media ${device.tablet} {
    margin-bottom: 70px;
  }
  @media ${device.desktop} {
    margin-bottom: 80px;
  }
`;
