import { AddCircleOutline } from "@mui/icons-material";
import { Overlay } from "components/bookmeeting/SubjectCreateModal";
import { useEffect, useState } from "react";
import { ButtonHeader, Container } from "theme/commonStyle";
import device, { deviceSizes } from "theme/mediaQueries";
import { getVote } from "util/getFirebaseDoc";
import useWindowSize from "hooks/useWindowSize";
import Title from "components/common/Title";
import VoteBox from "components/vote/VoteBox";
import VoteCreateBox from "components/vote/VoteCreateBox";
import styled from "styled-components";
import Subtitle from "components/common/Subtitle";

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
        <></>
      )}
      <Container>
        <Subtitle title="투표함" />
        {windowSize.width < +deviceSizes.tablet ? (
          <></>
        ) : (
          <VoteButton onClick={onClick}>
            <AddCircleOutline />
            투표 등록하기
          </VoteButton>
        )}

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
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;
  @media ${device.tablet} {
    width: 620px;
    margin: 20px auto 0;
  }
`;

const VoteButton = styled.button`
  border: none;
  padding: 10px;
  margin: 0 10px 10px;
  border-radius: 10px;
  color: ${(props) => props.theme.text.accent};
  display: flex;
  align-items: center;
  font-size: 16px;
  svg {
    fill: ${(props) => props.theme.text.accent};
    margin-right: 5px;
  }
`;

export default Vote;
