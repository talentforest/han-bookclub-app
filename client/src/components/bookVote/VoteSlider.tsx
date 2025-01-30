import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { getCollection } from 'api/firebase/getFbDoc';

import { bookVotesState } from 'data/voteAtom';
import { useRecoilState } from 'recoil';

import VoteProgressCard from './VoteProgressCard';
import { BOOK_VOTE } from 'appConstants';
import { todayWithHyphen } from 'utils';

import EmptyCard from 'components/common/container/EmptyCard';

const VoteSlider = () => {
  const [bookVotes, setBookVotes] = useRecoilState(bookVotesState);

  const progressVotes = bookVotes?.filter(
    vote => vote.deadline >= todayWithHyphen,
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
        <div className={`${progressVotes?.length}`}>
          {progressVotes?.map(voteDetail => (
            <VoteProgressCard key={voteDetail.id} voteDetail={voteDetail} />
          ))}
        </div>
      ) : (
        <EmptyCard
          text="진행중인 투표가 없어요."
          onCreateClick={() => navigate('/vote')}
          createBtnTitle="투표 생성하러 가기"
        />
      )}
    </>
  );
};

export default VoteSlider;
