import styled from 'styled-components';
import Overlay from './Overlay';
import { ReactNode } from 'react';

interface Props {
  onModalToggleClick: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ onModalToggleClick, title, children }: Props) {
  return (
    <>
      <Overlay onModalClick={onModalToggleClick} />
      <BoxModal>
        <h3>{title}</h3>
        {children}
      </BoxModal>
    </>
  );
}

const BoxModal = styled.section`
  z-index: 10;
  width: 308px;
  height: min-content;
  position: fixed;
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: auto;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  border-radius: 10px;
  background-color: #fff;

  > h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;
