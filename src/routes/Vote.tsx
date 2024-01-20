import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { votesState } from 'data/documentsAtom';
import { krCurTime, isoFormatDate } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import { FiPlusCircle } from 'react-icons/fi';
import VoteBox from 'components/organisms/vote/VoteBox';
import VoteCreateModal from 'components/organisms/modal/VoteCreateModal';
import Subtitle from 'components/atoms/Subtitle';
import ExpiredVoteBox from 'components/organisms/vote/ExpiredVoteBox';
import styled from 'styled-components';
import device from 'theme/mediaQueries';
import Loading from 'components/atoms/Loading';
import MobileHeader from 'layout/mobile/MobileHeader';
import { EmptyBox } from './BookClubHistory';

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
    if (votes.length === 0) {
      getCollection('Vote', setVotes);
    }
  }, []);

  const onModalClick = () => setModalOpen((prev) => !prev);

  return (
    <>
      <MobileHeader title='한페이지의 투표함' />
      {votes.length === 0 ? (
        <Loading />
      ) : (
        <main>
          <AddVoteBtnBox>
            <Subtitle title='진행중인 투표함' />
            <button type='button' onClick={onModalClick}>
              <FiPlusCircle fontSize={20} stroke='#2054ff' />
            </button>
          </AddVoteBtnBox>

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
                <ExpiredVoteBox key={voteDetail.id} voteDetail={voteDetail} />
              ))
            ) : (
              <EmptyBox>아직 만료된 투표가 없습니다.</EmptyBox>
            )}
          </VoteList>

          {modalOpen && <VoteCreateModal onModalClick={onModalClick} />}
        </main>
      )}
      ;
    </>
  );
};

const AddVoteBtnBox = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  color: ${({ theme }) => theme.text.blue3};
  font-size: 16px;
  button {
    padding-bottom: 3px;
  }
  @media ${device.tablet} {
    gap: 5px;
  }
  @media ${device.tablet} {
  }
`;

const VoteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 10px auto 40px;
  width: 100%;
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 20px;
  }
`;

export default Vote;
