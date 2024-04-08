import { ReactNode } from 'react';
import { FiX } from 'react-icons/fi';
import ReactDOM from 'react-dom';
import device from 'theme/mediaQueries';
import styled from 'styled-components';

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
  const el = document.getElementById('modal');
  return ReactDOM.createPortal(
    <>
      <OverlayBox onClick={onToggleClick} />

      <BoxModal $width={width}>
        <ModalHeaderBox>
          <h3>{title}</h3>
          <button type='button' onClick={onToggleClick}>
            <FiX size={20} />
          </button>
        </ModalHeaderBox>

        {children}
      </BoxModal>
    </>,
    el
  );
}

const BoxModal = styled.section<{ $width: string }>`
  z-index: 10;
  width: ${({ $width }) => $width};
  min-height: 180px;
  height: min-content;
  max-height: 78vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  padding: 10px 12px 18px;
  margin: auto;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.container.default};
  @media ${device.tablet} {
    max-width: 60vw;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
`;

const ModalHeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 4px;
  margin-bottom: 5px;
  > button {
    padding: 0 5px;
  }
  > h3 {
    font-size: 18px;
    padding-top: 4px;
  }
`;

const OverlayBox = styled.div`
  cursor: pointer;
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;
