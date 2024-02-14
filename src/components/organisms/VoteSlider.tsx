import { useEffect } from 'react';
import { getCollection } from 'api/getFbDoc';
import { useRecoilState } from 'recoil';
import { todayWithHyphen } from 'util/index';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { votesState } from 'data/voteAtom';
import { VOTE } from 'constants/index';
import styled from 'styled-components';
import VoteBox from 'components/organisms/VoteBox';
import device from 'theme/mediaQueries';

const VoteSlider = () => {
  const [votes, setVotes] = useRecoilState(votesState);
  const progressVotes = votes?.filter(
    (item) => item.deadline >= todayWithHyphen
  );

  useEffect(() => {
    if (!votes?.length) {
      getCollection(VOTE, setVotes);
    }
  }, []);

  return (
    <>
      {progressVotes?.length ? (
        <VotesContainer>
          <Votes $votesNum={progressVotes?.length}>
            {progressVotes?.map((voteDetail) => (
              <VoteBox key={voteDetail.id} voteDetail={voteDetail} />
            ))}
          </Votes>
        </VotesContainer>
      ) : (
        <EmptyContainer>
          <span>진행중인 투표가 없어요.</span>
          <Link to='/vote'>
            <span>투표 등록하러 가기</span>
            <FiChevronRight />
          </Link>
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

const EmptyContainer = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.container.default};
  box-shadow: ${({ theme }) => theme.boxShadow};
  > span {
    flex: 1;
    display: flex;
    align-items: center;
    color: #aaa;
    font-size: 15px;
  }
  a {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 12px 15px 10px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.container.yellow1};
    box-shadow: ${({ theme }) => theme.boxShadow};
    span {
      padding-top: 3px;
      font-size: 15px;
    }
    svg {
      font-size: 18px;
    }
  }
  @media ${device.tablet} {
    height: 200px;
    a {
      width: 180px;
      font-size: 16px;
    }
  }
  @media ${device.desktop} {
    a {
      width: 200px;
      font-size: 16px;
    }
  }
`;

export default VoteSlider;
