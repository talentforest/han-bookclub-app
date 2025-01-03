import { ReactNode } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface EmptyContainerProps {
  children: ReactNode;
  createBtnTitle?: string;
  onCreateClick?: () => void;
}

export default function EmptyContainer({
  children,
  createBtnTitle,
  onCreateClick,
}: EmptyContainerProps) {
  return (
    <Container>
      {children}
      {onCreateClick && (
        <button onClick={onCreateClick}>
          {createBtnTitle} <FiChevronRight />
        </button>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.container.default};
  box-shadow: ${({ theme }) => theme.boxShadow};
  > span {
    flex: 1;
    display: flex;
    align-items: center;
    color: #aaa;
    font-size: 15px;
  }
  button {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    padding: 12px 15px 10px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.container.purple1};
    box-shadow: ${({ theme }) => theme.boxShadow};
    margin-bottom: 20px;
    span {
      font-size: 15px;
    }
    svg {
      font-size: 18px;
    }
  }
  @media ${device.tablet} {
    height: 200px;
    button {
      font-size: 16px;
    }
  }
  @media ${device.desktop} {
    button {
      font-size: 16px;
    }
  }
`;
