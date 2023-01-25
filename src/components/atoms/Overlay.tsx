import styled from 'styled-components';

interface PropsType {
  onModalClick: () => void;
}

const Overlay = ({ onModalClick }: PropsType) => {
  return <Modal onClick={onModalClick} />;
};

const Modal = styled.div`
  cursor: pointer;
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default Overlay;
