import { IBookVote, IBookVoteItem, IVote, IVoteItem } from 'data/voteAtom';

const getBookVoteItems: (voteItems: IVoteItem[]) => IBookVoteItem[] = (
  voteItems: IVoteItem[]
) => {
  const bookVoteItems = voteItems?.map(({ item, ...rest }) => {
    const book = { title: item, url: '', thumbnail: '' };
    return { ...rest, book };
  });

  return bookVoteItems;
};

export const turnVoteToBookVote: (previousVote: IVote) => IBookVote = (
  previousVote
) => {
  const { vote, ...rest } = previousVote;

  return {
    ...rest,
    title: previousVote?.vote?.title,
    voteItems: getBookVoteItems(previousVote?.vote?.voteItem),
  };
};

export const turnVotesToBookVotes: (previousVotes: IVote[]) => IBookVote[] = (
  previousVotes
) => {
  const bookVote = previousVotes?.map((previousVote) => {
    const { vote, ...rest } = previousVote;

    return {
      ...rest,
      title: previousVote.vote.title,
      voteItems: getBookVoteItems(previousVote.vote.voteItem),
    };
  });

  return bookVote;
};
