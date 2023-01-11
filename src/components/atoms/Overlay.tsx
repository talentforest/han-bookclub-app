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
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;

export default Overlay;
