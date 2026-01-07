import { FiPlusCircle } from 'react-icons/fi';

import { useRecoilValue } from 'recoil';

import { bookVotesSelector } from '@/data/voteAtom';

import { useHandleModal } from '@/hooks';

import MobileHeader from '@/layout/MobileHeader';

import VoteCreateModal from '@/components/bookVote/VoteCreateModal';
import VoteExpiredCard from '@/components/bookVote/VoteExpiredCard';
import VoteProgressCard from '@/components/bookVote/VoteProgressCard';
import EmptyCard from '@/components/common/container/EmptyCard';
import Section from '@/components/common/container/Section';

const Vote = () => {
  const progressVotes = useRecoilValue(bookVotesSelector('progress'));
  const expiredVote = useRecoilValue(bookVotesSelector('expired'));

  const { showModal } = useHandleModal();

  const toggleModal = () => showModal({ element: <VoteCreateModal /> });

  return (
    <>
      <MobileHeader title="한페이지 투표함" />

      <main>
        <Section
          title="진행중인 투표함"
          titleBtn={
            <button type="button" onClick={toggleModal}>
              <FiPlusCircle className="text-lg text-blue1" />
            </button>
          }
        >
          {progressVotes && progressVotes?.length !== 0 ? (
            <ul className="flex gap-6 max-sm:flex-col">
              {progressVotes
                ?.slice(0, 1)
                .map(voteDetail => (
                  <VoteProgressCard
                    key={voteDetail.id}
                    voteDetail={voteDetail}
                  />
                ))}
            </ul>
          ) : (
            <EmptyCard text="아직 등록된 투표가 없습니다." />
          )}
        </Section>

        <Section title="기한이 만료된 투표함">
          {expiredVote?.length !== 0 && (
            <ul className="grid grid-cols-3 gap-7 max-md:grid-cols-2 max-sm:flex max-sm:flex-col max-sm:gap-5">
              {expiredVote?.map(vote => (
                <VoteExpiredCard key={vote.id} vote={vote} />
              ))}
            </ul>
          )}
        </Section>
      </main>
    </>
  );
};

export default Vote;
