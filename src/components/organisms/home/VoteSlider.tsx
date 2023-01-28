import { useEffect } from 'react';
import { getCollection } from 'api/getFbDoc';
import { useRecoilState } from 'recoil';
import { votesState } from 'data/documentsAtom';
import { isoFormatDate, krCurTime } from 'util/index';
import { ArrowForwardIos } from '@mui/icons-material';
import styled from 'styled-components';
import VoteBox from 'components/organisms/vote/VoteBox';
import LinkBtn from 'components/atoms/buttons/LinkBtn';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <LinkBtn to='/vote'>
            투표 등록하러 가기
            <ArrowForwardIos />
          </LinkBtn>
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
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  padding: 25px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: ${(props) => props.theme.boxShadow};
  color: ${(props) => props.theme.text.gray};
  a {
    width: 180px;
    svg {
      font-size: 16px;
    }
  }
`;

export default VoteSlider;
