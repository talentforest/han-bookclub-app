import { AddCircleOutline } from "@mui/icons-material";
import { Overlay } from "components/bookmeeting/SubjectCreateModal";
import { useEffect, useState } from "react";
import { Container } from "theme/commonStyle";
import device, { deviceSizes } from "theme/mediaQueries";
import { getVotes } from "util/getFirebaseDoc";
import { today } from "util/constants";
import useWindowSize from "hooks/useWindowSize";
import VoteBox from "components/vote/VoteBox";
import VoteCreateBox from "components/vote/VoteCreateBox";
import styled from "styled-components";
import Subtitle from "components/common/Subtitle";
import ExpiredVote from "components/vote/ExpiredVote";
import MobileHeader from "components/header/MobileHeader";

const Vote = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [voteDoc, setVoteDoc] = useState([]);
  const { windowSize } = useWindowSize();

  useEffect(() => {
    getVotes(setVoteDoc);
    return () => {
      getVotes(setVoteDoc);
    };
  }, []);

  const onClick = () => {
    setModalOpen((prev) => !prev);
  };

  const progressVote = voteDoc.filter((item) => item.deadline >= today());
  const expiredVote = voteDoc.filter((item) => item.deadline < today());

  return (
    <>
      <MobileHeader title="한페이지의 투표함" onButtonClick={onClick} />
      <Container>
        <Subtitle title="투표함" />
        {windowSize.width > +deviceSizes.tablet && (
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
          {progressVote?.length ? (
            progressVote.map((item, index) => (
              <VoteBox key={item.id} item={item} index={index} />
            ))
          ) : (
            <EmptyBox>아직 등록된 투표가 없습니다.</EmptyBox>
          )}
        </VoteList>
        <Subtitle title="기한이 만료된 투표함" />
        <VoteList>
          {expiredVote?.length ? (
            expiredVote.map((item, index) => (
              <ExpiredVote key={item.id} item={item} index={index} />
            ))
          ) : (
            <EmptyBox>아직 만료된 투표가 없습니다.</EmptyBox>
          )}
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
