import { getCollection } from 'api/getFbDoc';
import { VOTE } from 'constants/index';
import { votesState } from 'data/voteAtom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { turnVotesToBookVotes } from 'util/index';
import VoteExpiredBox from 'components/molecules/VoteExpiredBox';

export default function PreviousVoteBoxes() {
  const [previousVotes, setPreviousVotes] = useRecoilState(votesState);

  useEffect(() => {
    if (!previousVotes?.length) {
      getCollection(VOTE, setPreviousVotes);
    }
  }, []);

  const bookVotes = turnVotesToBookVotes(previousVotes);

  return (
    <>
      {bookVotes?.length !== 0 &&
        bookVotes?.map((vote) => (
          <VoteExpiredBox key={vote.id} vote={vote} collName={VOTE} />
        ))}
    </>
  );
}
