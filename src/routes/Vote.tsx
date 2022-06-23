import { AddCircleOutline } from "@mui/icons-material";
import { Overlay } from "components/bookmeeting/SubjectCreateModal";
import Title from "components/common/Title";
import VoteBox from "components/common/VoteBox";
import VoteCreateBox from "components/vote/VoteCreateBox";
import useWindowSize from "hooks/useWindowSize";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ButtonHeader, Container } from "theme/commonStyle";
import { deviceSizes } from "theme/mediaQueries";
import { getVote } from "util/getFirebaseDoc";

const Vote = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [voteDoc, setVoteDoc] = useState([]);
  const { windowSize } = useWindowSize();

  useEffect(() => {
    getVote(setVoteDoc);
    return () => {
      getVote(setVoteDoc);
    };
  }, []);

  const onClick = () => {
    setModalOpen((prev) => !prev);
  };
  return (
    <>
      {windowSize.width < +deviceSizes.tablet ? (
        <ButtonHeader>
          <Title title="의 투표" />
          <button onClick={onClick}>
            <AddCircleOutline />
            투표 등록하기
          </button>
        </ButtonHeader>
      ) : (
        <ButtonHeader>
          <button onClick={onClick}>
            <AddCircleOutline />
            투표 등록하기
          </button>
        </ButtonHeader>
      )}
      <Container>
        {modalOpen && (
          <section>
            <Overlay onClick={onClick} />
            <VoteCreateBox setModalOpen={setModalOpen} />
          </section>
        )}
        <VoteList>
          {voteDoc.map((item, index) => (
            <VoteBox key={item.id} item={item} index={index} />
          ))}
        </VoteList>
      </Container>
    </>
  );
};

const VoteList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default Vote;
