import { AddCircleOutline } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { votesState } from 'data/documentsAtom';
import { krCurTime, isoFormatDate } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import VoteBox from 'components/organisms/vote/VoteBox';
import VoteCreateBox from 'components/organisms/vote/VoteCreateBox';
import Subtitle from 'components/atoms/Subtitle';
import ExpiredVote from 'components/organisms/vote/ExpiredVote';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import Overlay from 'components/atoms/Overlay';
import Loading from 'components/atoms/Loading';

const Vote = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [votes, setVotes] = useRecoilState(votesState);
  const progressVotes = votes.filter(
    (item) => item.deadline >= isoFormatDate(krCurTime)
  );
  const expiredVote = votes.filter(
    (item) => item.deadline < isoFormatDate(krCurTime)
  );

  useEffect(() => {
    getCollection('Vote', setVotes);
  }, [setVotes]);

  const onModalClick = () => {
    setModalOpen((prev) => !prev);
  };

  return votes.length === 0 ? (
    <Loading full />
  ) : (
    <main>
      <Subtitle title='투표함' />
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
        {progressVotes?.length ? (
          progressVotes.map((voteDetail) => (
            <VoteBox key={voteDetail.id} voteDetail={voteDetail} />
          ))
        ) : (
          <EmptyBox>아직 등록된 투표가 없습니다.</EmptyBox>
        )}
      </VoteList>
      <Subtitle title='기한이 만료된 투표함' />
      <VoteList>
        {expiredVote?.length ? (
          expiredVote.map((voteDetail) => (
            <ExpiredVote key={voteDetail.id} voteDetail={voteDetail} />
          ))
        ) : (
          <EmptyBox>아직 만료된 투표가 없습니다.</EmptyBox>
        )}
      </VoteList>
    </main>
  );
};

const VoteButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  color: ${(props) => props.theme.text.accent};
  font-size: 16px;
  svg {
    fill: ${(props) => props.theme.text.accent};
    margin-right: 5px;
  }
  @media ${device.tablet} {
    padding: 10px;
  }
`;
const VoteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px auto 40px;
  width: 100%;
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 20px;
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
