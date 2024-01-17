import { useEffect } from 'react';
import { getCollection } from 'api/getFbDoc';
import { useRecoilState } from 'recoil';
import { votesState } from 'data/documentsAtom';
import { isoFormatDate, krCurTime } from 'util/index';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import VoteBox from 'components/organisms/vote/VoteBox';
import device from 'theme/mediaQueries';

const VoteSlider = () => {
  const [votes, setVotes] = useRecoilState(votesState);
  const progressVotes = votes.filter(
    (item) => item.deadline >= isoFormatDate(krCurTime)
  );

  useEffect(() => {
    if (votes.length === 0) {
      getCollection('Vote', setVotes);
    }
  }, []);

  return (
    <>
      {progressVotes.length ? (
        <VotesContainer>
          <Votes>
            {progressVotes?.map((voteDetail) => (
              <VoteBox key={voteDetail.id} voteDetail={voteDetail} />
            ))}
          </Votes>
        </VotesContainer>
      ) : (
        <EmptyContainer>
          <span>진행중인 투표가 없어요.</span>
          <Link to='/vote'>투표 등록하러 가기</Link>
        </EmptyContainer>
      )}
    </>
  );
};

const VotesContainer = styled.div`
  width: 100%;
  overflow: scroll;
`;
const Votes = styled.div`
  display: flex;
  gap: 10px;
  width: fit-content;
  padding: 5px 2px;
  > div {
    width: 240px;
  }
  @media ${device.tablet} {
    > div {
      width: 280px;
    }
  }
`;
const EmptyContainer = styled.div`
  width: 100%;
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: ${(props) => props.theme.boxShadow};
  span {
    flex: 1;
    display: flex;
    align-items: center;
    color: #aaa;
  }
  a {
    width: 100%;
    text-align: center;
    padding: 12px 15px 10px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.container.yellow};
    box-shadow: ${(props) => props.theme.boxShadow};
    font-size: 15px;
    svg {
      font-size: 16px;
    }
  }
`;

export default VoteSlider;
