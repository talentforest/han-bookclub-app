import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { todayWithHyphen } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import { FiPlusCircle } from 'react-icons/fi';
import { EmptyBox } from './BookClubHistory';
import { bookVotesState } from 'data/voteAtom';
import { BOOK_VOTE } from 'constants/index';
import VoteCreateModal from 'components/organisms/modal/VoteCreateModal';
import Subtitle from 'components/atoms/Subtitle';
import Loading from 'components/atoms/Loading';
import MobileHeader from 'layout/mobile/MobileHeader';
import VoteProgressBox from 'components/molecules/VoteProgressBox';
import PreviousVoteBoxes from 'components/organisms/PreviousVoteBoxes';
import VoteExpiredBox from 'components/molecules/VoteExpiredBox';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

const Vote = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [bookVotes, setBookVotes] = useRecoilState(bookVotesState);

  useEffect(() => {
    if (!bookVotes?.length) {
      getCollection(BOOK_VOTE, setBookVotes);
    }
  }, []);

  const progressVotes = bookVotes?.filter(
    (item) => item.deadline >= todayWithHyphen
  );

  const expiredVote = bookVotes?.filter(
    (item) => item.deadline < todayWithHyphen
  );

  const onToggleModal = () => setModalOpen((prev) => !prev);

  return (
    <>
      <MobileHeader title='한페이지의 투표함' />

      <main>
        <HeaderBox>
          <Subtitle title='진행중인 투표함' />
          <button type='button' onClick={onToggleModal}>
            <FiPlusCircle />
          </button>
        </HeaderBox>
        {bookVotes ? (
          <VoteList>
            {progressVotes?.length !== 0 ? (
              progressVotes?.map((voteDetail) => (
                <VoteProgressBox key={voteDetail.id} voteDetail={voteDetail} />
              ))
            ) : (
              <EmptyBox>아직 등록된 투표가 없습니다.</EmptyBox>
            )}
          </VoteList>
        ) : (
          <Loading />
        )}

        <Subtitle title='기한이 만료된 투표함' />
        <VoteList>
          {expiredVote?.length !== 0 &&
            expiredVote?.map((vote) => (
              <VoteExpiredBox key={vote.id} vote={vote} collName={BOOK_VOTE} />
            ))}

          <PreviousVoteBoxes />
        </VoteList>

        {modalOpen && <VoteCreateModal onToggleModal={onToggleModal} />}
      </main>
    </>
  );
};

export const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  button {
    svg {
      font-size: 20px;
      margin-bottom: 5px;
      stroke: ${({ theme }) => theme.text.blue2};
    }
  }
  @media ${device.tablet} {
    gap: 5px;
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
