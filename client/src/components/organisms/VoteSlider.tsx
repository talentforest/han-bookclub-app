import { useEffect } from 'react';
import { getCollection } from 'api/getFbDoc';
import { useRecoilState } from 'recoil';
import { todayWithHyphen } from 'util/index';
import { useNavigate } from 'react-router-dom';
import { bookVotesState } from 'data/voteAtom';
import { BOOK_VOTE } from 'constants/index';
import VoteProgressBox from '../molecules/VoteProgressBox';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import EmptyContainer from 'components/atoms/container/EmptyContainer';

const VoteSlider = () => {
  const [bookVotes, setBookVotes] = useRecoilState(bookVotesState);

  const progressVotes = bookVotes?.filter(
    (vote) => vote.deadline >= todayWithHyphen
  );

  useEffect(() => {
    if (!bookVotes?.length) {
      getCollection(BOOK_VOTE, setBookVotes);
    }
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {progressVotes?.length ? (
        <VotesContainer>
          <Votes $votesNum={progressVotes?.length}>
            {progressVotes?.map((voteDetail) => (
              <VoteProgressBox key={voteDetail.id} voteDetail={voteDetail} />
            ))}
          </Votes>
        </VotesContainer>
      ) : (
        <EmptyContainer
          onCreateClick={() => navigate('/voite')}
          createBtnTitle='투표 생성하러 가기'
        >
          <span>진행중인 투표가 없어요.</span>
        </EmptyContainer>
      )}
    </>
  );
};

const VotesContainer = styled.div`
  width: 100%;
  padding: 4px;
  overflow: scroll;
  scroll-behavior: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Votes = styled.div<{ $votesNum: number }>`
  display: flex;
  gap: 10px;
  width: ${({ $votesNum }) => `${$votesNum * 260}px`};
  > div {
    width: 240px;
  }
  @media ${device.tablet} {
    width: ${({ $votesNum }) => `${$votesNum * 300}px`};
    > div {
      width: 280px;
    }
  }
`;

export default VoteSlider;
