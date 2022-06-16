import { AddCircleOutline } from "@mui/icons-material";
import { Overlay } from "components/bookmeeting/SubjectCreateModal";
import Title from "components/common/Title";
import VoteBox from "components/common/VoteBox";
import VoteCreateBox from "components/vote/VoteCreateBox";
import { useState } from "react";
import styled from "styled-components";
import { ButtonHeader, Container } from "theme/commonStyle";

const Vote = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const onClick = () => {
    setModalOpen((prev) => !prev);
  };
  return (
    <>
      <ButtonHeader>
        <Title title="의 투표" />
        <button onClick={onClick}>
          <AddCircleOutline />
          투표 등록하기
        </button>
      </ButtonHeader>
      <Container>
        {modalOpen ? (
          <Modal>
            <Overlay onClick={onClick} />
            <VoteCreateBox />
          </Modal>
        ) : (
          <></>
        )}
        <VoteBox />
      </Container>
    </>
  );
};

const Modal = styled.div``;

export default Vote;
