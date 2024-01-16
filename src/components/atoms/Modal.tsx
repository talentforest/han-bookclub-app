import styled from 'styled-components';
import { ReactNode } from 'react';

interface Props {
  onToggleClick: () => void;
  width?: string;
  title: string;
  children: ReactNode;
}

export default function Modal({
  onToggleClick,
  title,
  width = '90%',
  children,
}: Props) {
  return (
    <>
      <OverlayBox onClick={onToggleClick} />

      <BoxModal $width={width}>
        <h3>{title}</h3>
        {children}
      </BoxModal>
    </>
  );
}

const BoxModal = styled.section<{ $width: string }>`
  z-index: 100;
  width: ${(props) => props.$width};
  height: min-content;
  position: fixed;
  display: flex;
  flex-direction: column;
  padding: 12px;
  margin: auto;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  border-radius: 10px;
  background-color: #fff;

  > h3 {
    font-size: 18px;
    margin-left: 4px;
    margin-bottom: 4px;
  }
`;

const OverlayBox = styled.div`
  cursor: pointer;
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;
