import { AddCircleOutline } from "@mui/icons-material";
import { useState } from "react";
import { Container } from "theme/commonStyle";
import { today } from "util/constants";
import VoteBox from "components/vote/VoteBox";
import VoteCreateBox from "components/vote/VoteCreateBox";
import Subtitle from "components/common/Subtitle";
import ExpiredVote from "components/vote/ExpiredVote";
import styled from "styled-components";
import device from "theme/mediaQueries";
import useCallVotes from "hooks/useCallVotes";
import Overlay from "components/common/Overlay";

const Vote = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { votes } = useCallVotes();

  const onModalClick = () => {
    setModalOpen((prev) => !prev);
  };

  const progressVote = votes.filter((item) => item.deadline >= today());
  const expiredVote = votes.filter((item) => item.deadline < today());

  return (
    <Container>
      <Subtitle title="투표함" />
      <VoteButton onClick={onModalClick}>
        <AddCircleOutline />
        투표 등록하기
      </VoteButton>
      {modalOpen && (
        <section>
          <Overlay onModalClick={onModalClick} />
          <VoteCreateBox setModalOpen={setModalOpen} />
        </section>
      )}
      <VoteList>
        {progressVote?.length ? (
          progressVote.map((vote) => <VoteBox key={vote.id} vote={vote} />)
        ) : (
          <EmptyBox>아직 등록된 투표가 없습니다.</EmptyBox>
        )}
      </VoteList>
      <Subtitle title="기한이 만료된 투표함" />
      <VoteList>
        {expiredVote?.length ? (
          expiredVote.map((vote) => <ExpiredVote key={vote.id} vote={vote} />)
        ) : (
          <EmptyBox>아직 만료된 투표가 없습니다.</EmptyBox>
        )}
      </VoteList>
    </Container>
  );
};

const VoteList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;
  margin: 20px auto 40px;
  width: 100%;
  @media ${device.tablet} {
    > div {
      height: 260px;
      width: 48%;
    }
  }
  @media ${device.desktop} {
    > div {
      height: 260px;
      width: 30%;
    }
  }
`;

const VoteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 20px;
  display: flex;
  align-items: center;
  border: none;
  padding: 5px;
  border-radius: 10px;
  color: ${(props) => props.theme.text.accent};
  font-size: 16px;
  svg {
    fill: ${(props) => props.theme.text.accent};
    margin-right: 5px;
  }
  @media ${device.tablet} {
    top: 10px;
    right: 80px;
    padding: 10px;
  }
  @media ${device.desktop} {
    right: 160px;
  }
`;

const EmptyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  height: 100px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

export default Vote;
