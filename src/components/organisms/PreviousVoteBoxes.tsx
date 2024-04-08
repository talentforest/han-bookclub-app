import { getCollection } from 'api/getFbDoc';
import { VOTE } from 'constants/index';
import { IBookVote, IBookVoteItem, IVoteItem, votesState } from 'data/voteAtom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import VoteExpiredBox from 'components/molecules/VoteExpiredBox';

export default function PreviousVoteBoxes() {
  const [previousVotes, setPreviousVotes] = useRecoilState(votesState);

  useEffect(() => {
    if (!previousVotes?.length) {
      getCollection(VOTE, setPreviousVotes);
    }
  }, []);

  const getBookVoteItems: (voteItems: IVoteItem[]) => IBookVoteItem[] = (
    voteItems: IVoteItem[]
  ) => {
    const bookVoteItems = voteItems?.map(({ item, ...rest }) => {
      const book = { title: item, url: '', thumbnail: '' };
      return { ...rest, book };
    });

    return bookVoteItems;
  };

  const bookVotes: IBookVote[] = previousVotes?.map((previousVote) => {
    const { vote, ...rest } = previousVote;

    return {
      ...rest,
      title: previousVote.vote.title,
      voteItems: getBookVoteItems(previousVote.vote.voteItem),
    };
  });

  return (
    <>
      {bookVotes?.length !== 0 &&
        bookVotes?.map(({ title, voteItems, voteId }) => (
          <VoteExpiredBox
            key={voteId}
            voteItems={voteItems}
            voteTitle={title}
            voteId={voteId}
          />
        ))}
    </>
  );
}
