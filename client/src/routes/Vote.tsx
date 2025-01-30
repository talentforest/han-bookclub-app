import { useEffect, useState } from 'react';

import { getCollection } from 'api/firebase/getFbDoc';

import { bookVotesState } from 'data/voteAtom';
import { useRecoilState } from 'recoil';

import { BOOK_VOTE } from 'appConstants';
import { FiPlusCircle } from 'react-icons/fi';
import { todayWithHyphen } from 'utils';

import MobileHeader from 'layout/mobile/MobileHeader';

import VoteCreateModal from 'components/bookVote/VoteCreateModal';
import VoteExpiredCard from 'components/bookVote/VoteExpiredCard';
import VoteProgressCard from 'components/bookVote/VoteProgressCard';
import Subtitle from 'components/common/Subtitle';
import EmptyCard from 'components/common/container/EmptyCard';
import Section from 'components/common/container/Section';

const Vote = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [bookVotes, setBookVotes] = useRecoilState(bookVotesState);

  useEffect(() => {
    if (!bookVotes?.length) {
      getCollection(BOOK_VOTE, setBookVotes);
    }
  }, []);

  const progressVotes = bookVotes?.filter(
    item => item.deadline >= todayWithHyphen,
  );

  const expiredVote = bookVotes?.filter(
    item => item.deadline < todayWithHyphen,
  );

  const onToggleModal = () => setModalOpen(prev => !prev);

  return (
    <>
      <MobileHeader title="한페이지 투표함" />

      <main>
        <Section>
          <div className="flex items-center gap-1">
            <Subtitle title="진행중인 투표함" />
            <button type="button" onClick={onToggleModal} className="mb-2">
              <FiPlusCircle className="text-lg text-pointBlue" />
            </button>
          </div>

          {progressVotes?.length !== 0 ? (
            <ul>
              {progressVotes?.map(voteDetail => (
                <VoteProgressCard key={voteDetail.id} voteDetail={voteDetail} />
              ))}
            </ul>
          ) : (
            <EmptyCard text="아직 등록된 투표가 없습니다." />
          )}
        </Section>

        <Section>
          <Subtitle title="기한이 만료된 투표함" />
          {expiredVote?.length !== 0 && (
            <ul className="grid grid-cols-3 gap-4 max-sm:flex max-sm:flex-col">
              {expiredVote?.map(vote => (
                <VoteExpiredCard
                  key={vote.id}
                  vote={vote}
                  collName={BOOK_VOTE}
                />
              ))}
            </ul>
          )}
        </Section>

        {modalOpen && <VoteCreateModal onToggleModal={onToggleModal} />}
      </main>
    </>
  );
};

export default Vote;
